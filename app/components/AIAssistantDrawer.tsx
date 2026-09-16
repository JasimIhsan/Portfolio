"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Brain, MessageSquare, RefreshCw, Send, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { startLenis, stopLenis } from "../hooks/useLenis";

interface Message {
   id: string;
   role: "user" | "assistant";
   content: string;
   timestamp: Date;
   model?: string;
}

const TOOLTIP_MESSAGES = [
   { text: "Talk to my assistant", emoji: "👋" },
   { text: "Have questions for Jasim?", emoji: "💬" },
   { text: "Ask about projects & stack", emoji: "✨" },
];

const STARTER_PROMPTS = ["Who is Jasim Ihsan?", "What is Jasim's primary tech stack?", "Tell me about his key projects", "Is Jasim available for full-time roles?", "What is his experience with Flutter?"];

const STATIC_STARTER_ANSWERS: Record<string, string> = {
   "Who is Jasim Ihsan?":
      "**Jasim Ihsan** is a passionate **Software Engineer** specializing in full-stack web and cross-platform mobile development.\n\n- **Focus:** Crafting high-performance, aesthetically refined digital experiences using **Next.js, React, Flutter, and Node.js**.\n- **Philosophy:** Writing clean, scalable architecture, obsessing over micro-interactions and smooth 60fps UX, and turning complex product problems into seamless software solutions.\n- **Location:** Based in Kerala, India — building and collaborating globally.",

   "What is Jasim's primary tech stack?":
      "**Jasim's Primary Stack:**\n\n- **Frontend / Web:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Lenis Smooth Scroll.\n- **Mobile Engineering:** Flutter, Dart, Bloc/Cubit, Riverpod, Clean Architecture, Platform Channels.\n- **Backend & APIs:** Node.js, Express, NestJS, Go, GraphQL, REST APIs, WebSockets.\n- **Databases & Cloud:** PostgreSQL, MongoDB, Redis, Supabase, Firebase, AWS, Docker.",

   "Tell me about his key projects":
      "**Key Featured Projects:**\n\n1. **Life Partner Again** — Matrimonial & Matchmaking platform with real-time messaging, matching algorithms, and enterprise audit logging.\n2. **Portfolio & Interactive Showcases** — High-performance Next.js application featuring fluid scrollytelling, physics animations, and custom AI assistant integrations.\n3. **Flutter Cross-Platform Apps** — Production Flutter mobile apps with offline-first caching, localized state machines, and native SDK integrations.",

   "Is Jasim available for full-time roles?":
      "**Yes, Jasim is open for opportunities!**\n\nHe is actively open to **Full-time Software Engineering roles**, **Senior Frontend / Mobile Engineer positions**, and high-impact remote opportunities.\n\nFeel free to reach out directly via:\n- **Email:** [jasimihsan1234@gmail.com](mailto:jasimihsan1234@gmail.com)\n- **LinkedIn / GitHub:** Links in the navigation & contact sections below.",

   "What is his experience with Flutter?":
      "**Flutter & Mobile Expertise:**\n\n- **3+ Years** developing scalable cross-platform iOS & Android mobile applications.\n- **Architecture:** BLoC, Riverpod, Clean Architecture with strict separation of Domain, Data, and Presentation layers.\n- **Native Capabilities:** Push notifications (FCM), background tasks, deep links, custom MethodChannels, and location services.\n- **Performance:** 60/120 FPS rendering, memory leak profiling, and optimized widget rebuild trees.",
};

const LOADING_STATUSES = ["Checking Jasim's portfolio...", "Retrieving project details...", "Synthesizing information...", "Drafting response..."];

interface AIAssistantDrawerProps {
   isOpen?: boolean;
   onOpenChange?: (open: boolean) => void;
}

export default function AIAssistantDrawer({ isOpen: controlledIsOpen, onOpenChange }: AIAssistantDrawerProps = {}) {
   const [internalIsOpen, setInternalIsOpen] = useState(false);
   const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
   const setIsOpen = (open: boolean) => {
      if (onOpenChange) onOpenChange(open);
      setInternalIsOpen(open);
   };

   const [messages, setMessages] = useState<Message[]>([]);
   const [input, setInput] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [loadingStatusIndex, setLoadingStatusIndex] = useState(0);
   const [showTooltip, setShowTooltip] = useState(true);
   const [tooltipMsgIndex, setTooltipMsgIndex] = useState(0);
   const [isHovered, setIsHovered] = useState(false);
   const messagesEndRef = useRef<HTMLDivElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);

   // Animation Stage State Machine for Strict Two-Phase Motion
   // "closed"      -> Widget closed, bottom-right launcher button visible
   // "sliding_in"  -> Input bar travels from bottom-right to bottom-center (Top container hidden)
   // "open"        -> Input bar arrived; Top container mounts and blooms upward from input
   // "closing_top" -> Close initiated; Top container collapses down into input bar
   // "sliding_out" -> Top container closed; Input bar glides back into bottom-right launcher
   const [animStage, setAnimStage] = useState<"closed" | "sliding_in" | "open" | "closing_top" | "sliding_out">("closed");

   useEffect(() => {
      if (isOpen) {
         if (animStage === "closed" || animStage === "sliding_out") {
            setAnimStage("sliding_in");
         }
      } else {
         if (animStage === "open" || animStage === "sliding_in") {
            setAnimStage("closing_top");
         }
      }
   }, [isOpen]);

   const handleRequestClose = () => {
      if (animStage === "open" || animStage === "sliding_in") {
         setAnimStage("closing_top");
      } else {
         setAnimStage("closed");
         setIsOpen(false);
      }
   };

   const hasMessages = messages.length > 0;

   // Interval cycle for floating tooltip: shows for 5s, hides for 7s, cycles through engaging messages
   useEffect(() => {
      if (isOpen || animStage !== "closed") {
         setShowTooltip(false);
         return;
      }

      let hideTimeout: NodeJS.Timeout;

      const interval = setInterval(() => {
         if (!isHovered) {
            setShowTooltip(true);
            setTooltipMsgIndex((prev) => (prev + 1) % TOOLTIP_MESSAGES.length);

            hideTimeout = setTimeout(() => {
               setShowTooltip(false);
            }, 5000);
         }
      }, 12000);

      // Initial hide timeout after 5 seconds on load
      hideTimeout = setTimeout(() => {
         setShowTooltip(false);
      }, 5000);

      return () => {
         clearInterval(interval);
         clearTimeout(hideTimeout);
      };
   }, [isOpen, animStage, isHovered]);

   // Cycle through engaging status messages while loading
   useEffect(() => {
      if (!isLoading) {
         setLoadingStatusIndex(0);
         return;
      }
      const interval = setInterval(() => {
         setLoadingStatusIndex((prev) => (prev + 1) % LOADING_STATUSES.length);
      }, 1400);
      return () => clearInterval(interval);
   }, [isLoading]);

   // Auto scroll to latest message
   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };

   useEffect(() => {
      if (animStage === "open") {
         scrollToBottom();
         setTimeout(() => inputRef.current?.focus(), 150);
      }
   }, [animStage, messages, isLoading]);

   // Handle escape key to close widget
   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === "Escape" && (animStage === "open" || animStage === "sliding_in")) {
            handleRequestClose();
         }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [animStage]);

   // Lock Lenis & body scroll on mobile screens when open
   useEffect(() => {
      if (animStage !== "closed" && hasMessages) {
         if (window.innerWidth < 768) {
            stopLenis();
            document.body.style.overflow = "hidden";
         }
      } else {
         startLenis();
         document.body.style.overflow = "";
      }

      return () => {
         startLenis();
         document.body.style.overflow = "";
      };
   }, [animStage, hasMessages]);

   const sendMessage = async (textToSend?: string) => {
      const query = (textToSend || input).trim();
      if (!query || isLoading) return;

      if (query.length > 300) {
         toast.error("Message exceeds 300 characters limit.");
         return;
      }

      const userMessage: Message = {
         id: Date.now().toString(),
         role: "user",
         content: query,
         timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      // Check if query is one of our preset starter questions for instant response
      if (STATIC_STARTER_ANSWERS[query]) {
         setIsLoading(true);
         setTimeout(() => {
            setMessages((prev) => [
               ...prev,
               {
                  id: (Date.now() + 1).toString(),
                  role: "assistant",
                  content: STATIC_STARTER_ANSWERS[query],
                  timestamp: new Date(),
                  model: "Assistant",
               },
            ]);
            setIsLoading(false);
         }, 300);
         return;
      }

      // Construct history slice for dynamic questions to AI backend
      const chatHistory = messages.slice(-6).map((m) => ({
         role: m.role === "user" ? "user" : "assistant",
         content: m.content,
      }));

      setIsLoading(true);

      try {
         const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               message: query,
               history: chatHistory,
            }),
         });

         const data = await res.json();

         if (!res.ok) {
            const errorMsg = data.error || "Unable to reach assistant right now.";
            if (res.status === 429) {
               toast.warning("Please wait a moment before sending another message.");
            } else {
               toast.error("Assistant Error: " + errorMsg);
            }
            setMessages((prev) => [
               ...prev,
               {
                  id: (Date.now() + 1).toString(),
                  role: "assistant",
                  content: errorMsg,
                  timestamp: new Date(),
               },
            ]);
            return;
         }

         setMessages((prev) => [
            ...prev,
            {
               id: (Date.now() + 1).toString(),
               role: "assistant",
               content: data.reply || "I'm here to assist you with anything related to Jasim's work and experience.",
               timestamp: new Date(),
               model: "Assistant",
            },
         ]);
      } catch (err) {
         console.error("Chat error:", err);
         toast.error("Connection failed. Please check your network.");
         setMessages((prev) => [
            ...prev,
            {
               id: (Date.now() + 1).toString(),
               role: "assistant",
               content: "Sorry, I'm currently unable to connect. Please feel free to email Jasim directly at jasimihsan1234@gmail.com.",
               timestamp: new Date(),
            },
         ]);
      } finally {
         setIsLoading(false);
      }
   };

   const clearChat = () => {
      setMessages([]);
   };

   return (
      <>
         {/* Floating Launcher FAB (Bottom-Right) with Interval-driven Rotating Tooltip */}
         <AnimatePresence>
            {animStage === "closed" && (
               <motion.div
                  initial={{ opacity: 0, scale: 0.4, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.3, transition: { duration: 0.15 } }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end select-none"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
               >
                  {/* Interval Speech Bubble Tooltip */}
                  <AnimatePresence>
                     {(showTooltip || isHovered) && (
                        <motion.div
                           initial={{ opacity: 0, y: 8, scale: 0.92 }}
                           animate={{
                              opacity: 1,
                              y: [0, -4, 0],
                              scale: 1,
                           }}
                           exit={{ opacity: 0, y: 6, scale: 0.92, transition: { duration: 0.2 } }}
                           transition={{
                              y: {
                                 duration: 2.4,
                                 repeat: Infinity,
                                 ease: "easeInOut",
                              },
                              opacity: { duration: 0.25 },
                              scale: { duration: 0.25 },
                           }}
                           whileHover={{ scale: 1.04 }}
                           whileTap={{ scale: 0.96 }}
                           onClick={() => setIsOpen(true)}
                           className="relative mb-2.5 cursor-pointer group"
                           role="button"
                           tabIndex={0}
                           onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
                        >
                           <div className="relative px-3.5 py-1.5 rounded-full bg-[#181513]/95 dark:bg-[#1E1B18]/95 backdrop-blur-xl text-[#F7F5F0] text-xs font-semibold tracking-tight shadow-[0_10px_30px_rgba(0,0,0,0.35),0_0_15px_rgba(212,163,115,0.12)] border border-[#D4A373]/30 dark:border-[#D4A373]/30 flex items-center gap-2 transition-all duration-200 group-hover:border-[#D4A373]/70">
                              {/* Glowing Status Beacon */}
                              <span className="relative flex h-2 w-2 flex-shrink-0">
                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_6px_#10b981]" />
                              </span>

                              {/* Animated Text Message */}
                              <AnimatePresence mode="wait">
                                 <motion.span key={tooltipMsgIndex} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.2 }} className="whitespace-nowrap">
                                    {TOOLTIP_MESSAGES[tooltipMsgIndex].text}
                                 </motion.span>
                              </AnimatePresence>

                              {/* Emoji / Sparkle */}
                              <span className="text-xs transition-transform duration-200 group-hover:rotate-12 inline-block">{TOOLTIP_MESSAGES[tooltipMsgIndex].emoji}</span>
                           </div>

                           {/* Smooth SVG Speech Bubble Tail Pointer (Aligned Right toward FAB) */}
                           <svg className="absolute right-6 -bottom-[6px] w-3.5 h-2 text-[#181513]/95 dark:text-[#1E1B18]/95 filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)] pointer-events-none" viewBox="0 0 14 8" fill="currentColor">
                              <path d="M0 0 L7 8 L14 0 Z" />
                           </svg>
                        </motion.div>
                     )}
                  </AnimatePresence>

                  {/* Launcher Circular Floating Button */}
                  <motion.button
                     whileHover={{ scale: 1.08 }}
                     whileTap={{ scale: 0.92 }}
                     onClick={() => setIsOpen(true)}
                     className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-gradient-to-b from-[#26211D] to-[#12100E] dark:from-[#26211D] dark:to-[#12100E] text-[#F7F5F0] shadow-[0_12px_36px_rgba(0,0,0,0.45),0_0_20px_rgba(212,163,115,0.15)] border border-[#D4A373]/35 hover:border-[#D4A373] transition-all duration-300 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A373]"
                     aria-label="Talk to Jasim's assistant"
                     title="Talk to Jasim's assistant"
                  >
                     {/* Ambient Pulse Glow */}
                     <span className="absolute inset-0 rounded-full bg-[#D4A373]/25 animate-ping opacity-35 pointer-events-none" />

                     {/* Subtle Inner Highlight Ring */}
                     <span className="absolute inset-0.5 rounded-full border border-white/10 pointer-events-none" />

                     {/* Assistant Icon with micro-interaction */}
                     <div className="relative flex items-center justify-center">
                        <MessageSquare size={19} className="text-[#D4A373] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
                        <span className="absolute -top-1 -right-1 flex h-2 w-2">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A373] opacity-60" />
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A373]" />
                        </span>
                     </div>
                  </motion.button>
               </motion.div>
            )}
         </AnimatePresence>

         {/* Spotlight / Chat Portal (Bottom Center, Sequenced Two-Phase Motion) */}
         {typeof document !== "undefined" &&
            createPortal(
               <AnimatePresence>
                  {animStage !== "closed" && (
                     <div className="fixed inset-x-0 bottom-4 sm:bottom-6 z-50 flex items-end justify-center px-3 sm:px-4 pointer-events-none">
                        {/* Command Bar Widget Stack with Consistent Uniform Width */}
                        <div className="pointer-events-auto flex flex-col gap-2.5 z-10 w-full max-w-lg md:max-w-xl lg:max-w-2xl">
                           {/* 1. Dynamic Above-Bar Container (Mounts ONLY after input bar reaches center) */}
                           <AnimatePresence
                              mode="wait"
                              onExitComplete={() => {
                                 if (animStage === "closing_top") {
                                    setAnimStage("sliding_out");
                                 }
                              }}
                           >
                              {animStage === "open" &&
                                 (hasMessages ? (
                                    <motion.div
                                       key="chat-thread"
                                       initial={{ opacity: 0, scaleY: 0.1, scaleX: 0.92, y: 30 }}
                                       animate={{ opacity: 1, scaleY: 1, scaleX: 1, y: 0 }}
                                       exit={{ opacity: 0, scaleY: 0.1, scaleX: 0.92, y: 20, transition: { duration: 0.2, ease: "easeInOut" } }}
                                       style={{ transformOrigin: "bottom center" }}
                                       transition={{ type: "spring", stiffness: 300, damping: 24 }}
                                       data-lenis-prevent="true"
                                       onWheel={(e) => e.stopPropagation()}
                                       onTouchMove={(e) => e.stopPropagation()}
                                       className="w-full bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden max-h-[65vh] sm:max-h-[520px]"
                                    >
                                       {/* Header */}
                                       <div className="px-4 py-3 border-b border-[#EFECE4] dark:border-[#E5DFD3]/10 bg-[#F7F5F0]/80 dark:bg-[#12100E]/80 backdrop-blur-md flex items-center justify-between shrink-0">
                                          <div className="flex items-center gap-2">
                                             <div className="w-7 h-7 rounded-lg bg-[#8A5A2B]/10 dark:bg-[#D4A373]/15 border border-[#8A5A2B]/20 dark:border-[#D4A373]/20 flex items-center justify-center text-[#8A5A2B] dark:text-[#D4A373]">
                                                <MessageSquare size={14} />
                                             </div>
                                             <div>
                                                <div className="text-xs font-bold text-[#181513] dark:text-[#E5DFD3] flex items-center gap-1.5">
                                                   <span>Jasim's Assistant</span>
                                                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                </div>
                                             </div>
                                          </div>

                                          <div className="flex items-center gap-1">
                                             <button onClick={clearChat} title="Clear conversation" className="p-1.5 rounded-lg text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3] hover:bg-[#EFECE4] dark:hover:bg-[#231E1A] transition-colors cursor-pointer">
                                                <RefreshCw size={13} />
                                             </button>
                                             <button onClick={handleRequestClose} title="Close" className="p-1.5 rounded-lg text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3] hover:bg-[#EFECE4] dark:hover:bg-[#231E1A] transition-colors cursor-pointer">
                                                <X size={15} />
                                             </button>
                                          </div>
                                       </div>

                                       {/* Dynamic Scrolling Messages Area */}
                                       <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3 custom-scrollbar text-xs leading-relaxed">
                                          {messages.map((msg) => {
                                             const isUser = msg.role === "user";
                                             return (
                                                <div key={msg.id} className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                                                   <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isUser ? "bg-[#8A5A2B] text-white" : "bg-[#EFECE4] dark:bg-[#231E1A] text-[#8A5A2B] dark:text-[#D4A373] border border-[#DCD6C8] dark:border-[#E5DFD3]/15"}`}>
                                                      {isUser ? <User size={12} /> : <Bot size={12} />}
                                                   </div>

                                                   <div
                                                      className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                                                         isUser ? "bg-[#8A5A2B] text-[#F7F5F0] rounded-tr-xs whitespace-pre-wrap font-medium" : "bg-[#F7F5F0] dark:bg-[#231E1A] text-[#181513] dark:text-[#E5DFD3] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 rounded-tl-xs shadow-2xs"
                                                      }`}
                                                   >
                                                      {isUser ? (
                                                         msg.content
                                                      ) : (
                                                         <ReactMarkdown
                                                            components={{
                                                               p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                                                               ul: ({ children }) => <ul className="my-1.5 ml-3.5 space-y-1.5 list-disc list-outside marker:text-[#8A5A2B] dark:marker:text-[#D4A373]">{children}</ul>,
                                                               ol: ({ children }) => <ol className="my-1.5 ml-3.5 space-y-1.5 list-decimal list-outside marker:font-semibold marker:text-[#8A5A2B] dark:marker:text-[#D4A373]">{children}</ol>,
                                                               li: ({ children }) => <li className="leading-relaxed pl-0.5">{children}</li>,
                                                               strong: ({ children }) => <strong className="font-semibold text-[#181513] dark:text-white">{children}</strong>,
                                                               em: ({ children }) => <em className="italic text-[#6E655C] dark:text-[#A89F91]">{children}</em>,
                                                               a: ({ href, children }) => (
                                                                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#8A5A2B] dark:text-[#D4A373] underline underline-offset-2 hover:opacity-80 transition-opacity font-medium">
                                                                     {children}
                                                                  </a>
                                                               ),
                                                               h3: ({ children }) => <h3 className="font-bold text-xs mt-2.5 mb-1 text-[#181513] dark:text-white">{children}</h3>,
                                                               h4: ({ children }) => <h4 className="font-semibold text-xs mt-2 mb-1 text-[#181513] dark:text-white">{children}</h4>,
                                                               code: ({ children }) => <code className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[11px] text-[#8A5A2B] dark:text-[#D4A373]">{children}</code>,
                                                               hr: () => <hr className="my-2 border-[#E2DDD2] dark:border-[#E5DFD3]/10" />,
                                                            }}
                                                         >
                                                            {msg.content}
                                                         </ReactMarkdown>
                                                      )}
                                                   </div>
                                                </div>
                                             );
                                          })}

                                          {/* Engaging Animated Loading Indicator */}
                                          {isLoading && (
                                             <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2.5">
                                                <div className="w-6 h-6 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] text-[#8A5A2B] dark:text-[#D4A373] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                                                   <Brain size={12} className="animate-pulse text-[#8A5A2B] dark:text-[#D4A373]" />
                                                </div>
                                                <div className="px-3.5 py-2.5 rounded-2xl bg-[#F7F5F0] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 rounded-tl-xs shadow-2xs space-y-2 min-w-0 w-full max-w-[220px]">
                                                   <div className="flex items-center gap-2">
                                                      <div className="flex items-center gap-1">
                                                         <div className="w-1.5 h-1.5 rounded-full bg-[#8A5A2B] dark:bg-[#D4A373] animate-bounce" />
                                                         <div className="w-1.5 h-1.5 rounded-full bg-[#8A5A2B] dark:bg-[#D4A373] animate-bounce [animation-delay:0.2s]" />
                                                         <div className="w-1.5 h-1.5 rounded-full bg-[#8A5A2B] dark:bg-[#D4A373] animate-bounce [animation-delay:0.4s]" />
                                                      </div>
                                                      <AnimatePresence mode="wait">
                                                         <motion.span key={loadingStatusIndex} initial={{ opacity: 0, y: 2 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -2 }} transition={{ duration: 0.2 }} className="text-[11px] font-medium text-[#6E655C] dark:text-[#A89F91]">
                                                            {LOADING_STATUSES[loadingStatusIndex]}
                                                         </motion.span>
                                                      </AnimatePresence>
                                                   </div>

                                                   {/* Reasoning shimmer bar */}
                                                   <div className="space-y-1.5 pt-0.5">
                                                      <div className="h-1.5 w-full rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                                                         <motion.div
                                                            className="h-full bg-gradient-to-r from-[#8A5A2B]/40 via-[#D4A373] to-[#8A5A2B]/40 dark:from-[#D4A373]/40 dark:via-[#F7F5F0] dark:to-[#D4A373]/40 rounded-full"
                                                            animate={{ x: ["-100%", "100%"] }}
                                                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                                            style={{ width: "50%" }}
                                                         />
                                                      </div>
                                                   </div>
                                                </div>
                                             </motion.div>
                                          )}

                                          <div ref={messagesEndRef} />
                                       </div>
                                    </motion.div>
                                 ) : (
                                    <motion.div
                                       key="suggested-questions"
                                       initial={{ opacity: 0, scaleY: 0.1, scaleX: 0.92, y: 25 }}
                                       animate={{ opacity: 1, scaleY: 1, scaleX: 1, y: 0 }}
                                       exit={{ opacity: 0, scaleY: 0.1, scaleX: 0.92, y: 15, transition: { duration: 0.2, ease: "easeInOut" } }}
                                       style={{ transformOrigin: "bottom center" }}
                                       transition={{ type: "spring", stiffness: 300, damping: 24 }}
                                       className="w-full bg-[#F7F5F0]/95 dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 rounded-3xl p-3 sm:p-3.5 shadow-md backdrop-blur-md"
                                    >
                                       <div className="text-[10px] font-bold text-[#6E655C] dark:text-[#A89F91] mb-2 uppercase tracking-wider flex items-center gap-1.5 px-0.5">
                                          <MessageSquare size={11} className="text-[#8A5A2B] dark:text-[#D4A373]" />
                                          <span>Suggested questions:</span>
                                       </div>
                                       <div className="flex flex-wrap gap-1.5">
                                          {STARTER_PROMPTS.map((prompt, idx) => (
                                             <button
                                                key={idx}
                                                disabled={isLoading}
                                                onClick={() => sendMessage(prompt)}
                                                className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-[#181513] dark:text-[#E5DFD3] hover:border-[#8A5A2B] dark:hover:border-[#D4A373] hover:bg-[#8A5A2B]/5 dark:hover:bg-[#D4A373]/10 transition-all cursor-pointer text-left truncate max-w-full shadow-2xs active:scale-[0.98]"
                                             >
                                                {prompt}
                                             </button>
                                          ))}
                                       </div>
                                    </motion.div>
                                 ))}
                           </AnimatePresence>

                           {/* 2. Bottom Command Input Row with Separated Send Button (Originating directly horizontally from bottom-right assistant button) */}
                           <motion.form
                              initial={{
                                 opacity: 0,
                                 x: "calc(50vw - 3.25rem)",
                                 y: 0,
                                 scale: 0.2,
                              }}
                              animate={animStage === "sliding_out" ? { opacity: 0, x: "calc(50vw - 3.25rem)", y: 0, scale: 0.2 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
                              transition={animStage === "sliding_out" ? { duration: 0.26, ease: [0.32, 0, 0.67, 0] } : { type: "spring", stiffness: 220, damping: 24, mass: 0.85 }}
                              onAnimationComplete={() => {
                                 if (animStage === "sliding_in") {
                                    setAnimStage("open");
                                 } else if (animStage === "sliding_out") {
                                    setAnimStage("closed");
                                    setIsOpen(false);
                                 }
                              }}
                              style={{ transformOrigin: "center right" }}
                              onSubmit={(e) => {
                                 e.preventDefault();
                                 sendMessage();
                              }}
                              className="flex items-center gap-2 w-full"
                           >
                              {/* Glowing Input Bar Container (Fully Rounded) */}
                              <div className="relative flex-1 group rounded-full p-[1.5px] overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
                                 {/* Iridescent / Rainbow Glow Border */}
                                 <motion.div
                                    className="absolute -inset-[150%] opacity-70 group-hover:opacity-100 transition-opacity blur-[1px]"
                                    style={{
                                       background: "conic-gradient(from 0deg, #D4A373, #8A5A2B, #F39C12, #E67E22, #E74C3C, #9B59B6, #3498DB, #1ABC9C, #2ECC71, #D4A373)",
                                    }}
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                                 />

                                 {/* Inner Input Body */}
                                 <div className="relative bg-white dark:bg-[#181513] rounded-full px-4 py-2.5 sm:py-3 flex items-center gap-2.5">
                                    <div className="text-[#8A5A2B] dark:text-[#D4A373] shrink-0 pl-1">
                                       <MessageSquare size={16} />
                                    </div>

                                    <input
                                       ref={inputRef}
                                       type="text"
                                       maxLength={300}
                                       value={input}
                                       onChange={(e) => setInput(e.target.value)}
                                       placeholder="Ask anything about Jasim..."
                                       disabled={isLoading}
                                       className="flex-1 bg-transparent border-none px-1 text-base sm:text-sm text-[#181513] dark:text-[#E5DFD3] placeholder-[#A89F91] focus:outline-none"
                                    />

                                    <button
                                       type="button"
                                       onClick={handleRequestClose}
                                       className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono rounded-full bg-[#F7F5F0] dark:bg-[#231E1A] text-[#6E655C] dark:text-[#A89F91] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 hover:text-[#181513] dark:hover:text-white transition-colors cursor-pointer shrink-0"
                                       title="Press Esc to close"
                                    >
                                       Esc
                                    </button>

                                    <button type="button" onClick={handleRequestClose} className="sm:hidden p-1 rounded-full text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3] cursor-pointer" aria-label="Close">
                                       <X size={15} />
                                    </button>
                                 </div>
                              </div>

                              {/* Separated External Send Button (Fully Rounded Circular) */}
                              <motion.button
                                 whileHover={{ scale: 1.06 }}
                                 whileTap={{ scale: 0.94 }}
                                 type="submit"
                                 disabled={!input.trim() || isLoading}
                                 className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#8A5A2B] dark:bg-[#D4A373] text-[#F7F5F0] dark:text-[#0B0A09] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-all cursor-pointer shrink-0 shadow-[0_8px_20px_rgba(138,90,43,0.3)] dark:shadow-[0_8px_20px_rgba(212,163,115,0.25)] border border-[#8A5A2B]/20 dark:border-[#D4A373]/20"
                                 aria-label="Send message"
                              >
                                 <Send size={15} />
                              </motion.button>
                           </motion.form>
                        </div>
                     </div>
                  )}
               </AnimatePresence>,
               document.body
            )}
      </>
   );
}
