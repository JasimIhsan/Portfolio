import { motion } from "framer-motion";

export default function FloatingElements() {
   return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         {/* Dot grid pattern */}
         <div 
            className="absolute inset-0 opacity-[0.4]"
            style={{ 
               backgroundImage: 'radial-gradient(#2563EB 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
            }}
         />

         {/* Large floating thin circle outline */}
         <motion.div
            animate={{
               x: [0, 50, 0],
               y: [0, -30, 0],
               rotate: [0, 180, 360],
            }}
            transition={{
               duration: 25,
               repeat: Number.POSITIVE_INFINITY,
               ease: "linear",
            }}
            className="absolute top-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full border border-[#2563EB] opacity-10"
         />

         {/* Medium floating solid blue circle */}
         <motion.div
            animate={{
               x: [0, -40, 0],
               y: [0, 40, 0],
            }}
            transition={{
               duration: 20,
               repeat: Number.POSITIVE_INFINITY,
               ease: "easeInOut",
            }}
            className="absolute bottom-1/3 left-1/5 w-64 h-64 rounded-full opacity-[0.03] bg-[#2563EB]"
         />

         {/* Small floating outline shape */}
         <motion.div
            animate={{
               x: [0, 40, 0],
               y: [0, -20, 0],
               rotate: [0, -120, -240, -360],
            }}
            transition={{
               duration: 18,
               repeat: Number.POSITIVE_INFINITY,
               ease: "easeInOut",
            }}
            className="absolute top-2/3 right-1/3 w-32 h-32 opacity-10 border border-[#2563EB]"
            style={{ borderRadius: "40%" }}
         />

         {/* Soft gradient blur */}
         <motion.div
            animate={{
               scale: [1, 1.1, 1],
               opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
               duration: 10,
               repeat: Number.POSITIVE_INFINITY,
               ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
               background: "radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 60%)",
               filter: "blur(60px)",
            }}
         />
      </div>
   );
}
