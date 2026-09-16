"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Cloud, Code2, Cpu, Database, Server, Smartphone, Sparkles, Workflow, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { FaAws } from "react-icons/fa6";
import { SiDocker, SiGit, SiMongodb, SiNginx, SiPostgresql, SiPostman, SiPrisma, SiRedis } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import ScrollReveal from "../animations/ScrollReveal";
import { TiltCard } from "../ui/tilt-card";

interface SkillItem {
   name: string;
   badge: string;
   capabilities: string[];
   highlight?: boolean;
}

interface SkillCategory {
   id: string;
   title: string;
   subtitle: string;
   icon: typeof Code2;
   description: string;
   skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
   {
      id: "frontend",
      title: "Frontend Engineering",
      subtitle: "Component Architecture & Responsive UI",
      icon: Code2,
      description: "Crafting scalable, high-performance web applications with React, Next.js App Router, and modern design systems.",
      skills: [
         {
            name: "React.js & Next.js",
            badge: "Production Core",
            capabilities: ["App Router", "SSR / SSG", "Server Actions", "Component Reusability"],
            highlight: true,
         },
         {
            name: "TypeScript & JavaScript",
            badge: "Daily Driver",
            capabilities: ["TypeScript Strict Mode", "Generics", "Type Inference", "Modern ES6+"],
            highlight: true,
         },
         {
            name: "Tailwind CSS & Styling",
            badge: "UI / UX",
            capabilities: ["Responsive UI Design", "CSS3 / HTML5", "Design Systems", "Framer Motion"],
         },
         {
            name: "State Management",
            badge: "State Architecture",
            capabilities: ["Redux Toolkit", "Zustand", "Context API", "Optimistic Updates"],
         },
      ],
   },
   {
      id: "backend",
      title: "Backend & Systems",
      subtitle: "Scalable REST APIs & Architecture",
      icon: Server,
      description: "Designing modular RESTful APIs, authentication workflows, RBAC systems, and real-time communication services.",
      skills: [
         {
            name: "Node.js & Express.js",
            badge: "Production Core",
            capabilities: ["REST APIs", "Express.js", "NestJS", "API Development"],
            highlight: true,
         },
         {
            name: "Auth & Security",
            badge: "Access Control",
            capabilities: ["JWT Authentication", "RBAC", "Google OAuth", "Token Blacklisting"],
            highlight: true,
         },
         {
            name: "Real-Time & Communications",
            badge: "Bidirectional",
            capabilities: ["Socket.io", "WebRTC", "ZegoCloud Audio/Video", "Live Updates"],
         },
         {
            name: "Architecture & Design",
            badge: "Best Practices",
            capabilities: ["Clean Architecture", "Design Patterns", "System Design", "Modular Backend"],
         },
      ],
   },
   {
      id: "database",
      title: "Databases & Storage",
      subtitle: "Relational, Document & In-Memory Stores",
      icon: Database,
      description: "Architecting structured database schemas, optimized queries, ACID transactions, and high-performance caching layers.",
      skills: [
         {
            name: "PostgreSQL & Prisma ORM",
            badge: "Relational DB",
            capabilities: ["Prisma ORM", "Database Design", "Query Optimization", "Relational Schemas"],
            highlight: true,
         },
         {
            name: "MongoDB",
            badge: "Document DB",
            capabilities: ["Document Modeling", "Aggregation Pipelines", "Indexing", "Mongoose"],
            highlight: true,
         },
         {
            name: "Redis",
            badge: "Caching Layer",
            capabilities: ["In-Memory Caching", "Token Blacklisting", "Session Store", "Key-Value Design"],
         },
         {
            name: "AWS S3 & Cloud Storage",
            badge: "Cloud Storage",
            capabilities: ["Secure Media Storage", "File Upload Pipelines", "Optimized Workflows", "Presigned URLs"],
         },
      ],
   },
   {
      id: "cloud-devops",
      title: "Cloud & DevOps",
      subtitle: "AWS Infrastructure & CI/CD",
      icon: Cloud,
      description: "Deploying and orchestrating resilient cloud infrastructure on AWS with automated CI/CD, Nginx reverse proxy, and containerization.",
      skills: [
         {
            name: "AWS Cloud Infrastructure",
            badge: "Cloud & Compute",
            capabilities: ["EC2 Instances", "Route 53 DNS", "Secrets Manager", "AWS S3 Storage"],
            highlight: true,
         },
         {
            name: "Traffic & Load Balancing",
            badge: "High Availability",
            capabilities: ["Application Load Balancer (ALB)", "Target Groups", "Nginx Load Balancing", "SSL / TLS"],
            highlight: true,
         },
         {
            name: "Cloud Security & Networking",
            badge: "Infrastructure Security",
            capabilities: ["Security Groups", "VPC & Subnets", "Secrets Management", "IAM Policies"],
         },
         {
            name: "Docker & CI/CD Pipelines",
            badge: "DevOps & Automation",
            capabilities: ["Docker Sandboxing", "Multi-Stage Builds", "GitHub Actions", "Automated Deployments"],
         },
      ],
   },
   {
      id: "mobile",
      title: "Mobile Engineering",
      subtitle: "Cross-Platform Apps & Integrations",
      icon: Smartphone,
      description: "Developing cross-platform mobile apps with Flutter and integrating real-time audio/video, subscriptions, and native device services.",
      skills: [
         {
            name: "Flutter & Dart",
            badge: "Mobile Core",
            capabilities: ["Flutter", "Dart", "Dio HTTP Client", "State Management"],
            highlight: true,
         },
         {
            name: "Mobile Integrations",
            badge: "Services",
            capabilities: ["RevenueCat Subscriptions", "ZegoCloud Audio/Video", "Geolocation Services", "Media Uploads"],
            highlight: true,
         },
         {
            name: "Architecture & State",
            badge: "Architecture",
            capabilities: ["Bloc / Cubit", "Riverpod", "Clean Architecture", "Offline Caching"],
         },
         {
            name: "Platform Channels & UI",
            badge: "Native / UX",
            capabilities: ["Custom Animations", "Responsive Mobile Layouts", "Camera & Media", "Push Notifications"],
         },
      ],
   },
];

const engineeringPillars = [
   {
      title: "Clean Architecture & Modular Systems",
      description: "Proven track record building end-to-end products following Clean Architecture principles, design patterns, and clean coding standards.",
      icon: Cpu,
      tag: "Architecture",
   },
   {
      title: "Real-Time Communications & Video",
      description: "Implemented Socket.io pipelines, WebRTC channels, and ZegoCloud live audio/video integrations with sub-millisecond sync.",
      icon: Zap,
      tag: "Real-Time",
   },
   {
      title: "100+ REST APIs & RBAC Workflows",
      description: "Designed 100+ production REST APIs across recruitment, matrimony, and mentorship platforms with granular RBAC security.",
      icon: Workflow,
      tag: "API & Security",
   },
];

const tools = [
   { name: "PostgreSQL", icon: SiPostgresql, category: "Relational DB" },
   { name: "Prisma ORM", icon: SiPrisma, category: "Data Layer" },
   { name: "Redis", icon: SiRedis, category: "Caching Layer" },
   { name: "MongoDB", icon: SiMongodb, category: "Document DB" },
   { name: "AWS Cloud", icon: FaAws, category: "Cloud Platform" },
   { name: "Nginx", icon: SiNginx, category: "Load Balancer & Proxy" },
   { name: "Docker", icon: SiDocker, category: "Containerization" },
   { name: "Git & GitHub", icon: SiGit, category: "Version Control" },
   { name: "Postman", icon: SiPostman, category: "API Testing" },
   { name: "VS Code & Cursor", icon: VscVscode, category: "Development IDEs" },
];

export default function Skills() {
   const [activeTab, setActiveTab] = useState<string>("all");
   const tabsContainerRef = useRef<HTMLDivElement>(null);

   const filteredCategories = activeTab === "all" ? skillCategories : skillCategories.filter((c) => c.id === activeTab);

   const handleTabClick = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
      setActiveTab(id);
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

   return (
      <section id="skills" className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 relative z-10">
         {/* Subtle ambient light */}
         <div className="absolute top-1/3 left-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#8A5A2B]/5 dark:bg-[#D4A373]/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

         <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <ScrollReveal>
               <div className="text-center mb-12 sm:mb-16">
                  <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 text-[#8A5A2B] dark:text-[#D4A373] text-xs font-semibold uppercase tracking-wider mb-4">
                     <Sparkles size={14} />
                     Technical Matrix & Stack
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#181513] dark:text-[#E5DFD3] tracking-tight mb-3 sm:mb-4">Skills & Core Competencies</h2>
                  <p className="text-base sm:text-lg text-[#6E655C] dark:text-[#A89F91] max-w-2xl mx-auto font-normal">A comprehensive breakdown of engineering domains, production frameworks, and architectural paradigms I employ.</p>
               </div>
            </ScrollReveal>

            {/* Filter Tabs (Mobile Swipeable / Desktop Centered) */}
            <div className="flex justify-center mb-10 sm:mb-12">
               <div ref={tabsContainerRef} className="w-full max-w-full overflow-x-auto no-scrollbar py-1 px-3 sm:px-0 flex justify-start sm:justify-center scroll-smooth">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-xs min-w-max mx-auto sm:mx-0">
                     <button
                        onClick={(e) => handleTabClick("all", e)}
                        className={`relative px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-300 cursor-pointer shrink-0 ${activeTab === "all" ? "text-[#F7F5F0] dark:text-[#0B0A09]" : "text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3]"}`}
                     >
                        {activeTab === "all" && <motion.div layoutId="activeSkillDomain" className="absolute inset-0 rounded-xl bg-[#181513] dark:bg-[#E5DFD3] shadow-sm" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                        <span className="relative z-10 whitespace-nowrap">All Specializations</span>
                     </button>

                     {skillCategories.map((cat) => {
                        const isSelected = activeTab === cat.id;
                        return (
                           <button
                              key={cat.id}
                              onClick={(e) => handleTabClick(cat.id, e)}
                              className={`relative px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-300 cursor-pointer shrink-0 ${isSelected ? "text-[#F7F5F0] dark:text-[#0B0A09]" : "text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3]"}`}
                           >
                              {isSelected && <motion.div layoutId="activeSkillDomain" className="absolute inset-0 rounded-xl bg-[#181513] dark:bg-[#E5DFD3] shadow-sm" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                              <span className="relative z-10 whitespace-nowrap">{cat.title}</span>
                           </button>
                        );
                     })}
                  </div>
               </div>
            </div>

            {/* Core Architectural Pillars Strip */}
            <ScrollReveal>
               <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
                  {engineeringPillars.map((pillar) => (
                     <div key={pillar.title} className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-xs relative overflow-hidden group hover:border-[#8A5A2B]/40 dark:hover:border-[#D4A373]/40 transition-all">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                           <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 flex items-center justify-center text-[#8A5A2B] dark:text-[#D4A373] group-hover:scale-110 transition-transform">
                              <pillar.icon size={18} />
                           </div>
                           <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8A5A2B] dark:text-[#D4A373] bg-[#EFECE4] dark:bg-[#231E1A] px-2.5 py-1 rounded-full border border-[#DCD6C8] dark:border-[#E5DFD3]/10">{pillar.tag}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-[#181513] dark:text-[#E5DFD3] mb-1.5 sm:mb-2 leading-snug">{pillar.title}</h4>
                        <p className="text-xs text-[#6E655C] dark:text-[#A89F91] leading-relaxed font-normal">{pillar.description}</p>
                     </div>
                  ))}
               </div>
            </ScrollReveal>

            {/* Skill Matrix Bento Grid */}
            <motion.div layout className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
               <AnimatePresence>
                  {filteredCategories.map((category) => (
                     <motion.div key={category.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35 }}>
                        <TiltCard max={6} glare={true} className="p-5 sm:p-7 md:p-8 h-full bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_10px_35px_-12px_rgba(24,21,19,0.06)] hover:shadow-[0_20px_45px_-10px_rgba(138,90,43,0.12)] rounded-[1.75rem] sm:rounded-[2rem] flex flex-col justify-between group">
                           <div>
                              {/* Category Header */}
                              <div className="flex items-start justify-between gap-3 sm:gap-4 mb-5 sm:mb-6 pb-4 sm:pb-5 border-b border-[#EFECE4] dark:border-[#E5DFD3]/10">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-2xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 flex items-center justify-center text-[#8A5A2B] dark:text-[#D4A373] group-hover:scale-105 transition-transform shrink-0">
                                       <category.icon size={20} />
                                    </div>
                                    <div>
                                       <h3 className="text-lg sm:text-xl font-bold text-[#181513] dark:text-[#E5DFD3]">{category.title}</h3>
                                       <span className="text-xs text-[#8A5A2B] dark:text-[#D4A373] font-medium">{category.subtitle}</span>
                                    </div>
                                 </div>
                                 <span className="px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-[#6E655C] dark:text-[#A89F91] bg-[#EFECE4] dark:bg-[#231E1A] rounded-full shrink-0">{category.skills.length} Core</span>
                              </div>

                              <p className="text-xs text-[#6E655C] dark:text-[#A89F91] leading-relaxed mb-5 sm:mb-6 font-normal">{category.description}</p>

                              {/* Skills Capabilities Matrix */}
                              <div className="space-y-3 sm:space-y-4">
                                 {category.skills.map((skill) => (
                                    <div key={skill.name} className="p-3.5 sm:p-4 rounded-xl bg-[#EFECE4]/60 dark:bg-[#231E1A]/70 border border-[#DCD6C8] dark:border-[#E5DFD3]/10 hover:border-[#8A5A2B]/40 dark:hover:border-[#D4A373]/40 transition-colors">
                                       <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 sm:gap-2 mb-2">
                                          <div className="flex items-center gap-2">
                                             <CheckCircle2 size={15} className="text-[#8A5A2B] dark:text-[#D4A373] shrink-0" />
                                             <span className="text-xs sm:text-sm font-bold text-[#181513] dark:text-[#E5DFD3]">{skill.name}</span>
                                          </div>
                                          <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider rounded-md bg-white/90 dark:bg-[#181513]/90 text-[#8A5A2B] dark:text-[#D4A373] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-2xs shrink-0">{skill.badge}</span>
                                       </div>

                                       {/* Capability chips */}
                                       <div className="flex flex-wrap gap-1 sm:gap-1.5 pl-5 sm:pl-6">
                                          {skill.capabilities.map((cap) => (
                                             <span key={cap} className="px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-[#4A433D] dark:text-[#D5CEC2] bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 rounded-md">
                                                {cap}
                                             </span>
                                          ))}
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </TiltCard>
                     </motion.div>
                  ))}
               </AnimatePresence>
            </motion.div>

            {/* Integrated Tooling Ecosystem Dock */}
            <ScrollReveal>
               <div className="p-5 sm:p-8 rounded-[1.75rem] sm:rounded-[2rem] bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-xs text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] text-[#8A5A2B] dark:text-[#D4A373] text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-5 sm:mb-6">Integrated Platforms & Developer Tooling</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-4 max-w-5xl mx-auto">
                     {tools.map((tool) => (
                        <div key={tool.name} className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-[#EFECE4]/70 dark:bg-[#231E1A]/80 border border-[#E2DDD2] dark:border-[#E5DFD3]/10 hover:border-[#8A5A2B] dark:hover:border-[#D4A373] transition-all hover:scale-[1.03] group cursor-default">
                           <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-white dark:bg-[#181513] flex items-center justify-center text-[#8A5A2B] dark:text-[#D4A373] mb-2 shadow-2xs group-hover:scale-110 transition-transform">
                              <tool.icon size={18} />
                           </div>
                           <span className="text-xs sm:text-sm font-bold text-[#181513] dark:text-[#E5DFD3]">{tool.name}</span>
                           <span className="text-[10px] sm:text-[11px] text-[#8A5A2B] dark:text-[#D4A373] font-medium">{tool.category}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </ScrollReveal>
         </div>
      </section>
   );
}
