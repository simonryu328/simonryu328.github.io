"use client";

import React from "react";

/**
 * Modern Abstract 16x16 Pixel Art Icons.
 * Minimalist metaphors using depth through subtle shading.
 * X: Primary
 * H: Highlight (80% opacity)
 * S: Shadow (40% opacity)
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

export function BlogIcon({
    slug,
    size = 48,
    className = ""
}: {
    slug: string;
    size?: number;
    className?: string;
}) {
    const iconKey = SLUG_TO_ICON[slug] || "agent";
    const grid = ICON_DESIGNS[iconKey];

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            className={`fill-current ${className}`}
            aria-label={`Icon for ${slug}`}
        >
            {grid.map((row, y) => (
                row.split("").map((char, x) => {
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
