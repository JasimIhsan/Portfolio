import axios from "axios";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import type React from "react";
import { useState } from "react";
import ScrollReveal from "../animations/ScrollReveal";

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
            setSubmitStatus({ success: true, message: "Message sent successfully!" });
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
      <section id="contact" className="py-24 px-6 relative z-10 pb-32">
         <ScrollReveal>
            <div className="max-w-6xl mx-auto">
               <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-20 text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-[#08142C]">Let's Work Together</h2>
                  <p className="text-lg text-[#64748B] font-normal max-w-2xl mx-auto">Have a project in mind? I'd love to hear about it.</p>
               </motion.div>

               <div className="grid lg:grid-cols-12 gap-12">
                  {/* Contact info */}
                  <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="lg:col-span-5">
                     <div className="clay-card p-8 md:p-10 rounded-[2.5rem] space-y-12 h-full relative overflow-hidden bg-white">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#2563EB]/5 rounded-full blur-[60px] translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        <div className="relative z-10">
                           <h3 className="text-2xl font-bold mb-8 text-[#08142C]">Get in Touch</h3>
                           <div className="space-y-6">
                              {[
                                 { icon: Mail, label: "Email", value: "jasimihsan1234@gmail.com", href: "mailto:jasimihsan1234@gmail.com" },
                                 { icon: Phone, label: "Phone", value: "+91 9656646449", href: "tel:+91 9656646449" },
                                 { icon: MapPin, label: "Location", value: "Malappuram, Kerala", href: "#" },
                              ].map((contact, index) => (
                                 <motion.a
                                    key={contact.label}
                                    href={contact.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-5 p-4 rounded-2xl transition-all duration-300 hover:bg-[#F8FAFC] group border border-transparent hover:border-[#E5E7EB]"
                                 >
                                    <div className="clay-pill bg-white p-3 text-[#2563EB] group-hover:scale-110 transition-all border border-[#E5E7EB] shadow-sm">
                                       <contact.icon size={20} />
                                    </div>
                                    <div>
                                       <div className="text-sm font-medium text-[#64748B] mb-1">{contact.label}</div>
                                       <div className="text-[#08142C] font-semibold">{contact.value}</div>
                                    </div>
                                 </motion.a>
                              ))}
                           </div>
                        </div>

                        <div className="relative z-10">
                           <h3 className="text-xl font-bold mb-6 text-[#08142C]">Follow Me</h3>
                           <div className="flex gap-4">
                              {[
                                 { icon: Github, href: "http://github.com/JasimIhsan", label: "GitHub" },
                                 { icon: Linkedin, href: "http://linkedin.com/in/jasim-ihsan-m", label: "LinkedIn" },
                                 { icon: Twitter, href: "#", label: "Twitter" },
                              ].map((social, index) => (
                                 <motion.a
                                    key={social.label}
                                    href={social.href}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    target="_blank"
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="clay-pill p-4 text-[#64748B] hover:text-[#2563EB] bg-white border border-[#E5E7EB] shadow-sm hover:border-[#2563EB]/30 transition-all"
                                    aria-label={social.label}
                                 >
                                    <social.icon size={22} />
                                 </motion.a>
                              ))}
                           </div>
                        </div>
                     </div>
                  </motion.div>

                  {/* Contact form */}
                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="lg:col-span-7">
                     <div className="clay-card p-8 md:p-10 rounded-[2.5rem] bg-white">
                        <form onSubmit={handleSubmit} className="space-y-6">
                           {submitStatus && <div className={`p-4 rounded-xl font-medium ${submitStatus.success ? "bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20" : "bg-red-50 text-red-600 border border-red-200"}`}>{submitStatus.message}</div>}
                           <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                 <label htmlFor="name" className="block text-sm font-semibold mb-2 text-[#08142C] ml-2">
                                    Name
                                 </label>
                                 <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 rounded-[1.2rem] transition-all duration-300 outline-none bg-[#F8FAFC] border border-[#E5E7EB] text-[#08142C] focus:border-[#2563EB]/50 focus:bg-white shadow-sm placeholder-slate-400"
                                    placeholder="Your name"
                                 />
                              </div>
                              <div>
                                 <label htmlFor="email" className="block text-sm font-semibold mb-2 text-[#08142C] ml-2">
                                    Email
                                 </label>
                                 <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 rounded-[1.2rem] transition-all duration-300 outline-none bg-[#F8FAFC] border border-[#E5E7EB] text-[#08142C] focus:border-[#2563EB]/50 focus:bg-white shadow-sm placeholder-slate-400"
                                    placeholder="your@email.com"
                                 />
                              </div>
                           </div>

                           <div>
                              <label htmlFor="message" className="block text-sm font-semibold mb-2 text-[#08142C] ml-2">
                                 Message
                              </label>
                              <textarea
                                 id="message"
                                 name="message"
                                 value={formData.message}
                                 onChange={handleChange}
                                 required
                                 rows={6}
                                 className="w-full px-5 py-4 rounded-[1.2rem] transition-all duration-300 outline-none resize-none bg-[#F8FAFC] border border-[#E5E7EB] text-[#08142C] focus:border-[#2563EB]/50 focus:bg-white shadow-sm placeholder-slate-400"
                                 placeholder="Tell me about your project..."
                              />
                           </div>

                           {/* Hidden inputs for email customization */}
                           <input type="hidden" name="subject" value={`New Portfolio Contact from ${formData.name}`} />
                           <input type="hidden" name="from_name" value={formData.name} />
                           <input type="hidden" name="replyto" value={formData.email} />
                           <input
                              type="hidden"
                              name="html"
                              value={`
                                       <h2>New Contact Form Submission</h2>
                                       <p><strong>Name:</strong> ${formData.name}</p>
                                       <p><strong>Email:</strong> ${formData.email}</p>
                                       <p><strong>Message:</strong> ${formData.message}</p>
                                       <hr />
                                       <p><small>Sent from Jasim's Portfolio Contact Form</small></p>
                                 `}
                           />

                           <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="clay-btn w-full flex items-center justify-center gap-3 px-6 py-4 text-white font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed group shadow-md mt-4">
                              {isSubmitting ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> : <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                              {isSubmitting ? "Sending..." : "Send Message"}
                           </motion.button>
                        </form>
                     </div>
                  </motion.div>
               </div>
            </div>
         </ScrollReveal>
      </section>
   );
}
