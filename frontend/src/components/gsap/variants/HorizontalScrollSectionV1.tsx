"use client";
import SpaceX from "@/components/layout/SpaceX";
import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import SecondTitle from "@/components/text/SecondTitle";
import { useHorizontalScrollAnimationV1 } from "@/hooks/gsap/variants/useHorizontalScrollAnimationV1";
import { useRef } from "react";

// scroll con secciones horizontales

export default function HorizontalScrollSectionV1() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useHorizontalScrollAnimationV1({
    scope: sectionRef,
    horizontal: {
      panels: ".panel",
    },
  });

  return (
    <SpaceX className="w-full">
      <div
        ref={sectionRef}
        className="flex flex-col gap-[3rem] xl:gap-[6rem] w-full"
      >
        {/* TEXTOS FIJOS */}
        <div className="flex md:items-end md:flex-row md:justify-between w-full flex-col gap-[2rem] md:gap-[5rem] 2xl:w-[85%]">
          <MotionSlide>
            <SecondTitle text="Titulo" />
          </MotionSlide>
          <MotionFade>
            <p className="whitespace-pre-line text-dark-gray dark:text-soft-gray text-base xl:text-xl">
              descripcion
            </p>
          </MotionFade>
        </div>

        {/* CONTENEDOR DE CARDS */}
        {/* Mantenemos h-[50svh] para proteger contra la address bar en mobile */}
        <div className="relative w-full overflow-hidden h-[calc(100svh-var(--height-header-mobile)-18rem)] xl:h-[calc(100svh-var(--height-header-desktop)-18rem)] rounded-2xl">
          <div className="panel absolute inset-0 w-full h-full flex items-center justify-center text-5xl bg-red-error shadow-lg">
            Section 1
          </div>

          <div className="panel absolute inset-0 w-full h-full flex items-center justify-center text-5xl bg-green shadow-lg">
            Section 2
          </div>

          <div className="panel absolute inset-0 w-full h-full flex items-center justify-center text-5xl bg-soft-gray shadow-lg">
            Section 3
          </div>

          <div className="panel absolute inset-0 w-full h-full flex items-center justify-center text-5xl bg-dark-gray shadow-lg">
            Section 4
          </div>
        </div>
      </div>
    </SpaceX>
  );
}
