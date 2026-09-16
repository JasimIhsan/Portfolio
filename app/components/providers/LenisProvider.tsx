"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
   useEffect(() => {
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      if (isTouchDevice) return;

      const lenis = new Lenis({
         duration: 1.2,
         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
         orientation: "vertical",
         gestureOrientation: "vertical",
         wheelMultiplier: 1,
         touchMultiplier: 2,
      });

      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

      let rafId: number;
      function raf(time: number) {
         lenis.raf(time);
         rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      return () => {
         cancelAnimationFrame(rafId);
         lenis.destroy();
         delete (window as unknown as { __lenis?: Lenis }).__lenis;
      };
   }, []);

   return <>{children}</>;
}
