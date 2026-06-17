"use client";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselControlsProps = {
  onPrev: () => void;
  onNext: () => void;
};

const arrowSvgClassName =
  "w-7 h-7 xl:w-12 xl:h-12 stroke-black dark:stroke-soft-white theme-transition-all";
const arrowButtonClassName =
  "bg-white-bone dark:bg-strong-black border border-black/15 dark:border-soft-gray/30 rounded-md shadow-s1 w-[3.5rem] flex items-center xl:h-full cursor-pointer pointer-events-auto hover:border-soft-white hover:bg-white-bone/50 dark:hover:border-soft-gray/70 theme-transition-all hover:[&_svg]:stroke-soft-white dark:hover:bg-strong-black/50 h-[3.5rem] w-full xl:w-fit justify-center max-w-[15rem] ";

const CarouselControls = ({ onPrev, onNext }: CarouselControlsProps) => {
  return (
    <div className="bottom-[calc(env(safe-area-inset-bottom)+1rem)] xl:pb-[2rem] left-0 right-0 flex justify-center gap-10 z-20 pointer-events-none absolute xl:bottom-auto xl:top-1/2 xl:-translate-y-1/2 xl:justify-between w-full xl:h-full">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Retroceder"
        className={clsx("", arrowButtonClassName)}
      >
        <ChevronLeft className={clsx("mr-1", arrowSvgClassName)} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Avanzar"
        className={clsx("", arrowButtonClassName)}
      >
        <ChevronRight className={clsx("ml-1", arrowSvgClassName)} />
      </button>
    </div>
  );
};

export default CarouselControls;
