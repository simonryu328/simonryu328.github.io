import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/post-card";
import { Hero } from "@/components/hero";
import { ProjectCard, type Project } from "@/components/project-card";

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 4);

  const featuredProjects: Project[] = [
    {
      title: "Telegram AI Companion",
      description: "A human-like AI companion living natively on Telegram. Aki features proactive messaging, multi-bubble delivery, long-term PostgreSQL memory, and a custom built-in React Mini App to track your relationship.",
      link: "/blog/building-ai-companion-telegram",
      image: "/images/projects/demo_mini_app_preview.png",
      gif: "/images/projects/demo_mini_app.gif",
      secondaryImage: "/images/projects/aki-landing.png",
      github: "https://github.com/simonryu328/aki-the-bot",
      telegram: "https://t.me/AkiTheBot",
      externalLink: "https://aki-landing.vercel.app",
      additionalInfo: "Aki is live and processing real-time conversations! Experience human-like cadence, native reactions, and a persistent memory that builds over time.",
      tags: ["Python", "LLM", "FastAPI", "Agent"],
      variant: "featured",
      orientation: "vertical",
    },
    {
      title: "Deep Research Agent",
      description: "An autonomous research agent built with LangGraph and Tavily that explores and synthesizes information.",
      link: "/blog/tavily-deep-research",
      image: "/images/projects/assistant_ui_preview.png",
      gif: "/images/projects/assistant_ui.gif",
      github: "https://github.com/simonryu328/tavily_deep_research",
      tags: ["LangGraph", "Tavily", "OpenAI", "React"],
      variant: "featured",
    },
    {
      title: "Latent Video Diffusion",
      description: "A high-performance latent video diffusion transformer implementation written in JAX.",
      link: "/blog/latent-video-diffusion",
      image: "/images/projects/latent-video-demo.png",
      github: "https://github.com/simonryu328/latent-video-diffusion",
      tags: ["JAX", "Diffusion", "Transformer", "ML"],
    },
    {
      title: "AI Golf Swing Analysis",
      description: "Computer vision based analysis of golf swings to provide real-time coaching feedback.",
      link: "/blog/swing-analysis",
      image: "/images/projects/golf-demo.jpg",
      github: "https://github.com/simonryu328/Golf-Swing-Extractor",
      tags: ["PyTorch", "OpenCV", "ML", "Python"],
    },
    {
      title: "Augmented Reality Menu",
      description: "Interactive augmented reality menu for restaurants using spatial computing concepts.",
      link: "/blog/ar-menu",
      image: "/images/projects/ar-demo.png",
      github: "https://github.com/simonryu328/ar-menu-unity",
      tags: ["ARKit", "Unity", "C#"],
    },
    {
      title: "Self-Driving and CNN",
      description: "Real-time object detection and tracking system using CNNs for vehicle navigation.",
      link: "/blog/enph-353-cnn",
      image: "/images/projects/cnn-demo.png",
      github: "https://github.com/simonryu328/License-Plate-Reader",
      tags: ["PyTorch", "OpenCV", "CNN", "Python"],
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Hero />

      {/* Projects */}
      <section className="mb-20">
        <h2 className="text-xl font-semibold mb-6">Featured Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Blog</h2>
          <Link
            href="/blog"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            View all articles →
          </Link>
        </div>
        <div>
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
