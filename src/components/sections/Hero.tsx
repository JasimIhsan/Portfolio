import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

interface HeroProps {
	isDark: boolean;
}

export default function Hero({ isDark }: HeroProps) {
	const scrollToProjects = () => {
		const element = document.getElementById("projects");
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section id="hero" className="min-h-screen flex items-center justify-center px-4 relative">
			<div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8 items-center">
				{/* Main content - offset grid */}
				<motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="md:col-span-8 md:col-start-2">
					<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className={`text-sm font-medium mb-4 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
						Hello, I'm
					</motion.div>

					<motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
						Jasim Ihsan M
					</motion.h1>

					<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className={`text-xl md:text-2xl mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
						Full-Stack Developer
					</motion.div>

					<motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className={`text-lg md:text-xl mb-12 max-w-2xl leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
						I craft digital experiences that blend beautiful design with powerful functionality, turning complex problems into elegant solutions.
					</motion.p>

					{/* Social links */}
					<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="flex gap-6 mb-12">
						{[
							{
								icon: Github,
								href: "http://github.com/JasimIhsan",
								label: "GitHub",
							},
							{
								icon: Linkedin,
								href: "http://linkedin.com/in/jasim-ihsan-m",
								label: "LinkedIn",
							},
							{
								icon: Mail,
								href: "mailto:jasimihsan1234@gmail.com",
								label: "Email",
							},
						].map(({ icon: Icon, href, label }) => (
							<motion.a
								key={label}
								href={href}
								target="_blank"
								rel="noreferrer"
								whileHover={{ scale: 1.1, y: -2 }}
								whileTap={{ scale: 0.95 }}
								className={`p-3 rounded-full transition-all duration-300 ${isDark ? "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"}`}
								aria-label={label}>
								<Icon size={20} />
							</motion.a>
						))}
					</motion.div>
				</motion.div>

				{/* Decorative element */}
				<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 1 }} className="md:col-span-3 md:col-start-10 hidden md:block">
					<div className={`w-full h-64 rounded-3xl ${isDark ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20" : "bg-gradient-to-br from-blue-100 to-purple-100"} relative overflow-hidden`}>
						<motion.div
							animate={{
								rotate: [0, 360],
							}}
							transition={{
								duration: 20,
								repeat: Number.POSITIVE_INFINITY,
								ease: "linear",
							}}
							className={`absolute inset-4 rounded-2xl border-2 border-dashed ${isDark ? "border-blue-400/30" : "border-blue-300/50"}`}
						/>
					</div>
				</motion.div>
			</div>

			{/* Scroll indicator */}
			<motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }} onClick={scrollToProjects} className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-label="Scroll to projects">
				<motion.div
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
					className={`p-2 rounded-full ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors duration-300`}>
					<ArrowDown size={24} />
				</motion.div>
			</motion.button>
		</section>
	);
}
