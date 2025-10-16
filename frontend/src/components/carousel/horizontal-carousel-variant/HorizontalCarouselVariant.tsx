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

  const arrowSvgClassName = "w-5 h-5 xl:w-8 xl:h-8 fill-[#fff]";

  return (
    <div className="relative w-full">

      <div className="overflow-hidden rounded-[0.625rem]" ref={emblaRef}>
        <div className={`flex ${items.length <= 3 ? "xl:justify-center" : ""}`}>
          {items.map((item, index) => (
            <div
              key={index}
              className={clsx("flex-[0_0_calc(100%)] xl:flex-[0_0_calc(100%/3)] px-[0.5rem] w-[1rem]",
                {
                  "mt-[0.7rem]": index !== selectedIndex
                }
              )}
            >
              <HorizontalCarouselVariantItem data={{ ...item }} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 w-150 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-150 bg-gradient-to-l from-black to-transparent pointer-events-none" />

      <div className={clsx("absolute inset-0 flex items-center justify-between pointer-events-none",
        {
          "xl:hidden": items.length <= 3,
          hidden: items.length === 1,
        })}>
        <button
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className="pointer-events-auto cursor-pointer hover:scale-110 transition-all duration-400 rotate-180 border border-soft-gray rounded-full w-15 h-15 flex items-center justify-center hover:[&_svg]:fill-[#000] hover:bg-soft-white"
        >
          <ArrowIcon className={arrowSvgClassName} />
        </button>
        <button
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="pointer-events-auto cursor-pointer hover:scale-110 transition-all duration-300 border border-soft-gray rounded-full w-15 h-15 flex items-center justify-center hover:[&_svg]:fill-[#000] hover:bg-soft-white"
        >
          <ArrowIcon className={arrowSvgClassName} />
        </button>
      </div>

    </div>
  );
};

export default HorizontalCarouselVariant;
