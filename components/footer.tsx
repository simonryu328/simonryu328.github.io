"use client";

import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-20">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                            Simon Ryu
                        </p>
                        <p className="text-sm text-neutral-500 leading-relaxed">
                            AI Engineer based in Toronto. Building intelligent systems that feel alive.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">Pages</p>
                        <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors w-fit">
                            Home
                        </Link>
                        <Link href="/blog" className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors w-fit">
                            Blog
                        </Link>
                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors w-fit"
                        >
                            Back to top ↑
                        </a>
                    </div>

                    {/* Connect */}
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">Connect</p>
                        <a
                            href="https://github.com/simonryu328"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors w-fit"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/simon-ryu-vancouver/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors w-fit"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="mailto:simonryu328@gmail.com"
                            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors w-fit"
                        >
                            Email
                        </a>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-neutral-400">
                        © {new Date().getFullYear()} Simon Ryu. Built with Next.js & MDX.
                    </p>
                </div>
            </div>
        </footer>
    );
}
