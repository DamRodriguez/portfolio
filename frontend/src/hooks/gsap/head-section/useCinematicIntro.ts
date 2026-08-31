import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";

export function useCinematicIntro() {
  // useScrollLock(true);
  // hacer funcion de bloquear el scroll

  useScrollAnimations({
    animations: {
      ".header-section-title1-entry": {
        disableScrollTrigger: true,
        to: {
          keyframes: [
            {
              duration: 0,
              rotateX: -100,
              transformPerspective: 1000,
              opacity: 0,
              scale: 100,
              letterSpacing: "0.2em",
              zIndex: 999999,
            },
            {
              duration: 1.5,
              ease: "power3.out",
              rotateX: 0,
              opacity: 1,
              scale: 1.2,
              letterSpacing: "0.2em",
              zIndex: 999999,
            },
            {
              delay: 0.5,
              duration: 1,
              ease: "power1.out",
              rotateX: 0,
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
              rotateX: -100,
              transformPerspective: 1000,
              opacity: 0,
              scale: 100,
              letterSpacing: "0.2em",
              zIndex: 999999,
            },
            {
              delay: 0.5,
              duration: 1.5,
              ease: "power3.out",
              rotateX: 0,
              opacity: 1,
              scale: 1.2,
              letterSpacing: "0.2em",
              zIndex: 999999,
            },
            {
              duration: 1,
              ease: "power1.out",
              rotateX: 0,
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
