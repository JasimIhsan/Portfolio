import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import About from "../components/sections/About";
import Hero from "../components/sections/Hero";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Skills from "../components/sections/Skills";
import FloatingElements from "../components/ui/floating-elements";
import Navigation from "../components/ui/navigation";
import Contact from "../components/sections/Contact";
import { debounce } from "lodash";
import { useLenis } from "../hooks/useLenis";

export default function Portfolio() {
	const [isDark, setIsDark] = useState(true);
	const [activeSection, setActiveSection] = useState("hero");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useLenis();

	// Initialize theme based on localStorage or system preference
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			setIsDark(savedTheme === "dark");
		} else {
			setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
		}
	}, []);

	// Apply theme to document and save to localStorage
	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDark);
		localStorage.setItem("theme", isDark ? "dark" : "light");
	}, [isDark]);

	// Debounced scroll handler to optimize performance
	const handleScroll = useCallback(
		debounce(() => {
			const sections = ["hero", "projects", "experience", "skills", "about", "contact"];
			const scrollPosition = window.scrollY + 100;

			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const { offsetTop, offsetHeight } = element;
					if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
						setActiveSection(section);
						break;
					}
				}
			}
		}, 100),
		[]
	);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			handleScroll.cancel(); // Clean up debounce
		};
	}, [handleScroll]);

	const toggleTheme = () => setIsDark(!isDark);

	return (
		<div className="min-h-screen text-white max-w-full overflow-x-hidden box-border bg-transparent">
			<FloatingElements />

			{/* Theme Toggle */}
			<motion.button
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.5 }}
				onClick={toggleTheme}
				className="clay-btn fixed top-6 right-6 z-50 p-4 text-cyan-400 group"
				aria-label="Toggle theme">
				<AnimatePresence mode="wait">
					{isDark ? (
						<motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
							<Sun size={20} className="group-hover:scale-110 transition-transform" />
						</motion.div>
					) : (
						<motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
							<Moon size={20} className="group-hover:scale-110 transition-transform text-slate-400" />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.button>

			{/* Mobile Menu Toggle */}
			<motion.button
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.6 }}
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				className="clay-btn fixed top-6 left-6 z-50 p-4 md:hidden text-cyan-400 group"
				aria-label="Toggle mobile menu">
				<AnimatePresence mode="wait">
					{isMobileMenuOpen ? (
						<motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
							<X size={20} className="group-hover:scale-110 transition-transform" />
						</motion.div>
					) : (
						<motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
							<Menu size={20} className="group-hover:scale-110 transition-transform" />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.button>

			<Navigation activeSection={activeSection} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

			<main className="relative max-w-full overflow-x-hidden">
				<Hero />
				<Projects />
				<Experience />
				<Skills />
				<About />
				<Contact />
			</main>
		</div>
	);
}
