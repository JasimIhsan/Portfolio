"use client";

import About from "app/components/sections/About";
import Contact from "app/components/sections/Contact";
import Experience from "app/components/sections/Experience";
import Hero from "app/components/sections/Hero";
import Projects from "app/components/sections/Projects";
import Skills from "app/components/sections/Skills";
import CommandPalette from "app/components/ui/command-palette";
import Navigation from "app/components/ui/navigation";
import { ThemeToggle } from "app/components/ui/theme-toggle";
import { usePlatform } from "app/hooks/usePlatform";
import { AnimatePresence, motion } from "framer-motion";
import { debounce } from "lodash";
import { ArrowUp, ChevronDown, Command, Menu, Search, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

// Dynamically import AIAssistantDrawer to guarantee zero SSR hydration mismatch
const AIAssistantDrawer = dynamic(() => import("app/components/AIAssistantDrawer"), {
   ssr: false,
});

const SECTIONS = [
   { id: "hero", label: "Home" },
   { id: "about", label: "About" },
   { id: "experience", label: "Experience" },
   { id: "projects", label: "Projects" },
   { id: "skills", label: "Skills" },
   { id: "contact", label: "Contact" },
];

export default function Home() {
   const [activeSection, setActiveSection] = useState("hero");
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
   const { isMac, isMobile, modifierKey } = usePlatform();

   // Global ⌘K / Ctrl+K keyboard shortcut listener
   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault();
            setIsCommandPaletteOpen((prev) => !prev);
         }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, []);

   // Debounced scroll handler to optimize performance
   const handleScroll = useMemo(
      () =>
         debounce(() => {
            const sectionIds = SECTIONS.map((s) => s.id);
            const scrollPosition = window.scrollY + 180;

            for (const section of sectionIds) {
               const element = document.getElementById(section);
               if (element) {
                  const { offsetTop, offsetHeight } = element;
                  if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                     setActiveSection(section);
                     break;
                  }
               }
            }
         }, 50),
      []
   );

   useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
         handleScroll.cancel();
      };
   }, [handleScroll]);

   const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
   const nextSection = currentIndex >= 0 && currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null;

   const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
         element.scrollIntoView({ behavior: "smooth" });
      }
   };

   return (
      <div className="min-h-screen w-full bg-[#F7F5F0] dark:bg-[#0B0A09] text-[#181513] dark:text-[#E5DFD3] selection:bg-[#8A5A2B] dark:selection:bg-[#D4A373] selection:text-[#F7F5F0] dark:selection:text-[#0B0A09] transition-colors duration-300">
         {/* Command Palette Spotlight Search Modal */}
         <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            onSelectProject={(projectId) => {
               setSelectedProjectId(projectId);
               scrollToSection("projects");
            }}
         />

         {/* Mobile Unified Floating Action Island (Command + Theme Toggle + Menu Trigger) */}
         <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 350, damping: 28 }}
            className="fixed top-5 right-5 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-[#F7F5F0]/90 dark:bg-[#181513]/90 backdrop-blur-xl border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:hidden"
         >
            <button
               onClick={() => setIsCommandPaletteOpen(true)}
               className="w-9 h-9 flex items-center justify-center rounded-full bg-[#EFECE4]/80 dark:bg-[#231E1A]/80 hover:bg-[#E2DDD2] dark:hover:bg-[#2F2924] border border-[#E2DDD2]/60 dark:border-[#E5DFD3]/10 text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3] transition-all cursor-pointer"
               aria-label={`Open Search (${isMobile ? "Search" : isMac ? "⌘K" : "Ctrl+K"})`}
               title={`Search (${isMobile ? "Search" : isMac ? "⌘K" : "Ctrl+K"})`}
            >
               {isMobile ? <Search size={15} /> : isMac ? <Command size={15} /> : <span className="text-[10px] font-bold font-sans">{modifierKey || "Ctrl"}</span>}
            </button>

            <ThemeToggle variant="circle-blur" className="w-9 h-9 rounded-full bg-[#EFECE4]/80 dark:bg-[#231E1A]/80 hover:bg-[#E2DDD2] dark:hover:bg-[#2F2924] border border-[#E2DDD2]/60 dark:border-[#E5DFD3]/10 text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3] transition-all" />

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#8A5A2B] dark:bg-[#D4A373] text-[#F7F5F0] dark:text-[#0B0A09] hover:opacity-90 transition-all cursor-pointer shadow-sm" aria-label="Toggle mobile menu">
               <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                     <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <X size={18} />
                     </motion.div>
                  ) : (
                     <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <Menu size={18} />
                     </motion.div>
                  )}
               </AnimatePresence>
            </button>
         </motion.div>

         <Navigation activeSection={activeSection} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

         <main className="relative w-full">
            <Hero />
            <About />
            <Experience />
            <Projects selectedProjectId={selectedProjectId} onClearSelectedProject={() => setSelectedProjectId(null)} />
            <Skills />
            <Contact />
         </main>

         {/* Bottom Center Floating Next Section Quick Jump Button */}
         <AnimatePresence>
            {nextSection ? (
               <motion.div key="next-jump" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
                  <button
                     onClick={() => scrollToSection(nextSection.id)}
                     className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#181513]/90 dark:bg-[#E5DFD3]/90 backdrop-blur-xl text-[#F7F5F0] dark:text-[#0B0A09] border border-[#3D2D20]/20 dark:border-white/20 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                     aria-label={`Jump to next section: ${nextSection.label}`}
                  >
                     <span className="text-[11px] uppercase tracking-wider text-[#A89F91] dark:text-[#6E655C] font-semibold">Next</span>
                     <span className="text-xs font-bold">{nextSection.label}</span>
                     <div className="w-5 h-5 rounded-full bg-[#8A5A2B] dark:bg-[#D4A373] text-white dark:text-[#0B0A09] flex items-center justify-center group-hover:translate-y-0.5 transition-transform">
                        <ChevronDown size={13} strokeWidth={2.5} />
                     </div>
                  </button>
               </motion.div>
            ) : (
               <motion.div key="top-jump" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
                  <button
                     onClick={() => scrollToSection("hero")}
                     className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#181513]/90 dark:bg-[#E5DFD3]/90 backdrop-blur-xl text-[#F7F5F0] dark:text-[#0B0A09] border border-[#3D2D20]/20 dark:border-white/20 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                     aria-label="Back to Top"
                  >
                     <span className="text-xs font-bold">Back to Top</span>
                     <div className="w-5 h-5 rounded-full bg-[#8A5A2B] dark:bg-[#D4A373] text-white dark:text-[#0B0A09] flex items-center justify-center group-hover:-translate-y-0.5 transition-transform">
                        <ArrowUp size={12} strokeWidth={2.5} />
                     </div>
                  </button>
               </motion.div>
            )}
         </AnimatePresence>

         {/* Ask AI Portfolio Assistant Drawer */}
         <AIAssistantDrawer />

         {/* Minimalist modern footer */}
         <footer className="py-8 px-6 border-t border-[#E2DDD2] dark:border-[#E5DFD3]/10 bg-white dark:bg-[#0B0A09] text-center text-xs text-[#6E655C] dark:text-[#A89F91] transition-colors pb-24 md:pb-8">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
               <div>© {new Date().getFullYear()} Jasim Ihsan. Engineered with Next.js 15 & beUI motion.</div>
               <div className="flex items-center gap-4">
                  <a href="#hero" className="hover:text-[#8A5A2B] dark:hover:text-[#D4A373] transition-colors">
                     Back to top ↑
                  </a>
               </div>
            </div>
         </footer>
      </div>
   );
}
