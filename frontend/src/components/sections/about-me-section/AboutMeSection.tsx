"use client";
import SpaceX from "@/components/layout/SpaceX";
import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import { useTranslations } from "next-intl";
import TechnologiesSection from "./TechnologiesSection";

const AboutMeSection = () => {
  const t = useTranslations("aboutMeSection.header");

  return (
    <SpaceX
      id="about-me"
      className="flex flex-col gap-[3rem] xl:gap-[6rem] w-full"
    >
      <div className="flex md:flex-row md:justify-between xl:w-[80%] flex-col gap-[2rem]">
        <MotionSlide>
          <span className="text-soft-white text-base xl:text-xl font-fira-code">
            {t("sectionName")}
          </span>
        </MotionSlide>
        <MotionFade>
          <p className="text-soft-gray text-base lg:text-xl whitespace-pre-line">
            {t.rich("description", {
              strong: (chunks) => <span className="text-soft-white">{chunks}</span>,
            })}
          </p>
        </MotionFade>
      </div>

      <div>
        <TechnologiesSection />
      </div>
    </SpaceX>
  );
};

export default AboutMeSection;