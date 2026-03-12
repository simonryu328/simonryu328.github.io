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
      title: "Aki - AI Companion",
      description: "A production Telegram bot with persistent memory, personality-driven conversations, and RAG capabilities.",
      link: "/blog/building-ai-companion-telegram",
      image: "/images/projects/aki-icon.png",
      github: "https://github.com/simonryu328/aki-the-bot",
      tags: ["Python", "OpenAI", "FastAPI", "PostgreSQL"],
    },
    {
      title: "Autonomous CV Pipeline",
      description: "Real-time object detection and tracking system using CNNs for vehicle navigation.",
      link: "/blog/enph-353-cnn",
      image: "/images/projects/cv-icon.png",
      github: "https://github.com/simonryu328/License-Plate-Reader",
      tags: ["PyTorch", "OpenCV", "CNN", "Python"],
    },
    {
      title: "AI Golf Swing Analysis",
      description: "Computer vision based analysis of golf swings to provide real-time coaching feedback.",
      link: "/blog/swing-analysis",
      image: "/images/projects/golf-icon.png",
      github: "https://github.com/simonryu328/Golf-Swing-Extractor",
      tags: ["MediaPipe", "Computer Vision", "React"],
    },
    {
      title: "AR Dynamic Menu",
      description: "Interactive augmented reality menu for restaurants using spatial computing concepts.",
      link: "/blog/ar-menu",
      image: "/images/projects/ar-icon.png",
      github: "https://github.com/simonryu328/ar-menu-unity",
      tags: ["ARKit", "Unity", "C#"],
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Hero />

      {/* Projects */}
      <section className="mb-20">
        <h2 className="text-xl font-semibold mb-6">Featured Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Writing</h2>
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
