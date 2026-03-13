export interface Project {
    title: string;
    description: string;
    link: string;
    image: string;
    github?: string;
    tags: string[];
    variant?: "featured" | "standard";
    orientation?: "vertical" | "horizontal";
}

export function ProjectCard({ project }: { project: Project }) {
    const isFeatured = project.variant === "featured";
    const isVertical = project.orientation === "vertical";

    return (
        <div className={`group relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 overflow-hidden`}>
            {/* Action Links */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full bg-white/10 backdrop-blur-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors border border-white/10"
                        aria-label="GitHub Repository"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                    </a>
                )}
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full bg-white/10 backdrop-blur-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors border border-white/10"
                    aria-label="Live Demo"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                </a>
            </div>

            <div className={`flex flex-col h-full ${isFeatured ? "" : "p-4"}`}>
                {/* Project Media */}
                <div className={`relative overflow-hidden bg-neutral-50 dark:bg-neutral-900/80 flex items-center justify-center border-neutral-200 dark:border-neutral-800 shrink-0 ${isFeatured
                    ? "aspect-[16/9] w-full border-b"
                    : "w-12 h-12 mb-4 rounded-lg border"
                    }`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={project.image}
                        alt={project.title}
                        className={`transition-transform duration-500 group-hover:scale-105 ${isFeatured
                            ? isVertical
                                ? "h-[85%] w-auto object-contain py-4 rounded-xl shadow-sm border border-neutral-200/50 dark:border-neutral-700/50"
                                : "w-full h-full object-cover"
                            : "w-full h-full object-cover"
                            }`}
                    />
                    {isFeatured && (
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-200/20 dark:from-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    )}
                </div>

                <div className={`flex flex-col flex-grow p-4 ${isFeatured ? "sm:p-6" : ""}`}>
                    <div className="mb-2">
                        <h3 className={`${isFeatured ? "text-lg sm:text-xl" : "text-sm"} font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
                            {project.title}
                        </h3>
                    </div>
                    <p className={`${isFeatured ? "text-sm sm:text-base leading-relaxed" : "text-xs"} text-neutral-600 dark:text-neutral-400 mb-6 flex-grow max-w-xl`}>
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400/70 transition-colors group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
