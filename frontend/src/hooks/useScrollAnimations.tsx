"use client";
import config from "@/config/config";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";
import useBreakpoint from "./useBreakpoint";

gsap.registerPlugin(ScrollTrigger);

export type ScrollAnimationConfig = {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  scrollTrigger?: {
    trigger?: ScrollTrigger.Vars["trigger"];
    start?: ScrollTrigger.Vars["start"];
    end?: ScrollTrigger.Vars["end"];
    scrub?: boolean | number;
    markers?: boolean;
    pin?: boolean;
    snap?: number | ScrollTrigger.SnapVars;
  };
} & gsap.TweenVars;

type UseScrollAnimationsProps = {
  animations?: Record<string, ScrollAnimationConfig>;
  scope?: RefObject<Element | null>;
  disabled?: boolean;
  scrollTriggerDefaults?: Partial<ScrollTrigger.Vars>;
};

export function useScrollAnimations({
  animations = {},
  scope,
  disabled = false,
  scrollTriggerDefaults,
}: UseScrollAnimationsProps) {
  const isDeskXl = useBreakpoint(Number(config.breakpoints.xl));
  const topDistance = isDeskXl ? "8%" : "15%";

  const BASE_SCROLL_TRIGGER: ScrollTrigger.Vars = {
    start: `top ${topDistance}`,
    end: "+=300",
    scrub: 2,
  };

  const DEFAULT_SCROLL_TRIGGER: ScrollTrigger.Vars = {
    ...BASE_SCROLL_TRIGGER,
    ...scrollTriggerDefaults,
  };

  useGSAP(
    (context) => {
      if (disabled) {
        context.revert();
        return;
      }

      Object.entries(animations).forEach(([target, animation]) => {
        const { from, to, scrollTrigger, ...vars } = animation;

        const triggerConfig: ScrollTrigger.Vars = {
          ...DEFAULT_SCROLL_TRIGGER,
          ...(scrollTrigger as ScrollTrigger.Vars),
          trigger: scrollTrigger?.trigger ?? target,
        };

        if (from && to) {
          gsap.fromTo(target, from, {
            ...to,
            scrollTrigger: triggerConfig,
          });
        } else if (to) {
          gsap.to(target, {
            ...to,
            scrollTrigger: triggerConfig,
          });
        } else {
          gsap.to(target, {
            ...vars,
            scrollTrigger: triggerConfig,
          });
        }
      });
    },
    {
      scope,
      dependencies: [animations, disabled, scrollTriggerDefaults],
      revertOnUpdate: true,
    },
  );
}
