"use client";
import config from "@/config/config";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";
import useBreakpoint from "./useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

export const useProjectsScrollAnimation = (
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  const isMobile = useBreakpoint(config.breakpoints.xl);
  const topPosition = isMobile ? "top top+=70" : "top top+=85";
  const endPosition = isMobile ? "+=70" : "+=85";

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      const contents = gsap.utils.toArray<HTMLElement>(".project-card-content");

      cards.forEach((card, index) => {
        const isLast = index === cards.length - 1;

        ScrollTrigger.create({
          trigger: card,
          start: topPosition,
          end: isLast ? endPosition : undefined,
          pin: true,
          pinSpacing: false,
        });

        if (index > 0) {
          gsap.from(card, {
            scale: 1.05,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "center center",
              scrub: 1,
            },
          });
          gsap.to(contents[index - 1], {
            opacity: 0.3,
            scale: 0.85,
            filter: "blur(2px)",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "center center",
              scrub: 1,
            },
          });
        }
      });
    },
    { scope: containerRef, dependencies: [isMobile], revertOnUpdate: true },
  );
};
