export interface Project {
    title: string;
    description: string;
    link: string;
    image: string;
    github?: string;
    tags: string[];
    secondaryImage?: string;
    externalLink?: string;
    additionalInfo?: string;
    telegram?: string;
    variant?: "featured" | "standard";
    orientation?: "vertical" | "horizontal";
}

export function ProjectCard({ project }: { project: Project }) {
    const isFeatured = project.variant === "featured";
    const isVertical = project.orientation === "vertical";

    return (
        <div className={`group relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 overflow-hidden ${isFeatured ? "sm:col-span-2" : ""}`}>
            {/* Action Links */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                {project.telegram && (
                    <a
                        href={project.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full bg-[#24A1DE]/20 backdrop-blur-md text-[#24A1DE] hover:bg-[#24A1DE] hover:text-white transition-all duration-300 border border-[#24A1DE]/20"
                        aria-label="Telegram Bot"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                        </svg>
                    </a>
                )}
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

            <div className={`flex h-full ${isFeatured ? (isVertical ? "flex-col md:flex-row" : "flex-col") : "flex-col"}`}>
                {/* Project Media */}
                <div className={`relative overflow-hidden bg-neutral-100/80 dark:bg-neutral-800/50 flex items-center justify-center border-neutral-200 dark:border-neutral-800 shrink-0 ${isFeatured
                    ? isVertical
                        ? "md:w-[350px] aspect-[4/5] md:aspect-auto md:border-r border-b md:border-b-0"
                        : "aspect-[16/9] w-full border-b"
                    : "aspect-[16/9] w-full border-b"
                    }`}>
                    {isVertical && isFeatured ? (
                        <div className="relative h-[85%] aspect-[9/19.5] group-hover:scale-[1.05] transition-transform duration-700 ease-out">
                            {/* Phone Frame Bezel with Heavy Depth */}
                            <div className="absolute -inset-[3px] rounded-[2.5rem] border-[3px] border-neutral-800 dark:border-neutral-700 bg-neutral-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]" />
                            
                            {/* The Screen */}
                            <div className="relative h-full w-full rounded-[2.2rem] overflow-hidden bg-black border border-neutral-800/50">
                                {/* Notch / Dynamic Island */}
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-neutral-900 rounded-full z-10 hidden md:block border border-white/5" />
                                
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={project.image}
                                alt={project.title}
                                className={`transition-transform duration-500 group-hover:scale-105 ${isFeatured
                                    ? "w-full h-full object-cover"
                                    : "w-full h-full object-cover"
                                    }`}
                            />
                            {isFeatured && (
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-200/20 dark:from-neutral-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            )}
                        </>
                    )}
                </div>

                <div className={`flex flex-col flex-grow ${isFeatured ? "p-5 sm:p-7" : "p-4 sm:p-5"} ${isVertical && isFeatured ? "md:justify-center" : ""}`}>
                    <div className="flex items-center gap-3 mb-3">
                        <h3 className={`${isFeatured ? "text-xl sm:text-2xl" : "text-sm"} font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
                            {project.title}
                        </h3>
                    </div>
                    
                    <p className={`${isFeatured ? "text-sm sm:text-base leading-relaxed" : "text-xs"} text-neutral-600 dark:text-neutral-400 mb-6 flex-grow max-w-xl`}>
                        {project.description}
                    </p>

                    {isFeatured && project.secondaryImage && project.externalLink && (
                        <a 
                            href={project.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/site relative mb-6 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 block shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            {/* Browser Header */}
                            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-400/50" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/50" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400/50" />
                                </div>
                                <div className="ml-2 text-[10px] font-mono text-neutral-400 truncate max-w-[120px] sm:max-w-none">
                                    {project.externalLink.replace("https://", "")}
                                </div>
                                <div className="ml-auto text-blue-500 text-[10px] font-semibold flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover/site:opacity-100 transition-opacity">
                                    <span className="hidden sm:inline">Visit Site</span> <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
                                </div>
                            </div>
                            {/* Site Preview Image */}
                            <div className="aspect-[16/8] md:aspect-[16/12] overflow-hidden grayscale-[30%] group-hover/site:grayscale-0 transition-all duration-500">
                                <img 
                                    src={project.secondaryImage} 
                                    alt="Website Preview" 
                                    className="w-full h-full object-cover object-top scale-100 group-hover/site:scale-110 transition-transform duration-700"
                                />
                            </div>
                        </a>
                    )}

                    {isFeatured && project.additionalInfo && (
                        <div className="mb-8 p-4 rounded-xl bg-[#24A1DE]/5 dark:bg-[#24A1DE]/10 border border-[#24A1DE]/20 backdrop-blur-sm relative overflow-hidden group/live">
                            {/* Subtle Background Logo */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 text-[#24A1DE]/5 pointer-events-none rotate-12">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                            </div>
                            
                            <div className="flex flex-col gap-2 relative z-10">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                                    </span>
                                    <span className="text-xs font-bold text-[#24A1DE] tracking-wider">@AkiTheBot</span>
                                </div>
                                <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                                    {project.additionalInfo}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400/80 transition-colors group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700"
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
