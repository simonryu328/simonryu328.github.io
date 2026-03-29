"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setProgress(Number((currentScroll / scrollHeight).toFixed(2)) * 100);
            }
        };

        window.addEventListener("scroll", updateProgress);
        return () => window.removeEventListener("scroll", updateProgress);
    }, []);

    return (
        <div className="fixed top-[56px] left-0 w-full h-[3px] z-50 pointer-events-none">
            <div
                className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 transition-all duration-150 relative"
                style={{ width: `${progress}%` }}
            >
                {progress > 0 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400/60 blur-sm" />
                )}
            </div>
        </div>
    );
}
