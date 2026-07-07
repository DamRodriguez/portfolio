"use client";
import SpaceX from "@/components/layout/SpaceX";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import CloseButton from "@/components/ui/buttons/CloseButton";
import { formatTwoDigits } from "@/utils/formatTwoDigits";

type CarouselHeaderProps = {
  current: number;
  total: number;
  onClose: () => void;
};

const CarouselHeader = ({ current, total, onClose }: CarouselHeaderProps) => {
  return (
    <SpaceX className="min-w-[20rem] max-w-[120rem] mx-auto absolute left-0 right-0 flex justify-between items-center z-50">
      <span className="text-base xl:text-xl font-medium text-black dark:text-soft-white font-fira-code flex gap-2">
        <AnimatedNumber value={current} />
        <span>/</span>
        <span>{formatTwoDigits(total)}</span>
      </span>

      <CloseButton onClose={onClose} />
    </SpaceX>
  );
};

export default CarouselHeader;
