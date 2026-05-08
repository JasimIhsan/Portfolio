import { AnimatePresence, motion } from "framer-motion";
import { useScrollDirection } from "../../hooks/useScrollDirection";

interface NavigationProps {
   activeSection: string;
   isMobileMenuOpen: boolean;
   setIsMobileMenuOpen: (open: boolean) => void;
}

const navItems = [
   { id: "hero", label: "Home" },
   { id: "projects", label: "Projects" },
   { id: "experience", label: "Experience" },
   { id: "skills", label: "Skills" },
   { id: "about", label: "About" },
   { id: "contact", label: "Contact" },
];

export default function Navigation({ activeSection, isMobileMenuOpen, setIsMobileMenuOpen }: NavigationProps) {
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
      visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
   };

   return (
      <>
         {/* Desktop Navigation */}
         <motion.nav variants={navVariants} initial="visible" animate={scrollDirection === "down" ? "hidden" : "visible"} className="fixed top-8 left-1/2 -translate-x-1/2 z-40 hidden md:block">
            <div className="clay-pill px-8 py-3">
               <ul className="flex space-x-10 items-center">
                  {navItems.map((item, index) => (
                     <motion.li key={item.id} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }}>
                        <button onClick={() => scrollToSection(item.id)} className={`relative group text-sm font-medium transition-colors duration-300 ${activeSection === item.id ? "text-cyan-400" : "text-slate-300 hover:text-white"}`} aria-label={`Navigate to ${item.label}`}>
                           <span className="relative z-10">{item.label}</span>
                           {activeSection === item.id && <motion.div layoutId="activeIndicator" className="absolute -left-4 -right-4 -top-2 -bottom-2 rounded-full bg-cyan-400/10 shadow-[inset_0_0_8px_rgba(34,211,238,0.2)]" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                        </button>
                     </motion.li>
                  ))}
               </ul>
            </div>
         </motion.nav>

         {/* Mobile Navigation */}
         <AnimatePresence>
            {isMobileMenuOpen && (
               <motion.nav initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-30 md:hidden">
                  <div className="absolute inset-0 bg-[#0b0c10]/95 backdrop-blur-md" />
                  <div className="relative flex items-center justify-center h-full">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                     <ul className="space-y-8 text-center relative z-10">
                        {navItems.map((item, index) => (
                           <motion.li key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                              <button onClick={() => scrollToSection(item.id)} className={`text-2xl font-bold transition-all duration-300 ${activeSection === item.id ? "text-cyan-400 scale-110" : "text-slate-400 hover:text-white"}`}>
                                 {item.label}
                              </button>
                           </motion.li>
                        ))}
                     </ul>
                  </div>
               </motion.nav>
            )}
         </AnimatePresence>
      </>
   );
}
