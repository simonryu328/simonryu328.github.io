import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/post-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Writing about AI engineering, production ML systems, and building real products.",
};

export default function BlogIndex() {
    const posts = getAllPosts();

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Blog</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                {posts.length} posts about AI, ML, and software engineering.
            </p>
            <div>
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </div>
    );
}
