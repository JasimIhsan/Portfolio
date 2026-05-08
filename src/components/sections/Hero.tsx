import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import TextReveal from "../animations/TextReveal";

export default function Hero() {
   const scrollToProjects = () => {
      const element = document.getElementById("projects");
      if (element) {
         element.scrollIntoView({ behavior: "smooth" });
      }
   };

   return (
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 relative z-10">
         <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
            {/* Main content */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="lg:col-span-7">
               <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="clay-pill inline-flex px-6 py-2 mb-8 items-center gap-3">
                  <span className="relative flex h-3 w-3">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                  </span>
                  <span className="text-sm font-medium text-cyan-100 tracking-wide">Available for work</span>
               </motion.div>

               <TextReveal text="Jasim Ihsan M" delay={0.3} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-lg" />

               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-2xl md:text-3xl mb-8 text-cyan-100/80 font-light tracking-wide">
                  Full-Stack & Mobile Developer
               </motion.div>

               <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-lg md:text-xl mb-12 max-w-xl leading-relaxed text-slate-300 font-light">
                  I craft digital experiences that blend beautiful design with powerful functionality, turning complex problems into elegant solutions.
               </motion.p>

               {/* Buttons & Social links */}
               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="flex flex-wrap items-center gap-6">
                  <button onClick={scrollToProjects} className="clay-btn px-8 py-4 text-white font-medium tracking-wide flex items-center gap-2 group">
                     View Projects
                     <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
                  </button>

                  <div className="flex gap-4">
                     {[
                        { icon: Github, href: "http://github.com/JasimIhsan", label: "GitHub" },
                        { icon: Linkedin, href: "http://linkedin.com/in/jasim-ihsan-m", label: "LinkedIn" },
                        { icon: Mail, href: "mailto:jasimihsan1234@gmail.com", label: "Email" },
                     ].map(({ icon: Icon, href, label }) => (
                        <a
                           key={label}
                           href={href}
                           target="_blank"
                           rel="noreferrer"
                           className="clay-btn p-4 text-slate-300 hover:text-white flex items-center justify-center"
                           aria-label={label}
                        >
                           <Icon size={22} />
                        </a>
                     ))}
                  </div>
               </motion.div>
            </motion.div>

            {/* Claymorphism Decorative Card */}
            <motion.div initial={{ opacity: 0, scale: 0.9, rotateY: -15 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }} style={{ perspective: 1000 }} className="lg:col-span-5 hidden lg:block">
               <motion.div 
                  animate={{ y: [-10, 10, -10] }} 
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} 
                  className="clay-card aspect-square relative p-8 flex flex-col justify-between overflow-hidden group"
               >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
                  
                  <div className="relative z-10 flex justify-between items-start">
                     <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                        <div className="w-6 h-6 rounded-full bg-cyan-400 animate-pulse"></div>
                     </div>
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                        <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                     </div>
                  </div>

                  <div className="relative z-10 space-y-4">
                     <div className="h-4 w-3/4 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                           initial={{ x: "-100%" }}
                           animate={{ x: "0%" }}
                           transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
                           className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-full"
                        ></motion.div>
                     </div>
                     <div className="h-4 w-1/2 bg-white/10 rounded-full"></div>
                     <div className="h-4 w-5/6 bg-white/10 rounded-full"></div>
                  </div>
                  
                  <div className="relative z-10 flex gap-4 mt-8">
                     <div className="clay-card w-16 h-16 rounded-2xl border-none"></div>
                     <div className="clay-card w-16 h-16 rounded-2xl border-none"></div>
                     <div className="clay-card w-16 h-16 rounded-2xl border-none"></div>
                  </div>
               </motion.div>
            </motion.div>
         </div>

         {/* Scroll indicator */}
         <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} onClick={scrollToProjects} className="absolute bottom-10 left-1/2 -translate-x-1/2" aria-label="Scroll to projects">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} className="clay-btn p-3 text-slate-400 hover:text-white rounded-full">
               <ArrowDown size={20} />
            </motion.div>
         </motion.button>
      </section>
   );
}
