"use client";
import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import { RichText } from "@/components/next-intl/RichText";
import TechnologyItem, {
  TechnologyItemData,
} from "@/components/sections/about-me-section/technologies/TechnologyItem";
import GithubButton from "@/components/ui/buttons/GithubButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const TechnologiesSection = () => {
  const t = useTranslations("aboutMeSection");

  const technologyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

  useGSAP(() => {
    technologyRefs.current.forEach((element, index) => {
      if (!element) return;

      ScrollTrigger.create({
        trigger: element,
        start: "center center+=50",
        end: "center center-=50",

        onToggle: ({ isActive }) => {
          setActiveIndex((current) => {
            if (isActive) return index;
            if (current === index) return null;
            return current;
          });
        },
      });
    });
  });

  return (
    <div className="gap-[1.5rem] xl:gap-[2rem] flex flex-col xl:w-1/2">
      <div
        ref={(el) => {
          technologyRefs.current[0] = el;
        }}
      >
        <MotionSlide direction="right">
          <TechnologyItem
            data={frontTechnologyData}
            animation="left"
            isActive={activeIndex === 0}
          />
        </MotionSlide>
      </div>

      <div className="flex justify-between items-center">
        <div
          ref={(el) => {
            technologyRefs.current[1] = el;
          }}
          className="w-1/2"
        >
          <MotionSlide>
            <TechnologyItem
              data={stylesTechnologyData}
              animation="right"
              isActive={activeIndex === 1}
            />
          </MotionSlide>
        </div>

        <div className="w-1/2 flex justify-center">
          <MotionFade>
            <GithubButton />
          </MotionFade>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <MotionFade className="w-[40%]">
          <p className="text-dark-gray dark:text-soft-gray text-sm xl:text-lg">
            <RichText t={t} translationKey={"favoritesTools"} />
          </p>
        </MotionFade>

        <div
          ref={(el) => {
            technologyRefs.current[2] = el;
          }}
          className="w-1/2"
        >
          <MotionSlide direction="right">
            <TechnologyItem
              data={backendTechnologyData}
              animation="left"
              isActive={activeIndex === 2}
            />
          </MotionSlide>
        </div>
      </div>

      <div
        ref={(el) => {
          technologyRefs.current[3] = el;
        }}
      >
        <MotionSlide>
          <TechnologyItem
            data={toolsData}
            animation="right"
            isActive={activeIndex === 3}
          />
        </MotionSlide>
      </div>
    </div>
  );
};

export default TechnologiesSection;
