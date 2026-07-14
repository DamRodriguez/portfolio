"use client";
import HorizontalCarouselItem, {
  HorizontalCarouselItemData,
} from "@/components/carousel/horizontal-carousel/HorizontalCarouselItem";
import { useHorizontalCarousel } from "@/hooks/useHorizontalCarousel";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import "@/styles/scrollbarVertical.css";
import clsx from "clsx";
import type { EmblaOptionsType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DotButton } from "./HorizontalCarouselDotButtons";

type HorizontalCarouselProps = {
  options?: EmblaOptionsType;
  items: HorizontalCarouselItemData[];
};

const HorizontalCarousel = ({ options, items }: HorizontalCarouselProps) => {
  const {
    emblaRef,
    safeItems,
    selectedIndex,
    outerSlidesRef,
    innerSlidesRef,
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
    onDotButtonClick,
  } = useHorizontalCarousel({ options, items });

  const arrowSvgClassName =
    "w-7 h-7 xl:w-10 xl:h-10 stroke-soft-white dark:stroke-soft-white theme-transition-all";

  const arrowButtonClassName =
    "pointer-events-auto backdrop-blur-[0.1rem] cursor-pointer hover:scale-105 theme-transition-all border border-soft-gray/30 rounded-full w-15 h-15 xl:w-20 xl:h-20 flex items-center justify-center hover:[&_svg]:stroke-[#000] hover:bg-soft-white shadow-s1 bg-black";

  useScrollAnimations({
    animations: {
      ".left-arrow-gsap": { rotate: -50, x: -100, y: -100 },
      ".right-arrow-gsap": { rotate: 50, x: 100, y: -100 },
    },
  });

  return (
    <div className="relative w-full mb-7 md:mb-8 xl:mb-0">
      <div
        className="overflow-hidden rounded-[0.625rem] h-[18rem] xl:h-[22rem]"
        ref={emblaRef}
        style={{ perspective: "1200px" }}
      >
        <div
          className={clsx(
            "flex items-center h-full",
            safeItems.length <= 3 && "2xl:justify-center",
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {safeItems.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                outerSlidesRef.current[index] = el;
              }}
              className="flex-[0_0_calc(100%)] 2xl:flex-[0_0_calc(115%/3)] relative"
            >
              <div
                ref={(el) => {
                  innerSlidesRef.current[index] = el;
                }}
                className="h-full transform-gpu"
              >
                <HorizontalCarouselItem data={{ ...item }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 -left-[2px] w-20 md:w-50 xl:w-100 2xl:w-150 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-white-bone to-transparent opacity-100 dark:opacity-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-0 dark:opacity-100" />
      </div>

      <div className="absolute inset-y-0 -right-[2px] w-20 md:w-50 xl:w-100 2xl:w-150 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-white-bone to-transparent opacity-100 dark:opacity-0" />
        <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent opacity-0 dark:opacity-100" />
      </div>

      <div
        className={clsx(
          "absolute inset-0 flex items-center justify-between pointer-events-none",
          safeItems.length <= 3 && "xl:hidden",
          safeItems.length === 1 && "hidden",
        )}
      >
        <div className="left-arrow-gsap">
          <button
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            aria-label="Flecha de navegación hacia la izquierda"
            className={arrowButtonClassName}
          >
            <ChevronLeft className={clsx("mr-1", arrowSvgClassName)} />
          </button>
        </div>
        <div className="right-arrow-gsap">
          <button
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            aria-label="Flecha de navegación hacia la derecha"
            className={arrowButtonClassName}
          >
            <ChevronRight className={clsx("ml-1", arrowSvgClassName)} />
          </button>
        </div>
      </div>

      <div className="absolute -bottom-7 md:-bottom-8 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4">
        {items.map((_, index) => {
          const isActive = index === selectedIndex % items.length;
          return (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={clsx(
                "h-2.5 md:h-3 rounded-full border cursor-pointer hover:scale-105 theme-transition-all",
                isActive
                  ? "bg-dark-gray dark:bg-soft-gray hover:bg-black dark:hover:bg-soft-gray w-6 xl:w-8 dark:border-soft-white border-black"
                  : "bg-alpha-50/50 border-dark-gray dark:border-soft-gray hover:bg-dark-gray dark:hover:border-soft-white w-2.5 md:w-3",
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalCarousel;
