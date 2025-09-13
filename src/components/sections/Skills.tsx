import { motion } from "framer-motion";
import { Code, Database, Palette, Cloud, GitBranch, Globe, Zap } from "lucide-react";

interface SkillsProps {
	isDark: boolean;
}

const skillCategories = [
	{
		title: "Frontend",
		icon: Code,
		skills: [
			{ name: "React/Next.js", level: 95 },
			{ name: "TypeScript", level: 90 },
			{ name: "Tailwind CSS", level: 92 },
			{ name: "EJS", level: 85 },
		],
	},
	{
		title: "Backend",
		icon: Database,
		skills: [
			{ name: "Node.js", level: 95 },
			{ name: "MongoDB", level: 85 },
			{ name: "JavaScript", level: 90 },
			{ name: "PostgreSQL", level: 70 },
		],
	},
	{
		title: "Design",
		icon: Palette,
		skills: [
			{ name: "UI/UX Design", level: 85 },
			{ name: "Figma", level: 90 },
			{ name: "Photoshop", level: 50 },
			{ name: "Prototyping", level: 88 },
		],
	},
];

const tools = [
	{ name: "AWS", icon: Cloud },
	{ name: "Git", icon: GitBranch },
	{ name: "Docker", icon: Globe },
	{ name: "Vercel", icon: Zap },
];

export default function Skills({ isDark }: SkillsProps) {
	return (
		<section id="skills" className={`py-20 px-4 ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
			<div className="max-w-6xl mx-auto">
				<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mb-16 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
					<p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>Technologies and tools I use to bring ideas to life.</p>
				</motion.div>

				{/* Updated grid container with centered content */}
				<div className="flex justify-center">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 w-full max-w-4xl px-4">
						{skillCategories.map((category, categoryIndex) => (
							<motion.div
								key={category.title}
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
								viewport={{ once: true }}
								className={`p-6 rounded-2xl ${isDark ? "bg-gray-800" : "bg-white"} ${!isDark ? "shadow-lg" : ""}`}>
								<div className="flex items-center gap-3 mb-6">
									<div className={`p-2 rounded-lg ${isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"}`}>
										<category.icon size={20} />
									</div>
									<h3 className="text-lg font-semibold">{category.title}</h3>
								</div>

								<div className="space-y-4">
									{category.skills.map((skill, skillIndex) => (
										<div key={skill.name}>
											<div className="flex justify-between items-center mb-2">
												<span className="text-sm font-medium">{skill.name}</span>
												<span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{skill.level}%</span>
											</div>
											<div className={`h-2 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"}`}>
												<motion.div
													initial={{ width: 0 }}
													whileInView={{ width: `${skill.level}%` }}
													transition={{
														duration: 1,
														delay: categoryIndex * 0.1 + skillIndex * 0.1,
													}}
													viewport={{ once: true }}
													className={`h-full rounded-full ${isDark ? "bg-blue-500" : "bg-blue-600"}`}
												/>
											</div>
										</div>
									))}
								</div>
							</motion.div>
						))}
					</div>
				</div>

				{/* Tools section */}
				<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center">
					<h3 className="text-xl font-semibold mb-8">Tools & Platforms</h3>
					<div className="flex flex-wrap justify-center gap-6">
						{tools.map((tool, index) => (
							<motion.div
								key={tool.name}
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
								whileHover={{ scale: 1.1, y: -5 }}
								className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 ${isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50 shadow-md hover:shadow-lg"}`}>
								<tool.icon size={24} className={isDark ? "text-gray-400" : "text-gray-600"} />
								<span className="text-sm font-medium">{tool.name}</span>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
