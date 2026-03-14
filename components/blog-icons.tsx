"use client";

import React from "react";

const ICON_POSES = {
    performance: [
        ".........XXX....",
        "........XXXX....",
        ".......XXXX.....",
        "......XXXX......",
        ".....XXXXXXXX...",
        "....XXXXXXXXX...",
        "....XXXXXXX.....",
        "...XXXXXXX......",
        "..XXXXXX........",
        "..XXXXX.........",
        ".XXXXXXXXXX.....",
        ".XXXXXXXXXX.....",
        ".....XXXXX......",
        ".....XXXX.......",
        "......XXX.......",
        ".......XX.......",
    ],
    ar: [
        "................",
        "...XXXXXXXXXX...",
        "..X..........X..",
        ".X..XX....XX..X.",
        ".X.XXXX..XXXX.X.",
        ".X..XX....XX..X.",
        ".X............X.",
        ".X...XXXXXX...X.",
        ".X..X......X..X.",
        ".X..X......X..X.",
        "..X..XXXXXX..X..",
        "...X........X...",
        "....XXXXXXXX....",
        "................",
        "................",
        "................",
    ],
    telegram: [
        "................",
        ".......X........",
        "......XX........",
        ".....XXX........",
        "....XXXX........",
        "...XXXXX........",
        "..XXXXXX........",
        ".XXXXXXX........",
        "XXXXXXXXXXXXX...",
        ".XXXXXXX........",
        "..XXXXXX........",
        "...XXXXX........",
        "....XXXX........",
        ".....XXX........",
        "......XX........",
        ".......X........",
    ],
    agent: [
        "......XXXX......",
        "....XXXXXXXX....",
        "...XXXXXXXXXX...",
        "..XXXXXXXXXXXX..",
        "..XX..XXXX..XX..",
        ".XX..XXXXXX..XX.",
        ".XXXXXXXXXXXXXX.",
        ".XXXXXXXXXXXXXX.",
        ".XXXXXXXXXXXXXX.",
        "..XXXXXXXXXXXX..",
        "..XX..XXXX..XX..",
        "...XXXXXXXXXX...",
        "....XXXXXXXX....",
        "......XXXX......",
        "................",
        "................",
    ],
    database: [
        "...XXXXXXXXXX...",
        "..X..........X..",
        ".X............X.",
        ".XXXXXXXXXXXXXX.",
        ".X............X.",
        ".X............X.",
        ".XXXXXXXXXXXXXX.",
        ".X............X.",
        ".X............X.",
        ".XXXXXXXXXXXXXX.",
        ".X............X.",
        ".X............X.",
        ".XXXXXXXXXXXXXX.",
        "..X..........X..",
        "...XXXXXXXXXX...",
        "................",
    ],
    vision: [
        "................",
        "....XXXXXXXX....",
        "..XXXXXXXXXXXX..",
        ".XXXXXXXXXXXXXX.",
        ".XXXXXX..XXXXXX.",
        ".XXXX......XXXX.",
        ".XXX...XX...XXX.",
        ".XXX...XX...XXX.",
        ".XXXX......XXXX.",
        ".XXXXXX..XXXXXX.",
        ".XXXXXXXXXXXXXX.",
        "..XXXXXXXXXXXX..",
        "....XXXXXXXX....",
        "................",
        "................",
        "................",
    ],
    golf: [
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
        ".....XXXXXX.....",
        "................",
        "................",
        "................",
        "................",
    ],
    video: [
        "................",
        ".XXXXXXXXXXXXXX.",
        ".X.X.X.X.X.X.X.",
        ".X............X.",
        ".X...XXXXXX...X.",
        ".X...X....X...X.",
        ".X...X....X...X.",
        ".X...XXXXXX...X.",
        ".X............X.",
        ".X...XXXXXX...X.",
        ".X...X....X...X.",
        ".X...X....X...X.",
        ".X...XXXXXX...X.",
        ".X............X.",
        ".X.X.X.X.X.X.X.",
        ".XXXXXXXXXXXXXX.",
    ],
    math: [
        "...XXXXXXXXXX...",
        "..XXXXXXXXXXX...",
        "..XX............",
        "..XX............",
        "...XX...........",
        "....XX..........",
        ".....XX.........",
        "......XX........",
        ".....XX.........",
        "....XX..........",
        "...XX...........",
        "..XX............",
        "..XX............",
        "..XXXXXXXXXXX...",
        "...XXXXXXXXXX...",
        "................",
    ],
    research: [
        "...XXXXXX.......",
        "..XXXXXXXX......",
        ".XXXXXXXXXX.....",
        ".XXXXXXXXXX.....",
        ".XXXXXXXXXX.....",
        ".XXXXXXXXXX.....",
        "..XXXXXXXX......",
        "...XXXXXX.......",
        ".......XX.......",
        "........XX......",
        ".........XX.....",
        "..........XX....",
        "...........XX...",
        "............XX..",
        ".............XX.",
        "................",
    ],
    motion: [
        "................",
        ".........XXXX...",
        "......XXXXXX....",
        "....XXXXX.......",
        "...XXXX.........",
        "..XXXX..........",
        "..XXXX..........",
        ".XXXX...........",
        ".XXXX...........",
        ".XXXX...........",
        "..XXXX..........",
        "...XXXX.........",
        "....XXXXX.......",
        "......XXXXXX....",
        ".........XXXX...",
        "................",
    ],
};

const SLUG_TO_ICON: Record<string, keyof typeof ICON_POSES> = {
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
    const grid = ICON_POSES[iconKey];

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            className={`fill-current ${className}`}
            aria-label={`Icon for ${slug}`}
        >
            {grid.map((row, y) => (
                row.split("").map((char, x) => (
                    char === "X" ? (
                        <rect
                            key={`${x}-${y}`}
                            x={x}
                            y={y}
                            width="1"
                            height="1"
                            shapeRendering="crispEdges"
                        />
                    ) : null
                ))
            ))}
        </svg>
    );
}
