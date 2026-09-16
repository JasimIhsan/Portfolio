"use client";

import { Cpu, Download, MapPin, Sparkles, Terminal, UserCheck, Zap } from "lucide-react";
import Image from "next/image";
import profile from "../../assets/White Shirt.jpg";
import ScrollReveal from "../animations/ScrollReveal";
import { TiltCard } from "../ui/tilt-card";
import { projects } from "./Projects";

const calculateExperience = () => {
   const startDate = new Date("2024-07-01");
   const endDate = new Date();
   const diffInMs = endDate.getTime() - startDate.getTime();
   const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
   return diffInYears.toFixed(1);
};

export default function About() {
   return (
      <section id="about" className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 relative z-10">
         <ScrollReveal>
            <div className="max-w-6xl mx-auto">
               {/* Section Title */}
               <div className="text-center mb-12 sm:mb-16">
                  <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 text-[#8A5A2B] dark:text-[#D4A373] text-xs font-semibold uppercase tracking-wider mb-4">
                     <Sparkles size={14} />
                     About the Engineer
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#181513] dark:text-[#E5DFD3] tracking-tight mb-3 sm:mb-4">Engineering with Precision & Purpose</h2>
                  <p className="text-base sm:text-lg text-[#6E655C] dark:text-[#A89F91] max-w-2xl mx-auto font-normal">A developer driven by scalable backend architecture, tactile frontend motion, and reliable cross-platform systems.</p>
               </div>

               {/* Modern Asymmetric Bento Grid */}
               <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                  {/* Card 1: Main Avatar & Identity (5 Cols) */}
                  <div className="lg:col-span-5 flex flex-col space-y-6">
                     <TiltCard max={6} glare={true} className="p-5 sm:p-8 bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_10px_35px_-10px_rgba(24,21,19,0.06)] rounded-[2rem] sm:rounded-[2.5rem] flex flex-col items-center text-center group h-full justify-between">
                        <div className="flex flex-col items-center w-full">
                           <div className="relative mb-5 sm:mb-6">
                              <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white dark:border-[#231E1A] shadow-xl shadow-black/10 relative">
                                 <Image src={profile} alt="Jasim Ihsan" priority fill sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 240px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                              </div>
                           </div>

                           <h3 className="text-xl sm:text-2xl font-bold text-[#181513] dark:text-[#E5DFD3] mb-1">Jasim Ihsan</h3>
                           <p className="text-xs sm:text-sm font-semibold text-[#8A5A2B] dark:text-[#D4A373] mb-2 sm:mb-3">Full-Stack & Mobile Developer</p>

                           <div className="flex items-center gap-1.5 text-xs font-medium text-[#6E655C] dark:text-[#A89F91] mb-5 sm:mb-6">
                              <MapPin size={14} className="text-[#8A5A2B] dark:text-[#D4A373] shrink-0" />
                              <span>Kerala, India • Remote & Global</span>
                           </div>
                        </div>

                        {/* Metric Tickers */}
                        <div className="w-full pt-5 sm:pt-6 border-t border-[#EFECE4] dark:border-[#E5DFD3]/10 grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
                           <div className="p-2 sm:p-3 rounded-2xl bg-[#EFECE4] dark:bg-[#231E1A]">
                              <div className="text-lg sm:text-xl font-bold text-[#181513] dark:text-[#E5DFD3]">{calculateExperience()}+</div>
                              <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#6E655C] dark:text-[#A89F91] font-medium truncate">Years Exp</div>
                           </div>
                           <div className="p-2 sm:p-3 rounded-2xl bg-[#EFECE4] dark:bg-[#231E1A]">
                              <div className="text-lg sm:text-xl font-bold text-[#181513] dark:text-[#E5DFD3]">{projects.filter((p) => p.live && p.live !== "#").length}+</div>
                              <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#6E655C] dark:text-[#A89F91] font-medium truncate">Shipped</div>
                           </div>
                           <div className="p-2 sm:p-3 rounded-2xl bg-[#EFECE4] dark:bg-[#231E1A]">
                              <div className="text-lg sm:text-xl font-bold text-[#181513] dark:text-[#E5DFD3]">50+</div>
                              <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#6E655C] dark:text-[#A89F91] font-medium truncate">Mentored</div>
                           </div>
                        </div>
                     </TiltCard>
                  </div>

                  {/* Card 2: Core Philosophy & Narrative (7 Cols) */}
                  <div className="lg:col-span-7 flex flex-col space-y-6">
                     <TiltCard max={5} glare={true} className="p-5 sm:p-8 md:p-10 bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_10px_35px_-10px_rgba(24,21,19,0.06)] rounded-[2rem] sm:rounded-[2.5rem] flex-1 flex flex-col justify-between">
                        <div className="space-y-4 sm:space-y-5 text-[#6E655C] dark:text-[#A89F91] leading-relaxed text-sm sm:text-base md:text-lg font-normal">
                           <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#EFECE4] dark:border-[#E5DFD3]/10 flex-wrap">
                              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8A5A2B] dark:text-[#D4A373] shrink-0">
                                 <UserCheck size={16} />
                                 Engineering Mission
                              </div>
                              <span className="text-[11px] sm:text-xs font-mono text-[#A89F91] dark:text-[#6E655C] truncate max-w-[160px] sm:max-w-none">production_ready: true</span>
                           </div>

                           <p>I build end-to-end digital products from architecture to launch. My sweet spot lies at the intersection of robust backend engineering—designing resilient Node.js services, real-time pipelines, and scalable relational schemas—and crafting fluid, tactile mobile applications with Flutter.</p>

                           <p>From steering core technical architecture in startup environments to conducting deep-dive system design reviews and mentoring emerging engineers at ExpertX Academy, I focus on clean code, measurable performance, and software that scales effortlessly.</p>
                        </div>

                        {/* Interactive Feature Badges */}
                        <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-[#EFECE4] dark:border-[#E5DFD3]/10 grid sm:grid-cols-2 gap-3 sm:gap-4">
                           <div className="p-3.5 sm:p-4 rounded-2xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/10 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#8A5A2B]/10 text-[#8A5A2B] dark:text-[#D4A373] flex items-center justify-center shrink-0">
                                 <Cpu size={20} />
                              </div>
                              <div>
                                 <div className="text-xs text-[#6E655C] dark:text-[#A89F91] font-medium">Core Focus</div>
                                 <div className="text-sm font-bold text-[#181513] dark:text-[#E5DFD3]">Full-Stack & Mobile</div>
                              </div>
                           </div>

                           <div className="p-3.5 sm:p-4 rounded-2xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/10 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#8A5A2B]/10 text-[#8A5A2B] dark:text-[#D4A373] flex items-center justify-center shrink-0">
                                 <Zap size={20} />
                              </div>
                              <div>
                                 <div className="text-xs text-[#6E655C] dark:text-[#A89F91] font-medium">Performance</div>
                                 <div className="text-sm font-bold text-[#181513] dark:text-[#E5DFD3]">Optimized & Fast</div>
                              </div>
                           </div>
                        </div>

                        {/* Resume CTA */}
                        <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-[#EFECE4] dark:border-[#E5DFD3]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                           <button
                              onClick={() => window.open("https://drive.google.com/file/d/1G6Ylakk0SxJHrs6rfh6K4Blsx19aRueD/view?usp=drive_link", "_blank")}
                              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#181513] dark:bg-[#E5DFD3] hover:bg-[#8A5A2B] dark:hover:bg-[#D4A373] text-[#F7F5F0] dark:text-[#0B0A09] font-semibold text-sm shadow-md shadow-black/10 transition-all duration-300 cursor-pointer group"
                           >
                              <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                              Download Full Resume (PDF)
                           </button>

                           <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-[#6E655C] dark:text-[#A89F91]">
                              <Terminal size={14} className="text-[#8A5A2B] dark:text-[#D4A373]" />
                              <span>Open for Opportunities</span>
                           </div>
                        </div>
                     </TiltCard>
                  </div>
               </div>
            </div>
         </ScrollReveal>
      </section>
   );
}
