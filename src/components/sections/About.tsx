import { motion } from "framer-motion";
import { Calendar, Coffee, Download, MapPin } from "lucide-react";
import profile from "../../assets/White Shirt.jpg";
import ScrollReveal from "../animations/ScrollReveal";
import { projects } from "./Projects";

const experience = () => {
   const startDate = new Date("2024-07-01");
   const endDate = new Date();
   const diffInMs = endDate.getTime() - startDate.getTime();
   const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
   return diffInYears.toFixed(1);
};

export default function About() {
   return (
      <section id="about" className="py-24 px-6 relative z-10">
         <ScrollReveal>
            <div className="max-w-6xl mx-auto">
               <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-20 text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-md">About Me</h2>
                  <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto">Get to know the person behind the code.</p>
               </motion.div>

               <div className="grid lg:grid-cols-12 gap-16 items-center">
                  {/* Avatar and stats */}
                  <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="lg:col-span-5">
                     <div className="relative mb-12 flex justify-center">
                        <div className="clay-card w-72 h-72 rounded-[3rem] overflow-hidden p-2 relative z-10">
                           <img src={profile} alt="Jasim Ihsan" className="w-full h-full object-cover rounded-[2.5rem]" loading="lazy" />
                        </div>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="absolute -top-6 -right-6 md:right-10 w-24 h-24 rounded-full border-4 border-dashed border-cyan-400/30" />
                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="absolute -bottom-4 -left-4 md:left-12 w-16 h-16 rounded-[2rem] border-4 border-dashed border-purple-400/30" />
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        {[
                           { icon: MapPin, label: "Location", value: "Kerala, India" },
                           { icon: Calendar, label: "Experience", value: `${experience()}+ Years` },
                           { icon: Coffee, label: "Coffee Cups", value: "2,847" },
                           { icon: Download, label: "Projects", value: `${projects.length}` },
                        ].map((stat, index) => (
                           <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="clay-card p-6 rounded-[2rem] text-center group">
                              <stat.icon size={24} className="mx-auto mb-3 text-cyan-400 group-hover:scale-110 transition-transform" />
                              <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                              <div className="text-sm font-medium text-slate-400">{stat.label}</div>
                           </motion.div>
                        ))}
                     </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="lg:col-span-7">
                     <div className="clay-card p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        <div className="space-y-6 relative z-10 text-slate-300 font-light leading-relaxed">
                           <p className="text-lg">
                              I'm a passionate full-stack and mobile developer with over a year of experience creating digital solutions that make a difference. My journey began with a curiosity about how things work on the web and mobile platforms, and it has evolved into a deep love for crafting cross-platform experiences that users genuinely enjoy.
                           </p>

                           <p className="text-lg">
                              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while sketching out ideas for my next project. I believe in the power of clean code, thoughtful design, and continuous learning.
                           </p>

                           <p className="text-lg pb-4">I'm always excited to take on new challenges and collaborate with teams that share my passion for creating exceptional digital experiences.</p>

                           <motion.button
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => window.open("https://drive.google.com/file/d/1LNhiZxZLAQ-yoT6F0MZAruxRrztJDLUt/view?usp=sharing", "_blank")}
                              className="clay-btn inline-flex items-center gap-3 px-8 py-4 text-white font-medium tracking-wide group"
                           >
                              <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                              Download Resume
                           </motion.button>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </ScrollReveal>
      </section>
   );
}
