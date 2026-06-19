import { motion } from "framer-motion";
import { Cloud, Code, Database, GitBranch, Globe, Palette, Smartphone, Zap } from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";

const skillCategories = [
   {
      title: "Frontend",
      icon: Code,
      skills: [
         { name: "React/Next.js", level: 95 },
         { name: "TypeScript", level: 90 },
         { name: "Tailwind CSS", level: 92 },
         { name: "EJS", level: 85 },
      ],
   },
   {
      title: "Backend",
      icon: Database,
      skills: [
         { name: "Node.js", level: 95 },
         { name: "MongoDB", level: 85 },
         { name: "JavaScript", level: 90 },
         { name: "PostgreSQL", level: 70 },
      ],
   },
   {
      title: "Mobile",
      icon: Smartphone,
      skills: [
         { name: "Flutter", level: 90 },
         { name: "Dart", level: 85 },
         { name: "Firebase", level: 80 },
         { name: "React Native", level: 60 },
      ],
   },
   {
      title: "Design",
      icon: Palette,
      skills: [
         { name: "UI/UX Design", level: 85 },
         { name: "Figma", level: 90 },
         { name: "Photoshop", level: 50 },
         { name: "Prototyping", level: 88 },
      ],
   },
];

const tools = [
   { name: "AWS", icon: Cloud },
   { name: "Git", icon: GitBranch },
   { name: "Docker", icon: Globe },
   { name: "Vercel", icon: Zap },
];

export default function Skills() {
   return (
      <section id="skills" className="py-24 px-6 relative z-10">
         <ScrollReveal>
            <div className="max-w-6xl mx-auto">
               <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-20 text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-[#08142C]">Skills & Expertise</h2>
                  <p className="text-lg text-[#64748B] font-normal max-w-2xl mx-auto">Technologies and tools I use to bring ideas to life.</p>
               </motion.div>

               <div className="flex justify-center">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 w-full max-w-6xl">
                     {skillCategories.map((category, categoryIndex) => (
                        <motion.div key={category.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: categoryIndex * 0.1 }} viewport={{ once: true }} className="clay-card bg-white p-8 rounded-[2rem] flex flex-col group">
                           <div className="flex items-center gap-4 mb-8">
                              <div className="clay-pill bg-[#F8FAFC] border-[#E5E7EB] p-3 text-[#2563EB] group-hover:scale-105 transition-transform">
                                 <category.icon size={22} />
                              </div>
                              <h3 className="text-xl font-bold text-[#08142C]">{category.title}</h3>
                           </div>

                           <div className="space-y-6 flex-grow">
                              {category.skills.map((skill, skillIndex) => (
                                 <div key={skill.name}>
                                    <div className="flex justify-between items-center mb-3">
                                       <span className="text-sm font-medium text-[#64748B]">{skill.name}</span>
                                       <span className="text-xs font-bold text-[#2563EB]">{skill.level}%</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-[#E5E7EB] overflow-hidden">
                                       <motion.div
                                          initial={{ width: 0 }}
                                          whileInView={{ width: `${skill.level}%` }}
                                          transition={{
                                             duration: 1.2,
                                             delay: categoryIndex * 0.1 + skillIndex * 0.1,
                                             ease: "easeOut",
                                          }}
                                          viewport={{ once: true }}
                                          className="h-full rounded-full bg-[#2563EB]"
                                       />
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>

               {/* Tools section */}
               <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center">
                  <h3 className="text-2xl font-bold mb-10 text-[#08142C]">Tools & Platforms</h3>
                  <div className="flex flex-wrap justify-center gap-6">
                     {tools.map((tool, index) => (
                        <motion.div key={tool.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ scale: 1.05, y: -5 }} className="clay-card bg-white flex flex-col items-center gap-3 w-28 h-28 justify-center rounded-[1.5rem] group border border-[#E5E7EB]">
                           <tool.icon size={28} className="text-[#64748B] group-hover:text-[#2563EB] transition-colors" />
                           <span className="text-sm font-medium text-[#64748B] transition-colors">{tool.name}</span>
                        </motion.div>
                     ))}
                  </div>
               </motion.div>
            </div>
         </ScrollReveal>
      </section>
   );
}
