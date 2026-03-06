"use client";
import { ReactNode, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  start?: string;
  end?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
};

export default function ViewportTrigger({
  children,
  className,
  start = "top 50%",
  end = "bottom 50%",
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start,
        end,
        onEnter: () => {
          setIsInView(true);
          onEnter?.();
        },
        onLeave: () => {
          setIsInView(false);
          onLeave?.();
        },
        onEnterBack: () => {
          setIsInView(true);
          onEnterBack?.();
        },
        onLeaveBack: () => {
          setIsInView(false);
          onLeaveBack?.();
        },
      });

      return () => trigger.kill();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}