"use client";
import "@/styles/scrollbarVertical.css";
import clsx from "clsx";
import type {
  EmblaOptionsType,
} from "embla-carousel";
import HorizontalCarouselVariantItem, { type HorizontalCarouselVariantData } from "@/components/carousel/horizontal-carousel-variant/HorizontalCarouselVariantItem";
import { useHorizontalCarousel } from "@/hooks/useHorizontalCarousel";
import { ArrowIcon } from "@/components/icons/buttons";
import { useEffect, useState } from "react";
import { DotButton } from "./HorizontalCarouselDotButtons";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

type HorizontalCarouselVariantProps = {
  options?: EmblaOptionsType;
  items: HorizontalCarouselVariantData[];
};

const HorizontalCarouselVariant = ({ options, items }: HorizontalCarouselVariantProps) => {
  const {
    emblaRef,
    emblaApi,
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
    onDotButtonClick
  } = useHorizontalCarousel({ options });

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const arrowSvgClassName = "w-7 h-7 xl:w-10 xl:h-10 fill-soft-white dark:fill-soft-white theme-transition";
  const arrowButtonClassName = "pointer-events-auto backdrop-blur-[0.1rem] cursor-pointer hover:scale-105 theme-transition-all border border-soft-gray rounded-full w-15 h-15 xl:w-20 xl:h-20 flex items-center justify-center hover:[&_svg]:fill-[#000] hover:bg-soft-white shadow-s1 bg-black";

  useScrollAnimations({
    animations: {
      ".left-arrow-gsap": {
        rotate: -50,
        x: -100,
        y: -100
      },
      ".right-arrow-gsap": {
        rotate: 50,
        x: 100,
        y: -100
      }
    }
  })

  return (
    <div className="relative w-full mb-7 md:mb-8 xl:mb-0">

      <div className="overflow-hidden rounded-[0.625rem] h-[18rem] xl:h-[22rem]" ref={emblaRef}>
        <div className={`flex items-center ${items.length <= 3 ? "xl:justify-center" : ""}`}>
          {items.map((item, index) => (
            <div
              key={index}
              className={clsx("flex-[0_0_calc(100%)] xl:flex-[0_0_calc(105%/3)] px-[0.5rem] w-[1rem]",
                {
                  "xl:mt-[1rem]": index !== selectedIndex
                }
              )}
            >
              <HorizontalCarouselVariantItem data={{ ...item }} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 w-30 md:w-50 xl:w-100 2xl:w-150 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-white-bone to-transparent opacity-100 dark:opacity-0 theme-transition-all" />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-0 dark:opacity-100 theme-transition-all" />
      </div>

      <div className="absolute inset-y-0 right-0 w-30 md:w-50 xl:w-100 2xl:w-150 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-l from-white-bone to-transparent opacity-100 dark:opacity-0 theme-transition-all" />
        <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent opacity-0 dark:opacity-100 theme-transition-all" />
      </div>

      <div className={clsx("absolute inset-0 flex items-center justify-between pointer-events-none",
        {
          "xl:hidden": items.length <= 3,
          hidden: items.length === 1,
        })}>
        <div className="left-arrow-gsap">
          <button
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            aria-label="Flecha de navegación hacia la izquierda"
            className={arrowButtonClassName}
          >
            <div className="rotate-180">
              <ArrowIcon className={arrowSvgClassName} />
            </div>
          </button>
        </div>
        <div className="right-arrow-gsap">
          <button
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            aria-label="Flecha de navegación hacia la derecha"
            className={arrowButtonClassName}
          >
            <ArrowIcon className={arrowSvgClassName} />
          </button>
        </div>
      </div>

      <div className="absolute -bottom-7 md:-bottom-8 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 xl:hidden">
        {items.map((_, index) => {
          const isActive = index === selectedIndex;
          return (
            (
              <DotButton
                key={index}
                onClick={() => { onDotButtonClick(index); }}
                className={clsx(
                  "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-alpha-50/50 border border-black dark:border-soft-gray cursor-pointer hover:scale-105 theme-transition",
                  {
                    "bg-black dark:bg-soft-white hover:bg-black dark:hover:bg-soft-white": isActive,
                    "hover:bg-black dark:hover:border-soft-white": !isActive,
                  }
                )}
              />
            )
          )
        })}
      </div>

    </div>
  );
};

export default HorizontalCarouselVariant;
