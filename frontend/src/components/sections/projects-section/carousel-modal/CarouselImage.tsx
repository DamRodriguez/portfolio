"use client";
import MotionScale from "@/components/motion/MotionScale";
import Spinner from "@/components/spinner/Spinner";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

type CarouselImageProps = {
  src: string;
  index: number;
};

const CarouselImage = ({ src, index }: CarouselImageProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size={80} color="var(--color-soft-gray)" />
        </div>
      )}

      <MotionScale
        duration={0.3}
        key={index}
        className="w-full h-full inset-0 z-10"
      >
        <Image
          src={src}
          alt={`Galería ${index}`}
          sizes="(max-width: 768px) 100vw, 1200px"
          fill
          quality={80}
          onLoad={() => setLoaded(true)}
          className={clsx(
            "object-contain transition-opacity duration-300 z-10",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      </MotionScale>
    </>
  );
};

export default CarouselImage;
