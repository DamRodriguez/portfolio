"use client";
import { useCinematicLogic } from "@/hooks/gsap/head-section/useCinematicLogic";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";

export function useCinematicIntro() {
  const { isCinematicActive, isMobile } = useCinematicLogic();

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
              zIndex: 999999,
            },
            {
              duration: 1.5,
              ease: "power3.out",
              opacity: 1,
              scale: isMobile ? 1.1 : 1.25,
              zIndex: 999999,
            },
            {
              delay: 0.5,
              duration: 1,
              ease: "power2.out",
              opacity: 1,
              scale: 1,
              zIndex: 999999,
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
              zIndex: 999999,
            },
            {
              delay: 0.5,
              duration: 1.5,
              ease: "power3.out",
              opacity: 1,
              scale: isMobile ? 1.1 : 1.25,
              zIndex: 999999,
            },
            {
              duration: 1,
              ease: "power2.out",
              opacity: 1,
              scale: 1,
              zIndex: 999999,
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

  return { isCinematicActive };
}
