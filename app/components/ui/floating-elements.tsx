import { motion } from "framer-motion";

export default function FloatingElements() {
   return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         {/* Dot grid pattern in warm espresso / earth */}
         <div 
            className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15]"
            style={{ 
               backgroundImage: 'radial-gradient(#8A5A2B 1px, transparent 1px)', 
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
            className="absolute top-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full border border-[#8A5A2B] dark:border-[#D4A373] opacity-10"
         />

         {/* Medium floating solid warm circle */}
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
            className="absolute bottom-1/3 left-1/5 w-64 h-64 rounded-full opacity-[0.03] dark:opacity-[0.05] bg-[#8A5A2B] dark:bg-[#D4A373]"
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
            className="absolute top-2/3 right-1/3 w-32 h-32 opacity-10 border border-[#8A5A2B] dark:border-[#D4A373]"
            style={{ borderRadius: "40%" }}
         />
      </div>
   );
}
