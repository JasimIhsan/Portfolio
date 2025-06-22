import { motion } from "framer-motion";

interface FloatingElementsProps {
	isDark: boolean;
}

export default function FloatingElements({ isDark }: FloatingElementsProps) {
	return (
		<div className="fixed inset-0 pointer-events-none overflow-hidden">
			{/* Large floating circle */}
			<motion.div
				animate={{
					x: [0, 100, 0],
					y: [0, -50, 0],
					rotate: [0, 180, 360],
				}}
				transition={{
					duration: 20,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				}}
				className={`absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-5 ${isDark ? "bg-blue-400" : "bg-blue-600"}`}
			/>

			{/* Medium floating square */}
			<motion.div
				animate={{
					x: [0, -80, 0],
					y: [0, 60, 0],
					rotate: [0, -90, 0],
				}}
				transition={{
					duration: 15,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
				className={`absolute bottom-1/3 left-1/5 w-32 h-32 opacity-3 ${isDark ? "bg-purple-400" : "bg-purple-600"}`}
				style={{ borderRadius: "30%" }}
			/>

			{/* Small floating triangle */}
			<motion.div
				animate={{
					x: [0, 60, 0],
					y: [0, -40, 0],
					rotate: [0, 120, 240, 360],
				}}
				transition={{
					duration: 12,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
				className={`absolute top-2/3 right-1/3 w-16 h-16 opacity-4 ${isDark ? "bg-green-400" : "bg-green-600"}`}
				style={{
					clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
				}}
			/>

			{/* Gradient orbs */}
			<motion.div
				animate={{
					scale: [1, 1.2, 1],
					opacity: [0.1, 0.2, 0.1],
				}}
				transition={{
					duration: 8,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
				className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2"
				style={{
					background: isDark ? "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)" : "radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)",
				}}
			/>
		</div>
	);
}
