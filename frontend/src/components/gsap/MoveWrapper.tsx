"use client";
import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

type Direction = "up" | "down" | "left" | "right";

type Props = {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  order?: number;
  duration?: number;
  className?: string;
};

export default function MoveWrapper({
  children,
  direction = "up",
  distance = 80,
  order = 0,
  duration = 0.8,
  className
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const from: gsap.TweenVars = { opacity: 0 };

    switch (direction) {
      case "up":
        from.y = distance;
        break;
      case "down":
        from.y = -distance;
        break;
      case "left":
        from.x = distance;
        break;
      case "right":
        from.x = -distance;
        break;
    }

    const tween = gsap.fromTo(
      ref.current,
      from,
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay: order * 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      tween.kill();
    };
  }, { scope: ref });

  return (
    <div ref={ref} className={clsx("opacity-0", className)}>
      {children}
    </div>
  );
}