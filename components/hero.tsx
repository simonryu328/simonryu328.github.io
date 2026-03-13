"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { PixelAki } from "./pixel-aki";
import { PixelDecor, type DecorType } from "./pixel-decor";

export function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [akiPose, setAkiPose] = useState<"idle" | "walk1" | "walk2" | "jump" | "ouch" | "annoyed">("idle");
    const [clickCount, setClickCount] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [targetX, setTargetX] = useState(0);
    const [isWandering, setIsWandering] = useState(true);
    // const [facingLeft, setFacingLeft] = useState(false); // Removed facingLeft state

    // Game States
    const [gameActive, setGameActive] = useState(false);
    const [score, setScore] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [obstacles, setObstacles] = useState<{ id: number; x: number }[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [flightCount, setFlightCount] = useState(0);
    const [isFlying, setIsFlying] = useState(false);
    const [easterEggActive, setEasterEggActive] = useState(false);
    const [gameSessionCount, setGameSessionCount] = useState(0);
    const [flightSessionCount, setFlightSessionCount] = useState(0);
    const [dynamicMessage, setDynamicMessage] = useState("");
    const [decorPos, setDecorPos] = useState({
        clouds: [100, 300, 500],
        ground: [50, 250, 450]
    });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Autonomous Wandering Logic
    useEffect(() => {
        let wanderTimer: NodeJS.Timeout;
        let stopTimer: NodeJS.Timeout;

        if (showMessage || gameActive || clickCount === 4) {
            setIsWandering(false);
            return;
        }

        const wander = () => {
            setIsWandering(true);
            const newTarget = (Math.random() - 0.5) * 400;
            setTargetX(newTarget);

            const waitTime = Math.random() * 2000 + 1000;
            stopTimer = setTimeout(() => {
                setIsWandering(false);
                setAkiPose("idle");
            }, 400);

            return waitTime;
        };

        const nextWander = () => {
            const wait = wander();
            wanderTimer = setTimeout(nextWander, wait);
        };

        nextWander();

        return () => {
            clearTimeout(wanderTimer);
            clearTimeout(stopTimer);
        };
    }, [showMessage, clickCount, gameActive]);

    // Animation cycle for walking
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if ((isWandering || (gameActive && !isJumping && !gameOver)) && akiPose !== "ouch" && akiPose !== "annoyed") {
            interval = setInterval(() => {
                setAkiPose(p => (p === "walk1" || p === "idle") ? "walk2" : "walk1");
            }, gameActive ? 60 : 80);
        } else if (!isWandering && !showMessage && !gameActive) {
            setAkiPose("idle");
        }
        return () => clearInterval(interval);
    }, [isWandering, showMessage, akiPose, gameActive, isJumping, gameOver]);

    // Game Engine
    useEffect(() => {
        if (!gameActive || gameOver) return;

        // Force start position one more time to be sure
        setTargetX(-150);

        const gameLoop = setInterval(() => {
            setObstacles(prev => {
                const moved = prev.map(o => ({ ...o, x: o.x - 9 })); // Harder: Faster speed

                // Collision Detection - Aki sits at -150
                const charX = -150;
                const hit = moved.some(o => (
                    o.x > charX - 10 &&
                    o.x < charX + 10 &&
                    !isJumping
                ));

                if (hit) {
                    setGameOver(true);
                    setAkiPose("ouch");
                    setEasterEggActive(false);
                    setIsFlying(false);
                    return moved;
                }

                // Score & cleanup
                if (moved.length > 0 && moved[0].x < -300) {
                    setScore(s => s + 10);
                    return moved.slice(1);
                }
                return moved;
            });

            // Spawn obstacles harder: More frequent spawning
            if (Math.random() > 0.94 && (obstacles.length === 0 || obstacles[obstacles.length - 1].x < 80)) {
                setObstacles(prev => [...prev, { id: Date.now(), x: 300 }]);
            }
        }, 20);

        return () => clearInterval(gameLoop);
    }, [gameActive, gameOver, isJumping, obstacles.length]);
    // Background Parallax Engine
    useEffect(() => {
        const interval = setInterval(() => {
            setDecorPos(prev => ({
                clouds: prev.clouds.map(x => (x < -200 ? 600 : x - (gameActive ? 0.5 : 0.1))),
                ground: prev.ground.map(x => (x < -200 ? 600 : x - (gameActive ? 2 : 0.2)))
            }));
        }, 30);
        return () => clearInterval(interval);
    }, [gameActive]);

    const groundDecors = useMemo(() => [
        { type: "tree" as const, xIdx: 0, size: 40, offset: 0 },
        { type: "bush" as const, xIdx: 1, size: 24, offset: 8 },
        { type: "tree" as const, xIdx: 2, size: 48, offset: 0 },
    ], []);

    const cloudDecors = useMemo(() => [
        { type: "cloud1" as const, xIdx: 0, size: 60, y: 10 },
        { type: "cloud2" as const, xIdx: 1, size: 80, y: 5 },
        { type: "cloud1" as const, xIdx: 2, size: 50, y: 15 },
    ], []);

    const [flightDialogue, setFlightDialogue] = useState("");
    const [lastJumpTime, setLastJumpTime] = useState(0);

    const FLIGHT_MESSAGES = [
        "This is kind of boring...",
        "Didn't you come here for the blog?",
        "Wheeeee!",
        "Is this legal?",
        "I see my house from here!",
        "Look ma, no wings!",
    ];

    const handleJump = () => {
        if (!gameActive || gameOver) return;

        const now = Date.now();

        if (isJumping) {
            setFlightCount(prev => {
                const next = prev + 1;
                // Trigger flight easter egg
                if (next === 4 && !easterEggActive) {
                    setEasterEggActive(true);
                    setShowMessage(true);

                    if (flightSessionCount === 0) {
                        setFlightDialogue("Wait...");
                        setTimeout(() => setFlightDialogue("I CAN FLY!"), 800);
                    } else {
                        const randomMsg = FLIGHT_MESSAGES[Math.floor(Math.random() * FLIGHT_MESSAGES.length)];
                        setFlightDialogue(randomMsg);
                    }

                    setFlightSessionCount(s => s + 1);
                    setTimeout(() => setShowMessage(false), 3000);
                }
                return next;
            });
        }

        setIsJumping(true);
        setAkiPose("jump");
        setLastJumpTime(now);

        const jumpDuration = 450;
        setTimeout(() => {
            setLastJumpTime(prevTime => {
                if (prevTime === now) {
                    setIsJumping(false);
                    setFlightCount(0);
                    setEasterEggActive(false);
                    setShowMessage(false);
                }
                return prevTime;
            });
        }, jumpDuration);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                e.preventDefault();
                if (gameActive) {
                    if (gameOver) resetGame();
                    else handleJump();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [gameActive, isJumping, gameOver]);

    const INITIAL_DIALOGUES = [
        { text: "Ouch!", pose: "ouch" as const },
        { text: "Stop that!", pose: "annoyed" as const },
        { text: "I'm busy...", pose: "annoyed" as const },
        { text: "LETS RUN!", pose: "jump" as const },
    ];

    const REPEAT_MESSAGES = [
        "Again?",
        "Ugh, really?",
        "You really like this game...",
        "Fine, but this is the last time!",
        "My legs are getting tired...",
        "You have a lot of free time today.",
    ];

    const handleAkiClick = () => {
        if (gameActive) {
            if (gameOver) resetGame();
            else handleJump();
            return;
        }

        setIsWandering(false);
        setShowMessage(true);

        if (gameSessionCount === 0) {
            const nextClick = (clickCount + 1);
            setClickCount(nextClick);

            if (nextClick <= INITIAL_DIALOGUES.length) {
                const d = INITIAL_DIALOGUES[nextClick - 1];
                setDynamicMessage(d.text);
                setAkiPose(d.pose);

                setTimeout(() => {
                    setShowMessage(false);
                    if (nextClick === INITIAL_DIALOGUES.length) {
                        setGameActive(true);
                        setGameSessionCount(1);
                        setTargetX(-150);
                    } else {
                        setAkiPose("idle");
                    }
                }, 1000);
            }
        } else {
            // Diverse responses for repeat players
            const randomMsg = REPEAT_MESSAGES[Math.floor(Math.random() * REPEAT_MESSAGES.length)];
            setDynamicMessage(randomMsg);
            setAkiPose("annoyed");

            setTimeout(() => {
                setDynamicMessage("Ready?");
                setAkiPose("idle");
                setTimeout(() => {
                    setDynamicMessage("GO!");
                    setAkiPose("jump");
                    setTimeout(() => {
                        setShowMessage(false);
                        setGameActive(true);
                        setTargetX(-150);
                        setGameSessionCount(prev => prev + 1);
                    }, 600);
                }, 800);
            }, 1200);
        }
    };

    const resetGame = () => {
        setGameActive(false);
        setGameOver(false);
        setScore(0);
        setObstacles([]);
        setClickCount(0);
        setAkiPose("idle");
        setTargetX(0);
        setIsWandering(true);
    };

    const expertise = ["AI Engineering", "LLM Systems", "Computer Vision"];

    return (
        <section className="relative mb-8 pt-8 group">
            {/* Spotlight effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300 z-0 spotlight"
                style={{
                    "--x": `${mousePosition.x}px`,
                    "--y": `${mousePosition.y}px`,
                } as any}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
            >
                <div className="mb-4">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        Simon Ryu
                    </h1>
                </div>

                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                    AI Engineer based in Toronto. Background in engineering physics. I work across vision, agents, and production systems.
                </p>

                <div className="flex flex-wrap gap-4 mt-8">
                    <Link
                        href="/blog"
                        className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Read the blog
                    </Link>
                    <a
                        href="https://github.com/simonryu328"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 text-sm font-semibold rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                        GitHub
                    </a>
                </div>

                {/* Bit-aki Track Arena */}
                <motion.div
                    animate={{
                        marginTop: gameActive ? "8rem" : "2rem",
                        marginBottom: gameActive ? "4rem" : "0rem"
                    }}
                    className="relative h-16 flex items-center justify-center select-none"
                >
                    <motion.div
                        animate={gameActive ? { width: "100%", maxWidth: "600px" } : { width: "100%", maxWidth: "400px" }}
                        className="relative h-full flex items-end justify-center border-b border-neutral-100 dark:border-neutral-900/50"
                    >
                        {/* Background Decor */}
                        <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none">
                            {/* Clouds */}
                            {cloudDecors.map((d, i) => (
                                <div
                                    key={`cloud-${i}`}
                                    className="absolute"
                                    style={{
                                        left: decorPos.clouds[d.xIdx],
                                        top: `${d.y}%`
                                    }}
                                >
                                    <PixelDecor type={d.type} size={d.size} opacity={0.2} className="text-neutral-400 dark:text-neutral-600" />
                                </div>
                            ))}
                            {/* Trees & Bushes */}
                            {groundDecors.map((d, i) => (
                                <div
                                    key={`ground-${i}`}
                                    className="absolute bottom-0"
                                    style={{
                                        left: decorPos.ground[d.xIdx],
                                        marginBottom: `${d.offset}px`
                                    }}
                                >
                                    <PixelDecor type={d.type} size={d.size} opacity={0.3} className="text-neutral-300 dark:text-neutral-700" />
                                </div>
                            ))}
                        </div>

                        {/* Game UI Overlay */}
                        <AnimatePresence>
                            {gameActive && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute bottom-full mb-8 w-full flex justify-between px-4 font-pixel text-[14px] text-neutral-400 uppercase tracking-wider"
                                >
                                    <span>SCORE: {score.toString().padStart(5, '0')}</span>
                                    {gameOver ? (
                                        <span className="text-red-500 animate-pulse font-bold">GAME OVER! PRESS SPACE</span>
                                    ) : (
                                        <span>SPACE TO JUMP</span>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Obstacles */}
                        {obstacles.map(o => (
                            <motion.div
                                key={o.id}
                                className="absolute bottom-0 w-3 h-8 bg-neutral-900 dark:bg-white"
                                style={{ left: `calc(50% + ${o.x}px)` }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                            />
                        ))}

                        <motion.div
                            animate={{
                                x: targetX,
                                y: isJumping ? -45 : 0
                            }}
                            transition={{
                                x: {
                                    duration: (gameActive && obstacles.length === 0) ? 0 : 0.4,
                                    ease: "easeOut"
                                },
                                y: {
                                    duration: 0.25,
                                    ease: isJumping ? "easeOut" : "easeIn"
                                }
                            }}
                            className="absolute bottom-0 cursor-pointer p-0 z-20 flex flex-col items-center"
                            onClick={gameOver ? resetGame : handleAkiClick}
                        >
                            <AnimatePresence>
                                {showMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, y: 5 }}
                                        animate={{ opacity: 1, scale: 1, y: -5 }}
                                        exit={{ opacity: 0, scale: 0.8, y: 5 }}
                                        className="absolute bottom-full mb-3 whitespace-nowrap z-30 flex flex-col items-center"
                                    >
                                        <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-white p-3 text-[14px] font-pixel leading-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                                            {easterEggActive ? flightDialogue : dynamicMessage}
                                        </div>
                                        <div className="w-3 h-3 bg-white dark:bg-neutral-900 border-r-2 border-b-2 border-neutral-900 dark:border-white rotate-45 -mt-[7px] z-10" />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="pb-px"> {/* Tiny offset to sit perfectly on line */}
                                <PixelAki pose={akiPose} size={32} className="text-neutral-900 dark:text-white transition-transform active:scale-90" />
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
