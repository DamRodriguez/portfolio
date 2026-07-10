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
        key={index}
        duration={0.3}
        className="absolute inset-0 z-10 flex items-center justify-center pb-[2rem]"
      >
        <div
          className={clsx(
            "overflow-hidden rounded-[0.5rem] xl:rounded-2xl border border-soft-white/10 shadow-s1 transition-opacity duration-300 xl:mx-20",
            loaded ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={src}
            alt={`Galería ${index}`}
            width={1920}
            height={1080}
            quality={80}
            onLoad={() => setLoaded(true)}
            className="object-contain max-h-[65vh] xl:max-h-[75vh]"
            style={{
              // maxHeight: "calc(100vh - 16rem)",
              width: "auto",
              height: "auto",
            }}
          />
        </div>
      </MotionScale>
    </>
  );
};

export default CarouselImage;
