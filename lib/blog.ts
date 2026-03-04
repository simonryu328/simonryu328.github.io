import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    categories: string[];
    tags: string[];
    description: string;
    image?: {
        path: string;
        alt: string;
    };
    readingTime: string;
}

export interface Post extends PostMeta {
    content: string;
}

export function getAllPosts(): PostMeta[] {
    const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

    const posts = files
        .map((filename) => {
            const filePath = path.join(CONTENT_DIR, filename);
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const { data, content } = matter(fileContent);

            const slug = filename.replace(/\.mdx$/, "");
            const stats = readingTime(content);

            return {
                slug,
                title: data.title || slug,
                date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
                categories: data.categories || [],
                tags: data.tags || [],
                description: data.description || content.slice(0, 160).replace(/[#*\n]/g, "").trim() + "...",
                image: data.image || undefined,
                readingTime: stats.text,
            };
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}

export function getPostBySlug(slug: string): Post | null {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
        slug,
        title: data.title || slug,
        date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
        categories: data.categories || [],
        tags: data.tags || [],
        description: data.description || content.slice(0, 160).replace(/[#*\n]/g, "").trim() + "...",
        image: data.image || undefined,
        readingTime: stats.text,
        content,
    };
}

export function getAllSlugs(): string[] {
    return fs
        .readdirSync(CONTENT_DIR)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => f.replace(/\.mdx$/, ""));
}
