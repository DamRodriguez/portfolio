"use client";
import config from "@/config/config";
import { setLenis } from "@/constants/lenis";
import useBreakpoint from "@/hooks/viewport/useBreakpoint";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export const useLenisScroll = () => {
  const isMobile = useBreakpoint(config.breakpoints.lg);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    let lenis: Lenis | null = null;
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const { default: Lenis } = await import("lenis");

      lenis = new Lenis({
        duration: 1.3,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        syncTouch: false,
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
