"use client";
import type Lenis from "lenis";
import { useEffect } from "react";

export const useLenisScroll = () => {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId = 0;

    const init = async () => {
      const { default: Lenis } = await import("lenis");

      const isMobile = window.innerWidth < 768;

      lenis = new Lenis({
        duration: isMobile ? 0.7 : 1.1,
        smoothWheel: true,
        syncTouch: !isMobile,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    };

    init();

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);
};
