"use client";
import CustomImage from "@/components/image/CustomImage";
import SpaceX from "@/components/layout/SpaceX";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import {
  EntranceAnimationConfig,
  generateItemConfigs,
  useRotatingOnScrollAnimation,
} from "@/hooks/gsap/variants/rotating-on-scroll";

import { useMemo, useRef } from "react";

export interface RotatingOnScrollSectionProps {
  images: string[];
  marqueeItems: string[];
  className?: string;
  disabled?: boolean;
  itemAspectRatio?: number;
  zAmplitude?: number;
  entranceAnimation?: EntranceAnimationConfig;
}

export default function RotatingOnScrollSection({
  images,
  marqueeItems,
  className = "",
  disabled = false,
  itemAspectRatio = 14 / 9,
  zAmplitude = 90,
  entranceAnimation,
}: RotatingOnScrollSectionProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeBgRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  const itemConfigs = useMemo(
    () => generateItemConfigs(images.length),
    [images.length],
  );

  useRotatingOnScrollAnimation({
    galleryRef,
    marqueeRef,
    marqueeBgRef,
    itemRefs,
    wrapperRefs,
    itemConfigs,
    disabled,
    zAmplitude,
    itemStart: "top bottom",
    itemEnd: "bottom top",
    entranceAnimation,
  });

  useScrollAnimations({
    disabled,
    animations: {
      ".marquee-bg": {
        from: { height: 0, opacity: 0 },
        to: { height: "100%", opacity: 1, ease: "power2.inOut" },
        scrollTrigger: {
          trigger: ".rotating-section-container",
          start: "top center",
          end: "top center",
          scrub: 2,
        },
      },
    },
  });

  return (
    <div className={`rotating-section-container relative w-full ${className}`}>
      <div
        ref={marqueeBgRef}
        className="marquee-bg pointer-events-none absolute left-0 w-full bg-black dark:bg-soft-white -z-10"
      />

      <div className="relative z-10 w-full">
        <SpaceX>
          <div
            ref={galleryRef}
            className="gallery flex flex-col items-center py-2"
            role="list"
          >
            {images.map((src, index) => (
              <div
                key={`wrap-${index}`}
                ref={(el) => {
                  wrapperRefs.current[index] = el;
                }}
                className="gallery__item-wrap relative flex w-full max-w-full justify-center px-4 sm:px-0 sm:max-w-[25rem] md:max-w-[30rem] lg:max-w-[35rem] xl:max-w-[40rem]"
                style={{ perspective: "900px" }}
              >
                <div
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="gallery__item shadow-s1 rounded-[2rem] relative w-full z-20 overflow-hidden"
                  style={{
                    aspectRatio: itemAspectRatio,
                    transformStyle: "preserve-3d",
                    willChange: "transform, filter",
                  }}
                >
                  <CustomImage
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover rounded-[2rem] scale-[1.01]"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 30rem, (max-width: 1024px) 35rem, 40rem"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </SpaceX>
      </div>

      <div
        ref={marqueeRef}
        className="mark pointer-events-none absolute left-0 w-full flex items-center overflow-hidden z-10"
        aria-hidden="true"
      >
        {/* <div className="hidden lg:flex">
          <HorizontalShadow color="black" width="2rem" />
        </div> */}
        <div
          className="mark__inner flex gap-[2.5rem] whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {marqueeItems.map((item, index) => (
            <span
              key={`marquee-item-${index}`}
              className="font-fira-code text-soft-white font-bold uppercase tracking-tight text-7xl lg:text-8md"
            >
              {item}
              {index < marqueeItems.length - 1 && <span> / </span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
