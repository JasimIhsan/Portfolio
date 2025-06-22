import { motion } from "framer-motion";
import { Download, MapPin, Calendar, Coffee } from "lucide-react";
import profile from "../../assets/profile.png"

interface AboutProps {
	isDark: boolean;
}

export default function About({ isDark }: AboutProps) {
	return (
		<section id="about" className="py-20 px-4">
			<div className="max-w-6xl mx-auto">
				<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
					<p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>Get to know the person behind the code.</p>
				</motion.div>

				<div className="grid lg:grid-cols-12 gap-12 items-center">
					{/* Avatar and stats */}
					<motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="lg:col-span-5">
						<div className="relative mb-8">
							<div className={`w-64 h-64 mx-auto rounded-3xl overflow-hidden ${isDark ? "bg-gray-800" : "bg-gray-200"}`}>
								<img src={profile} alt="Jasim Ihsan" className="w-full h-full object-cover" loading="lazy" />
							</div>
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
								className={`absolute -top-4 -right-4 w-16 h-16 rounded-full border-4 border-dashed ${isDark ? "border-blue-400/30" : "border-blue-300/50"}`}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							{[
								{ icon: MapPin, label: "Location", value: "Malappuram, Kerala" },
								{ icon: Calendar, label: "Experience", value: "1+ Years" },
								{ icon: Coffee, label: "Coffee Cups", value: "2,847" },
								{ icon: Download, label: "Projects", value: "4" },
							].map((stat, index) => (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									className={`p-4 rounded-xl text-center ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
									<stat.icon size={20} className={`mx-auto mb-2 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
									<div className="text-lg font-semibold">{stat.value}</div>
									<div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</div>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Content */}
					<motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="lg:col-span-7">
						<div className="space-y-6">
							<p className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
								I'm a passionate full-stack developer with over a years of experience creating digital solutions that make a difference. My journey began with a curiosity about how things work on the web, and it has evolved into a deep love
								for crafting experiences that users genuinely enjoy.
							</p>

							<p className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
								When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while sketching out ideas for my next project. I believe in the power of clean code,
								thoughtful design, and continuous learning.
							</p>

							<p className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
								I'm always excited to take on new challenges and collaborate with teams that share my passion for creating exceptional digital experiences.
							</p>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${isDark ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
								<Download size={18} />
								Download Resume
							</motion.button>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
