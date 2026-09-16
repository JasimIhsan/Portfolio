import { Analytics } from "@vercel/analytics/react";
import { LenisProvider } from "app/components/providers/LenisProvider";
import { ThemeProvider } from "app/components/providers/ThemeProvider";
import { Toaster } from "app/components/ui/toaster";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
   subsets: ["latin"],
   weight: ["300", "400", "500", "600", "700", "800"],
   variable: "--font-sans",
   display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700"],
   variable: "--font-mono",
   display: "swap",
});

export const viewport: Viewport = {
   themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#F7F5F0" },
      { media: "(prefers-color-scheme: dark)", color: "#0B0A09" },
   ],
   width: "device-width",
   initialScale: 1,
   maximumScale: 5,
};

export const metadata: Metadata = {
   metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://jasimihsan.in"),
   title: {
      default: "Jasim Ihsan M | Full-Stack & Mobile Software Engineer",
      template: "%s | Jasim Ihsan M",
   },
   description: "Software Engineer specializing in production-grade web systems, resilient backend architectures, and Flutter mobile apps with seamless motion design.",
   keywords: ["Jasim Ihsan", "Software Engineer", "Full-Stack Developer", "React", "Next.js", "Flutter", "Node.js", "TypeScript", "Tailwind CSS"],
   authors: [{ name: "Jasim Ihsan M", url: "https://github.com/JasimIhsan" }],
   creator: "Jasim Ihsan M",
   openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://jasimihsan.in",
      title: "Jasim Ihsan M | Full-Stack & Mobile Software Engineer",
      description: "Engineering scalable web systems, distributed queue architectures, and cross-platform Flutter applications.",
      siteName: "Jasim Ihsan Portfolio",
      images: [
         {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: "Jasim Ihsan M Portfolio Preview",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "Jasim Ihsan M | Full-Stack & Mobile Software Engineer",
      description: "Building production-grade web systems and Flutter apps with modern UI engineering.",
      images: ["/og-image.png"],
   },
   robots: {
      index: true,
      follow: true,
   },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en" suppressHydrationWarning className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
         <body className="font-sans bg-[var(--bg-page)] text-[var(--text-main)] transition-colors duration-300 antialiased overflow-x-hidden">
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
               <LenisProvider>
                  {children}
                  <Toaster />
                  <Analytics />
               </LenisProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}
