---
title: "Building a Production AI Companion on Telegram"
date: 2026-03-04
categories: [AI, Software Engineering]
tags: [Telegram, FastAPI, LLM, Python, Claude, LiteLLM, Prompt Engineering]
image:
  path: /assets/img/aki-companion/cover.png
  alt: "Telegram chat interface connected to FastAPI, PostgreSQL, and AI infrastructure"
---

Most AI chatbot tutorials end at the same place: call the API, return the response. But when you try to ship a real product, you quickly discover that the API call is maybe 10% of the work. The other 90% is everything nobody tells you about — message timing, cost management, memory architecture, and making the whole thing actually feel *alive*.

This post is a deep dive into **Aki**, a personal AI companion I built on Telegram. Not another wrapper around ChatGPT — Aki is an always-on reflection partner with persistent memory, proactive messaging, a Spotify DJ, and a full Mini App dashboard. The codebase spans ~5,000 lines of Python across FastAPI, python-telegram-bot, Claude, PostgreSQL, and LiteLLM.

I'll walk through the systems engineering decisions that made it work: how to co-host a webhook and an API server, why message debouncing is non-negotiable, how to build a tiered memory system that survives restarts, and the cost engineering that kept the bill from spiraling.

> The source code for the project is hosted on GitHub, found [here](https://github.com/simonryu328/aki).

---

## The Stack at a Glance

Before diving in, here's the high-level architecture:

```
┌─────────────────────────────────────────────────────────────────┐
│                        Railway (Cloud)                         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    FastAPI Server                         │  │
│  │                                                           │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │  │
│  │  │  Webhook     │  │  REST API     │  │  Static Files  │  │  │
│  │  │  /webhook/   │  │  /api/...     │  │  Mini App UI   │  │  │
│  │  └──────┬──────┘  └──────┬───────┘  └────────────────┘  │  │
│  │         │                │                                │  │
│  │  ┌──────▼────────────────▼───────┐                       │  │
│  │  │       AgentOrchestrator       │                       │  │
│  │  │   (routes messages + context) │                       │  │
│  │  └──────────────┬────────────────┘                       │  │
│  │                 │                                         │  │
│  │  ┌──────────────▼────────────────┐                       │  │
│  │  │          SoulAgent            │                       │  │
│  │  │  (LLM calls, memory, parsing) │                       │  │
│  │  └──────────────┬────────────────┘                       │  │
│  │                 │                                         │  │
│  │  ┌──────────────▼────────────────┐   ┌────────────────┐  │  │
│  │  │    AsyncMemoryManager         │   │   LLM Client   │  │  │
│  │  │  (PostgreSQL via SQLAlchemy)  │   │   (LiteLLM)    │  │  │
│  │  └───────────────────────────────┘   └────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  PostgreSQL   │  │  APScheduler │  │  Streamlit Dashboard │  │
│  │  (Neon)       │  │  (cron jobs) │  │  (monitoring)        │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

**Key technology choices:**
- **FastAPI** for the async web server (webhook receiver + REST API + static file serving)
- **python-telegram-bot** for Telegram Bot API integration
- **Claude (Anthropic)** as the primary LLM via LiteLLM
- **PostgreSQL** (hosted on Neon) for persistent storage
- **Pydantic Settings** for type-safe configuration with environment variables
- **Railway** for deployment

---

## Co-hosting a Webhook and an API

The first design decision was: how do you run a Telegram bot, a REST API, and a frontend all from one process?

Most Telegram bot tutorials use **polling** — the bot connects to Telegram and continuously asks "any new messages?" This is fine for development, but in production, you want **webhooks**: Telegram pushes messages to your server. This is more efficient and scales better.

The trick is that Aki's FastAPI server also needs to serve the Mini App frontend (static HTML/JS/CSS) and expose REST API endpoints for the Mini App to call. The solution: **FastAPI's lifespan pattern** co-starts the Telegram bot alongside the API server:

```python
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifecycle manager for the FastAPI app.
    Starts and stops the Telegram bot alongside the API.
    """
    # Startup
    await bot.start()

    if settings.WEBHOOK_URL:
        await bot.application.bot.set_webhook(
            url=f"{settings.WEBHOOK_URL}/webhook/{settings.TELEGRAM_BOT_TOKEN}"
        )

    yield  # App is running

    # Shutdown
    await bot.stop()

app = FastAPI(title="AI Companion API", lifespan=lifespan)
```

The `WEBHOOK_URL` environment variable acts as a toggle: set it and the bot uses webhooks; leave it empty and it falls back to polling for local development. One codebase, two modes.

The same server also serves a **unified dashboard endpoint** that the Mini App fetches on load:

```python
@app.get("/api/dashboard/{telegram_id}")
async def get_dashboard(telegram_id: int):
    """
    Fetches everything needed for the Mini App in one round-trip:
    profile, memories, daily message, soundtrack, insights, plans.
    """
    user = await memory_manager.get_or_create_user(telegram_id=telegram_id)

    memories  = await memory_manager.get_diary_entries(user.id, limit=50)
    daily_msg = await _get_daily_message_data(telegram_id, user)
    soundtrack = await _get_daily_soundtrack_data(telegram_id, user)
    insights  = await _get_personalized_insights_data(telegram_id, user)
    horizons  = await memory_manager.get_future_entries(user_id=user.id)

    return DashboardResponse(
        profile=UserProfileResponse(...),
        memories=memories,
        daily_message=daily_msg,
        soundtrack=soundtrack,
        insights=insights,
        horizons=horizons,
    )
```

One request, everything the UI needs. This matters because Telegram Mini Apps run inside an embedded WebView with worse network latency than a native browser — minimizing round-trips is critical.

---

## Telegram Bot API — The Parts Nobody Talks About

The Telegram Bot API is well-documented for basic use. But building a companion that feels *natural* requires solving problems the docs don't cover.

### Message Debouncing

Real people don't send one long paragraph. They send 3-5 rapid-fire messages:

<div style="text-align: center; margin: 2rem 0;">
  <img src="/assets/img/aki-companion/aki-describes-itself.png" alt="Aki describing its own purpose across multiple messages — a mirror that talks back, designed for clarity through being heard" style="width: 85%; margin: auto; border-radius: 8px;">
  <p style="font-size: 0.85rem; color: #888; margin-top: 0.5rem;"><em>Aki's own description of what it is — split naturally across multiple messages, the way people actually text</em></p>
</div>

If you process each message independently, you get 3-5 separate LLM calls, each lacking the context of the others. The response feels fragmented and expensive.

The solution is **debouncing** — buffer incoming messages and wait for a pause before processing them all as one:

```python
async def handle_text_message(self, update, context):
    chat_id = update.effective_chat.id
    message_text = update.message.text

    # Buffer the message
    if chat_id not in self._message_buffers:
        self._message_buffers[chat_id] = []
    self._message_buffers[chat_id].append(message_text)

    # Cancel any existing debounce timer
    if chat_id in self._debounce_tasks:
        self._debounce_tasks[chat_id].cancel()

    # Start a new debounce timer (0.5 seconds)
    self._debounce_tasks[chat_id] = asyncio.create_task(
        self._process_buffered_messages(chat_id)
    )
```

After 0.5 seconds of silence, all buffered messages get joined with `\n` and processed as a single input. The delay is configurable — too low and you split multi-message thoughts; too high and the bot feels slow.

### Multi-Bubble Responses

Just as people send multiple messages, Aki responds in multiple short bubbles too. The `SoulAgent` supports a `[BREAK]` marker in its XML response schema that splits a single LLM response into multiple Telegram messages:

<div style="text-align: center; margin: 2rem 0;">
  <img src="/assets/img/aki-companion/multi-bubble-response.png" alt="Aki responding in three short, natural messages instead of one wall of text" style="width: 70%; margin: auto; border-radius: 8px;">
  <p style="font-size: 0.85rem; color: #888; margin-top: 0.5rem;"><em>Three short messages feel more natural than a single paragraph</em></p>
</div>

For longer single-block responses, there's also a smart splitter that breaks at sentence boundaries, targeting ~250 characters per chunk. The threshold is configurable via `AUTO_SPLIT_THRESHOLD` and `SMART_SPLIT_MAX_LENGTH`.

### Emoji Reactions and Typing Indicators

Small touches make the difference between "talking to a bot" and "texting a friend."

Aki generates an `<emoji>` tag in every response. If the emoji is a valid Telegram reaction (👍, ❤️, 🔥, etc.), it gets applied as a **message reaction** — the same way you'd react to a friend's message:

<div style="text-align: center; margin: 2rem 0;">
  <img src="/assets/img/aki-companion/emoji-reaction.png" alt="Emoji reactions applied to a message — a small detail that makes the interaction feel human" style="width: 40%; margin: auto; border-radius: 8px;">
  <p style="font-size: 0.85rem; color: #888; margin-top: 0.5rem;"><em>A quick reaction says more than words sometimes</em></p>
</div>

But doing this on every message would be annoying. So there's a **counter-based randomization**: a counter decrements with each message, and only when it hits zero does a reaction fire. Then it resets to a random value between `REACTION_MIN_MESSAGES` and `REACTION_MAX_MESSAGES`. This makes reactions feel spontaneous rather than mechanical.

The same pattern applies to stickers — Aki maintains a registry (`stickers.json`) mapping emojis to Telegram sticker `file_id`s, and occasionally sends one before the text response.

Before each message, Aki also shows the **typing indicator**, scaled to the message length for realism:

<div style="text-align: center; margin: 2rem 0;">
  <img src="/assets/img/aki-companion/typing-indicator.png" alt="Typing indicator shown before Aki sends a response" style="width: 30%; margin: auto; border-radius: 8px;">
  <p style="font-size: 0.85rem; color: #888; margin-top: 0.5rem;"><em>The typing indicator — a simple UX detail that adds presence</em></p>
</div>

### Rate Limiting

With LLM calls costing real money, rate limiting is essential. Aki uses a **sliding-window rate limiter** — no Redis, just an in-memory dictionary:

```python
class RateLimiter:
    """
    Sliding-window rate limiter for per-user message throttling.
    Prevents spam and runaway LLM costs.
    """
    def __init__(self, max_messages: int, window_seconds: int):
        self.max_messages = max_messages
        self.window_seconds = window_seconds
        self._user_windows: Dict[int, List[float]] = {}

    def check_rate_limit(self, user_id: int) -> tuple[bool, int]:
        now = time.time()
        cutoff = now - self.window_seconds

        # Get or create user's timestamp window
        timestamps = self._user_windows.setdefault(user_id, [])

        # Prune expired timestamps
        timestamps[:] = [t for t in timestamps if t > cutoff]

        if len(timestamps) >= self.max_messages:
            return False, 0  # Rate limited

        timestamps.append(now)
        return True, self.max_messages - len(timestamps)
```

Default: 10 messages per 60-second window. When exceeded, Aki sends a friendly message instead of making an LLM call. The rate limiter is checked *after* debouncing — so a burst of 5 rapid messages counts as 1 toward the limit.

### Proactive Reach-Outs

Most chatbots are purely reactive — they wait for input. Aki can **initiate conversations**. An APScheduler cron job periodically scans for users who haven't messaged in a while. When it finds one, it calls `_generate_reach_out_message()`:

<div style="text-align: center; margin: 2rem 0;">
  <img src="/assets/img/aki-companion/proactive-reachout.png" alt="Aki initiating a conversation about reach-out schedulers — the feature commenting on its own existence" style="width: 75%; margin: auto; border-radius: 8px;">
  <p style="font-size: 0.85rem; color: #888; margin-top: 0.5rem;"><em>Aki checking in proactively — teasing the user about the very feature that triggered the message</em></p>
</div>

The reach-out system uses the same tiered context (memories + recent conversations) as regular responses, but with a specialized `REACH_OUT_PROMPT` that instructs the LLM to pick up on *unfinished threads* — things the user mentioned but never resolved. The LLM can also return `SKIP` if it decides reach-out isn't appropriate (e.g., the user's last messages don't have any natural follow-up hooks).

Users can configure reach-out behavior per-user: enable/disable, set minimum silence hours, and maximum silence days — all via Telegram commands like `/reachout_settings`.

---

## The Memory System: Making an AI That Remembers

The biggest limitation of most AI chatbots is amnesia. Every conversation starts from zero. Aki solves this with a **tiered memory architecture**:

```
                     ┌─────────────────────────────┐
                     │     System Prompt Context    │
                     │  (what the LLM actually sees)│
                     └──────────────┬──────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
          ┌─────────────┐  ┌──────────────┐  ┌──────────────┐
          │  RECENT      │  │  CONVERSATION │  │  CURRENT     │
          │  EXCHANGES   │  │  MEMORIES     │  │  CONVERSATION│
          │  (4 entries) │  │  (diary)      │  │  (20 msgs)   │
          └──────┬──────┘  └──────┬───────┘  └──────┬───────┘
                 │                │                  │
          Memory entries    Personal diary      Raw messages
          with emotional    entries triggered    from the DB
          context           by milestones        (most recent)
                 │                │                  │
                 └────────────────┼──────────────────┘
                                  │
                     ┌────────────▼────────────┐
                     │   Raw Conversation DB    │
                     │  (all messages, forever) │
                     └─────────────────────────┘
```

### Layer 1: Raw Conversations

Every message (user and assistant) is stored in the `conversations` table with a timestamp. This is the ground truth.

### Layer 2: Compact Summaries and Conversation Memories

Every 30 messages (configurable via `COMPACT_INTERVAL`), two things happen simultaneously:

1. A **compact summary** is generated — a factual, timestamped paragraph condensing the exchange
2. A **conversation memory** is created — an emotionally-aware reflection on what was significant

These use different prompts with very different instructions:

```python
# COMPACT_PROMPT — factual, third-person record keeping
"""Create a factual, unbiased summary of this recent exchange.
Include timestamps, key details, and any commitments made."""

# MEMORY_PROMPT — personal, empathetic memory formation
"""Write as if remembering someone you care about.
What would you want to remember about them from this exchange?"""
```

The trigger is **database-based**, not in-memory. The agent queries the count of messages since the last diary entry — this means memory creation survives server restarts, which is critical for a production service that gets redeployed.

### Context Assembly: The Glue Overlap

When building the LLM's context, the agent uses a "glue overlap" strategy:

```python
async def _build_conversation_context(self, user_id, full_history, user):
    # 1. Get the 4 most recent memory entries
    memory_entries = await self.memory.get_diary_entries(
        user_id, limit=settings.MEMORY_ENTRY_LIMIT
    )

    # 2. Find where the latest memory ends
    # 3. Show raw messages AFTER that point + 3 overlap messages
    # This creates continuity between summarized and raw context
```

The 3 overlap messages ensure there's no "gap" between where the memory summary ends and where the raw conversation picks up. Without this, the LLM would sometimes lose track of the conversational thread.

### Prompt Caching

Anthropic's prompt caching can save up to **90% on input costs** — but only if you structure your prompts correctly. The system prompt is split into two blocks:

```python
SYSTEM_STATIC = """[persona, response format, rules]
{persona}
...response format instructions...
"""  # ← This is identical across calls → cacheable

SYSTEM_DYNAMIC = """
{recent_exchanges}
{conversation_history}
Current time: {current_time}
"""  # ← This changes every call → not cached
```

The LLM client applies `cache_control` breakpoints to the static block, so Anthropic can serve it from cache on subsequent calls. With the Anthropic beta header:

```python
# In the LLM client, automatically added when cache_control is detected
if has_cache_control and "claude" in model.lower():
    kwargs["extra_headers"] = {
        "anthropic-beta": "prompt-caching-2024-07-31"
    }
```

---

## Cost Engineering: The Part Nobody Warns You About

Here's the uncomfortable truth about building an always-on AI companion: **it's expensive if you're not careful**. Every message, every memory creation, every daily message, every reach-out — they all cost tokens. Multiply that by users and days, and costs add up fast.

### LiteLLM as the Abstraction Layer

Aki uses [LiteLLM](https://github.com/BerriAI/litellm) to abstract away provider differences. One function call, swap models by changing a string:

```python
class LLMClient:
    """Unified LLM client supporting multiple providers via LiteLLM."""

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(...))
    async def chat_with_usage(self, model, messages, **kwargs):
        response = await litellm.acompletion(
            model=model,           # "claude-haiku-4-5-20251001"
            messages=messages,     # or "gpt-4o-mini"
            temperature=temperature,
            max_tokens=max_tokens,
        )

        return LLMResponse(
            content=response.choices[0].message.content,
            input_tokens=usage.prompt_tokens,
            output_tokens=usage.completion_tokens,
            cache_read_tokens=getattr(usage, "cache_read_input_tokens", 0),
            cache_creation_tokens=getattr(usage, "cache_creation_input_tokens", 0),
        )
```

The convenience sounds great until you hit the gotchas:
- **Cache token reporting differs between providers.** Anthropic reports `cache_read_input_tokens` and `cache_creation_input_tokens`. OpenAI doesn't. You need `getattr` with defaults everywhere.
- **Provider prefix stripping.** LiteLLM sometimes prepends `anthropic/` or `openai/` to model names. Your pricing lookup needs to handle `anthropic/claude-haiku-4-5-20251001` → `claude-haiku-4-5-20251001`.

### Five Model Slots

Not all tasks need the same model. Aki uses **five configurable model slots**, each tunable from a single `.env` file:

```python
# config/settings.py — all individually configurable
MODEL_CONVERSATION  = "claude-haiku-4-5-20251001"  # Main chat
MODEL_PROACTIVE     = "claude-haiku-4-5-20251001"  # Reach-outs
MODEL_MEMORY        = "claude-haiku-4-5-20251001"  # Summaries
MODEL_DAILY_MESSAGE = "claude-haiku-4-5-20251001"  # Daily quotes
MODEL_INSIGHTS      = "claude-haiku-4-5-20251001"  # Personalized insights
```

During development, I used Sonnet for everything — great quality, terrifying bill. In production, Haiku handles most tasks at **~10x lower cost** with acceptable quality. The conversation model is the one slot where upgrading to Sonnet makes the most noticeable difference.

### The Pricing Module

Every LLM call records its token usage to the `token_usage` table with a `call_type` label. The pricing module then calculates estimated costs, including Anthropic's cache multipliers:

```python
def calculate_cost(model, input_tokens, output_tokens,
                   cache_read_tokens=0, cache_creation_tokens=0):
    pricing = get_model_pricing(model)

    cost_input  = (input_tokens / 1_000_000) * pricing["input"]
    cost_output = (output_tokens / 1_000_000) * pricing["output"]

    # Anthropic cache pricing multipliers
    cost_cache_write = (cache_creation_tokens / 1_000_000) * (pricing["input"] * 1.25)
    cost_cache_read  = (cache_read_tokens / 1_000_000) * (pricing["input"] * 0.1)

    return cost_input + cost_output + cost_cache_write + cost_cache_read
```

The `get_model_pricing()` function handles version suffixes (`claude-3-5-sonnet-20241022` → matches `claude-3-5-sonnet`) and provider prefixes, falling back to a conservative default if no match is found.

### Per-User Token Budgets

As a final guardrail, there's a `USER_DAILY_TOKEN_BUDGET` setting. When set to a non-zero value, the orchestrator checks the user's daily token consumption before every LLM call and cuts off if exceeded. This prevents a single active user from blowing through your monthly budget in one evening.

---

## The Operations Dashboard

You can't manage what you can't measure. Early on, I built a **Streamlit dashboard** (804 lines) for monitoring beta testers in real time.

The dashboard connects directly to the production PostgreSQL database and provides 7 tabs:

| Tab | What It Shows |
|-----|--------------|
| 🏠 Home | Total users, messages, tokens, lifetime cost, top cost driver model |
| 👤 Overview | Per-user quick stats |
| 💬 Conversations | Scrollable chat log with expandable `<thinking>` blocks |
| 📔 Diary | Memory entries filterable by type (conversation_memory, compact_summary, daily_message, etc.) |
| 💸 Usage | Daily token trends, per-model cost breakdown, daily budget progress bars, call type distribution |
| 💾 Database | Raw record counts and conversation span |
| ⚙️ Settings | Per-user reach-out configuration |

The **Usage tab** was the most valuable during beta. It showed me:
- Which model was eating the most budget (Sonnet for insights generation)
- How much prompt caching was actually saving (visible via cache hit counts)
- Which `call_type` consumed the most tokens (conversations >> reach-outs >> daily messages)
- Whether individual users were approaching their daily token budget

Running it is a single command:

```bash
uv run streamlit run scripts/dashboard.py
```

---

## Lessons Learned

After months of building, deploying, and iterating on Aki, here are the patterns that stuck:

**Message debouncing is not optional.** Without it, rapid-fire messages produce fragmented responses and 3-5x higher costs. The 0.5-second debounce window hits the right balance between responsiveness and coherence.

**Prompt caching pays for itself immediately.** Structuring the system prompt into static (persona, format) and dynamic (conversation, time) blocks with Anthropic's `cache_control` breakpoints reduced input costs significantly. The key insight: you only need two breakpoints.

**Build cost visibility before adding users.** The Streamlit dashboard was one of the first things I built. By the time beta testers joined, I could see exactly where tokens were going and which model changes would have the most impact.

**Telegram Mini Apps are underrated.** Embedding a full Vite/TypeScript app inside Telegram via `MenuButtonWebApp` gives you a rich UI without asking users to download another app. The unified dashboard endpoint (`/api/dashboard/{telegram_id}`) keeps the Mini App snappy by fetching everything in one round-trip.

**Database-based triggers beat in-memory state.** Memory creation is triggered by counting messages in the database, not by an in-memory counter. This means the bot can restart, redeploy, or crash without losing track of when to create the next memory entry.

**Different tasks deserve different models.** Running Haiku for background tasks (daily messages, reach-outs, memory generation) and reserving Sonnet for conversations saved over 80% on batch costs while maintaining the quality where it matters.

---

## Wrapping Up

Aki started as a "what if I could build a friend?" experiment and turned into a lesson in production AI systems. The interesting problems aren't the LLM calls — they're the infrastructure: how you manage state, control costs, handle timing, and make the whole thing feel natural on a platform (Telegram) that has its own constraints and capabilities.

If you're building something similar, my advice is: start with the boring parts. Get your cost tracking, rate limiting, and memory management right before you optimize prompts. The prompts will change a hundred times. The infrastructure has to work from day one.
