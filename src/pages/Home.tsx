import { AnimatePresence, motion } from "framer-motion";
import { debounce } from "lodash";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import About from "../components/sections/About";
import Contact from "../components/sections/Contact";
import Experience from "../components/sections/Experience";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import SEO from "../components/SEO";
import Navigation from "../components/ui/navigation";
import { ThemeToggle } from "../components/ui/theme-toggle";
import { useLenis } from "../hooks/useLenis";

export default function Portfolio() {
   const [activeSection, setActiveSection] = useState("hero");
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   useLenis();

   // Debounced scroll handler to optimize performance
   const handleScroll = useCallback(
      debounce(() => {
         const sections = ["hero", "about", "experience", "projects", "skills", "contact"];
         const scrollPosition = window.scrollY + 180;

         for (const section of sections) {
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

   return (
      <div className="min-h-screen w-full bg-[#F7F5F0] dark:bg-[#0B0A09] text-[#181513] dark:text-[#E5DFD3] selection:bg-[#8A5A2B] dark:selection:bg-[#D4A373] selection:text-[#F7F5F0] dark:selection:text-[#0B0A09] transition-colors duration-300">
         <SEO />

         {/* Mobile Floating Action Bar (Theme Toggle + Menu Trigger) */}
         <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="fixed top-5 right-5 z-50 flex items-center gap-2 md:hidden"
         >
            <div className="p-1 rounded-2xl bg-white/90 dark:bg-[#181513]/90 backdrop-blur-xl border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-md">
               <ThemeToggle
                  variant="circle-blur"
                  className="w-10 h-10 rounded-xl hover:bg-[#EFECE4] dark:hover:bg-[#231E1A] transition-colors"
               />
            </div>
            <button
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               className="p-3 rounded-2xl bg-white/90 dark:bg-[#181513]/90 backdrop-blur-xl border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-md text-[#181513] dark:text-[#E5DFD3] cursor-pointer"
               aria-label="Toggle mobile menu"
            >
               <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                     <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                     >
                        <X size={20} />
                     </motion.div>
                  ) : (
                     <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                     >
                        <Menu size={20} />
                     </motion.div>
                  )}
               </AnimatePresence>
            </button>
         </motion.div>

         <Navigation
            activeSection={activeSection}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
         />

         <main className="relative w-full">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
         </main>

         {/* Minimalist modern footer */}
         <footer className="py-8 px-6 border-t border-[#E2DDD2] dark:border-[#E5DFD3]/10 bg-white dark:bg-[#0B0A09] text-center text-xs text-[#6E655C] dark:text-[#A89F91] transition-colors">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
               <div>© {new Date().getFullYear()} Jasim Ihsan. Engineered with React, Vite & beUI motion.</div>
               <div className="flex items-center gap-4">
                  <a href="#hero" className="hover:text-[#8A5A2B] dark:hover:text-[#D4A373] transition-colors">Back to top ↑</a>
               </div>
            </div>
         </footer>
      </div>
   );
}
