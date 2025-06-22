import type React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import axios from "axios";

interface ContactProps {
	isDark: boolean;
}

export default function Contact({ isDark }: ContactProps) {
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
				subject: `New Portfolio Contact from ${formData.name}`, // Custom email subject
				from_name: formData.name, // Sender name in email
				replyto: formData.email, // Reply-to address
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
		<section id="contact" className={`py-20 px-4 ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
			<div className="max-w-6xl mx-auto">
				<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-16 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
					<p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>Have a project in mind? I'd love to hear about it.</p>
				</motion.div>

				<div className="grid lg:grid-cols-12 gap-12">
					{/* Contact info */}
					<motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="lg:col-span-5">
						<div className="space-y-8">
							<div>
								<h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
								<div className="space-y-4">
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
											className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${isDark ? "hover:bg-gray-800 text-gray-300 hover:text-white" : "hover:bg-white text-gray-700 hover:text-gray-900"}`}>
											<div className={`p-2 rounded-lg ${isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"}`}>
												<contact.icon size={18} />
											</div>
											<div>
												<div className="text-sm font-medium">{contact.label}</div>
												<div className={isDark ? "text-gray-400" : "text-gray-600"}>{contact.value}</div>
											</div>
										</motion.a>
									))}
								</div>
							</div>

							<div>
								<h3 className="text-xl font-semibold mb-6">Follow Me</h3>
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
											className={`p-3 rounded-full transition-all duration-300 ${
												isDark ? "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white" : "bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 shadow-md hover:shadow-lg"
											}`}
											aria-label={social.label}>
											<social.icon size={20} />
										</motion.a>
									))}
								</div>
							</div>
						</div>
					</motion.div>

					{/* Contact form */}
					<motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="lg:col-span-7">
						<form onSubmit={handleSubmit} className="space-y-6">
							{submitStatus && <div className={`p-4 rounded-lg ${submitStatus.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{submitStatus.message}</div>}
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<label htmlFor="name" className="block text-sm font-medium mb-2">
										Name
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										required
										className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
											isDark ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500" : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
										}`}
										placeholder="Your name"
									/>
								</div>
								<div>
									<label htmlFor="email" className="block text-sm font-medium mb-2">
										Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										required
										className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 ${
											isDark ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500" : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
										}`}
										placeholder="your@email.com"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="message" className="block text-sm font-medium mb-2">
									Message
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleChange}
									required
									rows={6}
									className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 resize-none ${
										isDark ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500" : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
									}`}
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

							<motion.button
								type="submit"
								disabled={isSubmitting}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
									isDark ? "bg-blue-600 hover:bg-blue-500 text-white disabled:bg-gray-700" : "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400"
								} disabled:cursor-not-allowed`}>
								{isSubmitting ? (
									<motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
								) : (
									<Send size={18} />
								)}
								{isSubmitting ? "Sending..." : "Send Message"}
							</motion.button>
						</form>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
