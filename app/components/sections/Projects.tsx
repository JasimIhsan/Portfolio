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
      id: "lifepartneragain",
      title: "Life Partner Again",
      subtitle: "Mobile Matchmaking Ecosystem",
      category: "Mobile",
      description: "A bespoke matrimony and companionship platform engineered specifically for middle-aged individuals. Focuses on privacy-first verified member profiles, real-time matchmaking algorithms, and end-to-end trust workflows.",
      image: lifePartnerAgain,
      tech: ["Flutter", "Dart", "REST API", "State Management", "Firebase"],
      liveDemo: false,
      live: "#",
      highlights: ["Full cross-platform Flutter application with custom smooth motion design", "Privacy-centric architecture with secure verification mechanisms", "Tailored onboarding flow optimized for effortless user adoption"],
      featured: true,
      architectureFlow: [
         { label: "Flutter Client", sublabel: "BLoC State Management", tech: "Dart / UI" },
         { label: "Auth & Privacy Gateway", sublabel: "Strict KYC & Token Audits", tech: "REST API" },
         { label: "Matchmaking Engine", sublabel: "Criteria Heuristics & Filters", tech: "Node.js" },
         { label: "Push Notification Hub", sublabel: "Zero-Latency Delivery", tech: "Firebase FCM" },
      ],
   },
   {
      id: "onboard-careers",
      title: "Onboard Careers",
      subtitle: "Maritime & Cruise Recruitment Portal",
      category: "Full-Stack",
      description: "Dedicated recruitment portal bridging aspiring professionals with maritime career opportunities worldwide. Features intelligent talent matching, candidate dashboards, and automated recruitment pipelines.",
      image: onboard,
      tech: ["Next.js", "PostgreSQL", "Prisma ORM", "Tailwind CSS", "TypeScript"],
      github: "https://github.com/muhammedsirajudeen/core-backend",
      liveDemo: true,
      live: "https://www.onboardcareers.in",
      highlights: ["Complex relational schema with PostgreSQL & Prisma", "High-performance Next.js application with fast server-side data fetching", "Custom candidate application workflows and role filters"],
      featured: true,
      architectureFlow: [
         { label: "Next.js Frontend", sublabel: "Server Components & Fast SSR", tech: "React / TS" },
         { label: "Role & Permission Router", sublabel: "Candidate vs Recruiter Scopes", tech: "Next Middleware" },
         { label: "Prisma ORM Layer", sublabel: "Optimized Relational Queries", tech: "PostgreSQL" },
         { label: "Application Pipeline", sublabel: "Status & Candidate Webhooks", tech: "Node APIs" },
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
      id: "brewcode",
      title: "BrewCode JS Compiler",
      subtitle: "Visual Code Sandbox & Queue Worker",
      category: "Systems & Cloud",
      description: "A distributed JavaScript compilation sandbox that translates code execution into visual event loop queue representations using asynchronous job queue management.",
      image: brewcode,
      tech: ["Next.js", "Docker", "BullMQ", "Redis", "TypeScript", "Node.js"],
      github: "https://github.com/JasimIhsan/Brew-Code-JS-Compiler",
      liveDemo: true,
      live: "https://brewcode.jasimihsan.in",
      highlights: ["Isolated sandbox execution with Docker containers", "Distributed async task queues handled via BullMQ and Redis", "Interactive visual animation showing Call Stack & Event Loop ticks"],
      featured: true,
      architectureFlow: [
         { label: "Code Editor UI", sublabel: "Interactive Monaco Console", tech: "Next.js" },
         { label: "BullMQ Job Producer", sublabel: "Async Execution Dispatcher", tech: "Redis Queue" },
         { label: "Docker Worker Sandbox", sublabel: "Isolated Runtime Container", tech: "Node.js VM" },
         { label: "Event Loop Visualizer", sublabel: "Call Stack & Microtask Ticks", tech: "WebSockets" },
      ],
   },
   {
      id: "mentorshub",
      title: "MentorsHub",
      subtitle: "Live Mentorship & Video Platform",
      category: "Full-Stack",
      description: "Complete platform for booking mentorship sessions, real-time chat, 1-on-1 video calling, payment escrow wallets, and granular administrative governance.",
      image: mentorshub,
      tech: ["React.js", "TypeScript", "Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/JasimIhsan/MentorsHub",
      liveDemo: true,
      live: "https://mentors-hub-in.vercel.app",
      highlights: ["Real-time bidirectional communication powered by Socket.io", "Integrated scheduling calendar with automated slot management", "Complete admin dashboard with revenue analytics and payout controls"],
      architectureFlow: [
         { label: "React Dashboard", sublabel: "Client Booking & Chatroom", tech: "TypeScript" },
         { label: "Socket.io Signaling", sublabel: "Real-Time 1-on-1 WebRTC", tech: "WebSockets" },
         { label: "Escrow & Payout Engine", sublabel: "Session Verification Ledger", tech: "Node.js" },
         { label: "Persistent Store", sublabel: "Users, Slots & Booking DB", tech: "MongoDB" },
      ],
   },
   {
      id: "byteverse",
      title: "Byteverse E-Commerce",
      subtitle: "Full-Stack Commerce & Payments",
      category: "E-Commerce",
      description: "Comprehensive e-commerce platform built with Node.js featuring secure checkout, RazorPay gateway integration, inventory tracking, and discount engine.",
      image: byteverse,
      tech: ["Node.js", "MongoDB", "Ejs", "RazorPay", "Express.js"],
      github: "https://github.com/JasimIhsan/Byteverse-E-commerse-website",
      liveDemo: false,
      live: "#",
      highlights: ["Multi-step checkout flow with RazorPay payment gateway integration", "Product catalog with dynamic filtering and variant management", "Session-based cart state with stock verification safeguards"],
      architectureFlow: [
         { label: "E-Commerce Storefront", sublabel: "Catalog & Dynamic Filter", tech: "EJS / JS" },
         { label: "Session & Cart Engine", sublabel: "Stock Verification Safeguards", tech: "Express.js" },
         { label: "Payment Gateway", sublabel: "Webhook & Signature Verification", tech: "RazorPay" },
         { label: "Orders & Inventory DB", sublabel: "Transactional State Records", tech: "MongoDB" },
      ],
   },
   // {
   //    id: "usermanagement",
   //    title: "User Management System",
   //    subtitle: "RBAC & Authentication Engine",
   //    category: "Full-Stack",
   //    description:
   //       "Robust administrative dashboard with role-based access control (RBAC), user state lifecycle management, token-based authentication, and profile audits.",
   //    image: usermanagement,
   //    tech: ["React", "TypeScript", "MongoDB", "Express.js", "JWT"],
   //    github: "https://github.com/JasimIhsan/User_Management",
   //    liveDemo: false,
   //    live: "#",
   //    highlights: [
   //       "Granular Role-Based Access Control and permission scopes",
   //       "Type-safe frontend and backend APIs with TypeScript",
   //       "Fast administrative search, pagination, and bulk batch actions",
   //    ],
   // },
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
      <section id="projects" className="py-28 px-6 relative z-10">
         {/* Subtle ambient light */}
         <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#8A5A2B]/5 dark:bg-[#D4A373]/5 rounded-full blur-[120px] pointer-events-none" />

         <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <ScrollReveal>
               <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 text-[#8A5A2B] dark:text-[#D4A373] text-xs font-semibold uppercase tracking-wider mb-4">
                     <Sparkles size={14} />
                     Crafted With Precision
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#181513] dark:text-[#E5DFD3] tracking-tight mb-4">Featured Engineering Projects</h2>
                  <p className="text-lg text-[#6E655C] dark:text-[#A89F91] max-w-2xl mx-auto font-normal">A showcase of production web applications, distributed queue systems, and mobile applications built with modern tools.</p>
               </div>
            </ScrollReveal>

            {/* Filter Tabs */}
            <div className="flex justify-center mb-12 sm:mb-16">
               <div ref={tabsContainerRef} className="w-full max-w-full overflow-x-auto no-scrollbar py-1 px-4 sm:px-0 flex justify-start sm:justify-center scroll-smooth">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-xs min-w-max">
                     {categories.map((cat) => {
                        const isSelected = activeFilter === cat;
                        return (
                           <button
                              key={cat}
                              onClick={(e) => handleTabClick(cat, e)}
                              className={`relative px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-300 cursor-pointer shrink-0 ${isSelected ? "text-[#F7F5F0] dark:text-[#0B0A09]" : "text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3]"}`}
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
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               <AnimatePresence>
                  {filteredProjects.map((project) => (
                     <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>
                        <TiltCard
                           max={8}
                           glare={true}
                           className="h-full flex flex-col bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_10px_35px_-12px_rgba(24,21,19,0.06)] hover:shadow-[0_20px_45px_-10px_rgba(138,90,43,0.12)] transition-shadow duration-300 group cursor-pointer"
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
                                 <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/95 dark:bg-[#181513]/95 backdrop-blur-md text-[#181513] dark:text-[#E5DFD3] shadow-xs border border-white/50 dark:border-[#E5DFD3]/15">{project.category}</span>
                              </div>

                              {/* Live indicator if live */}
                              {project.liveDemo && (
                                 <div className="absolute top-3.5 right-3.5 z-10">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-emerald-600 text-white backdrop-blur-md shadow-xs">
                                       <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                       Live
                                    </span>
                                 </div>
                              )}
                           </div>

                           {/* Project Body */}
                           <div className="p-7 flex-1 flex flex-col justify-between">
                              <div>
                                 <div className="text-xs font-medium text-[#8A5A2B] dark:text-[#D4A373] mb-1">{project.subtitle}</div>
                                 <h3 className="text-xl font-bold text-[#181513] dark:text-[#E5DFD3] mb-3 group-hover:text-[#8A5A2B] dark:group-hover:text-[#D4A373] transition-colors flex items-center justify-between">
                                    <span>{project.title}</span>
                                    <ArrowUpRight size={18} className="text-[#A89F91] group-hover:text-[#8A5A2B] dark:group-hover:text-[#D4A373] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                 </h3>
                                 <p className="text-sm text-[#6E655C] dark:text-[#A89F91] line-clamp-3 leading-relaxed mb-6 font-normal">{project.description}</p>
                              </div>

                              {/* Tech Stack Chips & Action Link */}
                              <div>
                                 <div className="flex flex-wrap gap-1.5 mb-5">
                                    {project.tech.slice(0, 3).map((t) => (
                                       <span key={t} className="px-2.5 py-1 text-xs font-medium text-[#4A433D] dark:text-[#D5CEC2] bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/10 rounded-md">
                                          {t}
                                       </span>
                                    ))}
                                    {project.tech.length > 3 && <span className="px-2 py-1 text-xs font-medium text-[#6E655C] dark:text-[#A89F91] bg-[#EFECE4] dark:bg-[#231E1A] rounded-md">+{project.tech.length - 3}</span>}
                                 </div>

                                 <div className="flex items-center justify-between pt-4 border-t border-[#EFECE4] dark:border-[#E5DFD3]/10 text-xs font-semibold text-[#8A5A2B] dark:text-[#D4A373]">
                                    <span>View Details & Specs</span>
                                    <span className="text-[#A89F91] dark:text-[#6E655C] font-normal group-hover:text-[#8A5A2B] dark:group-hover:text-[#D4A373] transition-colors">Click to inspect →</span>
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/80 dark:bg-black/92 backdrop-blur-md z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden"
                        onClick={() => setSelectedProject(null)}
                        onWheel={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                     >
                        <motion.div
                           initial={{ scale: 0.95, opacity: 0, y: 15 }}
                           animate={{ scale: 1, opacity: 1, y: 0 }}
                           exit={{ scale: 0.95, opacity: 0, y: 15 }}
                           transition={{ type: "spring", stiffness: 350, damping: 30 }}
                           className="bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 rounded-3xl md:rounded-[2rem] max-w-5xl w-full max-h-[90vh] md:max-h-[85vh] overflow-hidden shadow-2xl relative flex flex-col md:grid md:grid-cols-12"
                           onClick={(e) => e.stopPropagation()}
                        >
                           {/* Close button */}
                           {/* <button
                              onClick={() => setSelectedProject(null)}
                              className="absolute top-4 right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 dark:bg-[#231E1A]/90 backdrop-blur-md border border-[#E2DDD2] dark:border-[#E5DFD3]/15 flex items-center justify-center text-[#6E655C] dark:text-[#E5DFD3] hover:text-[#181513] dark:hover:text-white shadow-md hover:scale-105 transition-all cursor-pointer"
                              aria-label="Close modal"
                           >
                              <X size={18} />
                           </button> */}

                           {/* Left Column: MacBook Device Showcase */}
                           <div className="md:col-span-6 lg:col-span-7 bg-[#ECE8DF]/60 dark:bg-[#12100E] border-b md:border-b-0 md:border-r border-[#E2DDD2] dark:border-[#E5DFD3]/10 flex flex-col justify-between p-5 sm:p-7 relative overflow-hidden shrink-0">
                              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/10 dark:to-black/35 pointer-events-none" />

                              {/* Category & Status badges */}
                              <div className="flex items-center justify-between z-10 mb-2 sm:mb-4">
                                 <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-[#231E1A]/95 backdrop-blur-md border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-[#8A5A2B] dark:text-[#D4A373] text-xs font-semibold uppercase tracking-wider shadow-2xs">{selectedProject.category}</span>
                                 {selectedProject.liveDemo && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-emerald-600 text-white shadow-xs">
                                       <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                       Live Platform
                                    </span>
                                 )}
                              </div>

                              {/* Laptop Preview */}
                              <div className="flex-1 flex items-center justify-center py-2 sm:py-6 z-10 relative min-h-[180px] sm:min-h-[260px] md:min-h-[340px]">
                                 <Image src={selectedProject.image} alt={selectedProject.title} fill sizes="(max-width: 768px) 90vw, 500px" className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]" />
                              </div>

                              {/* Desktop hint */}
                              <div className="hidden md:flex items-center justify-between text-[11px] text-[#A89F91] dark:text-[#6E655C] font-mono z-10 pt-2">
                                 <span>Production Build Architecture</span>
                                 <span>Interactive Preview</span>
                              </div>
                           </div>

                           {/* Right Column: Project Dossier & Scrollable Content */}
                           <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between overflow-hidden bg-white dark:bg-[#181513] flex-1">
                              {/* Modal Tab Switcher */}
                              <div className="px-5 pt-5 pb-2 sm:px-7 border-b border-[#EFECE4] dark:border-[#E5DFD3]/10 flex items-center justify-between">
                                 <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15">
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
                                 <span className="text-[11px] font-mono text-[#A89F91] dark:text-[#6E655C] uppercase">{selectedProject.category}</span>
                              </div>

                              {/* Scrollable details */}
                              <div className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
                                 {modalTab === "overview" ? (
                                    <>
                                       <div>
                                          <div className="text-xs font-semibold text-[#8A5A2B] dark:text-[#D4A373] uppercase tracking-wider mb-1">{selectedProject.subtitle}</div>
                                          <h3 className="text-xl sm:text-2xl font-extrabold text-[#181513] dark:text-[#E5DFD3] tracking-tight mb-3">{selectedProject.title}</h3>
                                          <p className="text-sm text-[#6E655C] dark:text-[#A89F91] leading-relaxed font-normal">{selectedProject.description}</p>
                                       </div>

                                       {/* Architectural Highlights */}
                                       <div>
                                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#A89F91] mb-3 flex items-center gap-2">
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
                                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#A89F91] mb-3 flex items-center gap-2">
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
                                    /* System Architecture Blueprint Flow */
                                    <div className="space-y-5">
                                       <div>
                                          <div className="text-xs font-semibold text-[#8A5A2B] dark:text-[#D4A373] uppercase tracking-wider mb-1">System Architecture Blueprint</div>
                                          <h3 className="text-xl font-extrabold text-[#181513] dark:text-[#E5DFD3] tracking-tight mb-2">End-to-End Data Pipeline</h3>
                                          <p className="text-xs text-[#6E655C] dark:text-[#A89F91] leading-relaxed">Visual breakdown of how requests, state transitions, security layers, and data flows operate in production.</p>
                                       </div>

                                       {/* Interactive Pipeline Diagram */}
                                       <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#8A5A2B] before:via-[#D4A373] before:to-[#8A5A2B]/20">
                                          {(selectedProject.architectureFlow || []).map((step, idx) => (
                                             <div key={idx} className="relative group">
                                                <div className="absolute -left-6 top-3 w-3 h-3 rounded-full bg-white dark:bg-[#181513] border-2 border-[#8A5A2B] dark:border-[#D4A373] group-hover:scale-125 transition-transform" />
                                                <div className="p-3.5 rounded-2xl bg-[#EFECE4]/80 dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/10 hover:border-[#8A5A2B]/40 dark:hover:border-[#D4A373]/40 transition-all">
                                                   <div className="flex items-center justify-between mb-1">
                                                      <span className="text-xs font-bold text-[#181513] dark:text-[#E5DFD3]">{step.label}</span>
                                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-[#181513] text-[#8A5A2B] dark:text-[#D4A373] border border-[#DCD6C8] dark:border-[#E5DFD3]/15">{step.tech}</span>
                                                   </div>
                                                   <p className="text-xs text-[#6E655C] dark:text-[#A89F91]">{step.sublabel}</p>
                                                </div>
                                             </div>
                                          ))}
                                       </div>
                                    </div>
                                 )}
                              </div>

                              {/* Pinned Action Footer */}
                              <div className="p-4 sm:p-5 bg-[#EFECE4] dark:bg-[#110E0C] border-t border-[#E2DDD2] dark:border-[#E5DFD3]/10 flex flex-wrap gap-2.5 items-center justify-between shrink-0">
                                 <div className="flex flex-wrap gap-2">
                                    {selectedProject.github && (
                                       <a
                                          href={selectedProject.github}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-xs font-semibold text-[#181513] dark:text-[#E5DFD3] hover:border-[#8A5A2B] dark:hover:border-[#D4A373] transition-all shadow-2xs"
                                       >
                                          <Github size={14} />
                                          GitHub Source
                                       </a>
                                    )}
                                    {selectedProject.liveDemo && (
                                       <a href={selectedProject.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#181513] dark:bg-[#E5DFD3] text-[#F7F5F0] dark:text-[#0B0A09] hover:bg-[#8A5A2B] dark:hover:bg-[#D4A373] text-xs font-semibold transition-all shadow-sm">
                                          <ExternalLink size={14} />
                                          Open Live
                                       </a>
                                    )}
                                 </div>

                                 <button onClick={() => setSelectedProject(null)} className="text-xs font-semibold text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-white transition-colors cursor-pointer px-2 py-1">
                                    Close
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
