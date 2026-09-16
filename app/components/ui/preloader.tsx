"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

interface PreloaderProps {
   onComplete?: () => void;
   minDuration?: number;
}

const SYSTEM_LOGS = ["SYS.INIT // Bootstrapping core runtime...", "ENGINE.READY // Loading vector graphs & assets...", "MOTION.SYNC // Calibrating spatial physics...", "PORTFOLIO.ONLINE // Welcome to Jasim Ihsan"];

export default function Preloader({ onComplete, minDuration = 2000 }: PreloaderProps) {
   const [progress, setProgress] = useState(0);
   const [logIndex, setLogIndex] = useState(0);
   const [isExiting, setIsExiting] = useState(false);
   const [isSkipped, setIsSkipped] = useState(false);

   const handleSkip = useCallback(() => {
      if (isSkipped || isExiting) return;
      setIsSkipped(true);
      setProgress(100);
      setLogIndex(3);
      setIsExiting(true);
   }, [isSkipped, isExiting]);

   useEffect(() => {
      // Lock scroll while preloader is active
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const startTime = performance.now();
      let animationFrameId: number;

      const updateProgress = (currentTime: number) => {
         const elapsed = currentTime - startTime;
         const rawProgress = Math.min(elapsed / minDuration, 1);

         // Smooth custom easing: fast start, thoughtful midpoint, crisp finish
         const easeProgress = rawProgress < 0.7 ? Math.pow(rawProgress / 0.7, 1.2) * 75 : 75 + Math.pow((rawProgress - 0.7) / 0.3, 0.9) * 25;

         const currentVal = Math.floor(easeProgress);
         setProgress(currentVal);

         // Update log message based on progress bracket
         if (currentVal < 25) setLogIndex(0);
         else if (currentVal < 60) setLogIndex(1);
         else if (currentVal < 90) setLogIndex(2);
         else setLogIndex(3);

         if (rawProgress < 1) {
            animationFrameId = requestAnimationFrame(updateProgress);
         } else {
            setProgress(100);
            setLogIndex(3);
            setTimeout(() => {
               setIsExiting(true);
            }, 250);
         }
      };

      animationFrameId = requestAnimationFrame(updateProgress);

      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
            handleSkip();
         }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
         cancelAnimationFrame(animationFrameId);
         window.removeEventListener("keydown", handleKeyDown);
         document.body.style.overflow = originalOverflow;
      };
   }, [minDuration, handleSkip]);

   // Complete callback when exit animation finishes
   const handleExitComplete = () => {
      document.body.style.overflow = "";
      if (onComplete) {
         onComplete();
      }
   };

   // Number of vertical shutter columns
   const columns = 5;

   return (
      <AnimatePresence onExitComplete={handleExitComplete}>
         {!isExiting && (
            <motion.div
               key="preloader-overlay"
               initial={{ opacity: 1 }}
               exit={{
                  opacity: 0,
                  transition: { delay: 0.75, duration: 0.3 },
               }}
               onClick={handleSkip}
               className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer select-none overflow-hidden bg-[#080706]"
               aria-label="System Initializing Screen"
            >
               {/* Multi-column Staggered Architectural Shutter Panels for the exit reveal */}
               <div className="absolute inset-0 grid grid-cols-5 pointer-events-none z-0">
                  {Array.from({ length: columns }).map((_, i) => (
                     <motion.div
                        key={`shutter-${i}`}
                        initial={{ y: 0 }}
                        exit={{
                           y: i % 2 === 0 ? "-102%" : "102%",
                           transition: {
                              duration: 0.8,
                              ease: [0.76, 0, 0.24, 1],
                              delay: i * 0.08,
                           },
                        }}
                        className="w-full h-full bg-[#080706] relative border-r border-[#E5DFD3]/5 last:border-r-0"
                     >
                        {/* Subtle glowing accent trail on the shutter edge */}
                        <div className={`absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A373]/40 to-transparent ${i % 2 === 0 ? "bottom-0" : "top-0"}`} />
                     </motion.div>
                  ))}
               </div>

               {/* Ambient Radial Lighting Bloom */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] sm:w-[48rem] h-[32rem] sm:h-[48rem] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4A373]/15 via-[#8A5A2B]/5 to-transparent rounded-full blur-3xl pointer-events-none z-10" />

               {/* Precision Blueprint Grid & Corner Crosshairs */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,223,211,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(229,223,211,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-10" />

               {/* Precision Corner Reticles */}
               <div className="absolute top-6 left-6 text-[#A89F91]/40 font-mono text-[10px] hidden sm:flex items-center gap-2 z-20">
                  <span className="text-[#D4A373]">+</span> LAT: 11.2588° N
               </div>
               <div className="absolute top-6 right-6 text-[#A89F91]/40 font-mono text-[10px] hidden sm:flex items-center gap-2 z-20">
                  LONG: 75.7804° E <span className="text-[#D4A373]">+</span>
               </div>
               <div className="absolute bottom-6 left-6 text-[#A89F91]/40 font-mono text-[10px] hidden sm:flex items-center gap-2 z-20">
                  <span className="text-[#D4A373]">+</span> SYS_ID: JI_PROD_2026
               </div>
               <div className="absolute bottom-6 right-6 text-[#A89F91]/40 font-mono text-[10px] hidden sm:flex items-center gap-2 z-20">
                  FRAMEWORK: NEXT_15 <span className="text-[#D4A373]">+</span>
               </div>

               {/* Central Content Container */}
               <motion.div
                  exit={{
                     scale: 1.15,
                     opacity: 0,
                     filter: "blur(10px)",
                     transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
                  }}
                  className="relative z-20 flex flex-col items-center max-w-md w-full px-6 text-center"
               >
                  {/* Central Kinetic Monogram & Orbital Aperture */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center mb-8">
                     {/* Outer Rotating Dotted Orbital Ring */}
                     <motion.svg animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }} className="absolute inset-0 w-full h-full text-[#D4A373]/30 pointer-events-none" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
                        {/* Cardinal Tick Accents */}
                        <circle cx="50" cy="4" r="2" fill="#D4A373" />
                        <circle cx="96" cy="50" r="1.5" fill="#D4A373" opacity="0.6" />
                        <circle cx="50" cy="96" r="1.5" fill="#D4A373" opacity="0.6" />
                        <circle cx="4" cy="50" r="1.5" fill="#D4A373" opacity="0.6" />
                     </motion.svg>

                     {/* Inner Counter-Rotating Hex / Polygon Ring */}
                     <motion.svg animate={{ rotate: -360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] text-[#8A5A2B]/40 pointer-events-none" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1 8" />
                     </motion.svg>

                     {/* Glowing Shockwave on Exit */}
                     <motion.div
                        exit={{
                           scale: [1, 3],
                           opacity: [0.8, 0],
                           transition: { duration: 0.6, ease: "easeOut" },
                        }}
                        className="absolute inset-0 rounded-full bg-radial from-[#D4A373]/30 to-transparent pointer-events-none"
                     />

                     {/* Architectural "JI" Monogram */}
                     <div className="relative z-10 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#141210]/90 border border-[#E5DFD3]/15 shadow-[0_0_40px_rgba(212,163,115,0.15)] backdrop-blur-xl">
                        <svg viewBox="0 0 80 80" className="w-12 h-12 text-[#E5DFD3] fill-none stroke-current" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                           {/* Letter J */}
                           <motion.path d="M 32 22 L 32 46 C 32 54 26 58 18 54" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.2, ease: "easeInOut" }} stroke="#D4A373" />
                           {/* Letter I */}
                           <motion.path d="M 48 22 L 48 58" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }} stroke="#E5DFD3" />
                           {/* Geometric Cross-Tie / Grid Accent */}
                           <motion.circle cx="48" cy="22" r="2.5" fill="#D4A373" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: "spring" }} />
                           <motion.circle cx="32" cy="22" r="2.5" fill="#8A5A2B" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7, type: "spring" }} />
                        </svg>
                     </div>
                  </div>

                  {/* Monospace Digital Progress Percentage */}
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                     <span className="font-mono text-4xl sm:text-5xl font-black tracking-tighter text-[#E5DFD3] tabular-nums">{progress.toString().padStart(2, "0")}</span>
                     <span className="font-mono text-sm font-semibold text-[#D4A373]">%</span>
                  </div>

                  {/* Quantum Active Progress Track & Glowing Fill */}
                  <div className="w-64 sm:w-80 h-2 sm:h-2.5 bg-[#1C1815] rounded-full overflow-hidden p-[2px] mb-4 border border-[#E5DFD3]/20 shadow-inner relative">
                     <div className="h-full bg-gradient-to-r from-[#8A5A2B] via-[#D4A373] to-[#FFF0D4] rounded-full shadow-[0_0_15px_rgba(212,163,115,0.8)] transition-all duration-75 ease-out relative" style={{ width: `${Math.max(progress, 2)}%` }}>
                        {/* Glowing Laser Bead at the Progress Tip */}
                        {progress > 2 && progress < 100 && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#FFF,0_0_16px_#D4A373]" />}
                     </div>
                  </div>

                  {/* Dynamic Engineering Telemetry Log */}
                  <div className="h-6 flex items-center justify-center">
                     <motion.p key={logIndex} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }} className="font-mono text-xs text-[#A89F91] tracking-wide">
                        <span className="text-[#D4A373] font-bold mr-1.5">»</span>
                        {SYSTEM_LOGS[logIndex]}
                     </motion.p>
                  </div>

                  {/* Skip Prompt Cue */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.8, duration: 0.5 }} className="mt-8 text-[11px] font-mono text-[#6E655C] tracking-wider uppercase hover:text-[#D4A373] transition-colors">
                     [ Click or Press Space to skip ]
                  </motion.div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   );
}
