"use client";
import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useIsMobile from "@/hooks/useIsMobile";

gsap.registerPlugin(SplitText, ScrollTrigger);

type Props = {
  children: ReactNode;
  order?: number;
  ease?: gsap.EaseString;
};

export default function SplitTextWrapper({
  children,
  order = 0,
  ease = "bounce.out"
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const split = SplitText.create(el, {
        type: "chars",
      });

      gsap.set(el, {
        opacity: 1,
        willChange: "transform, opacity",
      });

      const tween = gsap.from(split.chars, {
        y: isMobile ? -45 : -75,
        scale: 0.85,
        opacity: 0,
        duration: 1,
        ease: ease,
        stagger: 0.04,
        delay: order * 0.35,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      return () => {
        tween.kill();
        split.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="opacity-0">
      {children}
    </div>
  );
}