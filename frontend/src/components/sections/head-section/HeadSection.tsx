"use client";
import SplitTextWrapper from "@/components/gsap/SplitTextWrapper";
import SpaceX from "@/components/layout/SpaceX";
import MotionEntryFade from "@/components/motion/MotionEntryFade";
import MotionEntrySlide from "@/components/motion/MotionEntrySlide";
import SocialButtonsSection from "@/components/sections/head-section/SocialButtonsSection";
import ButtonWithArrow from "@/components/ui/buttons/ButtonWithArrow";
import { routes } from "@/constants/routes";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { removeHash } from "@/utils/removeHash";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const HorizontalCarouselSection = dynamic(
  () => import("@/components/sections/head-section/HorizontalCarouselSection"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[18rem] xl:h-[22rem] rounded-[0.625rem] bg-soft-white/10 dark:bg-black/10 animate-pulse" />
    ),
  },
);

const HeadSection = () => {
  const t = useTranslations();
  const projectsButtonText = t("headSection.projectsButton");
  const isMobile = useBreakpoint();

  useScrollAnimations({
    animations: {
      ".first-title-gsap": {
        x: isMobile ? -70 : -150,
        rotate: -5,
      },
      ".second-title-gsap": {
        x: isMobile ? 70 : 150,
        rotate: 5,
      },
      ".text-gsap": {
        scale: 0.85,
      },
      ".project-button-gsap": {
        scale: 0.85,
      },
      ".carousel-gsap": {
        opacity: 0,
      },
    },
  });

  return (
    <SpaceX
      id={removeHash(routes.home)}
      className="flex flex-col gap-[3rem] xl:gap-[4rem]"
    >
      <div className="flex flex-col gap-[2rem]">
        <div className="w-full flex flex-col -space-y-[2rem] lg:-space-y-[3rem]">
          <div className="flex justify-center xl:justify-between items-center">
            <SplitTextWrapper order={0}>
              <h1 className="first-title-gsap text-6xl lg:text-8xl xl:text-9xl 2xl:text-10xl text-black dark:text-soft-white font-bold font-fira-code">
                {t("headSection.title.first")}
              </h1>
            </SplitTextWrapper>
            <div className="project-button-gsap">
              <MotionEntryFade order={1.5} className="hidden 2xl:flex">
                <ButtonWithArrow
                  text={projectsButtonText}
                  routerPath={routes.projects}
                />
              </MotionEntryFade>
            </div>
          </div>
          <div className="flex flex-col-reverse text-center xl:text-start items-center xl:flex xl:flex-row xl:justify-between xl:items-center gap-[1rem]">
            <MotionEntryFade order={1.5} className="max-w-[70%] xl:max-w-[25%]">
              <p className="text-gsap text-base 2xl:text-xl text-dark-gray dark:text-soft-gray">
                {t.rich("headSection.personalDescription", {
                  strong: (chunks) => (
                    <span className="text-strong-black dark:text-soft-white font-medium">
                      {chunks}
                    </span>
                  ),
                })}
              </p>
            </MotionEntryFade>
            <SplitTextWrapper order={1}>
              <h1 className="second-title-gsap text-6xl lg:text-8xl xl:text-9xl 2xl:text-10xl text-black dark:text-soft-white font-bold font-fira-code">
                {t("headSection.title.second")}
              </h1>
            </SplitTextWrapper>
          </div>
        </div>
        <div className="project-button-gsap">
          <MotionEntryFade
            order={1.5}
            className="flex 2xl:hidden justify-center"
          >
            <ButtonWithArrow
              text={projectsButtonText}
              routerPath={routes.projects}
            />
          </MotionEntryFade>
        </div>
      </div>
      <SocialButtonsSection order={2} />
      <div className="carousel-gsap">
        <MotionEntrySlide direction="down" order={3}>
          <HorizontalCarouselSection />
        </MotionEntrySlide>
      </div>
    </SpaceX>
  );
};

export default HeadSection;
