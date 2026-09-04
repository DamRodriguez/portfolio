"use client";
import config from "@/config/config";
import { getLenis } from "@/constants/lenis";
import { useScrollLock } from "@/hooks/scroll/useScrollLock";
import useBreakpoint from "@/hooks/viewport/useBreakpoint";
import { useLayoutEffect, useState } from "react";

if (typeof window !== "undefined") {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export function useCinematicLogic() {
  const [isLocked, setIsLocked] = useState(true);
  const [isCinematicActive, setIsCinematicActive] = useState(true);
  const isMobile = useBreakpoint(config.breakpoints.sm, "max");

  useScrollLock(isLocked);

  useLayoutEffect(() => {
    if (!isLocked) return;

    const enforceTopScroll = () => {
      if (window.scrollY > 0 || window.scrollX > 0) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    };

    window.addEventListener("scroll", enforceTopScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", enforceTopScroll, { capture: true });
    };
  }, [isLocked]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    document.body.style.overflow = "hidden";

    const stopLenisInterval = setInterval(() => {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
        lenis.stop();
        clearInterval(stopLenisInterval);
      }
    }, 5);

    const unlockTimer = setTimeout(() => {
      setIsLocked(false);
      setIsCinematicActive(false);
      getLenis()?.start();
      document.body.style.overflow = "";
    }, 3000);

    return () => {
      clearTimeout(unlockTimer);
      clearInterval(stopLenisInterval);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return {
    isCinematicActive,
    isMobile,
  };
}
