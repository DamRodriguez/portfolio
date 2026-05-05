"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useBreakpoint from "@/hooks/useBreakpoint";

gsap.registerPlugin(SplitText, ScrollTrigger);

type Props = {
  children: ReactNode;
  order?: number;
  ease?: gsap.EaseString;
  ariaLabel?: string;
};

export default function SplitTextWrapper({
  children,
  order = 0,
  ease = "bounce.out",
  ariaLabel,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useBreakpoint();

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const target = el.querySelector("[data-split-target]");
      if (!target) return;

      const split = SplitText.create(target, {
        type: "chars",
        charsClass: "split-char",
      });

      gsap.set(el, {
        autoAlpha: 1,
      });

      gsap.set(split.chars, {
        willChange: "transform, opacity",
        force3D: true,
      });

      const tween = gsap.from(split.chars, {
        y: isMobile ? -28 : -75,
        opacity: 0,
        duration: 1,
        ease,
        stagger: 0.07,
        delay: order * 0.25,
        force3D: true,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onComplete: () => {
          gsap.set(split.chars, {
            clearProps: "willChange,transform,opacity",
          });
        },
      });

      return () => {
        tween.kill();
        split.revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [isMobile, order, ease],
      revertOnUpdate: true,
    }
  );

  return (
    <div ref={containerRef} className="opacity-0">
      <span className="sr-only">
        {ariaLabel || (typeof children === "string" ? children : "")}
      </span>

      <div aria-hidden="true" data-split-target>
        {children}
      </div>
    </div>
  );
}