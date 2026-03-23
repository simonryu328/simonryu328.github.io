import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { mdxComponents } from "@/components/mdx-components";
import { ReadingProgress } from "@/components/reading-progress";
import { TableOfContents } from "@/components/toc";
import { BlogIcon } from "@/components/blog-icons";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
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

const mdxOptions = {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
        [
            rehypePrettyCode,
            {
                theme: "github-dark",
                keepBackground: true,
            },
        ],
    ],
};

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) notFound();

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <ReadingProgress />
            <div className="lg:grid lg:grid-cols-[200px_1fr_200px] lg:gap-x-12 justify-center">
                {/* Left empty space to balance the TOC and keep article centered */}
                <div className="hidden lg:block w-[200px]" aria-hidden="true" />

                <article className="max-w-3xl mx-auto w-full">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors mb-8 group"
                    >
                        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M19 12H5m7 7l-7-7 7-7" />
                        </svg>
                        Back to blog
                    </Link>
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

                    {/* Main Header / Cover Image */}
                    <div className="mb-10 -mx-4 sm:mx-0 overflow-hidden">
                        <BlogIcon 
                            slug={post.slug} 
                            size="full"
                            className="w-full h-auto text-neutral-400 dark:text-neutral-600 sm:rounded-2xl" 
                        />
                        {post.image && (
                            <img
                                src={post.image.path}
                                alt={post.image.alt}
                                className="w-full rounded-lg shadow-lg mt-8"
                            />
                        )}
                    </div>

                    {/* Content */}
                    <div className="prose">
                        {/* @ts-expect-error rehype plugin typing */}
                        <MDXRemote source={post.content} components={mdxComponents} options={{ mdxOptions }} />
                    </div>
                </article>

                <aside className="hidden lg:block relative w-[200px]">
                    <TableOfContents />
                </aside>
            </div>
        </div>
    );
}
