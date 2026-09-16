"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
   const { resolvedTheme } = useTheme();

   return (
      <SonnerToaster
         theme={resolvedTheme === "dark" ? "dark" : "light"}
         position="top-center"
         richColors={false}
         toastOptions={{
            style: {
               background: resolvedTheme === "dark" ? "#181513" : "#F7F5F0",
               color: resolvedTheme === "dark" ? "#E5DFD3" : "#181513",
               border: resolvedTheme === "dark" ? "1px solid rgba(229, 223, 211, 0.15)" : "1px solid #E2DDD2",
               boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
               borderRadius: "1rem",
               fontSize: "0.875rem",
               fontWeight: 500,
               padding: "0.875rem 1.25rem",
            },
            classNames: {
               toast: "font-sans",
               title: "font-bold text-sm",
               description: "text-xs text-[#6E655C] dark:text-[#A89F91]",
               actionButton: "bg-[#8A5A2B] text-white font-bold rounded-lg text-xs px-3 py-1.5",
               cancelButton: "bg-[#EFECE4] text-[#181513] rounded-lg text-xs px-3 py-1.5",
            },
         }}
      />
   );
}
