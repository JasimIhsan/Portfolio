import { motion, AnimatePresence } from "framer-motion";

interface NavigationProps {
	activeSection: string;
	isDark: boolean;
	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: (open: boolean) => void;
}

const navItems = [
	{ id: "hero", label: "Home" },
	{ id: "projects", label: "Projects" },
	{ id: "skills", label: "Skills" },
	{ id: "about", label: "About" },
	{ id: "contact", label: "Contact" },
];

export default function Navigation({ activeSection, isDark, isMobileMenuOpen, setIsMobileMenuOpen }: NavigationProps) {
	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
			setIsMobileMenuOpen(false);
		}
	};

	return (
		<>
			{/* Desktop Navigation */}
			<motion.nav initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden md:block">
				<div className={`p-4 rounded-2xl backdrop-blur-md ${isDark ? "bg-gray-800/80" : "bg-white/80"} border ${isDark ? "border-gray-700" : "border-gray-200"}`}>
					<ul className="space-y-4">
						{navItems.map((item, index) => (
							<motion.li key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + index * 0.1 }}>
								<button
									onClick={() => scrollToSection(item.id)}
									className={`relative group text-sm font-medium transition-all duration-300 ${
										activeSection === item.id ? (isDark ? "text-blue-400" : "text-blue-600") : isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
									}`}
									aria-label={`Navigate to ${item.label}`}>
									<span className="relative z-10">{item.label}</span>
									{activeSection === item.id && (
										<motion.div layoutId="activeIndicator" className={`absolute -left-2 -right-2 -top-1 -bottom-1 rounded-lg ${isDark ? "bg-blue-500/20" : "bg-blue-100"}`} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
									)}
								</button>
							</motion.li>
						))}
					</ul>
				</div>
			</motion.nav>

			{/* Mobile Navigation */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.nav initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-30 md:hidden">
						<div className={`absolute inset-0 ${isDark ? "bg-gray-900/95" : "bg-white/95"} backdrop-blur-md`} />
						<div className="relative flex items-center justify-center h-full">
							<ul className="space-y-8 text-center">
								{navItems.map((item, index) => (
									<motion.li key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
										<button
											onClick={() => scrollToSection(item.id)}
											className={`text-2xl font-medium transition-colors duration-300 ${
												activeSection === item.id ? (isDark ? "text-blue-400" : "text-blue-600") : isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
											}`}>
											{item.label}
										</button>
									</motion.li>
								))}
							</ul>
						</div>
					</motion.nav>
				)}
			</AnimatePresence>
		</>
	);
}
