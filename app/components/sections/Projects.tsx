"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Code2, ExternalLink, Github, Layers, Sparkles } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import brewcode from "../../assets/projects/brewcode_mock.png";
import byteverse from "../../assets/projects/byteverse_mock.png";
import forge from "../../assets/projects/forge_mock.png";
import lifePartnerAgain from "../../assets/projects/lifepartneragain_mock.png";
import mentorshub from "../../assets/projects/mentorshub_mock.png";
import onboard from "../../assets/projects/onboard_mock.png";
import { startLenis, stopLenis } from "../../hooks/useLenis";
import ScrollReveal from "../animations/ScrollReveal";
import { TiltCard } from "../ui/tilt-card";

export interface ArchitectureStep {
   label: string;
   sublabel: string;
   tech: string;
}

export interface ProjectItem {
   id: string;
   title: string;
   subtitle: string;
   category: "Full-Stack" | "Mobile" | "Systems & Cloud" | "E-Commerce";
   description: string;
   image: StaticImageData | string;
   tech: string[];
   github?: string;
   live?: string;
   liveDemo: boolean;
   highlights: string[];
   featured?: boolean;
   architectureFlow?: ArchitectureStep[];
}

export const projects: ProjectItem[] = [
   {
      id: "mentorshub",
      title: "MentorsHub",
      subtitle: "Full-Stack Mentorship Platform",
      category: "Full-Stack",
      description: "A production-grade mentorship platform built following Clean Architecture principles, enabling 1-on-1 session bookings, mentor discovery, escrow wallet management, and real-time communications.",
      image: mentorshub,
      tech: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Redis", "Socket.io", "Razorpay"],
      github: "https://github.com/JasimIhsan/MentorsHub",
      liveDemo: true,
      live: "https://mentors-hub-in.vercel.app",
      highlights: [
         "Built 30+ REST APIs supporting authentication, mentor discovery, session booking, wallet management, reviews, and administration",
         "Implemented JWT authentication, Google OAuth, refresh token workflow, and Redis-based token blacklisting",
         "Integrated real-time chat, booking updates, notifications, and live session management using Socket.io",
         "Designed and developed the complete application independently, including frontend, backend, database architecture, and deployment workflows",
      ],
      featured: true,
      architectureFlow: [
         { label: "Frontend Layer", sublabel: "React.js & TypeScript UI with Tailwind CSS", tech: "React / TS" },
         { label: "Security & Auth", sublabel: "JWT, Google OAuth & Redis Token Blacklist", tech: "Redis / Auth" },
         { label: "Real-Time & APIs", sublabel: "30+ REST Endpoints & Socket.io Event Hub", tech: "Express.js" },
         { label: "Persistence & Payments", sublabel: "MongoDB Schemas & Razorpay Escrow Wallet", tech: "MongoDB" },
      ],
   },
   {
      id: "lifepartneragain",
      title: "Life Partner Again",
      subtitle: "Full-Stack Matrimonial Platform",
      category: "Mobile",
      description: "A full-stack matrimonial platform designed with verified profiles, geolocation services, subscriptions, and real-time voice and video communication.",
      image: lifePartnerAgain,
      tech: ["Flutter", "Node.js", "PostgreSQL", "Prisma ORM", "Redis", "AWS S3", "ZegoCloud", "RevenueCat"],
      liveDemo: false,
      live: "#",
      highlights: [
         "Developed full-stack matrimonial platform consisting of Flutter mobile app, Node.js backend, PostgreSQL DB, Redis caching, and React admin dashboard",
         "Built scalable REST APIs using Express.js, TypeScript, Prisma ORM, PostgreSQL, and Redis",
         "Implemented authentication, profile management, media uploads via AWS S3, geolocation services, and administrative workflows",
         "Integrated real-time voice and video communication using ZegoCloud and platform monetization via RevenueCat",
      ],
      featured: true,
      architectureFlow: [
         { label: "Flutter Client", sublabel: "Cross-Platform Mobile App & Admin Dashboard", tech: "Flutter / Dart" },
         { label: "Node.js & Prisma API", sublabel: "Scalable Modular REST Backend & Redis Caching", tech: "Express / TS" },
         { label: "Real-Time & Media", sublabel: "ZegoCloud Audio/Video & AWS S3 File Storage", tech: "ZegoCloud / S3" },
         { label: "Monetization & DB", sublabel: "RevenueCat In-App Purchases & PostgreSQL DB", tech: "PostgreSQL" },
      ],
   },
   {
      id: "brewcode",
      title: "Brew Code JS Compiler",
      subtitle: "Online JavaScript Compiler & IDE",
      category: "Systems & Cloud",
      description: "An online JavaScript compiler and learning platform enabling developers to write, execute, and debug JavaScript directly from the browser with a VS Code-like coding environment.",
      image: brewcode,
      tech: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Monaco Editor"],
      github: "https://github.com/JasimIhsan/Brew-Code-JS-Compiler",
      liveDemo: true,
      live: "https://brewcode.jasimihsan.in",
      highlights: [
         "Implemented Monaco Editor to deliver a VS Code-like coding and debugging experience directly in the browser",
         "Developed 15+ REST APIs for code execution, project management, and runtime diagnostics",
         "Built real-time output rendering, error handling, and code persistence functionality",
         "Architected modular backend services for safe JavaScript evaluation and workspace persistence",
      ],
      featured: true,
      architectureFlow: [
         { label: "Monaco Editor UI", sublabel: "React.js & TypeScript Code Editor Interface", tech: "Monaco / React" },
         { label: "Execution API Hub", sublabel: "15+ REST APIs for Code Runs & State Handling", tech: "Express.js" },
         { label: "Evaluation Runtime", sublabel: "Real-Time Output Rendering & Error Diagnostics", tech: "Node.js" },
         { label: "Snippet Persistence", sublabel: "Code Storage & Project Management Store", tech: "MongoDB" },
      ],
   },
   {
      id: "onboard-careers",
      title: "Onboard",
      subtitle: "Recruitment & Workforce Management Platform",
      category: "Full-Stack",
      description: "Recruitment and workforce management platform built with Next.js, React.js, TypeScript, Node.js, PostgreSQL, and Prisma ORM, featuring candidate search, filtering, and role-based workflows.",
      image: onboard,
      tech: ["Next.js", "React.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma ORM", "Tailwind CSS"],
      github: "https://github.com/muhammedsirajudeen/core-backend",
      liveDemo: true,
      live: "https://www.onboardcareers.in",
      highlights: [
         "Built authentication systems, role-based access control (RBAC), candidate management workflows, and employer dashboards",
         "Designed scalable REST APIs and optimized database operations for recruitment workflows",
         "Developed search, filtering, onboarding, reporting, and candidate tracking modules",
         "Improved maintainability through reusable component architecture and modular backend design",
      ],
      featured: true,
      architectureFlow: [
         { label: "Next.js Frontend", sublabel: "Server-Side Rendering & Reusable UI Components", tech: "Next.js / TS" },
         { label: "Access Control & RBAC", sublabel: "Candidate vs Employer Permissions & Auth", tech: "Middleware" },
         { label: "Prisma ORM Layer", sublabel: "Optimized Relational Queries & Data Schemas", tech: "PostgreSQL" },
         { label: "Recruitment Workflows", sublabel: "Search, Filtering, Onboarding & Reporting", tech: "Node APIs" },
      ],
   },
   {
      id: "forge-nearhirable",
      title: "NearHirable Engine (Forge)",
      subtitle: "Candidate Assessment & Code Readiness Platform",
      category: "Systems & Cloud",
      description: "An automated diagnostic assessment engine that analyzes developer fundamentals and pinpoints exactly whether a candidate is near-hirable or job-ready, generating customized improvement roadmaps.",
      image: forge,
      tech: ["Next.js", "MongoDB", "Tailwind CSS", "TypeScript", "Node.js"],
      github: "https://github.com/muhammedsirajudeen/near-hireable-platform-engine",
      liveDemo: true,
      live: "https://forge.onboardcareers.in",
      highlights: ["Automated scoring heuristics for developer core competencies", "Actionable candidate feedback reports with diagnostic metrics", "Seamless integration with recruiting assessment portals"],
      featured: true,
      architectureFlow: [
         { label: "Assessment Frontend", sublabel: "Diagnostic Test Engine", tech: "Next.js" },
         { label: "Scoring & Rubric Worker", sublabel: "Competency Analysis Heuristics", tech: "TypeScript" },
         { label: "Feedback Generator", sublabel: "Dynamic Roadmap Aggregator", tech: "Node.js" },
         { label: "Candidate Analytics DB", sublabel: "Historical Progress Tracking", tech: "MongoDB" },
      ],
   },
   {
      id: "byteverse",
      title: "Byteverse E-Commerce",
      subtitle: "Full-Stack Commerce & Payments",
      category: "E-Commerce",
      description: "Full-stack e-commerce web platform built with Node.js featuring secure checkout, RazorPay payment integration, dynamic catalog filtering, and order management.",
      image: byteverse,
      tech: ["Node.js", "Express.js", "MongoDB", "EJS", "RazorPay"],
      github: "https://github.com/JasimIhsan/Byteverse-E-commerse-website",
      liveDemo: false,
      live: "#",
      highlights: ["Multi-step checkout flow with RazorPay payment gateway integration and signature verification", "Product catalog with dynamic filtering, pagination, and inventory stock tracking", "Session-based cart state and secure authentication management"],
      architectureFlow: [
         { label: "E-Commerce UI", sublabel: "Server-rendered Catalog & Dynamic Filters", tech: "EJS / JS" },
         { label: "Order & Cart Logic", sublabel: "Stock Verification & Session Management", tech: "Express.js" },
         { label: "Payment Gateway", sublabel: "RazorPay Integration & Webhook Verification", tech: "RazorPay" },
         { label: "Database Layer", sublabel: "Transactional Orders, Users & Inventory Store", tech: "MongoDB" },
      ],
   },
];

const categories = ["All", "Full-Stack", "Mobile", "Systems & Cloud", "E-Commerce"] as const;

interface ProjectsProps {
   selectedProjectId?: string | null;
   onClearSelectedProject?: () => void;
}

export default function Projects({ selectedProjectId, onClearSelectedProject }: ProjectsProps = {}) {
   const [activeFilter, setActiveFilter] = useState<string>("All");
   const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
   const [modalTab, setModalTab] = useState<"overview" | "architecture">("overview");
   const tabsContainerRef = useRef<HTMLDivElement>(null);

   // Sync external project selection from command palette
   useEffect(() => {
      if (selectedProjectId) {
         const found = projects.find((p) => p.id === selectedProjectId);
         if (found) {
            setSelectedProject(found);
            setModalTab("overview");
            if (onClearSelectedProject) onClearSelectedProject();
         }
      }
   }, [selectedProjectId, onClearSelectedProject]);

   const filteredProjects = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

   const handleTabClick = (cat: string, e: React.MouseEvent<HTMLButtonElement>) => {
      setActiveFilter(cat);
      const btn = e.currentTarget;
      const container = tabsContainerRef.current;
      if (btn && container) {
         const containerRect = container.getBoundingClientRect();
         const btnRect = btn.getBoundingClientRect();

         // Auto-scroll when button reaches edge threshold
         const offsetLeft = btnRect.left - containerRect.left;
         const offsetRight = containerRect.right - btnRect.right;
         const threshold = 70; // 70px edge threshold

         if (offsetLeft < threshold || offsetRight < threshold) {
            const targetScrollLeft = container.scrollLeft + (btnRect.left - containerRect.left) - containerRect.width / 2 + btnRect.width / 2;
            container.scrollTo({
               left: targetScrollLeft,
               behavior: "smooth",
            });
         }
      }
   };

   useEffect(() => {
      const handleEsc = (event: KeyboardEvent) => {
         if (event.key === "Escape" && selectedProject) {
            setSelectedProject(null);
         }
      };

      if (selectedProject) {
         stopLenis();
         document.documentElement.style.overflow = "hidden";
         document.body.style.overflow = "hidden";
      } else {
         startLenis();
         document.documentElement.style.overflow = "";
         document.body.style.overflow = "";
      }

      window.addEventListener("keydown", handleEsc);
      return () => {
         startLenis();
         document.documentElement.style.overflow = "";
         document.body.style.overflow = "";
         window.removeEventListener("keydown", handleEsc);
      };
   }, [selectedProject]);

   return (
      <section id="projects" className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 relative z-10">
         {/* Subtle ambient light */}
         <div className="absolute top-1/4 right-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#8A5A2B]/5 dark:bg-[#D4A373]/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

         <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <ScrollReveal>
               <div className="text-center mb-12 sm:mb-16">
                  <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 text-[#8A5A2B] dark:text-[#D4A373] text-xs font-semibold uppercase tracking-wider mb-4">
                     <Sparkles size={14} />
                     Crafted With Precision
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#181513] dark:text-[#E5DFD3] tracking-tight mb-3 sm:mb-4">Featured Engineering Projects</h2>
                  <p className="text-base sm:text-lg text-[#6E655C] dark:text-[#A89F91] max-w-2xl mx-auto font-normal">A showcase of production web applications, distributed queue systems, and mobile applications built with modern tools.</p>
               </div>
            </ScrollReveal>

            {/* Filter Tabs */}
            <div className="flex justify-center mb-10 sm:mb-16">
               <div ref={tabsContainerRef} className="w-full max-w-full overflow-x-auto no-scrollbar py-1 px-3 sm:px-0 flex justify-start sm:justify-center scroll-smooth">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-xs min-w-max mx-auto sm:mx-0">
                     {categories.map((cat) => {
                        const isSelected = activeFilter === cat;
                        return (
                           <button
                              key={cat}
                              onClick={(e) => handleTabClick(cat, e)}
                              className={`relative px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-300 cursor-pointer shrink-0 ${isSelected ? "text-[#F7F5F0] dark:text-[#0B0A09]" : "text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3]"}`}
                           >
                              {isSelected && <motion.div layoutId="activeProjectCategory" className="absolute inset-0 rounded-xl bg-[#181513] dark:bg-[#E5DFD3] shadow-sm" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                              <span className="relative z-10 whitespace-nowrap">{cat}</span>
                           </button>
                        );
                     })}
                  </div>
               </div>
            </div>

            {/* Project Grid */}
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
               <AnimatePresence>
                  {filteredProjects.map((project) => (
                     <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>
                        <TiltCard
                           max={8}
                           glare={true}
                           className="h-full flex flex-col bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_10px_35px_-12px_rgba(24,21,19,0.06)] hover:shadow-[0_20px_45px_-10px_rgba(138,90,43,0.12)] transition-shadow duration-300 group cursor-pointer rounded-[2rem]"
                           onClick={() => setSelectedProject(project)}
                        >
                           {/* Project Image Header */}
                           <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ECE8DF]/70 dark:bg-[#141210] border-b border-[#E2DDD2] dark:border-[#E5DFD3]/10 flex items-center justify-center p-3 sm:p-4">
                              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/10 dark:to-black/30 pointer-events-none" />

                              <div className="relative w-full h-full">
                                 <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] group-hover:scale-[1.03] transition-transform duration-500 ease-out" />
                              </div>

                              {/* Category Badge */}
                              <div className="absolute top-3.5 left-3.5 z-10">
                                 <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold rounded-full bg-white/95 dark:bg-[#181513]/95 backdrop-blur-md text-[#181513] dark:text-[#E5DFD3] shadow-xs border border-white/50 dark:border-[#E5DFD3]/15">{project.category}</span>
                              </div>

                              {/* Live indicator if live */}
                              {project.liveDemo && (
                                 <div className="absolute top-3.5 right-3.5 z-10">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-medium rounded-full bg-emerald-600 text-white backdrop-blur-md shadow-xs">
                                       <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                       Live
                                    </span>
                                 </div>
                              )}
                           </div>

                           {/* Project Body */}
                           <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                              <div>
                                 <div className="text-xs font-medium text-[#8A5A2B] dark:text-[#D4A373] mb-1">{project.subtitle}</div>
                                 <h3 className="text-lg sm:text-xl font-bold text-[#181513] dark:text-[#E5DFD3] mb-2 sm:mb-3 group-hover:text-[#8A5A2B] dark:group-hover:text-[#D4A373] transition-colors flex items-center justify-between">
                                    <span>{project.title}</span>
                                    <ArrowUpRight size={18} className="text-[#A89F91] group-hover:text-[#8A5A2B] dark:group-hover:text-[#D4A373] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" />
                                 </h3>
                                 <p className="text-xs sm:text-sm text-[#6E655C] dark:text-[#A89F91] line-clamp-3 leading-relaxed mb-4 sm:mb-6 font-normal">{project.description}</p>
                              </div>

                              {/* Tech Stack Chips & Action Link */}
                              <div>
                                 <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
                                    {project.tech.slice(0, 3).map((t) => (
                                       <span key={t} className="px-2.5 py-1 text-[11px] sm:text-xs font-medium text-[#4A433D] dark:text-[#D5CEC2] bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/10 rounded-md">
                                          {t}
                                       </span>
                                    ))}
                                    {project.tech.length > 3 && <span className="px-2 py-1 text-[11px] sm:text-xs font-medium text-[#6E655C] dark:text-[#A89F91] bg-[#EFECE4] dark:bg-[#231E1A] rounded-md">+{project.tech.length - 3}</span>}
                                 </div>

                                 <div className="flex items-center justify-between pt-3.5 sm:pt-4 border-t border-[#EFECE4] dark:border-[#E5DFD3]/10 text-xs font-semibold text-[#8A5A2B] dark:text-[#D4A373]">
                                    <span>View Details & Specs</span>
                                    <span className="text-[#A89F91] dark:text-[#6E655C] font-normal group-hover:text-[#8A5A2B] dark:group-hover:text-[#D4A373] transition-colors">Inspect →</span>
                                 </div>
                              </div>
                           </div>
                        </TiltCard>
                     </motion.div>
                  ))}
               </AnimatePresence>
            </motion.div>
         </div>

         {/* Detailed Project Modal with beUI backdrop & spring motion rendered via Portal */}
         {typeof document !== "undefined" &&
            createPortal(
               <AnimatePresence>
                  {selectedProject && (
                     <motion.div
                        data-lenis-prevent="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/80 dark:bg-black/92 backdrop-blur-md z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
                        onClick={() => setSelectedProject(null)}
                     >
                        <motion.div
                           data-lenis-prevent="true"
                           initial={{ scale: 0.95, opacity: 0, y: 15 }}
                           animate={{ scale: 1, opacity: 1, y: 0 }}
                           exit={{ scale: 0.95, opacity: 0, y: 15 }}
                           transition={{ type: "spring", stiffness: 350, damping: 30 }}
                           className="bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 rounded-3xl md:rounded-[2rem] max-w-5xl w-full h-[90vh] sm:h-[86vh] md:h-[82vh] max-h-[90vh] sm:max-h-[86vh] md:max-h-[82vh] overflow-hidden shadow-2xl relative flex flex-col md:grid md:grid-cols-12"
                           onClick={(e) => e.stopPropagation()}
                        >
                           {/* Left Column: MacBook Device Showcase */}
                           <div className="md:col-span-6 lg:col-span-7 bg-[#ECE8DF]/60 dark:bg-[#12100E] border-b md:border-b-0 md:border-r border-[#E2DDD2] dark:border-[#E5DFD3]/10 flex flex-col justify-between p-4 sm:p-7 relative overflow-hidden shrink-0 h-auto md:h-full min-h-0">
                              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/10 dark:to-black/35 pointer-events-none" />

                              {/* Category & Status badges */}
                              <div className="flex items-center justify-between z-10 mb-2 sm:mb-4">
                                 <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-[#231E1A]/95 backdrop-blur-md border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-[#8A5A2B] dark:text-[#D4A373] text-[11px] sm:text-xs font-semibold uppercase tracking-wider shadow-2xs">{selectedProject.category}</span>
                                 {selectedProject.liveDemo && selectedProject.live && selectedProject.live !== "#" ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] sm:text-xs font-medium rounded-full bg-emerald-600 text-white shadow-xs">
                                       <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                       Live Platform
                                    </span>
                                 ) : (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] sm:text-xs font-medium rounded-full bg-[#EFECE4] dark:bg-[#231E1A] text-[#8A5A2B] dark:text-[#D4A373] border border-[#DCD6C8] dark:border-[#E5DFD3]/15">
                                       <span className="w-1.5 h-1.5 rounded-full bg-[#8A5A2B] dark:bg-[#D4A373]" />
                                       Production Architecture
                                    </span>
                                 )}
                              </div>

                              {/* Laptop Preview */}
                              <div className="flex-1 flex items-center justify-center py-2 sm:py-6 z-10 relative min-h-[160px] sm:min-h-[240px] md:min-h-[320px]">
                                 <Image src={selectedProject.image} alt={selectedProject.title} fill sizes="(max-width: 768px) 90vw, 500px" className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]" />
                              </div>

                              {/* Desktop hint */}
                              <div className="hidden md:flex items-center justify-between text-[11px] text-[#A89F91] dark:text-[#6E655C] font-mono z-10 pt-2">
                                 <span>Production Build Architecture</span>
                                 <span>Interactive Preview</span>
                              </div>
                           </div>

                           {/* Right Column: Project Dossier & Scrollable Content */}
                           <div className="md:col-span-6 lg:col-span-5 flex flex-col h-full max-h-full overflow-hidden bg-white dark:bg-[#181513] min-h-0">
                              {/* Modal Header Bar with Tab Switcher, Category & Close Button */}
                              <div className="px-4 sm:px-5 py-3 sm:py-3.5 border-b border-[#EFECE4] dark:border-[#E5DFD3]/10 flex items-center justify-between gap-3 shrink-0 bg-white/50 dark:bg-[#181513]/50 backdrop-blur-sm z-10">
                                 <div className="flex items-center gap-1 p-1 rounded-xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15">
                                    <button
                                       onClick={() => setModalTab("overview")}
                                       className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${modalTab === "overview" ? "bg-white dark:bg-[#181513] text-[#8A5A2B] dark:text-[#D4A373] shadow-xs" : "text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3]"}`}
                                    >
                                       Overview
                                    </button>
                                    <button
                                       onClick={() => setModalTab("architecture")}
                                       className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${modalTab === "architecture" ? "bg-white dark:bg-[#181513] text-[#8A5A2B] dark:text-[#D4A373] shadow-xs" : "text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3]"}`}
                                    >
                                       <Sparkles size={12} />
                                       Architecture
                                    </button>
                                 </div>

                                 <div className="flex items-center gap-2">
                                    <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono text-[#8A5A2B] dark:text-[#D4A373] bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/10 uppercase font-semibold truncate max-w-[120px]">{selectedProject.category}</span>
                                    <button
                                       onClick={() => setSelectedProject(null)}
                                       className="w-8 h-8 rounded-xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 flex items-center justify-center text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-white hover:border-[#8A5A2B] dark:hover:border-[#D4A373] transition-all cursor-pointer shadow-2xs group shrink-0"
                                       aria-label="Close modal"
                                    >
                                       <span className="text-xs font-bold group-hover:scale-110 transition-transform">✕</span>
                                    </button>
                                 </div>
                              </div>

                              {/* Scrollable details */}
                              <div data-lenis-prevent="true" className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto overscroll-contain flex-1 custom-scrollbar min-h-0 touch-pan-y">
                                 {modalTab === "overview" ? (
                                    <>
                                       <div>
                                          <div className="text-xs font-semibold text-[#8A5A2B] dark:text-[#D4A373] uppercase tracking-wider mb-1">{selectedProject.subtitle}</div>
                                          <h3 className="text-lg sm:text-2xl font-extrabold text-[#181513] dark:text-[#E5DFD3] tracking-tight mb-2 sm:mb-3">{selectedProject.title}</h3>
                                          <p className="text-xs sm:text-sm text-[#6E655C] dark:text-[#A89F91] leading-relaxed font-normal">{selectedProject.description}</p>
                                       </div>

                                       {/* Architectural Highlights */}
                                       <div>
                                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#A89F91] mb-2.5 sm:mb-3 flex items-center gap-2">
                                             <Code2 size={16} className="text-[#8A5A2B] dark:text-[#D4A373]" />
                                             Key Features & Architecture
                                          </h4>
                                          <div className="space-y-2">
                                             {selectedProject.highlights.map((h, i) => (
                                                <div key={i} className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#EFECE4]/70 dark:bg-[#231E1A]/80 border border-[#DCD6C8] dark:border-[#E5DFD3]/10 text-xs sm:text-sm text-[#4A433D] dark:text-[#D5CEC2]">
                                                   <div className="w-1.5 h-1.5 rounded-full bg-[#8A5A2B] dark:bg-[#D4A373] mt-1.5 shrink-0" />
                                                   <span className="leading-snug">{h}</span>
                                                </div>
                                             ))}
                                          </div>
                                       </div>

                                       {/* Tech Stack */}
                                       <div>
                                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#A89F91] mb-2.5 sm:mb-3 flex items-center gap-2">
                                             <Layers size={16} className="text-[#8A5A2B] dark:text-[#D4A373]" />
                                             Tech Stack & Tools
                                          </h4>
                                          <div className="flex flex-wrap gap-1.5">
                                             {selectedProject.tech.map((t) => (
                                                <span key={t} className="px-2.5 py-1 text-xs font-semibold text-[#181513] dark:text-[#E5DFD3] bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 rounded-lg">
                                                   {t}
                                                </span>
                                             ))}
                                          </div>
                                       </div>
                                    </>
                                 ) : (
                                    /* System Architecture Blueprint Flow with Perfect Node & Line Alignment */
                                    <div className="space-y-4 sm:space-y-5">
                                       <div>
                                          <div className="text-xs font-semibold text-[#8A5A2B] dark:text-[#D4A373] uppercase tracking-wider mb-1">System Architecture Blueprint</div>
                                          <h3 className="text-lg sm:text-xl font-extrabold text-[#181513] dark:text-[#E5DFD3] tracking-tight mb-1.5 sm:mb-2">End-to-End Data Pipeline</h3>
                                          <p className="text-xs text-[#6E655C] dark:text-[#A89F91] leading-relaxed">Visual breakdown of how requests, state transitions, security layers, and data flows operate in production.</p>
                                       </div>

                                       {/* Interactive Pipeline Diagram: Flex Spine for 100% Center Alignment */}
                                       <div className="space-y-2.5 sm:space-y-3 pt-1">
                                          {(selectedProject.architectureFlow || []).map((step, idx) => {
                                             const isLast = idx === (selectedProject.architectureFlow?.length || 0) - 1;
                                             return (
                                                <div key={idx} className="flex items-stretch gap-3 sm:gap-3.5 group">
                                                   {/* Timeline Spine Column */}
                                                   <div className="flex flex-col items-center shrink-0 w-3.5 pt-3">
                                                      <div className="w-3 h-3 rounded-full bg-white dark:bg-[#181513] border-2 border-[#8A5A2B] dark:border-[#D4A373] shadow-xs group-hover:scale-125 transition-transform shrink-0 z-10" />
                                                      {!isLast && <div className="w-[2px] flex-1 bg-gradient-to-b from-[#8A5A2B] via-[#D4A373] to-[#8A5A2B]/20 my-1 group-hover:from-[#8A5A2B] group-hover:to-[#D4A373] transition-colors" />}
                                                   </div>

                                                   {/* Step Card */}
                                                   <div className="flex-1 p-3 sm:p-3.5 rounded-2xl bg-[#EFECE4]/80 dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/10 hover:border-[#8A5A2B]/40 dark:hover:border-[#D4A373]/40 transition-all shadow-2xs">
                                                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                                                         <span className="text-xs font-bold text-[#181513] dark:text-[#E5DFD3]">{step.label}</span>
                                                         <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-[#181513] text-[#8A5A2B] dark:text-[#D4A373] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 font-semibold">{step.tech}</span>
                                                      </div>
                                                      <p className="text-xs text-[#6E655C] dark:text-[#A89F91] leading-relaxed font-normal">{step.sublabel}</p>
                                                   </div>
                                                </div>
                                             );
                                          })}
                                       </div>
                                    </div>
                                 )}
                              </div>

                              {/* Pinned Action Footer */}
                              <div className="p-3.5 sm:p-4 md:p-5 bg-[#EFECE4] dark:bg-[#110E0C] border-t border-[#E2DDD2] dark:border-[#E5DFD3]/10 flex flex-wrap gap-2.5 items-center justify-between shrink-0">
                                 <div className="flex flex-wrap items-center gap-2">
                                    {selectedProject.github && (
                                       <a
                                          href={selectedProject.github}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-white dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-xs font-semibold text-[#181513] dark:text-[#E5DFD3] hover:border-[#8A5A2B] dark:hover:border-[#D4A373] transition-all shadow-2xs hover:scale-[1.02]"
                                       >
                                          <Github size={14} />
                                          <span>GitHub</span>
                                       </a>
                                    )}
                                    {selectedProject.liveDemo && selectedProject.live && selectedProject.live !== "#" && (
                                       <a
                                          href={selectedProject.live}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#181513] dark:bg-[#E5DFD3] text-[#F7F5F0] dark:text-[#0B0A09] hover:bg-[#8A5A2B] dark:hover:bg-[#D4A373] text-xs font-semibold transition-all shadow-sm hover:scale-[1.02]"
                                       >
                                          <ExternalLink size={14} />
                                          <span>Live Platform</span>
                                       </a>
                                    )}
                                    {/* Informative client/enterprise badge when no public repo/live links exist */}
                                    {!selectedProject.github && (!selectedProject.liveDemo || !selectedProject.live || selectedProject.live === "#") && (
                                       <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-[#181513]/80 border border-[#DCD6C8] dark:border-[#E5DFD3]/15 text-xs text-[#6E655C] dark:text-[#A89F91]">
                                          <span className="w-2 h-2 rounded-full bg-[#8A5A2B] dark:bg-[#D4A373]" />
                                          <span className="font-medium text-[11px] sm:text-xs">Enterprise Protected Architecture</span>
                                       </div>
                                    )}
                                 </div>

                                 <button
                                    onClick={() => setSelectedProject(null)}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-xs font-semibold text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3] hover:border-[#8A5A2B] dark:hover:border-[#D4A373] transition-all cursor-pointer shadow-2xs hover:scale-[1.02]"
                                 >
                                    <span>Close Window</span>
                                 </button>
                              </div>
                           </div>
                        </motion.div>
                     </motion.div>
                  )}
               </AnimatePresence>,
               document.body
            )}
      </section>
   );
}
