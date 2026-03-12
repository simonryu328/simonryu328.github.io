"use client";

import React, { useState, useEffect } from "react";

// 16x16 Pixel grids for different poses
// Represented as arrays of strings where each char is a pixel
const POSES = {
    idle: [
        "....X....X....",
        ".....X..X.....",
        "....XXXXXX....",
        "...XXXXXXXX...",
        "..XX..XX..XX..",
        "..XX..XX..XX..",
        "..XXXXXXXXXX..",
        "..XXXXXXXXXX..",
        "...XXXXXXXX...",
        "....XXXXXX....",
        ".....XXXX.....",
        "....XXXXXX....",
        "....XX..XX....",
        "....XX..XX....",
        "....XX..XX....",
        "...XXX..XXX...",
    ],
    walk1: [
        "....X....X....",
        ".....X..X.....",
        "....XXXXXX....",
        "...XXXXXXXX...",
        "..XX..XX..XX..",
        "..XX..XX..XX..",
        "..XXXXXXXXXX..",
        "..XXXXXXXXXX..",
        "...XXXXXXXX...",
        "....XXXXXX....",
        ".....XXXX.....",
        "....XXXXXX....",
        ".....XX..XX...",
        "....XX....XX..",
        "...XX......XX.",
        "..XXX.....XXX.",
    ],
    walk2: [
        "....X....X....",
        ".....X..X.....",
        "....XXXXXX....",
        "...XXXXXXXX...",
        "..XX..XX..XX..",
        "..XX..XX..XX..",
        "..XXXXXXXXXX..",
        "..XXXXXXXXXX..",
        "...XXXXXXXX...",
        "....XXXXXX....",
        ".....XXXX.....",
        "....XXXXXX....",
        "...XX..XX.....",
        "..XX....XX....",
        ".XX......XX...",
        "XXX.....XXX...",
    ],
    jump: [
        "....X....X....",
        ".....X..X.....",
        "....XXXXXX....",
        "...XXXXXXXX...",
        "..XX..XX..XX..",
        "..XX..XX..XX..",
        "..XXXXXXXXXX..",
        "..XXXXXXXXXX..",
        "..X..XXXX..X..",
        ".X..XXXXXX..X.",
        "....XXXXXX....",
        "....XXXXXX....",
        "....XX..XX....",
        "...XX....XX...",
        "..XX......XX..",
        "..X........X..",
    ],
    ouch: [
        "....X....X....",
        ".....X..X.....",
        "....XXXXXX....",
        "...XXXXXXXX...",
        "..XX.X..X.XX..",
        "..XX..XX..XX..",
        "..X.X....X.X..",
        "..XXXXXXXXXX..",
        "...XXXXXXXX...",
        "....XXXXXX....",
        ".....XXXX.....",
        "....XXXXXX....",
        "....XX..XX....",
        "....XX..XX....",
        "....XX..XX....",
        "...XXX..XXX...",
    ],
    annoyed: [
        "....X....X....",
        ".....X..X.....",
        "....XXXXXX....",
        "...XXXXXXXX...",
        "..XX......XX..",
        "..XX.XXXX.XX..",
        "..XX......XX..",
        "..XXXXXXXXXX..",
        "...XXXXXXXX...",
        "....XXXXXX....",
        ".....XXXX.....",
        "....XXXXXX....",
        "....XX..XX....",
        "....XX..XX....",
        "....XX..XX....",
        "...XXX..XXX...",
    ],
};

type PoseType = keyof typeof POSES;

export function PixelAki({
    pose = "idle",
    size = 32,
    className = ""
}: {
    pose?: PoseType;
    size?: number;
    className?: string;
}) {
    const grid = POSES[pose];
    const pixelSize = size / 16;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            className={`fill-current ${className}`}
            aria-label="Pixel Aki"
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
