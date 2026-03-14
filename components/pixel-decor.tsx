"use client";

import React from "react";

const DECORATIONS = {
    cloud1: [
        "....XXXXXX....",
        "..XXXXXXXXXX..",
        ".XXXXXXXXXXXX.",
        "XXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXX",
        ".XXXXXXXXXXXX.",
        "..XXXXXXXXXX..",
        "....XXXXXX....",
    ],
    cloud2: [
        ".......XXXXXX.......",
        "....XXXXXXXXXXXX....",
        "..XXXXXXXXXXXXXXXX..",
        ".XXXXXXXXXXXXXXXXXX.",
        "XXXXXXXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXXXXXXXX",
        ".XXXXXXXXXXXXXXXXXX.",
        "..XXXXXXXXXXXXXXXX..",
        "....XXXXXXXXXXXX....",
    ],
    tree: [
        "......XX......",
        ".....XXXX.....",
        "....XXXXXX....",
        "...XXXXXXXX...",
        "..XXXXXXXXXX..",
        ".XXXXXXXXXXXX.",
        "XXXXXXXXXXXXXX",
        "......XX......",
        "......XX......",
    ],
    bush: [
        "....XXXXXX....",
        "..XXXXXXXXXX..",
        ".XXXXXXXXXXXX.",
        "XXXXXXXXXXXXXX",
    ],
};

export type DecorType = keyof typeof DECORATIONS;

export function PixelDecor({
    type,
    size = 40,
    className = "",
    opacity = 1
}: {
    type: DecorType;
    size?: number;
    className?: string;
    opacity?: number;
}) {
    const grid = DECORATIONS[type];
    const width = grid[0].length;
    const height = grid.length;

    // Helper to get color based on character and type
    const getPixelColor = (char: string) => {
        if (char === "X") return "text-neutral-200 dark:text-neutral-700";
        return null;
    };

    return (
        <svg
            width={size}
            height={(size / width) * height}
            viewBox={`0 0 ${width} ${height}`}
            className={`fill-current ${className}`}
            style={{ opacity }}
            aria-label={`Pixel ${type}`}
        >
            {grid.map((row, y) => (
                row.split("").map((char, x) => {
                    if (char !== "X") return null;
                    return (
                        <rect
                            key={`${x}-${y}`}
                            x={x}
                            y={y}
                            width="1"
                            height="1"
                            shapeRendering="crispEdges"
                        />
                    );
                })
            ))}
        </svg>
    );
}
