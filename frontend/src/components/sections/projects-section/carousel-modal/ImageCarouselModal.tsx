"use client";
import SpaceX from "@/components/layout/SpaceX";
import MotionOpacity from "@/components/motion/MotionOpacity";
import { useCarousel } from "@/hooks/useCarousel";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import CarouselControls from "./CarouselControls";
import CarouselHeader from "./CarouselHeader";
import CarouselImage from "./CarouselImage";

type ImageCarouselModalProps = {
  images: string[];
  initialIndex: number;
  onClose: () => void;
};

const ImageCarouselModal = ({
  images,
  initialIndex,
  onClose,
}: ImageCarouselModalProps) => {
  const { index, next, prev } = useCarousel(images.length, initialIndex);

  useEffect(() => {
    const nextIndex = (index + 1) % images.length;
    const prevIndex = (index - 1 + images.length) % images.length;

    [nextIndex, prevIndex].forEach((i) => {
      const img = new window.Image();
      img.src = images[i];
    });
  }, [index, images]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev, onClose]);

  return createPortal(
    <MotionOpacity
      duration={0.3}
      onClick={onClose}
      className="fixed inset-0 z-99999 bg-black/60 backdrop-blur-[0.5rem] flex items-center justify-center"
    >
      <CarouselHeader
        current={index + 1}
        total={images.length}
        onClose={onClose}
      />

      <SpaceX className="min-w-[20rem] max-w-[120rem] relative w-full h-dvh flex items-center justify-center xl:pb-0 pt-header-mobile xl:pt-header-desktop">
        <div
          className="relative w-full h-[calc(100%-2rem)] pb-[calc(env(safe-area-inset-bottom)+5rem)] xl:pb-[2rem] xl:px-[6rem] xl:h-[calc(100%-2rem)]"
          onClick={(e) => e.stopPropagation()}
        >
          <CarouselImage src={images[index]} index={index} />

          <CarouselControls onPrev={prev} onNext={next} />
        </div>
      </SpaceX>
    </MotionOpacity>,
    document.body,
  );
};

export default ImageCarouselModal;
