"use client";

import axios from "axios";
import { CheckCircle2, Copy, Github, Linkedin, Mail, MapPin, Phone, Send, Sparkles, Twitter } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import ScrollReveal from "../animations/ScrollReveal";
import { TiltCard } from "../ui/tilt-card";

export default function Contact() {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

   const handleCopyEmail = (e: React.MouseEvent) => {
      e.preventDefault();
      navigator.clipboard.writeText("jasimihsan1234@gmail.com");
      toast.success("Email Copied!", {
         description: "jasimihsan1234@gmail.com has been copied to your clipboard.",
      });
   };

   const handleCopyPhone = (e: React.MouseEvent) => {
      e.preventDefault();
      navigator.clipboard.writeText("+919656646449");
      toast.success("Phone Number Copied!", {
         description: "+91 9656646449 has been copied to your clipboard.",
      });
   };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
         const accessKey =
            process.env.NEXT_PUBLIC_WEB3FORM_ACCESS_KEY ||
            (typeof window !== "undefined" && (window as unknown as { __ENV?: { VITE_WEB3FORM_ACCESS_KEY?: string } }).__ENV?.VITE_WEB3FORM_ACCESS_KEY) ||
            "";

         const data = {
            ...formData,
            access_key: accessKey,
            subject: `New Portfolio Contact from ${formData.name}`,
            from_name: formData.name,
            replyto: formData.email,
         };

         const response = await axios.post("https://api.web3forms.com/submit", data, {
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json",
            },
         });

         if (response.data.success) {
            const successMsg = "Thank you! Your message has been sent successfully.";
            setSubmitStatus({ success: true, message: successMsg });
            toast.success("Message Delivered", {
               description: "Thank you for reaching out! I'll get back to you within 24 hours.",
            });
            setFormData({ name: "", email: "", message: "" });
         } else {
            const errMsg = "Failed to send message. Please try again.";
            setSubmitStatus({ success: false, message: errMsg });
            toast.error("Delivery Failed", {
               description: "Please check your network or email directly at jasimihsan1234@gmail.com.",
            });
         }
      } catch (error) {
         console.error("Submission error:", error);
         const errMsg = "An error occurred. Please try again later.";
         setSubmitStatus({
            success: false,
            message: errMsg,
         });
         toast.error("Transmission Error", {
            description: "Something went wrong. Feel free to contact via LinkedIn or direct email.",
         });
      } finally {
         setIsSubmitting(false);
      }
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   return (
      <section id="contact" className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 relative z-10 pb-28 sm:pb-36">
         <ScrollReveal>
            <div className="max-w-6xl mx-auto">
               {/* Header */}
               <div className="text-center mb-12 sm:mb-16">
                  <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 text-[#8A5A2B] dark:text-[#D4A373] text-xs font-semibold uppercase tracking-wider mb-4">
                     <Sparkles size={14} />
                     Start a Conversation
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#181513] dark:text-[#E5DFD3] tracking-tight mb-3 sm:mb-4">Let's Build Something Exceptional</h2>
                  <p className="text-base sm:text-lg text-[#6E655C] dark:text-[#A89F91] max-w-2xl mx-auto font-normal">Have an opening, a freelance project, or an architecture inquiry? Send a message and I'll respond within 24 hours.</p>
               </div>

               <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                  {/* Left Column: Direct Info & Social Hub */}
                  <div className="lg:col-span-5 space-y-6">
                     <TiltCard max={6} glare={true} className="p-5 sm:p-8 bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_10px_35px_-10px_rgba(24,21,19,0.06)] rounded-[1.75rem] sm:rounded-[2.5rem]">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#181513] dark:text-[#E5DFD3] mb-5 sm:mb-6">Contact Channels</h3>

                        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                           {[
                              {
                                 icon: Mail,
                                 label: "Direct Email",
                                 value: "jasimihsan1234@gmail.com",
                                 href: "mailto:jasimihsan1234@gmail.com",
                                 onCopy: handleCopyEmail,
                              },
                              {
                                 icon: Phone,
                                 label: "Phone / WhatsApp",
                                 value: "+91 9656646449",
                                 href: "tel:+91 9656646449",
                                 onCopy: handleCopyPhone,
                              },
                              {
                                 icon: MapPin,
                                 label: "Location",
                                 value: "Malappuram, Kerala, India",
                                 href: "#",
                              },
                           ].map((item) => (
                              <div key={item.label} className="relative group">
                                 <a href={item.href} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 hover:border-[#8A5A2B] dark:hover:border-[#D4A373] hover:bg-white dark:hover:bg-[#2A241F] transition-all">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 flex items-center justify-center text-[#8A5A2B] dark:text-[#D4A373] group-hover:scale-105 transition-transform shadow-2xs shrink-0">
                                       <item.icon size={16} />
                                    </div>
                                    <div className="min-w-0 flex-1 pr-8 sm:pr-10">
                                       <div className="text-[11px] sm:text-xs text-[#A89F91] dark:text-[#6E655C] font-medium">{item.label}</div>
                                       <div className="text-xs sm:text-sm font-semibold text-[#181513] dark:text-[#E5DFD3] group-hover:text-[#8A5A2B] dark:group-hover:text-[#D4A373] transition-colors truncate">{item.value}</div>
                                    </div>
                                 </a>
                                 {item.onCopy && (
                                    <button
                                       type="button"
                                       onClick={item.onCopy}
                                       className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-xl bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-[#6E655C] dark:text-[#A89F91] hover:text-[#8A5A2B] dark:hover:text-[#D4A373] shadow-xs hover:scale-105 transition-all cursor-pointer"
                                       title={`Copy ${item.label}`}
                                       aria-label={`Copy ${item.label}`}
                                    >
                                       <Copy size={13} />
                                    </button>
                                 )}
                              </div>
                           ))}
                        </div>

                        <div className="pt-5 sm:pt-6 border-t border-[#EFECE4] dark:border-[#E5DFD3]/10">
                           <div className="text-xs font-bold uppercase tracking-wider text-[#A89F91] dark:text-[#6E655C] mb-3 sm:mb-4">Social Profiles</div>
                           <div className="flex gap-2.5 sm:gap-3">
                              {[
                                 { icon: Github, href: "http://github.com/JasimIhsan", label: "GitHub" },
                                 { icon: Linkedin, href: "http://linkedin.com/in/jasim-ihsan-m", label: "LinkedIn" },
                                 { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                              ].map(({ icon: Icon, href, label }) => (
                                 <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 flex items-center justify-center text-[#6E655C] dark:text-[#A89F91] hover:text-[#8A5A2B] dark:hover:text-[#D4A373] hover:border-[#8A5A2B] dark:hover:border-[#D4A373] hover:bg-white dark:hover:bg-[#181513] transition-all shadow-2xs"
                                    aria-label={label}
                                 >
                                    <Icon size={17} />
                                 </a>
                              ))}
                           </div>
                        </div>
                     </TiltCard>
                  </div>

                  {/* Right Column: Contact Message Form */}
                  <div className="lg:col-span-7">
                     <div className="p-5 sm:p-8 md:p-10 bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_10px_35px_-10px_rgba(24,21,19,0.06)] rounded-[1.75rem] sm:rounded-[2.5rem]">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#181513] dark:text-[#E5DFD3] mb-1.5 sm:mb-2">Send a Direct Message</h3>
                        <p className="text-xs sm:text-sm text-[#6E655C] dark:text-[#A89F91] mb-6 sm:mb-8">Fill in your details below and I'll get back to you promptly.</p>

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                           {submitStatus && (
                              <div
                                 className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm font-medium flex items-center gap-3 ${
                                    submitStatus.success ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40" : "bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40"
                                 }`}
                              >
                                 {submitStatus.success && <CheckCircle2 size={18} className="shrink-0" />}
                                 <span>{submitStatus.message}</span>
                              </div>
                           )}

                           <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                              <div>
                                 <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#6E655C] dark:text-[#A89F91] mb-2">
                                    Your Name
                                 </label>
                                 <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl text-base sm:text-sm bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-[#181513] dark:text-[#E5DFD3] focus:bg-white dark:focus:bg-[#181513] focus:border-[#8A5A2B] dark:focus:border-[#D4A373] focus:ring-4 focus:ring-[#8A5A2B]/10 outline-none transition-all placeholder:text-[#A89F91]"
                                    placeholder="Jane Doe"
                                 />
                              </div>

                              <div>
                                 <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#6E655C] dark:text-[#A89F91] mb-2">
                                    Email Address
                                 </label>
                                 <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl text-base sm:text-sm bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-[#181513] dark:text-[#E5DFD3] focus:bg-white dark:focus:bg-[#181513] focus:border-[#8A5A2B] dark:focus:border-[#D4A373] focus:ring-4 focus:ring-[#8A5A2B]/10 outline-none transition-all placeholder:text-[#A89F91]"
                                    placeholder="jane@example.com"
                                 />
                              </div>
                           </div>

                           <div>
                              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#6E655C] dark:text-[#A89F91] mb-2">
                                 Message Details
                              </label>
                              <textarea
                                 id="message"
                                 name="message"
                                 value={formData.message}
                                 onChange={handleChange}
                                 required
                                 rows={5}
                                 className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl text-base sm:text-sm bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-[#181513] dark:text-[#E5DFD3] focus:bg-white dark:focus:bg-[#181513] focus:border-[#8A5A2B] dark:focus:border-[#D4A373] focus:ring-4 focus:ring-[#8A5A2B]/10 outline-none transition-all resize-none placeholder:text-[#A89F91]"
                                 placeholder="Tell me about your product requirements, role, or timelines..."
                              />
                           </div>

                           <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-3.5 sm:py-4 rounded-xl bg-[#181513] dark:bg-[#E5DFD3] hover:bg-[#8A5A2B] dark:hover:bg-[#D4A373] text-[#F7F5F0] dark:text-[#0B0A09] font-semibold text-sm tracking-wide shadow-md shadow-black/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                           >
                              {isSubmitting ? (
                                 <div className="w-5 h-5 border-2 border-white dark:border-[#0B0A09] border-t-transparent rounded-full animate-spin" />
                              ) : (
                                 <>
                                    <span>Send Message</span>
                                    <Send size={16} />
                                 </>
                              )}
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </ScrollReveal>
      </section>
   );
}
