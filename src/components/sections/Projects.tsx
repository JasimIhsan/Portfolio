import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import brewcode from "../../assets/projects/brewcode.png";
import byteverse from "../../assets/projects/byteverse.png";
import forge from "../../assets/projects/forge.onboard.png";
import lifePartnerAgain from "../../assets/projects/lifepartneragain.png";
import mentorshub from "../../assets/projects/mentorshub.png";
import onboard from "../../assets/projects/onboard.png";
import usermanagement from "../../assets/projects/user_management.jpg";
import ScrollReveal from "../animations/ScrollReveal";

export const projects = [
   {
      title: "Life Partner Again",
      description: "A matrimony platform designed specifically for middle-aged women seeking a second chance at companionship. Built to provide a safe, respectful, and trust-driven environment — focusing on meaningful connections, verified profiles, and a supportive experience tailored for a new phase of life.",
      image: lifePartnerAgain,
      tech: ["Flutter"],
      // github: "https://github.com/JasimIhsan/Smart_Canteen",
      liveDemo: false,
      live: "#",
   },
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
      title: "BrewCode JS Compiler",
      description: "A web application that compiles JavaScript code into a visual representation",
      image: brewcode,
      tech: ["Next.js", "TypeScript", "Docker", "BullMQ", "Redis", "Queue Management"],
      github: "https://github.com/JasimIhsan/Brew-Code-JS-Compiler",
      liveDemo: true,
      live: "https://brewcode.jasimihsan.in",
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

            <div className="flex flex-col gap-16">
               {projects.map((project, index) => {
                  const isEven = index % 2 === 0;

                  return (
                     <ScrollReveal key={project.title} delay={index * 0.1}>
                        <div className="clay-card group flex flex-col lg:flex-row overflow-hidden relative rounded-[2.5rem]">
                           {/* Image Container */}
                           <div className={`relative overflow-hidden w-full lg:w-1/2 shrink-0 h-64 md:h-96 lg:h-auto ${!isEven ? "lg:order-2" : ""}`}>
                              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer" loading="lazy" onClick={() => openModal(project.image)} />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10]/90 via-[#0b0c10]/20 to-transparent pointer-events-none lg:opacity-0 transition-opacity duration-300" />
                           </div>

                           {/* Content Container */}
                           <div className={`p-8 md:p-12 flex-grow flex flex-col justify-center relative z-10 lg:w-1/2 ${!isEven ? "lg:order-1" : ""}`}>
                              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-md">{project.title}</h3>

                              <p className="mb-8 text-slate-300 font-light leading-relaxed text-lg">{project.description}</p>

                              <div className="flex flex-wrap gap-3 mb-10">
                                 {project.tech.map((tech) => (
                                    <span key={tech} className="clay-pill px-5 py-2 text-sm font-medium text-cyan-100/90 tracking-wide shadow-sm">
                                       {tech}
                                    </span>
                                 ))}
                              </div>

                              <div className="flex flex-wrap gap-4 mt-auto">
                                 {project.github && (
                                    <motion.a href={project.github} whileHover={{ scale: 1.05, y: -2 }} target="_blank" whileTap={{ scale: 0.95 }} className="clay-btn flex items-center gap-2 px-6 py-3 text-slate-200 hover:text-white" aria-label={`View ${project.title} on GitHub`}>
                                       <Github size={20} />
                                       <span className="font-medium tracking-wide">Source Code</span>
                                    </motion.a>
                                 )}
                                 {project.liveDemo && (
                                    <motion.a href={project.live} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} target="_blank" className="clay-btn bg-cyan-600/20 border-cyan-500/30 flex items-center gap-2 px-6 py-3 text-cyan-50 hover:text-white" aria-label={`View ${project.title} live demo`}>
                                       <ExternalLink size={20} />
                                       <span className="font-medium tracking-wide">Live Demo</span>
                                    </motion.a>
                                 )}
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
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 bg-[#0d0f14]/90 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModal}>
                  <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="clay-card relative max-w-6xl w-full mx-auto p-2" onClick={(e) => e.stopPropagation()}>
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
