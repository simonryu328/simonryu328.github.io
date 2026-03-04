import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { mdxComponents } from "@/components/mdx-components";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            ...(post.image && { images: [{ url: post.image.path }] }),
        },
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) notFound();

    return (
        <article className="max-w-2xl mx-auto px-4 py-16">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                    {post.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                </div>
                {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {/* Cover image */}
            {post.image && (
                <div className="mb-10 -mx-4 sm:mx-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={post.image.path}
                        alt={post.image.alt}
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
            )}

            {/* Content */}
            <div className="prose">
                <MDXRemote source={post.content} components={mdxComponents} />
            </div>
        </article>
    );
}
