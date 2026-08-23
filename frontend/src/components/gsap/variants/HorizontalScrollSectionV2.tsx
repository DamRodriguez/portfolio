"use client";
import { useHorizontalScrollAnimationV2 } from "@/hooks/gsap/variants/useHorizontalScrollAnimationV2";
import { useRef } from "react";

// sección fija + sección con scroll horizontal

export default function HorizontalScrollSectionV2() {
  const containerRef = useRef<HTMLDivElement>(null);

  useHorizontalScrollAnimationV2({
    scope: containerRef,
    horizontal: {
      panels: ".panel",
    },
  });

  return (
    <section className="relative">
      <div
        ref={containerRef}
        className="flex xl:h-[calc(100svh-var(--height-header-desktop)-5rem)]"
      >
        <div className="panel min-w-screen flex items-center justify-center text-5xl bg-red-error">
          Section 1
        </div>

        <div className="panel min-w-screen flex items-center justify-center text-5xl bg-green">
          Section 2
        </div>

        <div className="panel min-w-screen flex items-center justify-center text-5xl bg-soft-gray">
          Section 3
        </div>

        <div className="panel min-w-screen flex items-center justify-center text-5xl bg-dark-gray">
          Section 4
        </div>
      </div>
    </section>
  );
}
