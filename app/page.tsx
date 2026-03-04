import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/post-card";

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 4);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Hero */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Simon Ryu
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          AI Engineer at IBM. I build production AI systems — from Telegram
          companions with persistent memory to computer vision pipelines. I
          write about the engineering behind shipping real ML products.
        </p>
        <div className="flex gap-3 mt-6">
          <Link
            href="/blog"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-80 transition-opacity"
          >
            Read the blog
          </Link>
          <a
            href="https://github.com/simonryu328"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
          <Link
            href="/blog"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            View all →
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
