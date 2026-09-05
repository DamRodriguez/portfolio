"use client";
import config from "@/config/config";
import { getLenis } from "@/constants/lenis";
import { useScrollLock } from "@/hooks/scroll/useScrollLock";
import useBreakpoint from "@/hooks/viewport/useBreakpoint";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

if (typeof window !== "undefined") {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
}

//logica para usarse solo en el home, con el pathname === "/"
export function useCinematicLogic() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/es" || pathname === "/en";

  const [isLocked, setIsLocked] = useState(isHome);
  const [isCinematicActive, setIsCinematicActive] = useState(isHome);
  const isMobile = useBreakpoint(config.breakpoints.sm, "max");
  const lang = useLocale();

  useScrollLock(isLocked && isHome);

  useEffect(() => {
    if (!isHome) {
      setIsLocked(false);
      setIsCinematicActive(false);
      return;
    }

    setIsLocked(true);
    setIsCinematicActive(true);

    const unlockTimer = setTimeout(() => {
      setIsLocked(false);
      setIsCinematicActive(false);
    }, 3000);

    return () => clearTimeout(unlockTimer);
  }, [lang, isHome]);

  useLayoutEffect(() => {
    if (!isHome || !isLocked) {
      const lenis = getLenis();
      if (lenis && isHome && !isLocked) {
        lenis.scrollTo(0, { immediate: true });
        lenis.start();
      }
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    const preventKeyScroll = (e: Event) => {
      const keyboardEvent = e as KeyboardEvent;
      const keys = [
        "Space",
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
      ];
      if (keys.includes(keyboardEvent.code)) {
        e.preventDefault();
      }
    };

    const eventOptions = { passive: false, capture: true };

    window.addEventListener("wheel", preventDefault, eventOptions);
    window.addEventListener("touchmove", preventDefault, eventOptions);
    window.addEventListener("keydown", preventKeyScroll, eventOptions);

    let animationFrameId: number;

    const pinScroll = () => {
      if (window.scrollY > 0 || window.scrollX > 0) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }

      const currentLenis = getLenis();
      if (currentLenis) {
        currentLenis.scrollTo(0, { immediate: true });
        currentLenis.stop();
      }

      animationFrameId = requestAnimationFrame(pinScroll);
    };

    animationFrameId = requestAnimationFrame(pinScroll);

    const enforceTopScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    window.addEventListener("scroll", enforceTopScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", enforceTopScroll, { capture: true });
      window.removeEventListener("wheel", preventDefault, eventOptions);
      window.removeEventListener("touchmove", preventDefault, eventOptions);
      window.removeEventListener("keydown", preventKeyScroll, eventOptions);
    };
  }, [isLocked, isHome]);

  return {
    isCinematicActive: isHome ? isCinematicActive : false,
    isMobile,
  };
}
