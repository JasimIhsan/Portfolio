"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Command, Menu, Search, X } from "lucide-react";
import { usePlatform } from "../../hooks/usePlatform";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { ThemeToggle } from "./theme-toggle";

interface NavigationProps {
   activeSection: string;
   isMobileMenuOpen: boolean;
   setIsMobileMenuOpen: (open: boolean) => void;
   onOpenCommandPalette?: () => void;
   isLoading?: boolean;
}

const navItems = [
   { id: "hero", label: "Home" },
   { id: "about", label: "About" },
   { id: "experience", label: "Experience" },
   { id: "projects", label: "Projects" },
   { id: "skills", label: "Skills" },
   { id: "contact", label: "Contact" },
];

export default function Navigation({ activeSection, isMobileMenuOpen, setIsMobileMenuOpen, onOpenCommandPalette, isLoading = false }: NavigationProps) {
   const { scrollYProgress } = useScroll();
   const { isMac, isMobile, modifierKey } = usePlatform();
   const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
   });

   const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
         element.scrollIntoView({ behavior: "smooth" });
         setIsMobileMenuOpen(false);
      }
   };

   const scrollDirection = useScrollDirection();
   const navVariants = {
      hidden: { y: -100, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 350, damping: 30, delay: 0.2 } },
   };

   return (
      <>
         {/* Top Scrollytelling Progress Bar */}
         <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8A5A2B] via-[#C97A3E] to-[#D4A373] origin-left z-50" />

         {/* Desktop Floating Navigation */}
         <motion.nav variants={navVariants} initial="hidden" animate={isLoading || scrollDirection === "down" ? "hidden" : "visible"} className="fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden md:block">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F7F5F0]/85 dark:bg-[#181513]/85 backdrop-blur-xl border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
               <ul className="flex items-center gap-1">
                  {navItems.map((item) => {
                     const isActive = activeSection === item.id;
                     return (
                        <li key={item.id}>
                           <button
                              onClick={() => scrollToSection(item.id)}
                              className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-300 cursor-pointer ${
                                 isActive ? "text-[#F7F5F0] dark:text-[#0B0A09]" : "text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3]"
                              }`}
                           >
                              {isActive && (
                                 <motion.div
                                    layoutId="activePill"
                                    className="absolute inset-0 bg-[#8A5A2B] dark:bg-[#D4A373] rounded-full -z-10 shadow-xs"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                 />
                              )}
                              {item.label}
                           </button>
                        </li>
                     );
                  })}
               </ul>

               {/* Command Palette Spotlight & Theme Toggle Trigger */}
               <div className="flex items-center gap-2 pl-2 border-l border-[#E2DDD2] dark:border-[#E5DFD3]/15 ml-1">
                  {onOpenCommandPalette && (
                     <button
                        onClick={onOpenCommandPalette}
                        className="group flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#EFECE4]/80 dark:bg-[#231E1A]/80 hover:bg-[#E2DDD2] dark:hover:bg-[#2F2924] border border-[#E2DDD2]/60 dark:border-[#E5DFD3]/10 text-xs text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3] transition-all cursor-pointer shadow-2xs"
                        aria-label="Search portfolio"
                        title={isMobile ? "Search commands" : `Search commands (${modifierKey}K)`}
                     >
                        <Search size={13} className="text-[#8A5A2B] dark:text-[#D4A373]" />
                        <span className="hidden lg:inline text-[11px] font-medium">Search</span>
                        {!isMobile && (
                           <>
                              {isMac ? (
                                 <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-[#6E655C] dark:text-[#A89F91]">
                                    <Command size={10} className="mr-0.5" />K
                                 </kbd>
                              ) : (
                                 <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-[#6E655C] dark:text-[#A89F91]">
                                    Ctrl+K
                                 </kbd>
                              )}
                           </>
                        )}
                     </button>
                  )}

                  {/* Theme Toggle Button */}
                  <ThemeToggle variant="circle-blur" className="w-8 h-8 rounded-full bg-[#EFECE4]/80 dark:bg-[#231E1A]/80 hover:bg-[#E2DDD2] dark:hover:bg-[#2F2924] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3]" />
               </div>
            </div>
         </motion.nav>

         {/* Mobile Intelligent Floating Action Bar (Auto-hides on scroll down, reveals on scroll up) */}
         <motion.div
            variants={navVariants}
            initial="hidden"
            animate={isLoading ? "hidden" : isMobileMenuOpen ? "visible" : scrollDirection === "down" ? "hidden" : "visible"}
            className="fixed top-3 sm:top-4 inset-x-3 sm:inset-x-4 z-40 flex items-center justify-between pointer-events-none md:hidden"
         >
            {/* Left Brand Badge */}
            <button
               onClick={() => scrollToSection("hero")}
               className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F7F5F0]/90 dark:bg-[#181513]/90 backdrop-blur-xl border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-md text-xs font-bold text-[#181513] dark:text-[#E5DFD3] hover:text-[#8A5A2B] dark:hover:text-[#D4A373] transition-all cursor-pointer"
               aria-label="Scroll to top"
            >
               <span className="w-2 h-2 rounded-full bg-[#8A5A2B] dark:bg-[#D4A373]" />
               <span>Jasim.dev</span>
            </button>

            {/* Right Action Cluster */}
            <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-full bg-[#F7F5F0]/90 dark:bg-[#181513]/90 backdrop-blur-xl border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-md">
               {onOpenCommandPalette && (
                  <button
                     onClick={onOpenCommandPalette}
                     className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EFECE4]/80 dark:bg-[#231E1A]/80 hover:bg-[#E2DDD2] dark:hover:bg-[#2F2924] border border-[#E2DDD2]/60 dark:border-[#E5DFD3]/10 text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3] transition-all cursor-pointer"
                     aria-label="Open Search"
                  >
                     <Search size={14} />
                  </button>
               )}

               <ThemeToggle variant="circle-blur" className="w-8 h-8 rounded-full bg-[#EFECE4]/80 dark:bg-[#231E1A]/80 hover:bg-[#E2DDD2] dark:hover:bg-[#2F2924] border border-[#E2DDD2]/60 dark:border-[#E5DFD3]/10 text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3] transition-all" />

               <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#8A5A2B] dark:bg-[#D4A373] text-[#F7F5F0] dark:text-[#0B0A09] hover:opacity-90 transition-all cursor-pointer shadow-sm"
                  aria-label="Toggle mobile menu"
               >
                  <AnimatePresence mode="wait">
                     {isMobileMenuOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                           <X size={16} />
                        </motion.div>
                     ) : (
                        <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                           <Menu size={16} />
                        </motion.div>
                     )}
                  </AnimatePresence>
               </button>
            </div>
         </motion.div>

         {/* Mobile Navigation Drawer */}
         <AnimatePresence>
            {isMobileMenuOpen && (
               <motion.nav initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-40 md:hidden bg-[#F7F5F0]/95 dark:bg-[#0B0A09]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6">
                  <ul className="space-y-6 text-center w-full max-w-xs mb-10">
                     {navItems.map((item, index) => (
                        <motion.li key={item.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                           <button onClick={() => scrollToSection(item.id)} className={`text-2xl font-extrabold transition-all duration-200 block w-full py-2 ${activeSection === item.id ? "text-[#8A5A2B] dark:text-[#D4A373] scale-105" : "text-[#181513] dark:text-[#E5DFD3]"}`}>
                              {item.label}
                           </button>
                        </motion.li>
                     ))}
                  </ul>
               </motion.nav>
            )}
         </AnimatePresence>
      </>
   );
}
