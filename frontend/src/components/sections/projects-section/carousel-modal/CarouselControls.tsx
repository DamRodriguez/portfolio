"use client";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselControlsProps = {
  onPrev: () => void;
  onNext: () => void;
};

const arrowSvgClassName =
  "w-7 h-7 xl:w-10 xl:h-10 stroke-soft-white dark:stroke-soft-white theme-transition-all";
const arrowButtonClassName =
  "pointer-events-auto backdrop-blur-[0.1rem] cursor-pointer hover:scale-105 theme-transition-all border border-soft-gray/30 rounded-full w-15 h-15 xl:w-20 xl:h-20 flex items-center justify-center hover:[&_svg]:stroke-[#000] hover:bg-soft-white shadow-s1 bg-black";

const CarouselControls = ({ onPrev, onNext }: CarouselControlsProps) => {
  return (
    <div className="fixed bottom-6 pb-[calc(env(safe-area-inset-bottom))] left-0 right-0 flex justify-center gap-10 z-20 pointer-events-none xl:absolute xl:pb-0 xl:bottom-auto xl:top-1/2 xl:-translate-y-1/2 xl:justify-between">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className={arrowButtonClassName}
      >
        <ChevronLeft className={clsx("mr-1", arrowSvgClassName)} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className={arrowButtonClassName}
      >
        <ChevronRight className={clsx("ml-1", arrowSvgClassName)} />
      </button>
    </div>
  );
};

export default CarouselControls;
