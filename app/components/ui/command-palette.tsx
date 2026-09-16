"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Briefcase, Code2, Command, FileText, FolderGit2, Github, Layers, Linkedin, Mail, Moon, Phone, Search, Sparkles, Sun, Terminal, User, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { startLenis, stopLenis } from "../../hooks/useLenis";
import { usePlatform } from "../../hooks/usePlatform";
import { projects } from "../sections/Projects";
import { useThemeToggle } from "./theme-toggle";

interface CommandPaletteProps {
   isOpen: boolean;
   onClose: () => void;
   onSelectProject?: (projectId: string) => void;
   onReplayPreloader?: () => void;
}

interface CommandItem {
   id: string;
   title: string;
   subtitle?: string;
   category: "Navigation" | "Projects" | "Actions" | "Social";
   icon: React.ComponentType<{ size?: number; className?: string }>;
   action: () => void;
   shortcut?: string;
   badge?: string;
}

export default function CommandPalette({ isOpen, onClose, onSelectProject, onReplayPreloader }: CommandPaletteProps) {
   const [query, setQuery] = useState("");
   const [selectedIndex, setSelectedIndex] = useState(0);
   const inputRef = useRef<HTMLInputElement>(null);
   const listRef = useRef<HTMLDivElement>(null);
   const { isDark, toggle: toggleTheme } = useThemeToggle();
   const { isMac, isMobile, modifierKey } = usePlatform();

   // Handle open/close side effects: focus, reset, and scroll lock
   useEffect(() => {
      if (isOpen) {
         setQuery("");
         setSelectedIndex(0);
         stopLenis();
         document.documentElement.style.overflow = "hidden";
         document.body.style.overflow = "hidden";
         setTimeout(() => inputRef.current?.focus(), 50);
      } else {
         startLenis();
         document.documentElement.style.overflow = "";
         document.body.style.overflow = "";
      }

      return () => {
         startLenis();
         document.documentElement.style.overflow = "";
         document.body.style.overflow = "";
      };
   }, [isOpen]);

   const scrollToSection = useCallback(
      (id: string) => {
         onClose();
         const element = document.getElementById(id);
         if (element) {
            element.scrollIntoView({ behavior: "smooth" });
         }
      },
      [onClose]
   );

   const commands: CommandItem[] = useMemo(() => {
      const items: CommandItem[] = [
         // Navigation
         {
            id: "nav-hero",
            title: "Go to Home",
            subtitle: "Intro & Hero Console",
            category: "Navigation",
            icon: Sparkles,
            action: () => scrollToSection("hero"),
         },
         {
            id: "nav-about",
            title: "Go to About",
            subtitle: "Engineering mission & background",
            category: "Navigation",
            icon: User,
            action: () => scrollToSection("about"),
         },
         {
            id: "nav-experience",
            title: "Go to Experience",
            subtitle: "Career journey & milestone tracker",
            category: "Navigation",
            icon: Briefcase,
            action: () => scrollToSection("experience"),
         },
         {
            id: "nav-projects",
            title: "Go to Projects",
            subtitle: "Featured apps & system architectures",
            category: "Navigation",
            icon: FolderGit2,
            action: () => scrollToSection("projects"),
         },
         {
            id: "nav-skills",
            title: "Go to Skills",
            subtitle: "Core competencies & tech matrix",
            category: "Navigation",
            icon: Layers,
            action: () => scrollToSection("skills"),
         },
         {
            id: "nav-contact",
            title: "Go to Contact",
            subtitle: "Get in touch & direct inquiry",
            category: "Navigation",
            icon: Mail,
            action: () => scrollToSection("contact"),
         },

         // Quick Actions
         {
            id: "act-theme",
            title: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
            subtitle: "Toggle visual color theme",
            category: "Actions",
            icon: isDark ? Sun : Moon,
            action: () => {
               toggleTheme();
               onClose();
            },
            badge: "Theme",
         },
         {
            id: "act-resume",
            title: "Download Full Resume (PDF)",
            subtitle: "View latest engineering CV on Google Drive",
            category: "Actions",
            icon: FileText,
            action: () => {
               window.open("https://drive.google.com/file/d/19qu8HEq97dK2_8j0ZvycamyVXwyKeAgX/view?usp=sharing", "_blank");
               onClose();
            },
            badge: "PDF",
         },
         {
            id: "act-email",
            title: "Copy Email Address",
            subtitle: "jasimihsan1234@gmail.com",
            category: "Actions",
            icon: Mail,
            action: () => {
               navigator.clipboard.writeText("jasimihsan1234@gmail.com");
               toast.success("Email Copied to Clipboard", {
                  description: "jasimihsan1234@gmail.com is ready to paste.",
               });
               onClose();
            },
            badge: "Clipboard",
         },
         {
            id: "act-phone",
            title: "Copy Phone Number / WhatsApp",
            subtitle: "+91 9656646449",
            category: "Actions",
            icon: Phone,
            action: () => {
               navigator.clipboard.writeText("+919656646449");
               toast.success("Phone Number Copied", {
                  description: "+91 9656646449 is copied to your clipboard.",
               });
               onClose();
            },
            badge: "Clipboard",
         },
         {
            id: "act-replay-boot",
            title: "Replay System Boot Sequence",
            subtitle: "Trigger the initial architectural loading & unmounting motion graphics",
            category: "Actions",
            icon: Sparkles,
            action: () => {
               onClose();
               if (onReplayPreloader) {
                  onReplayPreloader();
               }
            },
            badge: "FX",
         },

         // Social Links
         {
            id: "soc-github",
            title: "Visit GitHub Profile",
            subtitle: "github.com/JasimIhsan (930+ commits)",
            category: "Social",
            icon: Github,
            action: () => {
               window.open("https://github.com/JasimIhsan", "_blank");
               onClose();
            },
         },
         {
            id: "soc-linkedin",
            title: "Connect on LinkedIn",
            subtitle: "linkedin.com/in/jasim-ihsan-m",
            category: "Social",
            icon: Linkedin,
            action: () => {
               window.open("https://linkedin.com/in/jasim-ihsan-m", "_blank");
               onClose();
            },
         },

         // Projects
         ...projects.map((proj) => ({
            id: `proj-${proj.id}`,
            title: proj.title,
            subtitle: `${proj.subtitle} • ${proj.category}`,
            category: "Projects" as const,
            icon: Code2,
            action: () => {
               onClose();
               if (onSelectProject) {
                  onSelectProject(proj.id);
               } else {
                  scrollToSection("projects");
               }
            },
            badge: proj.category,
         })),
      ];

      return items;
   }, [isDark, onClose, onReplayPreloader, onSelectProject, scrollToSection, toggleTheme]);

   const filteredCommands = useMemo(() => {
      if (!query.trim()) return commands;
      const lower = query.toLowerCase();
      return commands.filter((c) => c.title.toLowerCase().includes(lower) || c.subtitle?.toLowerCase().includes(lower) || c.category.toLowerCase().includes(lower));
   }, [commands, query]);

   // Keyboard Navigation within Palette
   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (!isOpen) return;

         if (e.key === "Escape") {
            e.preventDefault();
            onClose();
         } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : 0));
         } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredCommands.length - 1));
         } else if (e.key === "Enter") {
            e.preventDefault();
            if (filteredCommands[selectedIndex]) {
               filteredCommands[selectedIndex].action();
            }
         }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [filteredCommands, isOpen, onClose, selectedIndex]);

   // Scroll selected item into view
   useEffect(() => {
      if (listRef.current) {
         const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement | null;
         if (activeEl) {
            activeEl.scrollIntoView({ block: "nearest" });
         }
      }
   }, [selectedIndex]);

   if (typeof document === "undefined") return null;

   return createPortal(
      <AnimatePresence>
         {isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 pt-[12vh] sm:pt-[15vh]" onClick={onClose}>
               <motion.div
                  initial={{ scale: 0.96, opacity: 0, y: -10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.96, opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 rounded-3xl w-full max-w-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col"
                  onClick={(e) => e.stopPropagation()}
               >
                  {/* Search Input Bar */}
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-[#EFECE4] dark:border-[#E5DFD3]/10">
                     <Search size={18} className="text-[#8A5A2B] dark:text-[#D4A373] shrink-0" />
                     <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search commands, projects, actions..."
                        value={query}
                        onChange={(e) => {
                           setQuery(e.target.value);
                           setSelectedIndex(0);
                        }}
                        className="w-full bg-transparent text-sm sm:text-base font-medium text-[#181513] dark:text-[#E5DFD3] placeholder-[#A89F91] focus:outline-none"
                     />
                     <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-[#EFECE4] dark:bg-[#231E1A] text-[10px] font-mono text-[#6E655C] dark:text-[#A89F91] border border-[#DCD6C8] dark:border-[#E5DFD3]/15">ESC</span>
                     <button onClick={onClose} className="sm:hidden text-[#6E655C] dark:text-[#A89F91] p-1" aria-label="Close">
                        <X size={18} />
                     </button>
                  </div>

                  {/* Results List */}
                  <div ref={listRef} data-lenis-prevent="true" onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()} className="max-h-[380px] sm:max-h-[420px] overflow-y-auto overscroll-contain p-2 space-y-1 custom-scrollbar touch-pan-y">
                     {filteredCommands.length > 0 ? (
                        filteredCommands.map((cmd, idx) => {
                           const isSelected = selectedIndex === idx;
                           const Icon = cmd.icon;

                           return (
                              <button
                                 key={cmd.id}
                                 data-index={idx}
                                 onClick={cmd.action}
                                 onMouseEnter={() => setSelectedIndex(idx)}
                                 className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all cursor-pointer ${isSelected ? "bg-[#181513] dark:bg-[#231E1A] text-white shadow-xs border border-[#181513] dark:border-[#D4A373]/30" : "text-[#181513] dark:text-[#E5DFD3] hover:bg-[#EFECE4]/60 dark:hover:bg-[#231E1A]/60"}`}
                              >
                                 <div className="flex items-center gap-3 min-w-0">
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isSelected ? "bg-[#8A5A2B] text-white" : "bg-[#EFECE4] dark:bg-[#231E1A] text-[#8A5A2B] dark:text-[#D4A373]"}`}>
                                       <Icon size={15} />
                                    </div>
                                    <div className="min-w-0">
                                       <div className={`text-sm font-semibold truncate ${isSelected ? "text-white dark:text-[#E5DFD3]" : "text-[#181513] dark:text-[#E5DFD3]"}`}>{cmd.title}</div>
                                       {cmd.subtitle && <div className={`text-xs truncate ${isSelected ? "text-[#D5CEC2]" : "text-[#6E655C] dark:text-[#A89F91]"}`}>{cmd.subtitle}</div>}
                                    </div>
                                 </div>

                                 <div className="flex items-center gap-2 shrink-0 ml-2">
                                    {cmd.badge && <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${isSelected ? "bg-white/10 text-[#D4A373] border-white/15" : "bg-[#EFECE4] dark:bg-[#231E1A] text-[#8A5A2B] dark:text-[#D4A373] border-[#DCD6C8] dark:border-[#E5DFD3]/15"}`}>{cmd.badge}</span>}
                                    <ArrowRight size={14} className={`transition-transform ${isSelected ? "opacity-100 translate-x-0.5 text-[#D4A373]" : "opacity-0"}`} />
                                 </div>
                              </button>
                           );
                        })
                     ) : (
                        <div className="p-8 text-center text-sm text-[#6E655C] dark:text-[#A89F91]">No matching actions or projects found for "{query}"</div>
                     )}
                  </div>

                  {/* Footer Hint */}
                  <div className="p-3 bg-[#EFECE4]/70 dark:bg-[#12100E] border-t border-[#EFECE4] dark:border-[#E5DFD3]/10 flex items-center justify-between text-[11px] text-[#6E655C] dark:text-[#A89F91] px-4 font-mono">
                     <span className="flex items-center gap-1.5">
                        <Terminal size={12} className="text-[#8A5A2B] dark:text-[#D4A373]" />
                        <span>Navigate with ↑ ↓ and Enter</span>
                     </span>
                     <span className="flex items-center gap-1">
                        {isMobile ? (
                           <span className="text-[11px]">Quick Actions</span>
                        ) : isMac ? (
                           <>
                              <Command size={11} /> + K
                           </>
                        ) : (
                           <>
                              <span className="font-sans font-semibold">{modifierKey || "Ctrl"}</span> + K
                           </>
                        )}
                     </span>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>,
      document.body
   );
}
