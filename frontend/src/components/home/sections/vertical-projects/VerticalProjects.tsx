"use client";
import RotatingOnScrollSection from "@/components/gsap/variants/RotatingOnScrollSection";
import VerticalProjectsTitle from "@/components/home/sections/vertical-projects/VerticalProjectsTitle";
import config from "@/config/config";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import useBreakpoint from "@/hooks/viewport/useBreakpoint";

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

export default function VerticalProjects() {
  const isTablet = useBreakpoint(config.breakpoints.lg);

  useScrollAnimations({
    animations: {
      ".projects-vertical-title-pin-wrapper": {
        from: {
          x: 0,
        },
        to: {
          x: "5%",
        },
        scrollTrigger: {
          trigger: ".projects-vertical-title-pin-wrapper",
          pin: !isTablet,
          start: "top 15%",
          endTrigger: ".projects-vertical-container",
          end: "bottom 85%",
          pinSpacing: false,
        },
      },
    },
  });

  return (
    <div className="projects-vertical-container relative flex flex-col gap-[1.5rem] md:gap-[2rem] overflow-hidden">
      <VerticalProjectsTitle />
      <RotatingOnScrollSection images={images} marqueeItems={marqueeItems} />
    </div>
  );
}
