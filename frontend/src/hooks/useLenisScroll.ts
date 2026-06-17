"use client";
import { setLenis } from "@/constants/lenis";
import useBreakpoint from "@/hooks/useBreakpoint";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export const useLenisScroll = () => {
  const isMobile = useBreakpoint();

  useEffect(() => {
    let lenis: Lenis | null = null;

    const init = async () => {
      const { default: Lenis } = await import("lenis");

      lenis = new Lenis({
        duration: isMobile ? 1 : 1.1,
        smoothWheel: true,
        syncTouch: false,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });

      setLenis(lenis);

      lenis.on("scroll", ScrollTrigger.update);

      const update = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(update);
      };
    };

    let cleanup: (() => void) | undefined;

    init().then((fn) => {
      cleanup = fn;
    });

    return () => {
      cleanup?.();

      lenis?.destroy();
      setLenis(null);
    };
  }, [isMobile]);
};
