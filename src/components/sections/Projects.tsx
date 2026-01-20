import { AnimatePresence, motion } from "framer-motion"; // Added AnimatePresence for modal animations
import { ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react"; // Added useEffect for ESC key
import brewcode from "../../assets/projects/brewcode.png";
import byteverse from "../../assets/projects/byteverse.png";
import forge from "../../assets/projects/forge.onboard.png";
import mentorshub from "../../assets/projects/mentorshub.png";
import onboard from "../../assets/projects/onboard.png";
import usermanagement from "../../assets/projects/user_management.jpg";

interface ProjectsProps {
   isDark: boolean;
}

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

export default function Projects({ isDark }: ProjectsProps) {
   // State for modal visibility and selected image
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedImage, setSelectedImage] = useState<any>(null); // Use any to handle imported assets

   // Open modal with selected image
   const openModal = (image: any) => {
      console.log("Opening modal with image:", image); // Debug log
      setSelectedImage(image);
      setIsModalOpen(true);
   };

   // Close modal
   const closeModal = () => {
      console.log("Closing modal"); // Debug log
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
      <section id="projects" className="py-20 px-4">
         <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-16">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
               <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>A selection of projects that showcase my skills and passion for development.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
               {projects.map((project, index) => (
                  <motion.div
                     key={project.title}
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, delay: index * 0.1 }}
                     viewport={{ once: true }}
                     whileHover={{ y: -10 }}
                     className={`group rounded-2xl overflow-hidden transition-all duration-300 ${isDark ? "bg-gray-800 hover:bg-gray-750" : "bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl"} ${!isDark ? "border border-gray-200" : ""}`}
                  >
                     <div className="relative overflow-hidden">
                        <img
                           src={project.image}
                           alt={project.title}
                           className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                           loading="lazy"
                           onClick={() => openModal(project.image)} // Trigger modal on image click
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                     </div>

                     <div className="p-6">
                        <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                        <p className={`mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                           {project.tech.map((tech) => (
                              <span key={tech} className={`px-3 py-1 text-sm rounded-full ${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
                                 {tech}
                              </span>
                           ))}
                        </div>

                        <div className="flex gap-4">
                           <motion.a
                              href={project.github}
                              whileHover={{ scale: 1.05 }}
                              target="_blank"
                              whileTap={{ scale: 0.95 }}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${isDark ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-100 hover:bg-gray-200 text-gray-700"}`}
                              aria-label={`View ${project.title} on GitHub`}
                           >
                              <Github size={16} />
                              Code
                           </motion.a>
                           {project.liveDemo && (
                              <motion.a
                                 href={project.live}
                                 whileHover={{ scale: 1.05 }}
                                 whileTap={{ scale: 0.95 }}
                                 target="_blank"
                                 className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${isDark ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                                 aria-label={`View ${project.title} live demo`}
                              >
                                 <ExternalLink size={16} />
                                 Visit Site
                              </motion.a>
                           )}
                        </div>
                     </div>
                  </motion.div>
               ))}
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
                  className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
                  onClick={closeModal} // Close on background click
               >
                  <motion.div
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.8, opacity: 0 }}
                     transition={{ type: "spring", damping: 20, stiffness: 300 }}
                     className="relative max-w-5xl w-full mx-4 rounded-2xl shadow-2xl overflow-hidden"
                     onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                  >
                     <img src={selectedImage} alt="Enlarged project" className="w-full h-auto max-h-[85vh] object-contain rounded-2xl" />
                     <button className="absolute top-4 right-4 text-white bg-gray-800 hover:bg-gray-700 rounded-full p-2.5 transition-colors duration-200 shadow-md" onClick={closeModal} aria-label="Close modal">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                     </button>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </section>
   );
}
