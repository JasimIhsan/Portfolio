"use client";

import { ArrowRight, Briefcase, Building2, Calendar, CheckCircle2, Code2, Handshake, MessageSquare, Sparkles, Zap } from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";
import { TiltCard } from "../ui/tilt-card";

export interface ExperienceItem {
   id: string;
   company: string;
   role: string;
   duration: string;
   type: "Full-Time" | "Contract" | "Part-Time" | "Apprenticeship";
   status?: "active" | "completed";
   tagline: string;
   description: string;
   metric?: string;
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
      status: "active",
      tagline: "Architecture & User Experience for Mobile Matchmaking",
      description: "Spearheaded end-to-end mobile engineering for a cross-platform matrimony platform with strict privacy controls, real-time matching, and intuitive onboarding.",
      metric: "Zero-Latency Push & Real-Time Sync",
      achievements: ["Designed high-performance Flutter component architecture with custom transition curves and gestures", "Architected secure authentication workflows, media verification queues, and privacy-first profile audits", "Integrated Firebase Cloud Messaging (FCM) push notifications with zero-latency delivery"],
      skills: ["Flutter", "Dart", "Firebase", "REST APIs", "State Management", "BLoC"],
   },
   {
      id: "onboard-careers",
      company: "Onboard Careers",
      role: "Full-Stack Developer",
      duration: "08/2024 - 02/2025",
      type: "Contract",
      status: "completed",
      tagline: "High-Traffic Maritime Recruitment Engine",
      description: "Built specialized recruitment portal for maritime personnel with dynamic talent search algorithms, automated CV parsing pipelines, and real-time candidate status.",
      metric: "45% Query Latency Optimization",
      achievements: ["Constructed relational data schemas with PostgreSQL & Prisma, optimizing complex query response by 45%", "Developed Next.js server actions and API route handlers for instantaneous applicant filtering", "Implemented administrative governance dashboards with role-based permission scopes"],
      skills: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Node.js"],
   },
   {
      id: "brototype",
      company: "Brototype",
      role: "Full-Stack Developer Intern",
      duration: "08/2023 - 07/2024",
      type: "Apprenticeship",
      status: "completed",
      tagline: "Intensive Full-Stack & Systems Immersion",
      description: "Completed rigorous software engineering residency solving deep technical problems in distributed queues, microservice architectures, and scalable web apps.",
      metric: "Distributed Sandboxing & Microservices",
      achievements: ["Engineered BrewCode: A distributed JavaScript execution sandbox using Docker and BullMQ/Redis", "Built MentorsHub: Complete 1-on-1 mentorship platform with Socket.io chat and live video streaming", "Created ByteVerse: Production e-commerce store with RazorPay payment gateway integration"],
      skills: ["React", "Node.js", "Express.js", "MongoDB", "Docker", "Redis", "Socket.io"],
   },
   {
      id: "independent-consulting",
      company: "Freelance & Open Source",
      role: "Full-Stack Consultant",
      duration: "2023 - Present",
      type: "Contract",
      status: "active",
      tagline: "Custom Web Solutions & Architectural Advisory",
      description: "Delivering tailored web systems, performance optimization, and architectural consulting for early-stage products and open-source tooling.",
      metric: "Bespoke System Architecture",
      achievements: ["Authored reusable animation and UI utility libraries for modern web development", "Audited and optimized database queries, reducing latency on resource-constrained hosting environments", "Provided technical consultation on cross-platform mobile deployment strategies"],
      skills: ["Next.js", "TypeScript", "Tailwind CSS", "Architecture", "Git", "API Design"],
   },
];

function ExperienceTimelineItem({ exp, index }: { exp: ExperienceItem; index: number }) {
   const isLast = index === experiences.length - 1;

   return (
      <ScrollReveal delay={index * 0.1} direction="up" className="relative">
         <div className="relative flex items-start md:gap-8 group">
            {/* Left Timeline Spine Indicator (Visible only on md+ desktop / tablet screens) */}
            <div className="hidden md:flex flex-col items-center shrink-0 pt-7 relative self-stretch">
               {/* Marker node */}
               <div className="relative z-10 w-11 h-11 rounded-2xl bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/20 shadow-sm flex items-center justify-center group-hover:border-[#8A5A2B] dark:group-hover:border-[#D4A373] group-hover:scale-110 transition-all duration-300">
                  <div className={`w-3.5 h-3.5 rounded-full ${exp.status === "active" ? "bg-[#8A5A2B] dark:bg-[#D4A373] ring-4 ring-[#8A5A2B]/20 dark:ring-[#D4A373]/25" : "bg-[#A89F91] dark:bg-[#6E655C]"}`} />
               </div>

               {/* Step Index Badge below the node */}
               <span className="font-mono text-[11px] font-bold text-[#8A5A2B] dark:text-[#D4A373] mt-2 tracking-wider">0{index + 1}</span>

               {/* Vertical Connecting Line */}
               {!isLast && <div className="w-0.5 flex-1 bg-gradient-to-b from-[#E2DDD2] via-[#E2DDD2] dark:from-[#E5DFD3]/20 dark:via-[#E5DFD3]/15 to-transparent mt-2 group-hover:from-[#8A5A2B]/40 dark:group-hover:from-[#D4A373]/40 transition-colors duration-500" />}
            </div>

            {/* Experience TiltCard (Takes 100% full width on mobile/tablet) */}
            <div className="flex-1 pb-8 sm:pb-10 md:pb-12 w-full min-w-0">
               <TiltCard
                  max={6}
                  glare={true}
                  className="group/card relative p-5 sm:p-7 md:p-8 bg-white/95 dark:bg-[#181513]/95 backdrop-blur-xl border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_10px_35px_-10px_rgba(24,21,19,0.06)] hover:shadow-[0_20px_50px_-15px_rgba(138,90,43,0.12)] hover:border-[#8A5A2B]/40 dark:hover:border-[#D4A373]/30 transition-all duration-500 rounded-3xl sm:rounded-[2rem]"
               >
                  {/* Ambient subtle card glow highlight on hover */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#8A5A2B]/10 dark:bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                  {/* Header: Badges & Duration */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-5">
                     <div className="flex flex-wrap items-center gap-2">
                        {/* Mobile Step Badge */}
                        <span className="md:hidden font-mono text-[11px] font-bold text-[#8A5A2B] dark:text-[#D4A373] bg-[#EFECE4] dark:bg-[#231E1A] px-2.5 py-1 rounded-full border border-[#DCD6C8] dark:border-[#E5DFD3]/15">0{index + 1}</span>

                        <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 text-xs font-semibold text-[#181513] dark:text-[#E5DFD3]">
                           <Building2 size={13} className="text-[#8A5A2B] dark:text-[#D4A373]" />
                           <span>{exp.company}</span>
                        </div>
                        <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-[#EFECE4] dark:bg-[#231E1A] text-[#8A5A2B] dark:text-[#D4A373] border border-[#DCD6C8] dark:border-[#E5DFD3]/15">{exp.type}</span>
                        {exp.status === "active" && (
                           <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-2xs">
                              <span className="relative flex h-2 w-2">
                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              Active Role
                           </span>
                        )}
                     </div>

                     <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#6E655C] dark:text-[#A89F91] bg-[#EFECE4]/60 dark:bg-[#231E1A]/60 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-[#DCD6C8]/60 dark:border-[#E5DFD3]/10">
                        <Calendar size={13} className="text-[#8A5A2B] dark:text-[#D4A373]" />
                        <span>{exp.duration}</span>
                     </div>
                  </div>

                  {/* Role Title & Metric Highlights */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-4 mb-2">
                     <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#181513] dark:text-[#E5DFD3] tracking-tight group-hover/card:text-[#8A5A2B] dark:group-hover/card:text-[#D4A373] transition-colors">{exp.role}</h3>
                     {exp.metric && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A5A2B] dark:text-[#D4A373] bg-[#8A5A2B]/10 dark:bg-[#D4A373]/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-[#8A5A2B]/20 dark:border-[#D4A373]/20 shrink-0 self-start sm:self-auto">
                           <Zap size={12} className="fill-[#8A5A2B] dark:fill-[#D4A373]" />
                           {exp.metric}
                        </span>
                     )}
                  </div>

                  {/* Tagline & Narrative Description */}
                  <p className="text-xs sm:text-sm font-semibold text-[#8A5A2B] dark:text-[#D4A373] mb-2 sm:mb-3">{exp.tagline}</p>
                  <p className="text-xs sm:text-sm text-[#6E655C] dark:text-[#A89F91] leading-relaxed mb-4 sm:mb-6 font-normal">{exp.description}</p>

                  {/* Key Deliverables Bento Block */}
                  <div className="p-3.5 sm:p-4 md:p-5 rounded-2xl bg-[#EFECE4]/70 dark:bg-[#231E1A]/70 border border-[#E2DDD2] dark:border-[#E5DFD3]/10 mb-4 sm:mb-6 space-y-2 sm:space-y-2.5">
                     <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#181513] dark:text-[#E5DFD3] flex items-center gap-1.5 sm:gap-2 mb-1">
                        <Briefcase size={13} className="text-[#8A5A2B] dark:text-[#D4A373]" />
                        Core Responsibilities & Technical Highlights
                     </div>
                     {exp.achievements.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-[#4A433D] dark:text-[#D5CEC2]">
                           <CheckCircle2 size={14} className="text-[#8A5A2B] dark:text-[#D4A373] shrink-0 mt-0.5" />
                           <span className="leading-relaxed">{item}</span>
                        </div>
                     ))}
                  </div>

                  {/* Engineering Stack */}
                  <div className="space-y-1.5 sm:space-y-2">
                     <div className="text-[10px] font-semibold uppercase tracking-wider text-[#A89F91] dark:text-[#6E655C] flex items-center gap-1.5">
                        <Code2 size={12} />
                        Engineering Stack
                     </div>
                     <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {exp.skills.map((skill) => (
                           <span
                              key={skill}
                              className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-medium text-[#4A433D] dark:text-[#D5CEC2] bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 rounded-xl hover:border-[#8A5A2B] dark:hover:border-[#D4A373] hover:text-[#8A5A2B] dark:hover:text-[#D4A373] transition-colors duration-300 shadow-2xs"
                           >
                              {skill}
                           </span>
                        ))}
                     </div>
                  </div>
               </TiltCard>
            </div>
         </div>
      </ScrollReveal>
   );
}

export default function Experience() {
   const scrollToContact = () => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
   };

   return (
      <section id="experience" className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 relative z-10">
         {/* Subtle ambient light background */}
         <div className="absolute top-1/4 left-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#8A5A2B]/5 dark:bg-[#D4A373]/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
         <div className="absolute bottom-1/4 right-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#3D2D20]/10 dark:bg-[#3D2D20]/25 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

         <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <ScrollReveal>
               <div className="text-center mb-12 sm:mb-16">
                  <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 text-[#8A5A2B] dark:text-[#D4A373] text-xs font-semibold uppercase tracking-wider mb-4">
                     <Sparkles size={14} />
                     Career Journey & Impact
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#181513] dark:text-[#E5DFD3] tracking-tight mb-3 sm:mb-4">Work Experience & Milestones</h2>
                  <p className="text-base sm:text-lg text-[#6E655C] dark:text-[#A89F91] max-w-2xl mx-auto font-normal">A proven track record of architecting scalable web platforms, distributed systems, and cross-platform mobile apps.</p>
               </div>
            </ScrollReveal>

            {/* Seamless Flowing Timeline Layout: Spine shown on md+ screens, full-width cards on mobile */}
            <div className="relative">
               {experiences.map((exp, index) => (
                  <div key={exp.id} id={`exp-${exp.id}`} className="scroll-mt-28">
                     <ExperienceTimelineItem exp={exp} index={index} />
                  </div>
               ))}
            </div>

            {/* Collaboration & Hiring Invitation Call-to-Action Card */}
            <ScrollReveal delay={0.2} direction="up" className="mt-4 sm:mt-6">
               <TiltCard
                  max={4}
                  glare={true}
                  className="relative overflow-hidden p-6 sm:p-8 md:p-10 rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-white via-white to-[#EFECE4]/50 dark:from-[#181513] dark:via-[#181513] dark:to-[#231E1A]/60 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_15px_40px_-15px_rgba(24,21,19,0.08)] text-center sm:text-left"
               >
                  {/* Subtle accent glow blob */}
                  <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-[#8A5A2B]/10 dark:bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
                     <div className="space-y-2 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 text-[#8A5A2B] dark:text-[#D4A373] text-xs font-semibold">
                           <Handshake size={14} />
                           Open for New Opportunities
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#181513] dark:text-[#E5DFD3] tracking-tight">Want to build something extraordinary together?</h3>
                        <p className="text-xs sm:text-sm text-[#6E655C] dark:text-[#A89F91] leading-relaxed">Whether you have an upcoming project, are looking to scale your engineering team with a Full-Stack & Mobile engineer, or need an architectural consultation—let's connect.</p>
                     </div>

                     <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
                        <button onClick={scrollToContact} className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#181513] dark:bg-[#E5DFD3] hover:bg-[#8A5A2B] dark:hover:bg-[#D4A373] text-[#F7F5F0] dark:text-[#0B0A09] font-semibold text-sm shadow-md transition-all duration-300 cursor-pointer group">
                           <MessageSquare size={16} />
                           Start a Conversation
                           <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                     </div>
                  </div>
               </TiltCard>
            </ScrollReveal>
         </div>
      </section>
   );
}
