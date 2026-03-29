import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { BlogIcon } from "./blog-icons";

export function PostCard({ post }: { post: PostMeta }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block">
            <article className="py-8 border-b border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row gap-8 items-start rounded-xl px-4 -mx-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 hover:-translate-y-px transition-all duration-200">
                <div className="w-full sm:w-80 flex-shrink-0">
                    <BlogIcon 
                        slug={post.slug} 
                        size="full"
                        className="text-neutral-400 dark:text-neutral-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 w-full rounded-2xl shadow-sm group-hover:shadow-md" 
                    />
                </div>
                <div className="flex-1 min-w-0 pt-1">
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
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 leading-tight">
                        {post.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-[15px] leading-relaxed line-clamp-2 italic">
                        {post.description}
                    </p>
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.slice(0, 4).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        </Link>
    );
}
