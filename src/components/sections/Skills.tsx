import { useRef, useState } from "react";
import {
   Box,
   CheckCircle2,
   Cloud,
   Code2,
   Cpu,
   Database,
   GitBranch,
   Globe,
   Layers,
   Palette,
   Server,
   Smartphone,
   Sparkles,
   Terminal,
   Workflow,
   Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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
      subtitle: "Component Architecture & Fluid Motion",
      icon: Code2,
      description: "Crafting reactive, high-performance web applications with modern component frameworks and design systems.",
      skills: [
         {
            name: "React & Next.js",
            badge: "Production Core",
            capabilities: ["App Router", "SSR / ISR", "Server Actions", "Next.js 15"],
            highlight: true,
         },
         {
            name: "TypeScript",
            badge: "Daily Driver",
            capabilities: ["Strict Mode", "Generics", "Type Inference", "Zod Validation"],
            highlight: true,
         },
         {
            name: "Tailwind CSS & Motion",
            badge: "Design Systems",
            capabilities: ["Framer Motion", "Custom Design Tokens", "Micro-Interactions", "Responsive Design"],
         },
         {
            name: "State Management",
            badge: "State Architecture",
            capabilities: ["Redux Toolkit", "Zustand", "Context API", "Optimistic UI Updates"],
         },
      ],
   },
   {
      id: "backend",
      title: "Backend & Systems",
      subtitle: "Scalable APIs & Data Pipelines",
      icon: Server,
      description: "Architecting resilient server-side services, relational/NoSQL schemas, and event-driven backends.",
      skills: [
         {
            name: "Node.js & Express",
            badge: "Production Core",
            capabilities: ["Event Loop Tuning", "RESTful Architecture", "Custom Middleware", "Streams"],
            highlight: true,
         },
         {
            name: "PostgreSQL & Prisma",
            badge: "Relational Data",
            capabilities: ["Relational Modeling", "Migrations", "Indexing", "ACID Transactions"],
            highlight: true,
         },
         {
            name: "MongoDB & Mongoose",
            badge: "Document Store",
            capabilities: ["Aggregation Pipelines", "Schema Design", "Indexing", "Replica Sets"],
         },
         {
            name: "Real-Time & WebSockets",
            badge: "Bidirectional",
            capabilities: ["Socket.io", "Event Emitters", "Room Broadcasting", "State Sync"],
         },
      ],
   },
   {
      id: "mobile",
      title: "Cross-Platform Mobile",
      subtitle: "Native-Quality iOS & Android Apps",
      icon: Smartphone,
      description: "Developing cross-platform mobile experiences with smooth 60fps animations and robust offline caching.",
      skills: [
         {
            name: "Flutter & Dart",
            badge: "Cross-Platform",
            capabilities: ["BLoC Pattern", "Custom Canvas & Motion", "Native Bridge Interop", "Clean Architecture"],
            highlight: true,
         },
         {
            name: "Firebase Suite",
            badge: "Cloud Backend",
            capabilities: ["FCM Push Notifications", "Cloud Firestore", "Auth Workflows", "Storage"],
            highlight: true,
         },
         {
            name: "Mobile State & Architecture",
            badge: "App Lifecycle",
            capabilities: ["Provider / Riverpod", "Secure Storage", "REST & GraphQL Integration", "Offline-First Sync"],
         },
         {
            name: "App Distribution",
            badge: "Release Engineering",
            capabilities: ["App Store & Play Store Packaging", "Code Signing", "Release Pipelines", "Crashlytics"],
         },
      ],
   },
   {
      id: "devops",
      title: "DevOps & Cloud Systems",
      subtitle: "Distributed Queues & Containerization",
      icon: Terminal,
      description: "Managing containerized workflows, background job queues, and automated CI/CD deployment pipelines.",
      skills: [
         {
            name: "BullMQ & Redis",
            badge: "Queue Architecture",
            capabilities: ["Asynchronous Job Queues", "Worker Concurrency", "Pub/Sub Messaging", "Rate Limiting"],
            highlight: true,
         },
         {
            name: "Docker & Containers",
            badge: "Containerization",
            capabilities: ["Multi-Stage Builds", "Docker Compose", "Environment Isolation", "Container Sandboxing"],
            highlight: true,
         },
         {
            name: "Git & Version Control",
            badge: "Team Workflow",
            capabilities: ["Branching Strategies", "Rebase Workflows", "Code Reviews", "Semantic Versioning"],
         },
         {
            name: "CI/CD & Cloud Hosting",
            badge: "Deployment",
            capabilities: ["GitHub Actions", "Vercel / Render", "Nginx Reverse Proxy", "Environment Configs"],
         },
      ],
   },
];

const engineeringPillars = [
   {
      title: "Distributed Queues & Sandbox Workers",
      description: "Built background queue engines using BullMQ, Redis, and isolated Docker runtime environments for secure execution.",
      icon: Cpu,
      tag: "Queue Architecture",
   },
   {
      title: "Real-Time Bidirectional Event Streaming",
      description: "Implemented sub-millisecond WebSocket and Socket.io pipelines for live messaging, notifications, and interactive updates.",
      icon: Zap,
      tag: "Real-Time Sync",
   },
   {
      title: "End-to-End Type Safety & Data Integrity",
      description: "Strict TypeScript contracts spanning relational schemas, backend route validators, and frontend component states.",
      icon: Workflow,
      tag: "Type Safety",
   },
];

const tools = [
   { name: "Docker", icon: Box, category: "Containers" },
   { name: "Redis", icon: Zap, category: "In-Memory Store" },
   { name: "PostgreSQL", icon: Database, category: "Relational DB" },
   { name: "MongoDB", icon: Layers, category: "Document DB" },
   { name: "Git & GitHub", icon: GitBranch, category: "Version Control" },
   { name: "AWS", icon: Cloud, category: "Cloud Services" },
   { name: "Figma", icon: Palette, category: "Interface Design" },
   { name: "Nginx / Vercel", icon: Globe, category: "Web Server & Edge" },
];

export default function Skills() {
   const [activeTab, setActiveTab] = useState<string>("all");
   const tabsContainerRef = useRef<HTMLDivElement>(null);

   const filteredCategories =
      activeTab === "all" ? skillCategories : skillCategories.filter((c) => c.id === activeTab);

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
            const targetScrollLeft =
               container.scrollLeft + (btnRect.left - containerRect.left) - containerRect.width / 2 + btnRect.width / 2;
            container.scrollTo({
               left: targetScrollLeft,
               behavior: "smooth",
            });
         }
      }
   };

   return (
      <section id="skills" className="py-28 px-6 relative z-10">
         {/* Subtle ambient light */}
         <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#8A5A2B]/5 dark:bg-[#D4A373]/5 rounded-full blur-[120px] pointer-events-none" />

         <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <ScrollReveal>
               <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 text-[#8A5A2B] dark:text-[#D4A373] text-xs font-semibold uppercase tracking-wider mb-4">
                     <Sparkles size={14} />
                     Technical Matrix & Stack
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#181513] dark:text-[#E5DFD3] tracking-tight mb-4">
                     Skills & Core Competencies
                  </h2>
                  <p className="text-lg text-[#6E655C] dark:text-[#A89F91] max-w-2xl mx-auto font-normal">
                     A comprehensive breakdown of engineering domains, production frameworks, and architectural paradigms I employ.
                  </p>
               </div>
            </ScrollReveal>

            {/* Filter Tabs (Mobile Swipeable / Desktop Centered) */}
            <div className="flex justify-center mb-12">
               <div
                  ref={tabsContainerRef}
                  className="w-full max-w-full overflow-x-auto no-scrollbar py-1 px-4 sm:px-0 flex justify-start sm:justify-center scroll-smooth"
               >
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-xs min-w-max">
                     <button
                        onClick={(e) => handleTabClick("all", e)}
                        className={`relative px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-300 cursor-pointer shrink-0 ${
                           activeTab === "all"
                              ? "text-[#F7F5F0] dark:text-[#0B0A09]"
                              : "text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3]"
                        }`}
                     >
                        {activeTab === "all" && (
                           <motion.div
                              layoutId="activeSkillDomain"
                              className="absolute inset-0 rounded-xl bg-[#181513] dark:bg-[#E5DFD3] shadow-sm"
                              transition={{ type: "spring", stiffness: 400, damping: 32 }}
                           />
                        )}
                        <span className="relative z-10 whitespace-nowrap">All Specializations</span>
                     </button>

                     {skillCategories.map((cat) => {
                        const isSelected = activeTab === cat.id;
                        return (
                           <button
                              key={cat.id}
                              onClick={(e) => handleTabClick(cat.id, e)}
                              className={`relative px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-300 cursor-pointer shrink-0 ${
                                 isSelected
                                    ? "text-[#F7F5F0] dark:text-[#0B0A09]"
                                    : "text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3]"
                              }`}
                           >
                              {isSelected && (
                                 <motion.div
                                    layoutId="activeSkillDomain"
                                    className="absolute inset-0 rounded-xl bg-[#181513] dark:bg-[#E5DFD3] shadow-sm"
                                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                 />
                              )}
                              <span className="relative z-10 whitespace-nowrap">{cat.title}</span>
                           </button>
                        );
                     })}
                  </div>
               </div>
            </div>

            {/* Core Architectural Pillars Strip */}
            <ScrollReveal>
               <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {engineeringPillars.map((pillar) => (
                     <div
                        key={pillar.title}
                        className="p-6 rounded-2xl bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-xs relative overflow-hidden group hover:border-[#8A5A2B]/40 dark:hover:border-[#D4A373]/40 transition-all"
                     >
                        <div className="flex items-center justify-between mb-4">
                           <div className="w-10 h-10 rounded-xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 flex items-center justify-center text-[#8A5A2B] dark:text-[#D4A373] group-hover:scale-110 transition-transform">
                              <pillar.icon size={20} />
                           </div>
                           <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A5A2B] dark:text-[#D4A373] bg-[#EFECE4] dark:bg-[#231E1A] px-2.5 py-1 rounded-full border border-[#DCD6C8] dark:border-[#E5DFD3]/10">
                              {pillar.tag}
                           </span>
                        </div>
                        <h4 className="text-base font-bold text-[#181513] dark:text-[#E5DFD3] mb-2 leading-snug">
                           {pillar.title}
                        </h4>
                        <p className="text-xs text-[#6E655C] dark:text-[#A89F91] leading-relaxed font-normal">
                           {pillar.description}
                        </p>
                     </div>
                  ))}
               </div>
            </ScrollReveal>

            {/* Skill Matrix Bento Grid */}
            <motion.div layout className="grid md:grid-cols-2 gap-8 mb-16">
               <AnimatePresence>
                  {filteredCategories.map((category) => (
                     <motion.div
                        key={category.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35 }}
                     >
                        <TiltCard
                           max={6}
                           glare={true}
                           className="p-7 sm:p-8 h-full bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_10px_35px_-12px_rgba(24,21,19,0.06)] hover:shadow-[0_20px_45px_-10px_rgba(138,90,43,0.12)] rounded-[2rem] flex flex-col justify-between group"
                        >
                           <div>
                              {/* Category Header */}
                              <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-[#EFECE4] dark:border-[#E5DFD3]/10">
                                 <div className="flex items-center gap-3.5">
                                    <div className="w-12 h-12 rounded-2xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 flex items-center justify-center text-[#8A5A2B] dark:text-[#D4A373] group-hover:scale-105 transition-transform shrink-0">
                                       <category.icon size={22} />
                                    </div>
                                    <div>
                                       <h3 className="text-xl font-bold text-[#181513] dark:text-[#E5DFD3]">
                                          {category.title}
                                       </h3>
                                       <span className="text-xs text-[#8A5A2B] dark:text-[#D4A373] font-medium">
                                          {category.subtitle}
                                       </span>
                                    </div>
                                 </div>
                                 <span className="px-2.5 py-1 text-[11px] font-semibold text-[#6E655C] dark:text-[#A89F91] bg-[#EFECE4] dark:bg-[#231E1A] rounded-full shrink-0">
                                    {category.skills.length} Core Techs
                                 </span>
                              </div>

                              <p className="text-xs text-[#6E655C] dark:text-[#A89F91] leading-relaxed mb-6 font-normal">
                                 {category.description}
                              </p>

                              {/* Skills Capabilities Matrix */}
                              <div className="space-y-4">
                                 {category.skills.map((skill) => (
                                    <div
                                       key={skill.name}
                                       className="p-4 rounded-xl bg-[#EFECE4]/60 dark:bg-[#231E1A]/70 border border-[#DCD6C8] dark:border-[#E5DFD3]/10 hover:border-[#8A5A2B]/40 dark:hover:border-[#D4A373]/40 transition-colors"
                                    >
                                       <div className="flex items-center justify-between gap-2 mb-2.5">
                                          <div className="flex items-center gap-2">
                                             <CheckCircle2
                                                size={15}
                                                className="text-[#8A5A2B] dark:text-[#D4A373] shrink-0"
                                             />
                                             <span className="text-sm font-bold text-[#181513] dark:text-[#E5DFD3]">
                                                {skill.name}
                                             </span>
                                          </div>
                                          <span className="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider rounded-md bg-white/90 dark:bg-[#181513]/90 text-[#8A5A2B] dark:text-[#D4A373] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-2xs shrink-0">
                                             {skill.badge}
                                          </span>
                                       </div>

                                       {/* Capability chips */}
                                       <div className="flex flex-wrap gap-1.5 pl-6">
                                          {skill.capabilities.map((cap) => (
                                             <span
                                                key={cap}
                                                className="px-2 py-0.5 text-[11px] font-medium text-[#4A433D] dark:text-[#D5CEC2] bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 rounded-md"
                                             >
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
               <div className="p-8 rounded-[2rem] bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-xs text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] text-[#8A5A2B] dark:text-[#D4A373] text-[11px] font-bold uppercase tracking-widest mb-6">
                     Integrated Platforms & Developer Tooling
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
                     {tools.map((tool) => (
                        <div
                           key={tool.name}
                           className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#EFECE4]/70 dark:bg-[#231E1A]/80 border border-[#E2DDD2] dark:border-[#E5DFD3]/10 hover:border-[#8A5A2B] dark:hover:border-[#D4A373] transition-all hover:scale-[1.03] group cursor-default"
                        >
                           <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#181513] flex items-center justify-center text-[#8A5A2B] dark:text-[#D4A373] mb-2.5 shadow-2xs group-hover:scale-110 transition-transform">
                              <tool.icon size={20} />
                           </div>
                           <span className="text-sm font-bold text-[#181513] dark:text-[#E5DFD3]">
                              {tool.name}
                           </span>
                           <span className="text-[11px] text-[#8A5A2B] dark:text-[#D4A373] font-medium">
                              {tool.category}
                           </span>
                        </div>
                     ))}
                  </div>
               </div>
            </ScrollReveal>
         </div>
      </section>
   );
}
