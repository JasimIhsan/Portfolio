"use client";

import About from "app/components/sections/About";
import Contact from "app/components/sections/Contact";
import Experience from "app/components/sections/Experience";
import Hero from "app/components/sections/Hero";
import Projects from "app/components/sections/Projects";
import Skills from "app/components/sections/Skills";
import CommandPalette from "app/components/ui/command-palette";
import Navigation from "app/components/ui/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { debounce } from "lodash";
import { ArrowUp, ChevronDown } from "lucide-react";
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
   const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

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

         {/* Unified Navigation (Desktop floating pill & Mobile smart auto-hiding bar) */}
         <Navigation activeSection={activeSection} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

         <main className="relative w-full">
            <Hero />
            <About />
            <Experience />
            <Projects selectedProjectId={selectedProjectId} onClearSelectedProject={() => setSelectedProjectId(null)} />
            <Skills />
            <Contact />
         </main>

         {/* Bottom Center Floating Next Section Quick Jump Button (Visible on tablet/desktop to avoid blocking mobile FAB) */}
         <AnimatePresence>
            {!isAIAssistantOpen &&
               (nextSection ? (
                  <motion.div key="next-jump" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:block">
                     <button
                        onClick={() => scrollToSection(nextSection.id)}
                        className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#181513]/90 dark:bg-[#E5DFD3]/90 backdrop-blur-xl text-[#F7F5F0] dark:text-[#0B0A09] border border-[#3D2D20]/20 dark:border-white/20 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                        aria-label={`Jump to next section: ${nextSection.label}`}
                     >
                        <span className="text-[11px] uppercase tracking-wider text-[#A89F91] dark:text-[#6E655C] font-semibold">Next</span>
                        <span className="text-xs font-bold">{nextSection.label}</span>
                        <div className="w-5 h-5 rounded-full bg-[#8A5A2B] dark:bg-[#D4A373] text-white dark:text-[#0B0A09] flex items-center justify-center group-hover:translate-y-0.5 transition-transform">
                           <ChevronDown size={12} strokeWidth={2.5} />
                        </div>
                     </button>
                  </motion.div>
               ) : (
                  <motion.div key="top-jump" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:block">
                     <button
                        onClick={() => scrollToSection("hero")}
                        className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#181513]/90 dark:bg-[#E5DFD3]/90 backdrop-blur-xl text-[#F7F5F0] dark:text-[#0B0A09] border border-[#3D2D20]/20 dark:border-white/20 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                        aria-label="Back to Top"
                     >
                        <span className="text-xs font-bold">Back to Top</span>
                        <div className="w-5 h-5 rounded-full bg-[#8A5A2B] dark:bg-[#D4A373] text-white dark:text-[#0B0A09] flex items-center justify-center group-hover:-translate-y-0.5 transition-transform">
                           <ArrowUp size={11} strokeWidth={2.5} />
                        </div>
                     </button>
                  </motion.div>
               ))}
         </AnimatePresence>

         {/* Ask AI Portfolio Assistant Drawer */}
         <AIAssistantDrawer isOpen={isAIAssistantOpen} onOpenChange={setIsAIAssistantOpen} />

         {/* Minimalist modern footer */}
         <footer className="py-8 px-4 sm:px-6 border-t border-[#E2DDD2] dark:border-[#E5DFD3]/10 bg-white dark:bg-[#0B0A09] text-center text-xs text-[#6E655C] dark:text-[#A89F91] transition-colors pb-28 sm:pb-24 md:pb-8">
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
