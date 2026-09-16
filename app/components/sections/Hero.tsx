"use client";

import { motion } from "framer-motion";
import { ArrowDown, Code, Database, Github, Linkedin, Mail, Smartphone, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import TextReveal from "../animations/TextReveal";
import { TiltCard } from "../ui/tilt-card";
import { projects } from "./Projects";

export default function Hero() {
   const shippedCount = projects.filter((p) => p.live && p.live !== "#").length;
   const [commitCount, setCommitCount] = useState<number | null>(null);

   useEffect(() => {
      try {
         const cached = localStorage.getItem("github_commit_count");
         if (cached) setCommitCount(parseInt(cached, 10));
      } catch {
         // Silently ignore
      }

      async function fetchCommits() {
         try {
            const res = await fetch("https://api.github.com/search/commits?q=author:JasimIhsan", {
               headers: {
                  Accept: "application/vnd.github.cloak-preview+json",
               },
            });
            if (res.ok) {
               const data = await res.json();
               if (typeof data.total_count === "number" && data.total_count > 0) {
                  setCommitCount(data.total_count);
                  localStorage.setItem("github_commit_count", data.total_count.toString());
               }
            }
         } catch {
            // Silently fall back to cached or default
         }
      }
      fetchCommits();
   }, []);

   const scrollToProjects = () => {
      const element = document.getElementById("projects");
      if (element) {
         element.scrollIntoView({ behavior: "smooth" });
      }
   };

   const scrollToContact = () => {
      const element = document.getElementById("contact");
      if (element) {
         element.scrollIntoView({ behavior: "smooth" });
      }
   };

   return (
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16 relative z-10 overflow-hidden">
         {/* Ambient Lighting Gradients */}
         <div className="absolute top-1/4 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#8A5A2B]/10 dark:bg-[#D4A373]/10 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none" />
         <div className="absolute bottom-10 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#3D2D20]/10 dark:bg-[#3D2D20]/30 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none" />

         <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Main Hero Copy */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="lg:col-span-7">
               {/* Available status pill with live radar glow */}
               <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-xs mb-6 sm:mb-8 max-w-full">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold text-[#181513] dark:text-[#E5DFD3] tracking-wide truncate">Available for Full-Time Roles & Consulting</span>
               </motion.div>

               {/* Name Headline */}
               <TextReveal text="Jasim Ihsan" delay={0.3} className="text-[clamp(2rem,10vw,5rem)] sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#181513] dark:text-[#E5DFD3] tracking-tighter leading-tight sm:leading-none mb-4 sm:mb-6 break-words" />

               {/* Role Badge Tagline */}
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="flex items-center gap-3 text-lg sm:text-xl md:text-2xl font-bold text-[#8A5A2B] dark:text-[#D4A373] mb-4 sm:mb-6">
                  <span className="break-words overflow-wrap-anywhere">Full-Stack & Mobile Software Engineer</span>
               </motion.div>

               {/* Bio Narrative */}
               <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-base sm:text-lg md:text-xl text-[#6E655C] dark:text-[#A89F91] leading-relaxed max-w-xl font-normal mb-8 sm:mb-10 break-words overflow-wrap-anywhere">
                  Building production-grade web systems, resilient backend architectures, and Flutter mobile apps with a relentless focus on clean design, performance, and seamless motion.
               </motion.p>

               {/* Action Buttons & Social Hub */}
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <button onClick={scrollToProjects} className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-[#181513] dark:bg-[#E5DFD3] hover:bg-[#8A5A2B] dark:hover:bg-[#D4A373] text-[#F7F5F0] dark:text-[#0B0A09] font-semibold text-sm tracking-wide shadow-md shadow-black/10 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer">
                     <span>Explore Projects</span>
                     <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
                  </button>

                  <button
                     onClick={scrollToContact}
                     className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 hover:border-[#8A5A2B] dark:hover:border-[#D4A373] hover:bg-[#EFECE4]/50 dark:hover:bg-[#231E1A] text-[#181513] dark:text-[#E5DFD3] font-semibold text-sm tracking-wide shadow-xs transition-all duration-300 cursor-pointer text-center"
                  >
                     Get in Touch
                  </button>

                  <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
                     {[
                        { icon: Github, href: "http://github.com/JasimIhsan", label: "GitHub" },
                        { icon: Linkedin, href: "http://linkedin.com/in/jasim-ihsan-m", label: "LinkedIn" },
                        { icon: Mail, href: "mailto:jasimihsan1234@gmail.com", label: "Email" },
                     ].map(({ icon: Icon, href, label }) => (
                        <a
                           key={label}
                           href={href}
                           target="_blank"
                           rel="noreferrer"
                           className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 flex items-center justify-center text-[#6E655C] dark:text-[#A89F91] hover:text-[#8A5A2B] dark:hover:text-[#D4A373] hover:border-[#8A5A2B]/40 shadow-2xs hover:scale-105 transition-all"
                           aria-label={label}
                        >
                           <Icon size={17} />
                        </a>
                     ))}
                  </div>
               </motion.div>
            </motion.div>

            {/* Right Interactive 3D Bento Console */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 1, ease: "easeOut" }} className="lg:col-span-5 w-full">
               <TiltCard max={12} glare={true} className="p-5 sm:p-8 bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_20px_50px_-15px_rgba(24,21,19,0.08)] rounded-[2rem] sm:rounded-[2.5rem] relative overflow-hidden">
                  {/* Console Header */}
                  <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-[#EFECE4] dark:border-[#E5DFD3]/10 mb-5 sm:mb-6">
                     <div className="flex items-center gap-2">
                        <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#8A5A2B]" />
                        <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#D4A373]" />
                        <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#A89F91]" />
                     </div>
                     <span className="text-[11px] sm:text-xs font-mono text-[#6E655C] dark:text-[#A89F91] flex items-center gap-1">
                        <Terminal size={12} /> jasim.engineer.ts
                     </span>
                  </div>

                  {/* Core Architecture Matrix */}
                  <div className="space-y-3 sm:space-y-4 font-mono text-xs mb-6 sm:mb-8">
                     <div className="p-3 sm:p-3.5 rounded-2xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 flex flex-wrap sm:flex-nowrap items-center justify-between gap-1 sm:gap-2">
                        <span className="text-[#6E655C] dark:text-[#A89F91] flex items-center gap-2 shrink-0">
                           <Code size={14} className="text-[#8A5A2B] dark:text-[#D4A373]" /> Frontend
                        </span>
                        <span className="font-semibold text-[#181513] dark:text-[#E5DFD3] text-[11px] sm:text-xs text-right">React / Next.js / Tailwind</span>
                     </div>
                     <div className="p-3 sm:p-3.5 rounded-2xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 flex flex-wrap sm:flex-nowrap items-center justify-between gap-1 sm:gap-2">
                        <span className="text-[#6E655C] dark:text-[#A89F91] flex items-center gap-2 shrink-0">
                           <Database size={14} className="text-[#8A5A2B] dark:text-[#D4A373]" /> Backend & DB
                        </span>
                        <span className="font-semibold text-[#181513] dark:text-[#E5DFD3] text-[11px] sm:text-xs text-right">Node / Mongo / Postgres</span>
                     </div>
                     <div className="p-3 sm:p-3.5 rounded-2xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 flex flex-wrap sm:flex-nowrap items-center justify-between gap-1 sm:gap-2">
                        <span className="text-[#6E655C] dark:text-[#A89F91] flex items-center gap-2 shrink-0">
                           <Smartphone size={14} className="text-[#8A5A2B] dark:text-[#D4A373]" /> Mobile OS
                        </span>
                        <span className="font-semibold text-[#181513] dark:text-[#E5DFD3] text-[11px] sm:text-xs text-right">Flutter / Dart / Firebase</span>
                     </div>
                  </div>

                  {/* Highlights Bar */}
                  <div className="pt-4 border-t border-[#EFECE4] dark:border-[#E5DFD3]/10 grid grid-cols-2 gap-3 sm:gap-4 text-center">
                     <div className="p-2.5 sm:p-3 rounded-2xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15">
                        <div className="text-xl sm:text-2xl font-black text-[#8A5A2B] dark:text-[#D4A373]">{commitCount !== null ? `${commitCount}+` : "900+"}</div>
                        <div className="text-[10px] sm:text-[11px] font-medium text-[#6E655C] dark:text-[#A89F91] uppercase tracking-wider">Git Commits</div>
                     </div>
                     <div className="p-2.5 sm:p-3 rounded-2xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15">
                        <div className="text-xl sm:text-2xl font-black text-[#181513] dark:text-[#E5DFD3]">{shippedCount}+</div>
                        <div className="text-[10px] sm:text-[11px] font-medium text-[#6E655C] dark:text-[#A89F91] uppercase tracking-wider">Apps Shipped</div>
                     </div>
                  </div>
               </TiltCard>
            </motion.div>
         </div>
      </section>
   );
}
