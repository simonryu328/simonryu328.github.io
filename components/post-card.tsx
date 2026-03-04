import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

export function PostCard({ post }: { post: PostMeta }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block">
            <article className="py-6 border-b border-neutral-100 dark:border-neutral-800 group-hover:border-neutral-300 dark:group-hover:border-neutral-600 transition-colors">
                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                    <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                    {post.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2">
                    {post.description}
                </p>
                {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.slice(0, 4).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </article>
        </Link>
    );
}
