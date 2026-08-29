"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DependencyList, RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export type ScrollDirection = "top" | "center" | "bottom" | "left" | "right";

export type ScrollAnimationConfig = {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  direction?: ScrollDirection;
  individual?: boolean;
  scrollTrigger?: {
    trigger?: ScrollTrigger.Vars["trigger"];
    start?: ScrollTrigger.Vars["start"];
    end?: ScrollTrigger.Vars["end"];
    scrub?: boolean | number;
    markers?: boolean;
    pin?: boolean;
    pinSpacing?: boolean;
    snap?: number | ScrollTrigger.SnapVars;
    horizontal?: boolean;
    toggleClass?: string | ScrollTrigger.ToggleClassVars;
  };
} & gsap.TweenVars;

type UseScrollAnimationsProps = {
  animations?: Record<string, ScrollAnimationConfig>;
  scope?: RefObject<Element | null>;
  disabled?: boolean;
  direction?: ScrollDirection;
  scrollTriggerDefaults?: Partial<ScrollTrigger.Vars>;
  dependencies?: DependencyList;
};

export function useScrollAnimations({
  animations = {},
  scope,
  disabled = false,
  direction: globalDirection = "top",
  scrollTriggerDefaults,
  dependencies = [],
}: UseScrollAnimationsProps) {
  const getDirectionConfig = (
    dir: ScrollDirection,
  ): Partial<ScrollTrigger.Vars> => {
    switch (dir) {
      case "bottom":
        return { start: "bottom bottom", end: "+=200" };
      case "center":
        return { start: "center center", end: "+=300" };
      case "left":
        return { start: "left right", end: "+=300", horizontal: true };
      case "right":
        return { start: "right left", end: "+=300", horizontal: true };
      case "top":
      default:
        return { start: `top top`, end: "+=300" };
    }
  };

  const BASE_SCROLL_TRIGGER: ScrollTrigger.Vars = {
    scrub: 2,
  };

  useGSAP(
    (context) => {
      if (disabled) {
        context.revert();
        return;
      }

      Object.entries(animations).forEach(([target, animation]) => {
        const {
          from,
          to,
          scrollTrigger,
          direction: itemDirection,
          individual = false,
          ...vars
        } = animation;

        const activeDirection = itemDirection || globalDirection;
        const directionConfig = getDirectionConfig(activeDirection);

        if (individual) {
          const elements = gsap.utils.toArray<Element>(target);
          elements.forEach((element) => {
            const triggerConfig: ScrollTrigger.Vars = {
              ...BASE_SCROLL_TRIGGER,
              ...directionConfig,
              ...scrollTriggerDefaults,
              ...(scrollTrigger as ScrollTrigger.Vars),
              trigger: scrollTrigger?.trigger ?? element,
            };

            if (from && to) {
              gsap.fromTo(element, from, {
                ...to,
                scrollTrigger: triggerConfig,
              });
            } else if (to) {
              gsap.to(element, {
                ...to,
                scrollTrigger: triggerConfig,
              });
            } else {
              gsap.to(element, {
                ...vars,
                scrollTrigger: triggerConfig,
              });
            }
          });
        } else {
          const triggerConfig: ScrollTrigger.Vars = {
            ...BASE_SCROLL_TRIGGER,
            ...directionConfig,
            ...scrollTriggerDefaults,
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
        }
      });
    },
    {
      scope,
      dependencies: [
        ...dependencies,
        animations,
        disabled,
        scrollTriggerDefaults,
        globalDirection,
      ],
      revertOnUpdate: true,
    },
  );
}
