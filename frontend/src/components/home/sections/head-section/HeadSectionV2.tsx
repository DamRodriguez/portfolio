"use client";
import BackgroundTextAnimated from "@/components/gsap/BackgroundTextAnimated";
import SocialButtonsSection from "@/components/home/sections/head-section/SocialButtonsSection";
import SpaceX from "@/components/layout/SpaceX";
import MotionEntryFade from "@/components/motion/MotionEntryFade";
import MotionEntrySlide from "@/components/motion/MotionEntrySlide";
import { RichText } from "@/components/next-intl/RichText";
import { ReflectedTitle } from "@/components/text/ReflectedTitle";
import ResponsiveTitleWrapper from "@/components/text/ResponsiveTitleWrapper";
import ButtonWithArrow from "@/components/ui/buttons/ButtonWithArrow";
import { routes } from "@/constants/routes";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import { useCurrentTheme } from "@/hooks/theme/useCurrentTheme";
import useBreakpoint from "@/hooks/viewport/useBreakpoint";
import { useTranslations } from "next-intl";

const HeadSectionV2 = () => {
  const t = useTranslations("headSection");
  const projectsButtonText = t("projectsButton");
  const { isDark } = useCurrentTheme();
  const isMobile = useBreakpoint();

  const containerTrigger = {
    scrollTrigger: {
      trigger: ".head-section-container",
      scrub: 2,
    },
  };

  useScrollAnimations({
    animations: {
      ".head-section-container": {
        from: {
          rotationX: 0,
          scale: 1,
          transformOrigin: "bottom center",
          transformPerspective: 1000,
          y: 0,
          borderWidth: "1px",
          borderColor: "transparent",
          borderStyle: "solid",
          backgroundColor: isDark ? "#121212" : "#f9f6ee",
        },
        to: {
          backgroundColor: isDark ? "#0f0f0f" : "#f5f5f5",
          scale: isMobile ? 0.95 : 0.85,
          borderRadius: "5rem",
          rotationX: 30,
          transformPerspective: 1000,
          y: -100,
          borderWidth: "1px",
          borderColor: isDark
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(0, 0, 0, 0.2)",
          borderStyle: "solid",
        },
      },
      ".header-section-title1": {
        ...containerTrigger,
        x: isMobile ? 30 : 100,
      },
      ".header-section-title2": {
        ...containerTrigger,
        x: isMobile ? -30 : -100,
      },
      ".header-section-opacity": {
        ...containerTrigger,
        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
      },
      ".header-section-buttons": {
        ...containerTrigger,
        scale: 0.7,
      },
    },
  });

  return (
    <section className="relative overflow-hidden pb-[5rem] xl:pb-[10rem]">
      <BackgroundTextAnimated />
      <div className="w-full absolute z-15 -bottom-[2px] h-[5rem] xl:h-[10rem] pointer-events-none bg-gradient-to-t from-white-bone via-white-bone/70 dark:from-black dark:via-black/70 to-transparent" />
      <SpaceX className="relative head-section-container z-20 flex flex-col justify-center gap-[3rem] xl:gap-[4rem] min-h-svh transform-gpu">
        <div className="flex flex-col gap-[2rem] max-w-[90rem] mx-auto">
          <div className="w-full flex flex-col -space-y-[2rem] lg:-space-y-[3rem]">
            <div className="flex justify-center xl:justify-between items-center">
              <ReflectedTitle
                text={t("title.first")}
                textClassName="header-section-title1 text-6xl md:text-8xl xl:text-9xl 2xl:text-10xl text-black dark:text-soft-white font-bold font-fira-code"
                renderMain={(children) => (
                  <ResponsiveTitleWrapper direction="left" order={0}>
                    {children}
                  </ResponsiveTitleWrapper>
                )}
                renderReflection={(children) => (
                  <MotionEntrySlide
                    order={2}
                    direction="up"
                    className="header-section-opacity"
                  >
                    {children}
                  </MotionEntrySlide>
                )}
              />
              <MotionEntryFade
                order={1.5}
                className="hidden xl:flex header-section-opacity"
              >
                <ButtonWithArrow
                  text={projectsButtonText}
                  routerPath={routes.projects}
                />
              </MotionEntryFade>
            </div>
            <div className="flex flex-col-reverse text-center xl:text-start items-center xl:flex xl:flex-row xl:justify-between xl:items-center gap-[1rem]">
              <MotionEntryFade
                order={1.5}
                className="max-w-[70%] xl:max-w-[25%]"
              >
                <p className="header-section-opacity xl:mt-[1rem] text-dark-gray dark:text-soft-gray text-base 2xl:text-xl">
                  <RichText t={t} translationKey={"personalDescription"} />
                </p>
              </MotionEntryFade>
              <ReflectedTitle
                text={t("title.second")}
                textClassName="header-section-title2 text-6xl md:text-8xl xl:text-9xl 2xl:text-10xl text-black dark:text-soft-white font-bold font-fira-code"
                renderMain={(children) => (
                  <ResponsiveTitleWrapper direction="right" order={0.5}>
                    {children}
                  </ResponsiveTitleWrapper>
                )}
                renderReflection={(children) => (
                  <MotionEntrySlide
                    order={2}
                    direction="up"
                    className="header-section-opacity"
                  >
                    {children}
                  </MotionEntrySlide>
                )}
              />
            </div>
          </div>
          <MotionEntryFade
            order={1.5}
            className="flex xl:hidden justify-center header-section-opacity"
          >
            <ButtonWithArrow
              text={projectsButtonText}
              routerPath={routes.projects}
            />
          </MotionEntryFade>
        </div>
        <div className="header-section-buttons">
          <SocialButtonsSection order={2} />
        </div>
      </SpaceX>
    </section>
  );
};

export default HeadSectionV2;
