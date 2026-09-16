import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { ThemeToggle } from "./theme-toggle";

interface NavigationProps {
   activeSection: string;
   isMobileMenuOpen: boolean;
   setIsMobileMenuOpen: (open: boolean) => void;
}

const navItems = [
   { id: "hero", label: "Home" },
   { id: "about", label: "About" },
   { id: "experience", label: "Experience" },
   { id: "projects", label: "Projects" },
   { id: "skills", label: "Skills" },
   { id: "contact", label: "Contact" },
];

export default function Navigation({ activeSection, isMobileMenuOpen, setIsMobileMenuOpen }: NavigationProps) {
   const { scrollYProgress } = useScroll();
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
      visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 350, damping: 30 } },
   };

   // const { isDark, toggle: handleThemeToggle } = useThemeToggle();

   return (
      <>
         {/* Top Scrollytelling Progress Bar */}
         <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8A5A2B] via-[#C97A3E] to-[#D4A373] origin-left z-50" />

         {/* Desktop Floating Navigation */}
         <motion.nav variants={navVariants} animate={scrollDirection === "down" ? "hidden" : "visible"} className="fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden md:block">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F7F5F0]/85 dark:bg-[#181513]/85 backdrop-blur-xl border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
               <ul className="flex items-center gap-1">
                  {navItems.map((item) => {
                     const isActive = activeSection === item.id;
                     return (
                        <li key={item.id}>
                           <button onClick={() => scrollToSection(item.id)} className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer ${isActive ? "text-[#F7F5F0] dark:text-[#0B0A09]" : "text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3]"}`}>
                              {isActive && <motion.div layoutId="activeSectionIndicator" className="absolute inset-0 bg-[#8A5A2B] dark:bg-[#D4A373] rounded-full -z-10 shadow-sm" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                              {item.label}
                           </button>
                        </li>
                     );
                  })}
               </ul>

               {/* Theme Toggle Button */}
               <div className="pl-2 border-l border-[#E2DDD2] dark:border-[#E5DFD3]/15">
                  <ThemeToggle variant="circle-blur" className="w-8 h-8 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 hover:border-[#8A5A2B] dark:hover:border-[#D4A373]" />
               </div>
            </div>
         </motion.nav>

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

                  {/* Sync Theme Switcher in Mobile Drawer */}
                  {/* <div className="flex flex-col items-center gap-2">
                     <span className="text-xs font-semibold uppercase tracking-wider text-[#6E655C] dark:text-[#A89F91]">Appearance</span>
                     <div className="flex items-center p-1 rounded-full bg-[#EFECE4] dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-sm">
                        <button
                           type="button"
                           onClick={() => {
                              if (isDark) handleThemeToggle();
                           }}
                           className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                              !isDark
                                 ? "bg-white text-[#8A5A2B] shadow-sm border border-[#E2DDD2]"
                                 : "text-[#6E655C] hover:text-[#181513]"
                           }`}
                        >
                           <Sun className="w-3.5 h-3.5 text-[#8A5A2B]" />
                           <span>Light</span>
                        </button>
                        <button
                           type="button"
                           onClick={() => {
                              if (!isDark) handleThemeToggle();
                           }}
                           className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                              isDark
                                 ? "bg-[#231E1A] text-[#D4A373] shadow-sm border border-[#E5DFD3]/20"
                                 : "text-[#A89F91] hover:text-[#E5DFD3]"
                           }`}
                        >
                           <Moon className="w-3.5 h-3.5 text-[#D4A373]" />
                           <span>Dark</span>
                        </button>
                     </div>
                  </div> */}
               </motion.nav>
            )}
         </AnimatePresence>
      </>
   );
}
