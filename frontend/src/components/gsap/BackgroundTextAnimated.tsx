"use client";
import MotionOpacity from "@/components/motion/MotionOpacity";
import HorizontalShadow from "@/components/other/HorizontalShadow";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import useBreakpoint from "@/hooks/viewport/useBreakpoint";
import clsx from "clsx";
import { useEffect, useState } from "react";

const BackgroundTextAnimated = () => {
  const isMobile = useBreakpoint();
  const backgroundTextHeight = isMobile ? 60 : 80;
  const [rowCount, setRowCount] = useState(10);

  useEffect(() => {
    const calculateRows = () => {
      const screenHeight = window.innerHeight;
      const rowsNeeded = Math.ceil(screenHeight / backgroundTextHeight) + 2;
      setRowCount(rowsNeeded);
    };

    calculateRows();

    window.addEventListener("resize", calculateRows);
    return () => window.removeEventListener("resize", calculateRows);
  }, [backgroundTextHeight]);

  const baseText =
    "react next.js typescript gsap react native motion css javascript tailwind html ";
  const infiniteText = baseText.repeat(15);

  const containerTrigger = {
    scrollTrigger: {
      trigger: ".head-section-container",
      start: "top top",
      end: "+=800",
      scrub: 2,
    },
  };

  useScrollAnimations({
    animations: {
      ".header-section-background-text-even": {
        ...containerTrigger,
        direction: "center",
        x: isMobile ? 200 : 400,
        force3D: true,
      },
      ".header-section-background-text-odd": {
        ...containerTrigger,
        direction: "center",
        x: isMobile ? -200 : -400,
        force3D: true,
      },
    },
  });

  return (
    <>
      <MotionOpacity className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] flex flex-col gap-1 pointer-events-none select-none z-0 bg-transparent">
        {[...Array(rowCount)].map((_, i) => {
          const isPair = i % 2 === 0;
          const positionInGroup = i % 6;
          const is3rd = positionInGroup === 2;
          const is5th = positionInGroup === 4;

          return (
            <p
              key={i}
              className={clsx(
                "text-nowrap text-5md xl:text-6xl font-bold italic uppercase text-dark-gray dark:text-soft-gray",
                "will-change-transform transform-gpu backface-hidden bg-transparent",
                "blur-[3px]",
                {
                  "header-section-background-text-even ml-[-5%] opacity-20":
                    isPair,
                  "header-section-background-text-odd ml-[-15%] opacity-35":
                    !isPair,
                  "ml-[-25%]": is3rd && isPair,
                  "ml-[-35%]": is5th && !isPair,
                },
              )}
              style={{
                height: backgroundTextHeight,
              }}
            >
              {infiniteText}
            </p>
          );
        })}
      </MotionOpacity>
      <HorizontalShadow />
      <div className="w-full absolute z-15 top-[calc(var(--height-header-desktop))] h-[5rem] xl:h-[15rem] pointer-events-none bg-gradient-to-b from-white-bone via-white-bone/70 dark:from-black dark:via-black/70 to-transparent" />
      <div className="w-full absolute z-15 -bottom-[2px] h-[10rem] xl:h-[15rem] pointer-events-none bg-gradient-to-t from-white-bone via-white-bone/70 dark:from-black dark:via-black/70 to-transparent" />
    </>
  );
};

export default BackgroundTextAnimated;
