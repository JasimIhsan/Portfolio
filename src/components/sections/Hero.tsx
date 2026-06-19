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
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2563EB]"></span>
                  </span>
                  <span className="text-sm font-medium tracking-wide">Available for work</span>
               </motion.div>

               <TextReveal text="Jasim Ihsan" delay={0.3} className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight tracking-tighter text-[#08142C]" />

               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-2xl md:text-3xl mb-8 text-[#2563EB] font-medium tracking-wide">
                  Full-Stack & Mobile Developer
               </motion.div>

               <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-lg md:text-xl mb-12 max-w-xl leading-relaxed text-[#64748B] font-normal">
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
                        <a key={label} href={href} target="_blank" rel="noreferrer" className="clay-pill p-4 text-[#64748B] hover:text-[#2563EB] hover:border-[#2563EB]/30 flex items-center justify-center transition-all" aria-label={label}>
                           <Icon size={22} />
                        </a>
                     ))}
                  </div>
               </motion.div>
            </motion.div>

            {/* Clean Premium Dashboard Card Graphic */}
            <motion.div initial={{ opacity: 0, scale: 0.95, rotateY: -5 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }} style={{ perspective: 1000 }} className="lg:col-span-5 hidden lg:block">
               <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} className="clay-card aspect-square relative p-8 flex flex-col justify-between overflow-hidden group bg-white border border-[#E5E7EB] shadow-[0_20px_60px_-15px_rgba(8,20,44,0.1)]">
                  {/* Subtle Background Accents inside the card */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2563EB]/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2"></div>

                  {/* Header dots */}
                  <div className="relative z-10 flex justify-between items-start">
                     <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center shadow-sm">
                        <div className="w-5 h-5 rounded-md bg-[#2563EB] opacity-80"></div>
                     </div>
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#E5E7EB]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#E5E7EB]"></div>
                     </div>
                  </div>

                  {/* Lines simulating data/code */}
                  <div className="relative z-10 space-y-5 mt-8">
                     <div className="h-3 w-3/4 bg-[#F8FAFC] rounded-full overflow-hidden border border-[#E5E7EB]">
                        <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 2, ease: "easeOut", delay: 1.5 }} className="h-full bg-[#2563EB] w-full opacity-80"></motion.div>
                     </div>
                     <div className="h-3 w-1/2 bg-[#F8FAFC] rounded-full border border-[#E5E7EB]"></div>
                     <div className="h-3 w-5/6 bg-[#F8FAFC] rounded-full border border-[#E5E7EB]"></div>
                  </div>

                  {/* Mini cards */}
                  <div className="relative z-10 flex gap-4 mt-auto">
                     <div className="w-16 h-16 rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] shadow-sm"></div>
                     <div className="w-16 h-16 rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] shadow-sm"></div>
                     <div className="w-16 h-16 rounded-2xl border border-[#E5E7EB] bg-[#2563EB]/5 shadow-sm"></div>
                  </div>
               </motion.div>
            </motion.div>
         </div>

         {/* Scroll indicator */}
         <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} onClick={scrollToProjects} className="absolute bottom-10 left-1/2 -translate-x-1/2" aria-label="Scroll to projects">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} className="p-3 text-[#64748B] hover:text-[#2563EB] bg-[#F8FAFC] border border-[#E5E7EB] shadow-sm rounded-full transition-colors">
               <ArrowDown size={20} />
            </motion.div>
         </motion.button>
      </section>
   );
}
