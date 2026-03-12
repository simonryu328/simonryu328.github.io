export function Footer() {
    return (
        <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-20">
            <div className="max-w-2xl mx-auto px-4 py-12">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center sm:items-start gap-2">
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                            Simon Ryu
                        </p>
                        <p className="text-sm text-neutral-500">
                            AI Engineer. Building the future of agentic systems.
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <a
                            href="https://github.com/simonryu328"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/simon-ryu-vancouver/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-900 text-center sm:text-left">
                    <p className="text-xs text-neutral-400">
                        © {new Date().getFullYear()} Simon Ryu. Built with Next.js & MDX.
                    </p>
                </div>
            </div>
        </footer>
    );
}
