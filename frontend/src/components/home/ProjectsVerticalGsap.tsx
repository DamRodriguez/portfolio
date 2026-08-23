"use client";
import RotatingOnScrollSection from "@/components/gsap/variants/RotatingOnScrollSection";
import SpaceX from "@/components/layout/SpaceX";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";

const images = [
  "/images/projects/spotify-mobile/logo.webp",
  "/images/projects/lopez-propiedades/logo.webp",
  "/images/projects/vanicracia/logo.webp",
  "/images/projects/alfombras-tauro/logo.webp",
  "/images/projects/donde-salgo/logo.webp",
];

const marqueeItems = [
  "Spotify Mobile",
  "Lopez Propiedades",
  "Vanicracia",
  "Alfombras Tauro",
  "Donde Salgo",
];

export default function ProjectsVerticalGsap() {
  useScrollAnimations({
    direction: "bottom",
    animations: {
      ".projects-vertical-title": {
        from: { opacity: 0, filter: "blur(3px)" },
        to: { opacity: 1, filter: "blur(0px)" },
      },
      ".projects-vertical-fill": {
        from: { clipPath: "inset(0% 100% 0% 0%)" },
        to: { clipPath: "inset(0% 0% 0% 0%)" },
        scrollTrigger: { trigger: ".projects-vertical-title", scrub: 2 },
      },
    },
  });

  return (
    <div className="relative flex flex-col gap-[2rem] md:gap-[5rem] overflow-hidden">
      <SpaceX>
        <h2 className="projects-vertical-title flex justify-center font-fira-code font-semibold text-5md lg:text-8xl">
          <span className="relative inline-block">
            <span className="text-dark-gray/50 dark:text-soft-gray/50">
              Destacados
            </span>
            <span
              className="projects-vertical-fill absolute left-0 top-0 text-black dark:text-soft-white whitespace-nowrap"
              aria-hidden="true"
            >
              Destacados
            </span>
          </span>
        </h2>
      </SpaceX>
      <RotatingOnScrollSection images={images} marqueeItems={marqueeItems} />
    </div>
  );
}
