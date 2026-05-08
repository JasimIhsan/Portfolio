import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import brewcode from "../../assets/projects/brewcode.png";
import byteverse from "../../assets/projects/byteverse.png";
import forge from "../../assets/projects/forge.onboard.png";
import mentorshub from "../../assets/projects/mentorshub.png";
import onboard from "../../assets/projects/onboard.png";
import usermanagement from "../../assets/projects/user_management.jpg";
import ScrollReveal from "../animations/ScrollReveal";

export const projects = [
   {
      title: "Onboard Careers",
      description: "Onboard Careers is a dedicated recruitment portal designed to connect aspiring professionals with premier opportunities in the maritime and cruise industries. We bridge the gap between talent and the open ocean, specializing in sourcing skilled candidates for hospitality, technical, and deck roles aboard international vessels.",
      image: onboard,
      tech: ["Next.js", "PostgreSQL", "Prisma ORM", "Tailwind CSS", "TypeScript"],
      github: "https://github.com/muhammedsirajudeen/core-backend",
      liveDemo: true,
      live: "https://www.onboardcareers.in",
   },
   {
      title: "NearHirable - Recruitment Portal",
      description: `We built Forge to answer exactly that. It’s a tool that assesses your coding fundamentals and tells you if you are "Near-Hireable" or ready to go—and exactly what you need to fix if you aren't.`,
      image: forge,
      tech: ["Next.js", "MongoDB", "Tailwind CSS", "TypeScript"],
      github: "https://github.com/muhammedsirajudeen/near-hireable-platform-engine",
      liveDemo: true,
      live: "https://forge.onboardcareers.in",
   },
   {
      title: "MentorsHub",
      description: "A platform for booking mentorship sessions with features like chat, video calls, payments, wallet, and admin panel.",
      image: mentorshub,
      tech: ["React.js", "TypeScript", "Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/JasimIhsan/MentorsHub",
      liveDemo: true,
      live: "https://mentors-hub-in.vercel.app",
   },
   {
      title: "Brew Code JS Compiler",
      description: "A web application that compiles JavaScript code into a visual representation",
      image: brewcode,
      tech: ["React", "TypeScript"],
      github: "https://github.com/JasimIhsan/Brew-Code-JS-Compiler",
      liveDemo: true,
      live: "https://brewcode.vercel.app",
   },
   {
      title: "Byteverse E-Commerce Platform",
      description: "A full-stack e-commerce solution with Ejs, Node.js, and RazorPay integration.",
      image: byteverse,
      tech: ["Node.js", "MongoDB", "Ejs", "RazorPay"],
      github: "https://github.com/JasimIhsan/Byteverse-E-commerse-website",
      liveDemo: false,
      live: "#",
   },

   {
      title: "User Management System",
      description: "A user management system built with React, TypeScript, and MongoDB",
      image: usermanagement,
      tech: ["React", "TypeScript"],
      github: "https://github.com/JasimIhsan/User_Management",
      liveDemo: false,
      live: "#",
   },
];

export default function Projects() {
   // State for modal visibility and selected image
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedImage, setSelectedImage] = useState<any>(null);

   // Open modal with selected image
   const openModal = (image: any) => {
      setSelectedImage(image);
      setIsModalOpen(true);
   };

   // Close modal
   const closeModal = () => {
      setIsModalOpen(false);
      setSelectedImage(null);
   };

   // Add ESC key listener
   useEffect(() => {
      const handleEsc = (event: KeyboardEvent) => {
         if (event.key === "Escape" && isModalOpen) {
            closeModal();
         }
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
   }, [isModalOpen]);

   return (
      <section id="projects" className="py-24 px-6 relative z-10">
         <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-20 text-center">
               <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-md">Featured Projects</h2>
               <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto">A curated selection of my recent work showcasing modern development, premium design, and scalable architecture.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
               {projects.map((project, index) => {
                  // Determine grid column span
                  const isFeatured = index === 0 || index === 4;
                  const colSpan = isFeatured ? "md:col-span-8" : "md:col-span-4";
                  
                  return (
                     <ScrollReveal key={project.title} delay={index * 0.1} className={colSpan}>
                        <div className="clay-card h-full group flex flex-col overflow-hidden">
                           <div className="relative overflow-hidden h-64 md:h-80 w-full shrink-0">
                              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer" loading="lazy" onClick={() => openModal(project.image)} />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent opacity-80 pointer-events-none" />
                              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                 <h3 className="text-2xl font-bold text-white drop-shadow-lg">{project.title}</h3>
                                 <div className="flex gap-3">
                                    <motion.a href={project.github} whileHover={{ scale: 1.1, y: -2 }} target="_blank" whileTap={{ scale: 0.9 }} className="clay-btn p-3 text-slate-200 hover:text-white" aria-label={`View ${project.title} on GitHub`}>
                                       <Github size={18} />
                                    </motion.a>
                                    {project.liveDemo && (
                                       <motion.a href={project.live} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} target="_blank" className="clay-btn bg-cyan-600/50 p-3 text-cyan-50 hover:text-white" aria-label={`View ${project.title} live demo`}>
                                          <ExternalLink size={18} />
                                       </motion.a>
                                    )}
                                 </div>
                              </div>
                           </div>

                           <div className="p-8 flex-grow flex flex-col justify-between relative z-10">
                              <p className="mb-8 line-clamp-3 text-slate-300 font-light leading-relaxed">{project.description}</p>

                              <div className="flex flex-wrap gap-3">
                                 {project.tech.map((tech) => (
                                    <span key={tech} className="clay-pill px-4 py-1.5 text-xs font-medium text-cyan-100/90 tracking-wide">
                                       {tech}
                                    </span>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </ScrollReveal>
                  );
               })}
            </div>
         </div>

         {/* Enhanced Modal */}
         <AnimatePresence>
            {isModalOpen && selectedImage && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-[#0d0f14]/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                  onClick={closeModal}
               >
                  <motion.div
                     initial={{ scale: 0.95, opacity: 0, y: 20 }}
                     animate={{ scale: 1, opacity: 1, y: 0 }}
                     exit={{ scale: 0.95, opacity: 0, y: 20 }}
                     transition={{ type: "spring", damping: 25, stiffness: 300 }}
                     className="clay-card relative max-w-6xl w-full mx-auto p-2"
                     onClick={(e) => e.stopPropagation()}
                  >
                     <img src={selectedImage} alt="Enlarged project" className="w-full h-auto max-h-[85vh] object-contain rounded-[1.5rem]" />
                     <button className="clay-btn absolute -top-4 -right-4 text-white p-3 shadow-xl" onClick={closeModal} aria-label="Close modal">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                     </button>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </section>
   );
}
