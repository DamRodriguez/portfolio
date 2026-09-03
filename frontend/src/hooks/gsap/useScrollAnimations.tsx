"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DependencyList, RefObject, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export type ScrollDirection = "top" | "center" | "bottom" | "left" | "right";

export type ScrollAnimationConfig = {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  direction?: ScrollDirection;
  individual?: boolean;
  disableScrollTrigger?: boolean;
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

  const staticAnimations: Record<string, ScrollAnimationConfig> = {};
  const dynamicAnimations: Record<string, ScrollAnimationConfig> = {};

  Object.entries(animations).forEach(([target, config]) => {
    if (config.disableScrollTrigger) {
      staticAnimations[target] = config;
    } else {
      dynamicAnimations[target] = config;
    }
  });

  const staticAnimationsKey = JSON.stringify(staticAnimations);
  const staticAnimationsRef = useRef<{
    key: string;
    data: Record<string, ScrollAnimationConfig>;
  }>({
    key: staticAnimationsKey,
    data: staticAnimations,
  });

  if (staticAnimationsRef.current.key !== staticAnimationsKey) {
    staticAnimationsRef.current = {
      key: staticAnimationsKey,
      data: staticAnimations,
    };
  }

  useGSAP(
    (context) => {
      if (disabled) return;

      const currentStatic = staticAnimationsRef.current.data;
      Object.entries(currentStatic).forEach(([target, animation]) => {
        const { from, to, individual = false, ...vars } = animation;

        const createTween = (element: Element | string) => {
          if (from && to) {
            gsap.fromTo(element, from, { ...to, ...vars });
          } else if (to) {
            gsap.fromTo(element, {}, { ...to, ...vars });
          } else {
            gsap.to(element, { ...vars });
          }
        };

        if (individual) {
          const elements = gsap.utils.toArray<Element>(target);
          elements.forEach((el) => createTween(el));
        } else {
          createTween(target);
        }
      });
    },
    {
      scope,
      dependencies: [...dependencies, staticAnimationsKey, disabled],
      revertOnUpdate: true,
    },
  );

  useGSAP(
    (context) => {
      if (disabled) {
        context.revert();
        return;
      }

      Object.entries(dynamicAnimations).forEach(([target, animation]) => {
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

        const createTween = (element: Element | string) => {
          const triggerConfig: ScrollTrigger.Vars = {
            ...BASE_SCROLL_TRIGGER,
            ...directionConfig,
            ...scrollTriggerDefaults,
            ...(scrollTrigger as ScrollTrigger.Vars),
            trigger: scrollTrigger?.trigger ?? element,
          };

          const scrollProps = { scrollTrigger: triggerConfig };

          if (from && to) {
            gsap.fromTo(element, from, { ...to, ...scrollProps });
          } else if (to) {
            gsap.to(element, { ...to, ...scrollProps });
          } else {
            gsap.to(element, { ...vars, ...scrollProps });
          }
        };

        if (individual) {
          const elements = gsap.utils.toArray<Element>(target);
          elements.forEach((el) => createTween(el));
        } else {
          createTween(target);
        }
      });
    },
    {
      scope,
      dependencies: [
        ...dependencies,
        dynamicAnimations,
        disabled,
        scrollTriggerDefaults,
        globalDirection,
      ],
      revertOnUpdate: true,
    },
  );
}
