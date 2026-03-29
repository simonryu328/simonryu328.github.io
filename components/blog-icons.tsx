import React from "react";
import Image from "next/image";

// AI-Generated SVG Paths using a strict consistent rule engine:
// 24x24 Viewbox, 1.5 Stroke Width, Round Linecaps/Joints.

const ICON_REGISTRY = {
    // A dashboard gauge for speed/performance
    performance: (
        <>
            <path d="M12 16v-4" />
            <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
            <path d="M8 12l2-2" />
        </>
    ),
    // A 3D bounding box / viewport for AR
    ar: (
        <>
            <path d="M4 8V4h4" />
            <path d="M16 4h4v4" />
            <path d="M4 16v4h4" />
            <path d="M16 20h4v-4" />
            <path d="M9 12l6-6" />
            <path d="M15 15l-3-3" />
            <circle cx="9" cy="15" r="1.5" />
            <circle cx="15" cy="9" r="1.5" />
        </>
    ),
    // A digital paper plane for a Telegram messaging bot
    telegram: (
        <>
            <path d="M22 2L11 13" />
            <path d="M22 2l-7 20-4-9-9-4 20-7z" />
        </>
    ),
    // A brain/sparkle network for an autonomous AI agent
    agent: (
        <>
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        </>
    ),
    // A cylindrical server stack for DynamoDB/Database
    database: (
        <>
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
            <path d="M3 12A9 3 0 0 0 21 12" />
        </>
    ),
    // An eye with an internal tracking box for CNN/Vision
    vision: (
        <>
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <rect x="9" y="9" width="6" height="6" rx="1" />
        </>
    ),
    // A flag on a green for Golf
    golf: (
        <>
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
        </>
    ),
    // A clapperboard/film reel for Latent Video Diffusion
    video: (
        <>
            <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
            <path d="M2 8h20" />
            <path d="M6 4v4" />
            <path d="M10 4v4" />
            <path d="M14 4v4" />
            <path d="M18 4v4" />
            <circle cx="12" cy="14" r="2" />
        </>
    ),
    // Mathematical symbols (sigma/function nodes) for LLM Math
    math: (
        <>
            <path d="M4 6h10l-4 6 4 6H4" />
            <path d="M17 18h3" />
            <path d="M17 14h3" />
            <path d="M18.5 12v6" />
        </>
    ),
    // A pendulum or sweeping arc for Swing Analysis/Motion
    motion: (
        <>
            <path d="M12 3v12" />
            <circle cx="12" cy="18" r="3" />
            <path d="M12 21a9 9 0 0 0 9-9" />
            <path d="M3 12a9 9 0 0 0 9 9" />
        </>
    ),
    // A magnifying glass inspecting a multi-node graph for Deep Research
    research: (
        <>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <path d="M11 8v6" />
            <path d="M8 11h6" />
        </>
    ),
};

const SLUG_TO_ICON: Record<string, keyof typeof ICON_REGISTRY> = {
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

    // Fallback to SVG icons
    const iconKey = SLUG_TO_ICON[slug] || "agent";
    const paths = ICON_REGISTRY[iconKey];

    return (
        <svg
            width={typeof size === "number" ? size : 48}
            height={typeof size === "number" ? size : 48}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${className}`}
            aria-label={`Icon for ${slug}`}
        >
            {paths}
        </svg>
    );
}
