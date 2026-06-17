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
        className="pointer-events-auto p-[0.6rem] xl:p-[0.8rem] backdrop-blur-[0.1rem] cursor-pointer hover:scale-105 theme-transition-all border border-soft-gray/30 rounded-full flex items-center justify-center hover:[&_svg]:stroke-[#000] hover:bg-soft-white shadow-s1 bg-black"
      >
        <X className="w-[1.5rem] h-[1.5rem] xl:w-[1.7rem] xl:h-[1.7rem] stroke-soft-white dark:stroke-soft-white theme-transition-all" />
      </button>
    </SpaceX>
  );
};

export default CarouselHeader;
