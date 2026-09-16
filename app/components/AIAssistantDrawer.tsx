"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageSquare, RefreshCw, Send, Sparkles, User, X } from "lucide-react";
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
}

const STARTER_PROMPTS = ["What is Jasim's primary tech stack?", "Tell me about his key projects", "Is Jasim available for full-time roles?", "What is his experience with Flutter?"];

const COOKING_STEPS = ["Analyzing your question...", "Scanning Jasim's project archives...", "Synthesizing technical details...", "Formatting response..."];

export default function AIAssistantDrawer() {
   const [isOpen, setIsOpen] = useState(false);
   const [messages, setMessages] = useState<Message[]>([
      {
         id: "welcome",
         role: "assistant",
         content: "Hi! I'm Jasim's AI Portfolio Assistant. Ask me anything about his engineering background, stack, or shipped projects!",
         timestamp: new Date(),
      },
   ]);
   const [input, setInput] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [cookingStep, setCookingStep] = useState(0);
   const messagesEndRef = useRef<HTMLDivElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);

   // Cycle through engaging status messages while the AI response is cooking
   useEffect(() => {
      if (!isLoading) {
         setCookingStep(0);
         return;
      }
      const interval = setInterval(() => {
         setCookingStep((prev) => (prev + 1) % COOKING_STEPS.length);
      }, 1500);
      return () => clearInterval(interval);
   }, [isLoading]);

   // Auto scroll to latest message
   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };

   useEffect(() => {
      if (isOpen) {
         scrollToBottom();
         setTimeout(() => inputRef.current?.focus(), 150);
      }
   }, [isOpen, messages, isLoading]);

   // Lock Lenis & body scroll on mobile screens when open
   useEffect(() => {
      if (isOpen) {
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
   }, [isOpen]);

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

      // Construct history slice for backend
      const chatHistory = messages
         .filter((m) => m.id !== "welcome")
         .slice(-4)
         .map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.content,
         }));

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
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
            const errorMsg = data.error || "Unable to reach AI assistant right now.";
            if (res.status === 429) {
               toast.warning("Rate limited: Please wait a moment.");
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
               content: data.reply || "I'm ready to answer any questions about Jasim's portfolio.",
               timestamp: new Date(),
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
               content: "Sorry, I'm currently unable to connect to the assistant server. Please feel free to email Jasim directly at jasimihsan1234@gmail.com.",
               timestamp: new Date(),
            },
         ]);
      } finally {
         setIsLoading(false);
      }
   };

   const clearChat = () => {
      setMessages([
         {
            id: "welcome",
            role: "assistant",
            content: "Chat cleared! How else can I help you learn about Jasim?",
            timestamp: new Date(),
         },
      ]);
   };

   return (
      <>
         {/* Floating Trigger Button (Bottom-Right) */}
         <div className="fixed bottom-6 right-6 z-40">
            <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setIsOpen(true)}
               className={`flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#181513] dark:bg-[#E5DFD3] text-[#F7F5F0] dark:text-[#0B0A09] shadow-[0_10px_30px_rgba(24,21,19,0.25)] dark:shadow-[0_10px_30px_rgba(212,163,115,0.2)] border border-white/20 dark:border-black/20 hover:border-[#8A5A2B] dark:hover:border-[#D4A373] transition-all cursor-pointer ${
                  isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
               }`}
               aria-label="Ask AI about Jasim"
               title="Ask AI about Jasim"
            >
               <div className="relative">
                  <Sparkles size={16} className="text-[#D4A373] dark:text-[#8A5A2B] animate-pulse" />
               </div>
               <span className="text-xs font-bold tracking-tight">Ask AI</span>
               <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-white/20 dark:bg-black/10 text-white dark:text-black">Gemini</span>
            </motion.button>
         </div>

         {/* Chat Modal / Drawer Portal */}
         {typeof document !== "undefined" &&
            createPortal(
               <AnimatePresence>
                  {isOpen && (
                     <div className="fixed inset-0 z-50 flex items-end sm:items-end justify-end p-0 sm:p-6 pointer-events-none">
                        {/* Backdrop on mobile */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-xs sm:hidden pointer-events-auto" />

                        {/* Drawer Window */}
                        <motion.div
                           initial={{ opacity: 0, y: 30, scale: 0.96 }}
                           animate={{ opacity: 1, y: 0, scale: 1 }}
                           exit={{ opacity: 0, y: 30, scale: 0.96 }}
                           transition={{ type: "spring", stiffness: 380, damping: 30 }}
                           data-lenis-prevent="true"
                           onWheel={(e) => e.stopPropagation()}
                           onTouchMove={(e) => e.stopPropagation()}
                           className="pointer-events-auto w-full sm:w-[400px] h-[540px] max-h-[85vh] sm:max-h-[600px] bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 rounded-t-3xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
                        >
                           {/* Header */}
                           <div className="px-4 py-3.5 border-b border-[#EFECE4] dark:border-[#E5DFD3]/10 bg-[#F7F5F0]/80 dark:bg-[#12100E]/80 backdrop-blur-md flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                 <div className="w-8 h-8 rounded-xl bg-[#8A5A2B]/10 dark:bg-[#D4A373]/15 border border-[#8A5A2B]/20 dark:border-[#D4A373]/20 flex items-center justify-center text-[#8A5A2B] dark:text-[#D4A373]">
                                    <Sparkles size={16} />
                                 </div>
                                 <div>
                                    <div className="text-xs font-bold text-[#181513] dark:text-[#E5DFD3] flex items-center gap-1.5">
                                       <span>Ask AI Assistant</span>
                                       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    </div>
                                    <div className="text-[10px] text-[#6E655C] dark:text-[#A89F91] font-mono">Grounded on Jasim's Resume</div>
                                 </div>
                              </div>

                              <div className="flex items-center gap-1">
                                 <button onClick={clearChat} title="Clear conversation" className="p-1.5 rounded-lg text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3] hover:bg-[#EFECE4] dark:hover:bg-[#231E1A] transition-colors cursor-pointer">
                                    <RefreshCw size={14} />
                                 </button>
                                 <button onClick={() => setIsOpen(false)} title="Close Assistant" className="p-1.5 rounded-lg text-[#6E655C] dark:text-[#A89F91] hover:text-[#181513] dark:hover:text-[#E5DFD3] hover:bg-[#EFECE4] dark:hover:bg-[#231E1A] transition-colors cursor-pointer">
                                    <X size={16} />
                                 </button>
                              </div>
                           </div>

                           {/* Messages Container */}
                           <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3 custom-scrollbar text-xs leading-relaxed">
                              {messages.map((msg) => {
                                 const isUser = msg.role === "user";
                                 return (
                                    <div key={msg.id} className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                                       <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isUser ? "bg-[#8A5A2B] text-white" : "bg-[#EFECE4] dark:bg-[#231E1A] text-[#8A5A2B] dark:text-[#D4A373] border border-[#DCD6C8] dark:border-[#E5DFD3]/15"}`}>{isUser ? <User size={12} /> : <Bot size={12} />}</div>

                                       <div
                                          className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${isUser ? "bg-[#8A5A2B] text-[#F7F5F0] rounded-tr-xs whitespace-pre-wrap font-medium" : "bg-[#F7F5F0] dark:bg-[#231E1A] text-[#181513] dark:text-[#E5DFD3] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 rounded-tl-xs shadow-2xs"}`}
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

                              {/* Engaging Cooking / Loading Indicator */}
                              {isLoading && (
                                 <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2.5">
                                    <div className="w-6 h-6 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] text-[#8A5A2B] dark:text-[#D4A373] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                                       <Sparkles size={12} className="animate-spin text-[#8A5A2B] dark:text-[#D4A373]" style={{ animationDuration: "3.5s" }} />
                                    </div>
                                    <div className="px-3.5 py-2.5 rounded-2xl bg-[#F7F5F0] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 rounded-tl-xs shadow-2xs space-y-2 min-w-[210px]">
                                       <div className="flex items-center gap-2">
                                          <div className="flex items-center gap-1">
                                             <div className="w-1.5 h-1.5 rounded-full bg-[#8A5A2B] dark:bg-[#D4A373] animate-bounce" />
                                             <div className="w-1.5 h-1.5 rounded-full bg-[#8A5A2B] dark:bg-[#D4A373] animate-bounce [animation-delay:0.2s]" />
                                             <div className="w-1.5 h-1.5 rounded-full bg-[#8A5A2B] dark:bg-[#D4A373] animate-bounce [animation-delay:0.4s]" />
                                          </div>
                                          <AnimatePresence mode="wait">
                                             <motion.span key={cookingStep} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.18 }} className="text-[11px] font-medium text-[#6E655C] dark:text-[#A89F91]">
                                                {COOKING_STEPS[cookingStep]}
                                             </motion.span>
                                          </AnimatePresence>
                                       </div>
                                       {/* Subtle skeleton shimmer */}
                                       <div className="space-y-1.5 pt-0.5">
                                          <div className="h-2 w-4/5 rounded bg-black/5 dark:bg-white/5 animate-pulse" />
                                          <div className="h-2 w-3/5 rounded bg-black/5 dark:bg-white/5 animate-pulse [animation-delay:0.2s]" />
                                       </div>
                                    </div>
                                 </motion.div>
                              )}

                              <div ref={messagesEndRef} />
                           </div>

                           {/* Suggested Starter Prompts (shown if minimal conversation) */}
                           {messages.length <= 2 && (
                              <div className="px-3.5 py-2 border-t border-[#EFECE4] dark:border-[#E5DFD3]/10 bg-[#F7F5F0]/50 dark:bg-[#12100E]/50">
                                 <div className="text-[10px] font-semibold text-[#6E655C] dark:text-[#A89F91] mb-1.5 uppercase tracking-wider flex items-center gap-1">
                                    <MessageSquare size={10} />
                                    <span>Suggested Inquiries</span>
                                 </div>
                                 <div className="flex flex-wrap gap-1.5">
                                    {STARTER_PROMPTS.map((prompt, idx) => (
                                       <button
                                          key={idx}
                                          disabled={isLoading}
                                          onClick={() => sendMessage(prompt)}
                                          className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-[#181513] dark:text-[#E5DFD3] hover:border-[#8A5A2B] dark:hover:border-[#D4A373] transition-colors cursor-pointer text-left truncate max-w-full"
                                       >
                                          {prompt}
                                       </button>
                                    ))}
                                 </div>
                              </div>
                           )}

                           {/* Input Box */}
                           <form
                              onSubmit={(e) => {
                                 e.preventDefault();
                                 sendMessage();
                              }}
                              className="p-3 border-t border-[#EFECE4] dark:border-[#E5DFD3]/10 bg-white dark:bg-[#181513] flex items-center gap-2"
                           >
                              <input
                                 ref={inputRef}
                                 type="text"
                                 maxLength={300}
                                 value={input}
                                 onChange={(e) => setInput(e.target.value)}
                                 placeholder="Ask about Jasim's skills, apps..."
                                 disabled={isLoading}
                                 className="flex-1 bg-[#F7F5F0] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 rounded-xl px-3.5 py-2 text-xs text-[#181513] dark:text-[#E5DFD3] placeholder-[#A89F91] focus:outline-none focus:border-[#8A5A2B] dark:focus:border-[#D4A373] transition-colors"
                              />
                              <button
                                 type="submit"
                                 disabled={!input.trim() || isLoading}
                                 className="w-8 h-8 rounded-xl bg-[#8A5A2B] dark:bg-[#D4A373] text-[#F7F5F0] dark:text-[#0B0A09] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all cursor-pointer shrink-0 shadow-xs"
                                 aria-label="Send message"
                              >
                                 <Send size={13} />
                              </button>
                           </form>
                        </motion.div>
                     </div>
                  )}
               </AnimatePresence>,
               document.body
            )}
      </>
   );
}
