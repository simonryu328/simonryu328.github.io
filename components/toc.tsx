"use client";

import { useEffect, useState } from "react";

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Find all headings in the prose section
        const prose = document.querySelector(".prose");
        if (!prose) return;

        const elements = Array.from(prose.querySelectorAll("h2, h3"));
        const items: TOCItem[] = elements.map((el) => ({
            id: el.id,
            text: el.textContent || "",
            level: parseInt(el.tagName.replace("H", "")),
        }));

        setHeadings(items);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-100px 0% -80% 0%" }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <nav className="hidden lg:block sticky top-32 h-fit max-w-[200px] text-sm border-l border-neutral-100 dark:border-neutral-900 ml-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4 pl-4">
                On this page
            </h4>
            <ul className="space-y-4">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className="relative"
                        style={{ paddingLeft: `${(heading.level - 2) * 16 + 16}px` }}
                    >
                        {activeId === heading.id && (
                            <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-blue-600 dark:bg-blue-400 font-medium" />
                        )}
                        <a
                            href={`#${heading.id}`}
                            className={`block transition-all duration-200 ${activeId === heading.id
                                    ? "text-blue-600 dark:text-blue-400 font-medium translate-x-1"
                                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:translate-x-0.5"
                                }`}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
