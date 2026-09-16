"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Briefcase, Building2, Calendar, CheckCircle2, ChevronDown, ChevronRight, Sparkles, Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TiltCard } from "../ui/tilt-card";

export interface ExperienceItem {
   id: string;
   company: string;
   role: string;
   duration: string;
   type: "Full-Time" | "Contract" | "Part-Time" | "Apprenticeship";
   description: string;
   tagline: string;
   achievements: string[];
   skills: string[];
}

export const experiences: ExperienceItem[] = [
   {
      id: "life-partner-again",
      company: "Life Partner Again",
      role: "Flutter Developer",
      duration: "03/2025 - Present",
      type: "Full-Time",
      tagline: "Architecture & User Experience for Mobile Matchmaking",
      description: "Spearheaded end-to-end mobile engineering for a cross-platform matrimony platform with strict privacy controls, real-time matching, and intuitive onboarding.",
      achievements: ["Designed high-performance Flutter component architecture with custom transition curves and gestures", "Architected secure authentication workflows, media verification queues, and privacy-first profile audits", "Integrated Firebase Cloud Messaging (FCM) push notifications with zero-latency delivery"],
      skills: ["Flutter", "Dart", "Firebase", "REST APIs", "State Management", "BLoC"],
   },
   {
      id: "onboard-careers",
      company: "Onboard Careers",
      role: "Full-Stack Developer",
      duration: "08/2024 - 02/2025",
      type: "Contract",
      tagline: "High-Traffic Maritime Recruitment Engine",
      description: "Built specialized recruitment portal for maritime personnel with dynamic talent search algorithms, automated CV parsing pipelines, and real-time candidate status.",
      achievements: ["Constructed relational data schemas with PostgreSQL & Prisma, optimizing complex query response by 45%", "Developed Next.js server actions and API route handlers for instantaneous applicant filtering", "Implemented administrative governance dashboards with role-based permission scopes"],
      skills: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Node.js"],
   },
   {
      id: "brototype",
      company: "Brototype",
      role: "Full-Stack Developer Intern",
      duration: "08/2023 - 07/2024",
      type: "Apprenticeship",
      tagline: "Intensive Full-Stack & Systems Immersion",
      description: "Completed rigorous software engineering residency solving deep technical problems in distributed queues, microservice architectures, and scalable web apps.",
      achievements: ["Engineered BrewCode: A distributed JavaScript execution sandbox using Docker and BullMQ/Redis", "Built MentorsHub: Complete 1-on-1 mentorship platform with Socket.io chat and live video streaming", "Created ByteVerse: Production e-commerce store with RazorPay payment gateway integration"],
      skills: ["React", "Node.js", "Express.js", "MongoDB", "Docker", "Redis", "Socket.io"],
   },
   {
      id: "independent-consulting",
      company: "Freelance & Open Source",
      role: "Full-Stack Consultant",
      duration: "2023 - Present",
      type: "Contract",
      tagline: "Custom Web Solutions & Architectural Advisory",
      description: "Delivering tailored web systems, performance optimization, and architectural consulting for early-stage products and open-source tooling.",
      achievements: ["Authored reusable animation and UI utility libraries for modern web development", "Audited and optimized database queries, reducing latency on resource-constrained hosting environments", "Provided technical consultation on cross-platform mobile deployment strategies"],
      skills: ["Next.js", "TypeScript", "Tailwind CSS", "Architecture", "Git", "API Design"],
   },
];

export default function Experience() {
   const [activeExpIndex, setActiveExpIndex] = useState(0);
   const [direction, setDirection] = useState(1);
   const [isDesktop, setIsDesktop] = useState(true);
   const isClickingRef = useRef(false);
   const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
   const sectionRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const checkDesktop = () => {
         setIsDesktop(window.innerWidth >= 1024);
      };
      checkDesktop();
      window.addEventListener("resize", checkDesktop);
      return () => window.removeEventListener("resize", checkDesktop);
   }, []);

   const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start start", "end end"],
   });

   useEffect(() => {
      if (!isDesktop) return;

      const unsubscribe = scrollYProgress.on("change", (latest) => {
         if (isClickingRef.current) return;

         const total = experiences.length;
         const step = 1 / total;
         const index = Math.min(Math.floor(latest / step), total - 1);
         const safeIndex = Math.max(0, index);

         setActiveExpIndex((prev) => {
            if (prev !== safeIndex) {
               setDirection(safeIndex > prev ? 1 : -1);
               return safeIndex;
            }
            return prev;
         });
      });
      return () => unsubscribe();
   }, [scrollYProgress, isDesktop]);

   const handleSelectMilestone = (idx: number) => {
      if (idx === activeExpIndex) return;

      isClickingRef.current = true;
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

      setDirection(idx > activeExpIndex ? 1 : -1);
      setActiveExpIndex(idx);

      if (sectionRef.current && isDesktop) {
         const total = experiences.length;
         const rect = sectionRef.current.getBoundingClientRect();
         const sectionTop = window.scrollY + rect.top;
         const scrollDistance = sectionRef.current.offsetHeight - window.innerHeight;

         const targetScroll = sectionTop + ((idx + 0.5) / total) * scrollDistance;

         window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
         });
      }

      clickTimeoutRef.current = setTimeout(() => {
         isClickingRef.current = false;
      }, 700);
   };

   const currentExp = experiences[activeExpIndex];

   return (
      <section id="experience" ref={sectionRef} className="relative z-10 w-full" style={{ height: isDesktop ? "350vh" : "auto" }}>
         {/* DESKTOP VIEW: Pinned Sticky Scrollytelling Container */}
         {isDesktop ? (
            <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 sm:px-6 overflow-hidden">
               {/* Background ambient lighting */}
               <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#8A5A2B]/5 dark:bg-[#D4A373]/5 rounded-full blur-[120px] pointer-events-none" />
               <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#3D2D20]/10 dark:bg-[#3D2D20]/25 rounded-full blur-[120px] pointer-events-none" />

               <div className="max-w-6xl mx-auto w-full">
                  {/* Header */}
                  <div className="text-center mb-8 md:mb-10">
                     <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 text-[#8A5A2B] dark:text-[#D4A373] text-xs font-semibold uppercase tracking-wider mb-2">
                        <Sparkles size={14} />
                        Pinned Career Story
                     </div>
                     <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#181513] dark:text-[#E5DFD3] tracking-tight mb-2">Work Experience & Milestones</h2>
                     <p className="text-sm md:text-base text-[#6E655C] dark:text-[#A89F91] max-w-2xl mx-auto font-normal">Scroll or click any milestone to navigate through my career journey.</p>
                  </div>

                  {/* Scrollytelling Pinned Grid */}
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                     {/* Left Fixed Index & Interactive Navigator (4 Cols) */}
                     <div className="lg:col-span-4 space-y-4">
                        <div className="p-6 rounded-3xl bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-sm">
                           <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EFECE4] dark:border-[#E5DFD3]/10">
                              <span className="text-xs font-bold uppercase tracking-widest text-[#6E655C] dark:text-[#A89F91]">Milestone Tracker</span>
                              <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-[#EFECE4] dark:bg-[#231E1A] text-[#8A5A2B] dark:text-[#D4A373]">
                                 {activeExpIndex + 1} of {experiences.length}
                              </span>
                           </div>

                           {/* Clickable Timeline Step Indicators */}
                           <div className="space-y-2">
                              {experiences.map((exp, idx) => {
                                 const isActive = activeExpIndex === idx;
                                 return (
                                    <button
                                       key={exp.id}
                                       type="button"
                                       onClick={() => handleSelectMilestone(idx)}
                                       className={`w-full text-left p-3.5 rounded-2xl transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                                          isActive ? "bg-[#181513] dark:bg-[#231E1A] text-white shadow-md shadow-black/10 border border-[#181513] dark:border-[#D4A373]/30" : "hover:bg-[#EFECE4]/60 dark:hover:bg-[#231E1A]/60 text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3]"
                                       }`}
                                    >
                                       <div className="flex items-center gap-3">
                                          <div className={`w-2.5 h-2.5 rounded-full transition-transform ${isActive ? "bg-[#D4A373] scale-125 ring-4 ring-[#D4A373]/20" : "bg-[#DCD6C8] dark:bg-[#3D2D20] group-hover:bg-[#8A5A2B] dark:group-hover:bg-[#D4A373]"}`} />
                                          <div>
                                             <div className={`font-semibold text-sm leading-snug ${isActive ? "text-white dark:text-[#E5DFD3]" : "text-[#181513] dark:text-[#E5DFD3]"}`}>{exp.role}</div>
                                             <div className={`text-xs ${isActive ? "text-[#A89F91]" : "text-[#6E655C] dark:text-[#A89F91]"}`}>{exp.company}</div>
                                          </div>
                                       </div>
                                       <ChevronRight size={16} className={`transition-transform duration-300 ${isActive ? "text-[#D4A373] translate-x-1" : "text-[#DCD6C8] dark:text-[#3D2D20] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"}`} />
                                    </button>
                                 );
                              })}
                           </div>

                           <div className="mt-5 pt-4 border-t border-[#EFECE4] dark:border-[#E5DFD3]/10 text-xs text-[#6E655C] dark:text-[#A89F91] flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                 <Terminal size={14} className="text-[#8A5A2B] dark:text-[#D4A373]" />
                                 Click or scroll to explore
                              </span>
                              <ChevronDown size={14} className="animate-bounce text-[#8A5A2B] dark:text-[#D4A373]" />
                           </div>
                        </div>
                     </div>

                     {/* Right Animated Card Stage (8 Cols) */}
                     <div className="lg:col-span-8 relative min-h-[460px] flex items-center" style={{ perspective: 1200 }}>
                        <AnimatePresence mode="wait" custom={direction}>
                           <motion.div
                              key={currentExp.id}
                              custom={direction}
                              variants={{
                                 enter: (dir: number) => ({
                                    opacity: 0,
                                    y: dir * 32,
                                    rotateX: dir * -10,
                                    scale: 0.96,
                                    filter: "blur(4px)",
                                 }),
                                 center: {
                                    opacity: 1,
                                    y: 0,
                                    rotateX: 0,
                                    scale: 1,
                                    filter: "blur(0px)",
                                    transition: {
                                       duration: 0.42,
                                       ease: [0.22, 1, 0.36, 1],
                                    },
                                 },
                                 exit: (dir: number) => ({
                                    opacity: 0,
                                    y: dir * -32,
                                    rotateX: dir * 10,
                                    scale: 0.96,
                                    filter: "blur(4px)",
                                    transition: {
                                       duration: 0.3,
                                       ease: [0.32, 0, 0.67, 0],
                                    },
                                 }),
                              }}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              className="w-full will-change-transform transform-gpu"
                           >
                              <TiltCard max={6} glare={true} className="p-8 md:p-10 bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_15px_40px_-15px_rgba(24,21,19,0.06)] hover:shadow-[0_25px_50px_-12px_rgba(138,90,43,0.12)] transition-shadow duration-500 rounded-[2rem]">
                                 {/* Card Top Pill Bar */}
                                 <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 text-xs font-semibold text-[#181513] dark:text-[#E5DFD3]">
                                       <Building2 size={14} className="text-[#8A5A2B] dark:text-[#D4A373]" />
                                       <span>{currentExp.company}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                       <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#EFECE4] dark:bg-[#231E1A] text-[#8A5A2B] dark:text-[#D4A373] border border-[#DCD6C8] dark:border-[#E5DFD3]/15">{currentExp.type}</span>
                                       <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6E655C] dark:text-[#A89F91]">
                                          <Calendar size={14} />
                                          <span>{currentExp.duration}</span>
                                       </div>
                                    </div>
                                 </div>

                                 {/* Role Headline */}
                                 <h3 className="text-2xl md:text-3xl font-bold text-[#181513] dark:text-[#E5DFD3] mb-2">{currentExp.role}</h3>
                                 <p className="text-sm font-medium text-[#8A5A2B] dark:text-[#D4A373] mb-6">{currentExp.tagline}</p>

                                 {/* Narrative Description */}
                                 <p className="text-base md:text-lg text-[#6E655C] dark:text-[#A89F91] leading-relaxed mb-6 font-normal">{currentExp.description}</p>

                                 {/* Key Deliverables / Achievements */}
                                 <div className="p-5 rounded-2xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 mb-8 space-y-2.5">
                                    <div className="text-xs font-bold uppercase tracking-wider text-[#181513] dark:text-[#E5DFD3] mb-2 flex items-center gap-1.5">
                                       <Briefcase size={14} className="text-[#8A5A2B] dark:text-[#D4A373]" />
                                       Key Responsibilities & Impact
                                    </div>
                                    {currentExp.achievements.map((item, i) => (
                                       <div key={i} className="flex items-start gap-2.5 text-sm text-[#4A433D] dark:text-[#D5CEC2]">
                                          <CheckCircle2 size={16} className="text-[#8A5A2B] dark:text-[#D4A373] shrink-0 mt-0.5" />
                                          <span>{item}</span>
                                       </div>
                                    ))}
                                 </div>

                                 {/* Tech Stack Chips */}
                                 <div className="space-y-2">
                                    <div className="text-xs font-semibold uppercase tracking-wider text-[#A89F91] dark:text-[#6E655C]">Technologies & Tools Used</div>
                                    <div className="flex flex-wrap gap-2">
                                       {currentExp.skills.map((skill) => (
                                          <span
                                             key={skill}
                                             className="px-3 py-1 text-xs font-medium text-[#4A433D] dark:text-[#D5CEC2] bg-white dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 rounded-lg shadow-2xs hover:border-[#8A5A2B] dark:hover:border-[#D4A373] hover:text-[#8A5A2B] dark:hover:text-[#D4A373] transition-colors"
                                          >
                                             {skill}
                                          </span>
                                       ))}
                                    </div>
                                 </div>
                              </TiltCard>
                           </motion.div>
                        </AnimatePresence>
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            /* MOBILE VIEW: Natural Flowing Vertical Timeline List */
            <div className="py-16 sm:py-24 px-4 sm:px-6 max-w-2xl mx-auto">
               {/* Mobile Header */}
               <div className="text-center mb-8 sm:mb-10">
                  <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 text-[#8A5A2B] dark:text-[#D4A373] text-xs font-semibold uppercase tracking-wider mb-2">
                     <Sparkles size={14} />
                     Career Journey
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#181513] dark:text-[#E5DFD3] tracking-tight mb-2">Work Experience</h2>
                  <p className="text-xs sm:text-sm text-[#6E655C] dark:text-[#A89F91] font-normal">A chronological record of production roles, full-stack systems, and client delivery.</p>
               </div>

               {/* Mobile Stack of Cards */}
               <div className="space-y-5 sm:space-y-6">
                  {experiences.map((exp) => (
                     <div key={exp.id} className="p-5 sm:p-6 bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-sm rounded-2xl sm:rounded-3xl relative overflow-hidden">
                        {/* Top Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-3">
                           <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 text-xs font-semibold text-[#181513] dark:text-[#E5DFD3]">
                              <Building2 size={13} className="text-[#8A5A2B] dark:text-[#D4A373]" />
                              <span>{exp.company}</span>
                           </div>
                           <div className="flex items-center gap-2 text-xs">
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#EFECE4] dark:bg-[#231E1A] text-[#8A5A2B] dark:text-[#D4A373] border border-[#DCD6C8] dark:border-[#E5DFD3]/15">{exp.type}</span>
                              <span className="text-[#6E655C] dark:text-[#A89F91] font-medium shrink-0">{exp.duration}</span>
                           </div>
                        </div>

                        {/* Role & Tagline */}
                        <h3 className="text-lg sm:text-xl font-bold text-[#181513] dark:text-[#E5DFD3] mb-1">{exp.role}</h3>
                        <p className="text-xs font-medium text-[#8A5A2B] dark:text-[#D4A373] mb-3 sm:mb-4">{exp.tagline}</p>
                        <p className="text-xs sm:text-sm text-[#6E655C] dark:text-[#A89F91] leading-relaxed mb-4 font-normal">{exp.description}</p>

                        {/* Deliverables */}
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#EFECE4]/70 dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 mb-4 space-y-2">
                           <div className="text-[11px] font-bold uppercase tracking-wider text-[#181513] dark:text-[#E5DFD3] flex items-center gap-1.5">
                              <Briefcase size={13} className="text-[#8A5A2B] dark:text-[#D4A373]" />
                              Key Deliverables
                           </div>
                           {exp.achievements.map((item, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-[#4A433D] dark:text-[#D5CEC2]">
                                 <CheckCircle2 size={14} className="text-[#8A5A2B] dark:text-[#D4A373] shrink-0 mt-0.5" />
                                 <span className="leading-relaxed">{item}</span>
                              </div>
                           ))}
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1.5">
                           {exp.skills.map((skill) => (
                              <span key={skill} className="px-2.5 py-1 text-[11px] font-medium text-[#4A433D] dark:text-[#D5CEC2] bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 rounded-lg">
                                 {skill}
                              </span>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </section>
   );
}
