import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   reactStrictMode: true,
   images: {
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
         {
            protocol: "https",
            hostname: "**",
         },
      ],
   },
   webpack: (config, { dev }) => {
      if (dev) {
         config.watchOptions = {
            poll: 800,
            aggregateTimeout: 300,
         };
      }
      return config;
   },
};

export default nextConfig;
