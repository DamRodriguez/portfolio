"use client";
import TechnologyItem, {
  TechnologyItemData,
} from "@/components/home/sections/about-me-section/technologies/TechnologyItem";
import { RichText } from "@/components/next-intl/RichText";
import GithubButton from "@/components/ui/buttons/GithubButton";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import { useTranslations } from "next-intl";
import { useRef } from "react";

const TechnologiesSection = () => {
  const t = useTranslations("aboutMeSection");
  const containerRef = useRef<HTMLDivElement>(null);

  const trigger = {
    start: "top center",
    end: "bottom center",
    scrub: 2,
  };

  useScrollAnimations({
    scope: containerRef,
    animations: {
      ".tech-section-animated-bg": {
        from: { clipPath: "ellipse(40% 0% at 50% 0%)" },
        to: { clipPath: "ellipse(250% 120% at 50% 0%)" },
        scrollTrigger: trigger,
      },
      ".tech-section-common": {
        direction: "bottom",
        individual: true,
        from: {
          opacity: 0,
          scale: 0.95,
        },
        to: {
          opacity: 1,
          scale: 1,
        },
      },
      ".tech-section-description": {
        direction: "center",
        from: {
          y: "-50%",
        },
        to: {
          y: 0,
        },
      },
      ".tech-section-item": {
        direction: "bottom",
        individual: true,
        from: { scale: 0.9, y: 20 },
        to: { scale: 1, y: 0 },
      },
    },
  });

  const frontTechnologyData: TechnologyItemData = {
    title: t("technologies.frontend.title"),
    items: t("technologies.frontend.items"),
  };

  const stylesTechnologyData: TechnologyItemData = {
    title: t("technologies.styles.title"),
    items: t("technologies.styles.items"),
  };

  const backendTechnologyData: TechnologyItemData = {
    title: t("technologies.backend.title"),
    items: t("technologies.backend.items"),
  };

  const toolsData: TechnologyItemData = {
    title: t("technologies.tools.title"),
    items: t("technologies.tools.items"),
  };

  return (
    <div
      ref={containerRef}
      className="relative gap-[1.5rem] xl:gap-[2rem] flex flex-col xl:w-1/2"
    >
      <div className="tech-section-animated-bg absolute top-0 left-0 w-full h-full bg-white-bone dark:bg-black z-20 mix-blend-multiply dark:mix-blend-exclusion pointer-events-none rounded-none" />

      <div className="tech-section-item">
        <TechnologyItem data={frontTechnologyData} animation="left" />
      </div>

      <div className="flex justify-between items-center">
        <div className="tech-section-item w-1/2">
          <TechnologyItem data={stylesTechnologyData} animation="right" />
        </div>

        <div className="tech-section-common w-1/2 flex justify-center z-30">
          <GithubButton />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="tech-section-common tech-section-description w-[40%] z-30">
          <p className="text-dark-gray dark:text-soft-gray text-sm xl:text-lg">
            <RichText t={t} translationKey={"favoritesTools"} />
          </p>
        </div>

        <div className="tech-section-item w-1/2">
          <TechnologyItem data={backendTechnologyData} animation="left" />
        </div>
      </div>

      <div className="tech-section-item">
        <TechnologyItem data={toolsData} animation="right" />
      </div>
    </div>
  );
};

export default TechnologiesSection;
