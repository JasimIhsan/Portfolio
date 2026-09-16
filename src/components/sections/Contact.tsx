import axios from "axios";
import { CheckCircle2, Github, Linkedin, Mail, MapPin, Phone, Send, Sparkles, Twitter } from "lucide-react";
import type React from "react";
import { useState } from "react";
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

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
         const data = {
            ...formData,
            access_key: import.meta.env.VITE_WEB3FORM_ACCESS_KEY as string,
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
            setSubmitStatus({ success: true, message: "Thank you! Your message has been sent successfully." });
            setFormData({ name: "", email: "", message: "" });
         } else {
            setSubmitStatus({ success: false, message: "Failed to send message. Please try again." });
         }
      } catch (error) {
         console.error("Submission error:", error);
         setSubmitStatus({
            success: false,
            message: "An error occurred. Please try again later.",
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
      <section id="contact" className="py-28 px-6 relative z-10 pb-36">
         <ScrollReveal>
            <div className="max-w-6xl mx-auto">
               {/* Header */}
               <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFECE4] dark:bg-[#231E1A] border border-[#DCD6C8] dark:border-[#E5DFD3]/15 text-[#8A5A2B] dark:text-[#D4A373] text-xs font-semibold uppercase tracking-wider mb-4">
                     <Sparkles size={14} />
                     Start a Conversation
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#181513] dark:text-[#E5DFD3] tracking-tight mb-4">
                     Let's Build Something Exceptional
                  </h2>
                  <p className="text-lg text-[#6E655C] dark:text-[#A89F91] max-w-2xl mx-auto font-normal">
                     Have an opening, a freelance project, or an architecture inquiry? Send a message and I'll respond within 24 hours.
                  </p>
               </div>

               <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Direct Info & Social Hub */}
                  <div className="lg:col-span-5 space-y-6">
                     <TiltCard
                        max={6}
                        glare={true}
                        className="p-8 bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_10px_35px_-10px_rgba(24,21,19,0.06)] rounded-[2.5rem]"
                     >
                        <h3 className="text-2xl font-bold text-[#181513] dark:text-[#E5DFD3] mb-6">Contact Channels</h3>

                        <div className="space-y-4 mb-8">
                           {[
                              {
                                 icon: Mail,
                                 label: "Direct Email",
                                 value: "jasimihsan1234@gmail.com",
                                 href: "mailto:jasimihsan1234@gmail.com",
                              },
                              {
                                 icon: Phone,
                                 label: "Phone / WhatsApp",
                                 value: "+91 9656646449",
                                 href: "tel:+91 9656646449",
                              },
                              {
                                 icon: MapPin,
                                 label: "Location",
                                 value: "Malappuram, Kerala, India",
                                 href: "#",
                              },
                           ].map((item) => (
                              <a
                                 key={item.label}
                                 href={item.href}
                                 className="flex items-center gap-4 p-4 rounded-2xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/10 hover:border-[#8A5A2B] dark:hover:border-[#D4A373] hover:bg-white dark:hover:bg-[#2A241F] transition-all group"
                              >
                                 <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#181513] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 flex items-center justify-center text-[#8A5A2B] dark:text-[#D4A373] group-hover:scale-105 transition-transform shadow-2xs">
                                    <item.icon size={18} />
                                 </div>
                                 <div>
                                    <div className="text-xs text-[#A89F91] dark:text-[#6E655C] font-medium">{item.label}</div>
                                    <div className="text-sm font-semibold text-[#181513] dark:text-[#E5DFD3] group-hover:text-[#8A5A2B] dark:group-hover:text-[#D4A373] transition-colors">
                                       {item.value}
                                    </div>
                                 </div>
                              </a>
                           ))}
                        </div>

                        <div className="pt-6 border-t border-[#EFECE4] dark:border-[#E5DFD3]/10">
                           <div className="text-xs font-bold uppercase tracking-wider text-[#A89F91] dark:text-[#6E655C] mb-4">
                              Social Profiles
                           </div>
                           <div className="flex gap-3">
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
                                    className="w-11 h-11 rounded-xl bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 flex items-center justify-center text-[#6E655C] dark:text-[#A89F91] hover:text-[#8A5A2B] dark:hover:text-[#D4A373] hover:border-[#8A5A2B] dark:hover:border-[#D4A373] hover:bg-white dark:hover:bg-[#181513] transition-all shadow-2xs"
                                    aria-label={label}
                                 >
                                    <Icon size={18} />
                                 </a>
                              ))}
                           </div>
                        </div>
                     </TiltCard>
                  </div>

                  {/* Right Column: Contact Message Form */}
                  <div className="lg:col-span-7">
                     <div className="p-8 md:p-10 bg-white dark:bg-[#181513]/95 border border-[#E2DDD2] dark:border-[#E5DFD3]/15 shadow-[0_10px_35px_-10px_rgba(24,21,19,0.06)] rounded-[2.5rem]">
                        <h3 className="text-2xl font-bold text-[#181513] dark:text-[#E5DFD3] mb-2">Send a Direct Message</h3>
                        <p className="text-sm text-[#6E655C] dark:text-[#A89F91] mb-8">Fill in your details below and I'll get back to you promptly.</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                           {submitStatus && (
                              <div
                                 className={`p-4 rounded-2xl text-sm font-medium flex items-center gap-3 ${
                                    submitStatus.success
                                       ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40"
                                       : "bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40"
                                 }`}
                              >
                                 {submitStatus.success && <CheckCircle2 size={18} className="shrink-0" />}
                                 <span>{submitStatus.message}</span>
                              </div>
                           )}

                           <div className="grid sm:grid-cols-2 gap-5">
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
                                    className="w-full px-4 py-3.5 rounded-xl text-sm bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-[#181513] dark:text-[#E5DFD3] focus:bg-white dark:focus:bg-[#181513] focus:border-[#8A5A2B] dark:focus:border-[#D4A373] focus:ring-4 focus:ring-[#8A5A2B]/10 outline-none transition-all placeholder:text-[#A89F91]"
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
                                    className="w-full px-4 py-3.5 rounded-xl text-sm bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-[#181513] dark:text-[#E5DFD3] focus:bg-white dark:focus:bg-[#181513] focus:border-[#8A5A2B] dark:focus:border-[#D4A373] focus:ring-4 focus:ring-[#8A5A2B]/10 outline-none transition-all placeholder:text-[#A89F91]"
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
                                 className="w-full px-4 py-3.5 rounded-xl text-sm bg-[#EFECE4] dark:bg-[#231E1A] border border-[#E2DDD2] dark:border-[#E5DFD3]/15 text-[#181513] dark:text-[#E5DFD3] focus:bg-white dark:focus:bg-[#181513] focus:border-[#8A5A2B] dark:focus:border-[#D4A373] focus:ring-4 focus:ring-[#8A5A2B]/10 outline-none transition-all resize-none placeholder:text-[#A89F91]"
                                 placeholder="Tell me about your product requirements, role, or timelines..."
                              />
                           </div>

                           <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-4 rounded-xl bg-[#181513] dark:bg-[#E5DFD3] hover:bg-[#8A5A2B] dark:hover:bg-[#D4A373] text-[#F7F5F0] dark:text-[#0B0A09] font-semibold text-sm tracking-wide shadow-md shadow-black/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
