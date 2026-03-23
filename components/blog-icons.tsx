"use client";

import React from "react";
import Image from "next/image";

/**
 * Modern Abstract 16x16 Pixel Art Icons.
 * Minimalist metaphors using depth through subtle shading.
 */
const ICON_DESIGNS = {
    performance: [
        "................",
        ".........XX.....",
        "........XXXX....",
        ".......XXXXX....",
        "......XXXXXX....",
        ".....XXXXXXX....",
        "....XXXXXXXX....",
        "...XXXXXXXXH....",
        ".......XXXX.....",
        "......XXXXS.....",
        ".....XXXXSS.....",
        "....XXXXSSS.....",
        "...XXXXSSS......",
        "..XXXXSSS.......",
        ".XXXXSSS........",
        "................",
    ],
    ar: [
        "................",
        "................",
        "....XXXXXXX.....",
        "...XXXXXXXXX....",
        "..XXXXXXXXXXX...",
        "..XXXX...XXXX...",
        "..XXX.....XXX...",
        "..XX.......XX...",
        "..XX.......XX...",
        "..XXX.....XXX...",
        "..XXXX...XXXX...",
        "..XXXXXXXXXXX...",
        "...XXXXXXXXX....",
        "....XXXXXXX.....",
        "................",
        "................",
    ],
    telegram: [
        "................",
        "...............X",
        "............XXXX",
        ".........XXXXXXX",
        "......XXXXXXXXXX",
        "...XXXXXXXXXXXXX",
        "XXXXXXXXXXXXXXXX",
        "...XXXXXXXXXXXXX",
        "......XXXXXXXXXX",
        ".........XXXXXXX",
        "............XXXX",
        "...............X",
        "................",
        "................",
        "................",
        "................",
    ],
    agent: [
        "................",
        "......XXXX......",
        "....XXXXXXXX....",
        "...XXXXXXXXXX...",
        "..XXXXXXXXXXXX..",
        "..XXXXXXXXXXXX..",
        "..XXXXHHHHXXXX..",
        "..XXXXHHHHXXXX..",
        "..XXXXHHHHXXXX..",
        "..XXXXHHHHXXXX..",
        "..XXXXXXXXXXXX..",
        "..XXXXXXXXXXXX..",
        "...XXXXXXXXXX...",
        "....XXXXXXXX....",
        "......XXXX......",
        "................",
        "................",
    ],
    database: [
        "................",
        "....XXXXXXXX....",
        "...XXXXXXXXXX...",
        "..XXXXXXXXXXXX..",
        "..XXXXXXXXXXXX..",
        "..SSSSSSSSSSSS..",
        "................",
        "..XXXXXXXXXXXX..",
        "..XXXXXXXXXXXX..",
        "..SSSSSSSSSSSS..",
        "................",
        "..XXXXXXXXXXXX..",
        "..XXXXXXXXXXXX..",
        "..SSSSSSSSSSSS..",
        "................",
        "................",
    ],
    vision: [
        "................",
        "................",
        ".....XXXXXX.....",
        "...XXXXXXXXXX...",
        "..XXXXXXXXXXXX..",
        "..XXXXHHHHXXXX..",
        "..XXXHHHHHHXXX..",
        "..XXHHHHHHHHXX..",
        "..XXHHHHHHHHXX..",
        "..XXXHHHHHHXXX..",
        "..XXXXHHHHXXXX..",
        "..XXXXXXXXXXXX..",
        "...XXXXXXXXXX...",
        ".....XXXXXX.....",
        "................",
        "................",
    ],
    golf: [
        "................",
        "......XXXX......",
        "....XXXXXXXX....",
        "...XXXXXXXXXX...",
        "..XXXXXXXXXXXX..",
        "..XXXXXXXXXXXX..",
        "...XXXXXXXXXX...",
        "....XXXXXXXX....",
        "......XXXX......",
        ".......XX.......",
        ".......XX.......",
        "......XXXX......",
        "................",
        "................",
        "................",
        "................",
    ],
    video: [
        "................",
        "..XXXXXXXXXXXX..",
        "..X..........X..",
        "..X..XXXXXX..X..",
        "..X..XH..SX..X..",
        "..X..XH..SX..X..",
        "..X..XXXXXX..X..",
        "..X..........X..",
        "..X..XXXXXX..X..",
        "..X..XH..SX..X..",
        "..X..XH..SX..X..",
        "..X..XXXXXX..X..",
        "..X..........X..",
        "..XXXXXXXXXXXX..",
        "................",
        "................",
    ],
    math: [
        "................",
        "...XXXXXXXXXX...",
        "...XHHHHHHHHH...",
        "......XXXXX.....",
        ".....XXXXX......",
        "....XXXXX.......",
        "...XXXXX........",
        "....XXXXX.......",
        ".....XXXXX......",
        "......XXXXX.....",
        "...XHHHHHHHHH...",
        "...XXXXXXXXXX...",
        "................",
        "................",
        "................",
        "................",
    ],
    research: [
        "................",
        ".....XXXXX......",
        "....XXXXXXX.....",
        "...XXXXXXXXX....",
        "...XXXXXXXXX....",
        "....XXXXXXX.....",
        ".....XXXXX......",
        ".......XX.......",
        "........XX......",
        ".........XX.....",
        "..........XX....",
        "...........XX...",
        "............XX..",
        "................",
        "................",
        "................",
    ],
    motion: [
        "................",
        "................",
        "..........XXXX..",
        ".......XXXXXX...",
        "....XXXXXXX.....",
        "...XXXXXX.......",
        "..XXXXX.........",
        ".XXXX...........",
        ".XXX............",
        ".XX.............",
        ".X..............",
        "................",
        "................",
        "................",
        "................",
        "................",
    ],
};

const SLUG_TO_ICON: Record<string, keyof typeof ICON_DESIGNS> = {
    "aki-performance-and-scalability": "performance",
    "ar-menu": "ar",
    "building-ai-companion-telegram": "telegram",
    "conversational-ai-agent-techniques": "agent",
    "dynamodb-cmdline": "database",
    "enph-353-cnn": "vision",
    "golf-chatbot": "golf",
    "latent-video-diffusion": "video",
    "rlhf-llm-math": "math",
    "swing-analysis": "motion",
    "tavily-deep-research": "research",
};

// Map slugs to high-res artistic image icons
// To activate an image, just drop a matching .png into the public/blog-icons folder!
const IMAGE_ICONS: Record<string, string> = {
    "aki-performance-and-scalability": "/blog-icons/aki-performance-and-scalability.png",
    "ar-menu": "/blog-icons/ar-menu.png",
    "building-ai-companion-telegram": "/blog-icons/building-ai-companion-telegram.png",
    "conversational-ai-agent-techniques": "/blog-icons/conversational-ai-agent-techniques.png",
    "dynamodb-cmdline": "/blog-icons/dynamodb-cmdline.png",
    "enph-353-cnn": "/blog-icons/enph-353-cnn.png",
    "golf-chatbot": "/blog-icons/golf-chatbot.png",
    "latent-video-diffusion": "/blog-icons/latent-video-diffusion.png",
    "rlhf-llm-math": "/blog-icons/rlhf-llm-math.png",
    "swing-analysis": "/blog-icons/swing-analysis.png",
    "tavily-deep-research": "/blog-icons/tavily-deep-research.png",
};

export function BlogIcon({
    slug,
    size, // No default here to cleanly separate logic
    className = ""
}: {
    slug: string;
    size?: number | "full";
    className?: string;
}) {
    // Check for high-res image first
    const imagePath = IMAGE_ICONS[slug];

    if (imagePath) {
        // If "full", we skip absolute inline dimensions so Tailwind classes can stretch it perfectly!
        const isFull = size === "full" || size === undefined;

        return (
            <div 
                className={`relative overflow-hidden flex-shrink-0 ${isFull ? "w-full aspect-video" : ""} ${className}`} 
                style={(!isFull && typeof size === "number") ? { height: size, width: size * (16/9) } : {}}
            >
                <Image
                    src={imagePath}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
        );
    }

    // Fallback to legacy pixel art
    const iconKey = SLUG_TO_ICON[slug] || "agent";
    const grid = ICON_DESIGNS[iconKey];
    
    // Default size for SVG if not provided or if "full" (which makes no sense for pixel art)
    const svgSize = typeof size === "number" ? size : 48;

    return (
        <svg
            width={svgSize}
            height={svgSize}
            viewBox="0 0 16 16"
            className={`fill-current ${className}`}
            aria-label={`Icon for ${slug}`}
        >
            {grid.map((row: string, y: number) => (
                row.split("").map((char: string, x: number) => {
                    let opacity = 1;
                    if (char === "S") opacity = 0.4;
                    if (char === "H") opacity = 0.8;
                    
                    return char !== "." ? (
                        <rect
                            key={`${x}-${y}`}
                            x={x}
                            y={y}
                            width="1"
                            height="1"
                            shapeRendering="crispEdges"
                            style={{ opacity }}
                        />
                    ) : null;
                })
            ))}
        </svg>
    );
}
