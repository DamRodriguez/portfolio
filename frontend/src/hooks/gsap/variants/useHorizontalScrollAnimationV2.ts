"use client";
import config from "@/config/config";
import useBreakpoint from "@/hooks/viewport/useBreakpoint";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

type HorizontalConfig = {
  panels: string;
  container?: string;
};

type useHorizontalScrollAnimationV2Props = {
  horizontal: HorizontalConfig;
  scope?: RefObject<Element | null>;
  disabled?: boolean;
  topDistance?: string;
};

export function useHorizontalScrollAnimationV2({
  horizontal,
  scope,
  disabled = false,
  topDistance,
}: useHorizontalScrollAnimationV2Props) {
  const isDeskXl = useBreakpoint(Number(config.breakpoints.xl));
  const finalTopDistance = topDistance ? topDistance : isDeskXl ? "8%" : "35%";

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
          start: `top ${finalTopDistance}`,
          pin: true,
          scrub: 2,
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
