"use client";
import SpaceX from "@/components/layout/SpaceX";
import ButtonWithArrow from "@/components/ui/buttons/ButtonWithArrow";
import MotionSlide from "@/components/motion/MotionSlide";
import MotionFade from "@/components/motion/MotionFade";
import { useTranslations } from "next-intl";
import HorizontalCarouselSection from "@/components/sections/head-section/HorizontalCarouselSection";
import SocialButtonsSection from "@/components/sections/head-section/SocialButtonsSection";
import { routes } from "@/constants/routes";

const HeadSection = () => {
  const t = useTranslations();
  const projectsButtonText = t("headSection.projectsButton");

  return (
    <SpaceX className="flex flex-col gap-[3rem] xl:gap-[4rem]">

      <div className="flex flex-col gap-[2rem]">
        <div className="w-full flex flex-col -space-y-[2rem] lg:-space-y-[3rem]">
          <div className="flex justify-center xl:justify-between items-center">
            <MotionSlide>
              <h1 className="text-6xl lg:text-8xl xl:text-9xl 2xl:text-10xl text-soft-white font-bold font-fira-code">
                {t("headSection.title.first")}
              </h1>
            </MotionSlide>
            <MotionFade className="hidden 2xl:flex">
              <ButtonWithArrow
                text={projectsButtonText}
                routerPath={routes.projects}
              />
            </MotionFade>
          </div>
          <div className="flex flex-col-reverse text-center xl:text-start items-center xl:flex xl:flex-row xl:justify-between xl:items-center gap-[1rem]">
            <MotionFade className="max-w-[70%] xl:max-w-[30%]">
              <p className="text-base 2xl:text-xl text-soft-gray">
                {t.rich("headSection.personalDescription", {
                  strong: (chunks) => <span className="text-soft-white">{chunks}</span>,
                })}
              </p>
            </MotionFade>
            <MotionSlide direction="right">
              <h1 className="text-6xl lg:text-8xl xl:text-9xl 2xl:text-10xl text-soft-white font-bold font-fira-code">
                {t("headSection.title.second")}
              </h1>
            </MotionSlide>
          </div>
        </div>
        <MotionFade className="flex 2xl:hidden justify-center">
          <ButtonWithArrow
            text={projectsButtonText}
            routerPath={routes.projects}
          />
        </MotionFade>
      </div>

      <SocialButtonsSection />
      <HorizontalCarouselSection />
    </SpaceX>
  );
};

export default HeadSection;