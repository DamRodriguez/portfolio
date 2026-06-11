"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

type HorizontalConfig = {
  panels: string;
  container?: string;
};

type UseHorizontalScrollAnimationsProps = {
  horizontal: HorizontalConfig;
  scope?: RefObject<Element | null>;
  disabled?: boolean;
};

export function useHorizontalScrollAnimations({
  horizontal,
  scope,
  disabled = false,
}: UseHorizontalScrollAnimationsProps) {
  useGSAP(
    (context) => {
      if (disabled) {
        context.revert();
        return;
      }

      const root = scope?.current || document;
      const panels = gsap.utils.toArray<HTMLElement>(horizontal.panels, root);
      if (!panels.length) return;

      const container = horizontal.container
        ? (root as Element).querySelector<HTMLElement>(horizontal.container)!
        : panels[0].parentElement!;

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          pin: true,
          scrub: 0.2,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: 0,
            inertia: false,
          },
          end: () => `+=${container.offsetWidth}`,
        },
      });
    },
    {
      scope,
      dependencies: [horizontal, disabled],
      revertOnUpdate: true,
    },
  );
}
