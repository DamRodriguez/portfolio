import { getLenis } from "@/constants/lenis";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import { useScrollLock } from "@/hooks/scroll/useScrollLock";
import { useLayoutEffect, useState } from "react";

if (typeof window !== "undefined") {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export function useCinematicIntro() {
  const [isLocked, setIsLocked] = useState(true);

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

  useScrollAnimations({
    animations: {
      ".header-section-title1-entry": {
        disableScrollTrigger: true,
        to: {
          keyframes: [
            {
              duration: 0,
              opacity: 0,
              scale: 999,
              letterSpacing: "0.5em",
              zIndex: 999999,
              rotateY: 0,
              rotateX: 0,
              rotateZ: 0,
            },
            {
              rotateY: -20,
              rotateX: 20,
              rotateZ: 1,
              duration: 1.5,
              ease: "power3.out",
              opacity: 1,
              scale: 1.2,
              letterSpacing: "0.5em",
              zIndex: 999999,
            },
            {
              rotateY: 0,
              rotateX: 0,
              rotateZ: 0,
              delay: 0.5,
              duration: 1,
              ease: "power2.out",
              opacity: 1,
              scale: 1,
              letterSpacing: "0em",
              zIndex: 1,
            },
          ],
        },
      },
      ".header-section-title2-entry": {
        disableScrollTrigger: true,
        to: {
          keyframes: [
            {
              duration: 0,
              opacity: 0,
              scale: 999,
              letterSpacing: "0.5em",
              zIndex: 999999,
              rotateY: 0,
              rotateX: 0,
              rotateZ: 0,
            },
            {
              rotateY: -20,
              rotateX: 20,
              rotateZ: -1,
              delay: 0.5,
              duration: 1.5,
              ease: "power3.out",
              opacity: 1,
              scale: 1.2,
              letterSpacing: "0.5em",
              zIndex: 999999,
            },
            {
              rotateY: 0,
              rotateX: 0,
              rotateZ: 0,
              duration: 1,
              ease: "power2.out",
              opacity: 1,
              scale: 1,
              letterSpacing: "0em",
              zIndex: 1,
            },
          ],
        },
      },
      ".header-section-cinematic-bg": {
        disableScrollTrigger: true,
        to: {
          keyframes: [
            {
              zIndex: 99999,
              delay: 0,
              duration: 0,
              opacity: 1,
              scaleY: 1,
            },
            {
              zIndex: 99999,
              opacity: 1,
              duration: 1.5,
              scaleY: 1,
              transformOrigin: "bottom",
            },
            {
              scaleY: 0,
              zIndex: 99999,
              opacity: 1,
              delay: 0.5,
              duration: 1,
              ease: "power1",
            },
          ],
        },
      },
    },
  });
}
