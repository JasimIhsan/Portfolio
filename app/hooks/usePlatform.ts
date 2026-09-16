import { useEffect, useState } from "react";

export type PlatformType = "mac" | "windows" | "mobile" | "linux" | "other";

export function usePlatform(): {
   platform: PlatformType;
   isMac: boolean;
   isWindows: boolean;
   isMobile: boolean;
   modifierKey: string;
   shortcutLabel: string;
} {
   const [platform, setPlatform] = useState<PlatformType>("mac");

   useEffect(() => {
      if (typeof window === "undefined" || typeof navigator === "undefined") return;

      const ua = navigator.userAgent.toLowerCase();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const navData = (navigator as any).userAgentData;
      const navPlatform = (navData?.platform || navigator.platform || "").toLowerCase();

      // Check mobile first
      const isMobileDevice = /iphone|ipad|ipod|android|blackberry|iemobile|opera mini|mobile/i.test(ua) || (navPlatform.includes("mac") && navigator.maxTouchPoints > 1); // iPadOS

      if (isMobileDevice) {
         setPlatform("mobile");
      } else if (navPlatform.includes("mac") || ua.includes("macintosh") || ua.includes("mac os x")) {
         setPlatform("mac");
      } else if (navPlatform.includes("win") || ua.includes("windows")) {
         setPlatform("windows");
      } else if (navPlatform.includes("linux") || ua.includes("linux")) {
         setPlatform("linux");
      } else {
         setPlatform("other");
      }
   }, []);

   const isMac = platform === "mac";
   const isWindows = platform === "windows";
   const isMobile = platform === "mobile";
   const modifierKey = isMac ? "⌘" : isMobile ? "" : "Ctrl";
   const shortcutLabel = isMac ? "⌘ K" : isMobile ? "Search" : "Ctrl+K";

   return {
      platform,
      isMac,
      isWindows,
      isMobile,
      modifierKey,
      shortcutLabel,
   };
}
