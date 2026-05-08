import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";

export const experiences = [
   {
      id: 1,
      role: "Mobile App Developer",
      company: "Freelance / Independent",
      duration: "2023 - Present",
      description: "Designing and developing cross-platform mobile applications using Flutter and Dart. Implementing complex state management, integrating RESTful APIs, and building seamless user interfaces for iOS and Android.",
      skills: ["Flutter", "Dart", "Firebase", "REST APIs", "Provider/Riverpod"],
   },
   {
      id: 2,
      role: "Full Stack Developer",
      company: "Freelance",
      duration: "July 2024 - Present",
      description: "Developing and maintaining full-stack web applications for various clients. Focusing on scalable architectures, responsive user interfaces, and robust backend systems using modern web technologies.",
      skills: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "Tailwind CSS"],
   },
];

export default function Experience() {
   return (
      <section id="experience" className="py-24 px-6 relative z-10">
         <ScrollReveal>
            <div className="max-w-4xl mx-auto">
               <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-20 text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-md">Work Experience</h2>
                  <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto">My professional journey and career highlights.</p>
               </motion.div>

               <div className="relative border-l-2 border-cyan-500/20 ml-4 md:ml-6">
                  {experiences.map((exp, index) => (
                     <motion.div key={exp.id} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} viewport={{ once: true }} className="mb-12 ml-8 md:ml-12 relative group">
                        <div className="absolute -left-[42px] md:-left-[58px] top-4 w-6 h-6 rounded-full flex items-center justify-center clay-card border-cyan-500/50 border z-10 group-hover:scale-110 transition-transform">
                           <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                        </div>

                        <div className="clay-card p-6 md:p-8 rounded-[2rem] transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2"></div>
                           
                           <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4 relative z-10">
                              <div>
                                 <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                                 <div className="flex items-center gap-2 font-medium text-cyan-200/90">
                                    <Briefcase size={18} />
                                    <span>{exp.company}</span>
                                 </div>
                              </div>
                              <div className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full clay-pill w-fit text-slate-300">
                                 <Calendar size={16} />
                                 <span>{exp.duration}</span>
                              </div>
                           </div>

                           <p className="mb-8 leading-relaxed text-slate-300 font-light relative z-10">{exp.description}</p>

                           <div className="flex flex-wrap gap-2 relative z-10">
                              {exp.skills.map((skill) => (
                                 <span key={skill} className="clay-pill px-4 py-1.5 text-xs font-medium text-cyan-100/90 tracking-wide">
                                    {skill}
                                 </span>
                              ))}
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </ScrollReveal>
      </section>
   );
}
