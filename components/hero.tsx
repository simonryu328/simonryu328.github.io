"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const expertise = ["AI Engineering", "LLM Systems", "Computer Vision"];

    return (
        <section className="relative mb-16 pt-8 group">
            {/* Spotlight effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300 z-0 spotlight"
                style={{
                    "--x": `${mousePosition.x}px`,
                    "--y": `${mousePosition.y}px`,
                } as any}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
            >
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-neutral-900 dark:text-white">
                    Simon Ryu
                </h1>
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                    AI Engineer at IBM. I build production AI systems — from Telegram
                    companions with persistent memory to computer vision pipelines.
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                    {expertise.map((skill, i) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="text-xs font-medium px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-500"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                    <Link
                        href="/blog"
                        className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Read the blog
                    </Link>
                    <a
                        href="https://github.com/simonryu328"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 text-sm font-semibold rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                        GitHub
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
