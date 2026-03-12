import { CopyButton } from "./copy-button";
import type { MDXComponents } from "mdx/types";

const extractText = (node: any): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (node && typeof node === "object" && node.props && node.props.children) return extractText(node.props.children);
    return "";
};

const slugify = (node: any) => {
    const text = extractText(node);
    return text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
};

export const mdxComponents: MDXComponents = {
    h1: (props) => {
        const id = slugify(props.children);
        return <h1 id={id} className="text-3xl font-bold mt-10 mb-4 text-neutral-900 dark:text-white" {...props} />;
    },
    h2: (props) => {
        const id = slugify(props.children);
        return (
            <h2
                id={id}
                className="text-2xl font-semibold mt-10 mb-3 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2"
                {...props}
            />
        );
    },
    h3: (props) => {
        const id = slugify(props.children);
        return <h3 id={id} className="text-xl font-semibold mt-8 mb-3 text-neutral-900 dark:text-white" {...props} />;
    },
    p: (props) => (
        <p className="mb-4 leading-7 text-neutral-700 dark:text-neutral-300" {...props} />
    ),
    ul: (props) => (
        <ul className="mb-4 ml-6 list-disc space-y-1 text-neutral-700 dark:text-neutral-300" {...props} />
    ),
    ol: (props) => (
        <ol className="mb-4 ml-6 list-decimal space-y-1 text-neutral-700 dark:text-neutral-300" {...props} />
    ),
    li: (props) => <li className="leading-7" {...props} />,
    a: (props) => (
        <a
            className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
            target={props.href?.startsWith("http") ? "_blank" : undefined}
            rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
            {...props}
        />
    ),
    blockquote: (props) => (
        <blockquote className="border-l-3 border-neutral-300 dark:border-neutral-600 pl-4 my-4 text-neutral-600 dark:text-neutral-400 italic" {...props} />
    ),
    code: ({ children, className, style, ...props }) => {
        // Code inside a rehype-pretty-code <pre> — pass through with Shiki styles
        if (className?.includes("language-") || style) {
            return <code className={className} style={style} {...props}>{children}</code>;
        }
        // Inline code
        return (
            <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm font-mono text-neutral-800 dark:text-neutral-200" {...props}>{children}</code>
        );
    },
    pre: ({ children, style, ...props }) => {
        const content = extractText(children);

        return (
            <div className="relative group">
                <pre
                    className="mb-6 rounded-lg overflow-x-auto p-4 text-sm leading-6 border border-neutral-200 dark:border-neutral-800"
                    style={style || { backgroundColor: "#24292e" }}
                    {...props}
                >
                    {children}
                </pre>
                <CopyButton text={content} />
            </div>
        );
    },
    table: (props) => (
        <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse" {...props} />
        </div>
    ),
    th: (props) => (
        <th className="border border-neutral-200 dark:border-neutral-700 px-3 py-2 bg-neutral-50 dark:bg-neutral-800 text-left font-semibold text-neutral-900 dark:text-white" {...props} />
    ),
    td: (props) => (
        <td className="border border-neutral-200 dark:border-neutral-700 px-3 py-2 text-neutral-700 dark:text-neutral-300" {...props} />
    ),
    hr: () => <hr className="my-8 border-neutral-200 dark:border-neutral-800" />,
    strong: (props) => (
        <strong className="font-semibold text-neutral-900 dark:text-white" {...props} />
    ),
    em: (props) => <em className="italic" {...props} />,
    img: (props) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            className="rounded-lg shadow-md my-4 max-w-full"
            alt={props.alt || ""}
            {...props}
        />
    ),
};
