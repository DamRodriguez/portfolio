"use client";
import SpaceX from "@/components/layout/SpaceX";
import MotionQuantity from "@/components/motion/MotionQuantity";
import { X } from "lucide-react";

type CarouselHeaderProps = {
  current: number;
  total: number;
  onClose: () => void;
};

const CarouselHeader = ({ current, total, onClose }: CarouselHeaderProps) => {
  return (
    <SpaceX className="min-w-[20rem] max-w-[120rem] mx-auto absolute top-[2rem] xl:top-[3rem] left-0 right-0 flex justify-between items-center z-50">
      <span className="text-base xl:text-xl font-medium text-soft-white font-fira-code text-shadow-soft flex gap-2">
        <MotionQuantity duration={0.2} motionKey={current}>
          {current}
        </MotionQuantity>
        <span>/</span>
        <span>{total}</span>
      </span>

      <button
        type="button"
        onClick={onClose}
        className="bg-white-bone dark:bg-strong-black border border-black/15 dark:border-soft-gray/30 rounded-full shadow-s1 w-[2.8rem] h-[2.8rem] xl:w-[3.5rem] xl:h-[3.5rem] flex items-center justify-center cursor-pointer pointer-events-auto dark:hover:border-soft-gray/70 theme-transition-all hover:border-soft-white hover:bg-white-bone/50 hover:[&_svg]:stroke-soft-white "
      >
        <X className="w-[1.5rem] h-[1.5rem] xl:w-[1.7rem] xl:h-[1.7rem] stroke-black dark:stroke-soft-white theme-transition-all" />
      </button>
    </SpaceX>
  );
};

export default CarouselHeader;
