"use client";
import SpaceX from "@/components/layout/SpaceX";
import { X } from "lucide-react";

type CarouselHeaderProps = {
  current: number;
  total: number;
  onClose: () => void;
};

const CarouselHeader = ({ current, total, onClose }: CarouselHeaderProps) => {
  return (
    <SpaceX className="absolute top-[calc(var(--height-header-mobile)+1rem)] xl:top-[calc(var(--height-header-desktop))] left-0 right-0 flex justify-between items-center z-50">
      <span className="text-base xl:text-xl font-medium text-soft-white font-fira-code">
        {current} / {total}
      </span>

      <button
        type="button"
        onClick={onClose}
        className="z-20 cursor-pointer p-[0.6rem] xl:p-[0.8rem] bg-black/60 backdrop-blur-[0.2rem] border border-soft-gray/30 rounded-full theme-transition-all [&_svg]:stroke-soft-white hover:[&_svg]:stroke-black hover:bg-soft-white hover:border-black"
      >
        <X className="w-[1.5rem] h-[1.5rem] xl:w-[1.7rem] xl:h-[1.7rem] theme-transition-all" />
      </button>
    </SpaceX>
  );
};

export default CarouselHeader;
