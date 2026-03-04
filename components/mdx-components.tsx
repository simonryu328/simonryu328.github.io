import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
    h1: (props) => (
        <h1 className="text-3xl font-bold mt-10 mb-4 text-neutral-900 dark:text-white" {...props} />
    ),
    h2: (props) => (
        <h2 className="text-2xl font-semibold mt-10 mb-3 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2" {...props} />
    ),
    h3: (props) => (
        <h3 className="text-xl font-semibold mt-8 mb-3 text-neutral-900 dark:text-white" {...props} />
    ),
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
    code: (props) => {
        // Inline code (not inside a pre)
        const isInline = typeof props.children === "string";
        if (isInline) {
            return (
                <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-sm font-mono text-neutral-800 dark:text-neutral-200" {...props} />
            );
        }
        return <code {...props} />;
    },
    pre: (props) => (
        <pre className="mb-6 rounded-lg overflow-x-auto bg-neutral-950 dark:bg-neutral-900 p-4 text-sm leading-6 border border-neutral-200 dark:border-neutral-800" {...props} />
    ),
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
