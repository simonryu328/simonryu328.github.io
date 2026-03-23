---
description: Automatically generate consistent, high-resolution blog icons using specific rock/mineral descriptions.
---

# Generate Blog Icons Workflow

This workflow automatically generates high-resolution, visually consistent blog icons featuring macro-photography of stones and minerals using the AI's internal `generate_image` tool or any external image generation APIs (Midjourney, DALL-E).

## Base Prompt

When generating an image, you must wrap the target object description inside this foundational structure to guarantee a consistent visual language across all blog posts:

```text
A high-resolution, centered studio shot of a [OBJECT DESCRIPTION] isolated against a pitch-black, void-like background. Use soft rim lighting to define the edges and highlight the intricate surface textures. Minimalist composition, cinematic macro photography, 8k resolution, clean aesthetic, no shadows or visible floor.
```

## Object Descriptions

Substitute `[OBJECT DESCRIPTION]` in the base prompt with one of the following crafted descriptions based on the vibe of the blog post:

1. **The Layered Geode**
   - **Description**: "A perfectly sliced Brazilian agate, showing its circular blue and white crystalline geode center surrounded by warm brown, concentric banded layers."
   - **Focus**: Creates a look similar to striped stones but with a translucent, crystalline heart.

2. **The Volcanic Glass**
   - **Description**: "A smooth, droplet-shaped piece of snowflake obsidian, featuring a glossy black surface dotted with crisp, complex white crystal patterns."
   - **Focus**: Ideal for generating intricate, sharp, high-contrast patterns.

3. **The Sedimentary Marvel**
   - **Description**: "A water-worn pebble of red jasper and hematite, displaying wavy, folded bands of metallic red-brown and iron-gray that follow the natural contours of the stone."
   - **Focus**: Captures a classic "river stone" feel with rich, swirling colors.

4. **The Ancient Fossil**
   - **Description**: "A petrified wood fragment from the Permian period, transformed into a smooth, flattened opalized stone that reveals a vivid mosaic of rainbow fire flashes."
   - **Focus**: Merges organic texture (wood grain) with exotic, iridescence (opal).

5. **The Classic "Wishing Stone"**
   - **Description**: "A minimalist, deep matte black river pebble, perfectly oval, featuring a single, flawless, uninterrupted white quartz ring that circles the stone precisely."
   - **Focus**: Recreates the cleanest, most minimalist look from the third reference image.

6. **The Serene Jade**
   - **Description**: "A tumbled, translucent Burmese jadeite stone, polished to a high sheen, revealing a soothing gradient of pale mint-green to deep mossy tones."
   - **Focus**: Focuses on a single color family with subtle, soft shifts in shade and a polished finish.

7. **The Pyrite Cluster**
   - **Description**: "A sharp, geometric cluster of cubic fool's gold (pyrite), showing brilliant metallic-gold luster and precise 90-degree edges."
   - **Focus**: Metallic, geometric, and sharp.

8. **The Amethyst Cathedral**
   - **Description**: "A dense cluster of deep-purple amethyst crystal points, with sharp, prismatic facets that sparkle under soft studio lighting."
   - **Focus**: Crystalline, deep purple, and extremely sharp.

9. **The Starfield Sphere**
   - **Description**: "A polished sphere of royal-blue Lapis Lazuli with golden pyrite specks and white calcite veins, resembling a field of distant stars."
   - **Focus**: Cosmic deep blue with gold shimmers.

10. **The Peacock Ore**
    - **Description**: "A rough chunk of Bornite (Peacock Ore), displaying a vibrant, iridescent tarnish of electric blues, purples, and magentas over a metallic surface."
    - **Focus**: Multi-color iridescence and rough texture.

11. **The Shimmering Eye**
    - **Description**: "A polished slice of golden-brown Tiger's Eye, showing its characteristic chatoyancy and shimmering fibrous bands under direct rim lighting."
    - **Focus**: Directional light and golden-brown shimmers.

12. **The Sand Rose**
    - **Description**: "A complex, blossom-shaped cluster of sandy-tan Barite (Desert Rose), featuring delicate sand-blended crystal blades that overlap like rose petals."
    - **Focus**: Organic, floral, and sandy texture.

13. **The Fire Agate**
    - **Description**: "A polished piece of Mexican Fire Agate, featuring unique iridescent bubbled layers of orange, gold, and red that seem to glow with a deep 'fire' from within the stone."
    - **Focus**: Iridescent, glowing, and layered.

14. **The Blue Lace Agate**
    - **Description**: "A smooth, rounded stone of Blue Lace Agate, characterized by delicate, wavy, concentric bands of pale lavender-blue and soft white."
    - **Focus**: Soft blue/white palette and wavy layers.

15. **The Malachite Wheel**
    - **Description**: "A cross-section slice of African Malachite, showing concentric circular patterns of deep forest-green and vibrant mint-green, with a silky, velvet-like chatoyant luster."
    - **Focus**: Green, circular banding and velvet texture.

16. **The Ocean Jasper**
    - **Description**: "A perfectly polished piece of Ocean Jasper, displaying complex orbicular patterns (circles within circles) in shades of olive green, cream, and deep earthy ochre."
    - **Focus**: Orbicular (circles) and earthy/olive colors.

17. **The Rhodochrosite Stalactite**
    - **Description**: "A cross-section of a Rhodochrosite stalactite, revealing vibrant, zigzagged concentric layers of candy-pink and rose-red, contrasted with thin white lines."
    - **Focus**: Pink/Red, zigzag banding and "candy" colors.

18. **The Moss Agate**
    - **Description**: "A clear, translucent chalcedony stone (Moss Agate), containing delicate, dark-green dendritic inclusions that look like miniature forests or moss growing inside the gem."
    - **Focus**: Translucent and internal "forest" inclusions.

## Automation Script

If building into a Node script or Python generation pipeline, you can use the object definitions below to loop over slugs and map your AI outputs directly to the app directory:

```javascript
// generate-icons.js
const fs = require('fs');

const BASE_PROMPT = "A high-resolution, centered studio shot of a [OBJECT DESCRIPTION] isolated against a pitch-black, void-like background. Use soft rim lighting to define the edges and highlight the intricate surface textures. Minimalist composition, cinematic macro photography, 8k resolution, clean aesthetic, no shadows or visible floor.";

const DESCRIPTIONS = {
    layeredGeode: "A perfectly sliced Brazilian agate, showing its circular blue and white crystalline geode center surrounded by warm brown, concentric banded layers.",
    volcanicGlass: "A smooth, droplet-shaped piece of snowflake obsidian, featuring a glossy black surface dotted with crisp, complex white crystal patterns.",
    sedimentaryMarvel: "A water-worn pebble of red jasper and hematite, displaying wavy, folded bands of metallic red-brown and iron-gray that follow the natural contours of the stone.",
    ancientFossil: "A petrified wood fragment from the Permian period, transformed into a smooth, flattened opalized stone that reveals a vivid mosaic of rainbow fire flashes.",
    wishingStone: "A minimalist, deep matte black river pebble, perfectly oval, featuring a single, flawless, uninterrupted white quartz ring that circles the stone precisely.",
    sereneJade: "A tumbled, translucent Burmese jadeite stone, polished to a high sheen, revealing a soothing gradient of pale mint-green to deep mossy tones."
};

const BATCH = [
    { slug: "aki-performance-and-scalability", type: "layeredGeode" },
    { slug: "ar-menu", type: "ancientFossil" },
    { slug: "building-ai-companion-telegram", type: "volcanicGlass" },
    { slug: "conversational-ai-agent-techniques", type: "sedimentaryMarvel" },
    { slug: "latent-video-diffusion", type: "wishingStone" },
    { slug: "golf-chatbot", type: "sereneJade" },
];

function generatePrompts() {
    return BATCH.map(item => ({
        slug: item.slug,
        prompt: BASE_PROMPT.replace("[OBJECT DESCRIPTION]", DESCRIPTIONS[item.type])
    }));
}

console.log(generatePrompts());
// Integrate with your favorite image generation API (OpenAI, Midjourney, SDK, etc.)
// Output images to: ./public/blog-icons/{slug}.png
```

## Agent Execution Steps

If you want the AI assistant to perform this task for you immediately (assuming quota allows), instruct the assistant with `/slash-command generate-blog-icons` to execute the following logic:

1. Identify necessary slugs from the blog directory.
2. Select random or thematic `[OBJECT DESCRIPTION]` variants for each slug.
3. Call `generate_image` tool with the correctly merged Base Prompt for each.
4. Move and rename the resulting artifacts into `public/blog-icons/[slug].png`.
