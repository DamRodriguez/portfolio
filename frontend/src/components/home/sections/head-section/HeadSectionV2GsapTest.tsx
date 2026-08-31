"use client";
import BackgroundTextAnimated from "@/components/gsap/BackgroundTextAnimated";
import SocialButtonsSection from "@/components/home/sections/head-section/SocialButtonsSection";
import SpaceX from "@/components/layout/SpaceX";
import MotionEntryFade from "@/components/motion/MotionEntryFade";
import MotionEntrySlide from "@/components/motion/MotionEntrySlide";
import { RichText } from "@/components/next-intl/RichText";
import { ReflectedTitle } from "@/components/text/ReflectedTitle";
import ButtonWithArrow from "@/components/ui/buttons/ButtonWithArrow";
import config from "@/config/config";
import { routes } from "@/constants/routes";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import { useCurrentTheme } from "@/hooks/theme/useCurrentTheme";
import useBreakpoint from "@/hooks/viewport/useBreakpoint";
import { useTranslations } from "next-intl";

const HeadSectionV2 = () => {
  const t = useTranslations("headSection");
  const projectsButtonText = t("projectsButton");
  const { isDark } = useCurrentTheme();
  const isMobile = useBreakpoint(config.breakpoints.md);
  const isTablet = useBreakpoint();
  const isDesktop = useBreakpoint(config.breakpoints["4xl"], "min");

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
          scale: isTablet ? 0.95 : 0.85,
          borderRadius: "5rem",
          rotationX: 30,
          transformPerspective: 1000,
          y: -40,
          borderWidth: "1px",
          borderColor: isDark
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(0, 0, 0, 0.2)",
          borderStyle: "solid",
        },
      },
      ".header-section-line": {
        scrollTrigger: {
          start: "top center-=150",
          end: "bottom center",
          scrub: 2,
        },
        from: {
          opacity: 0,
          scaleY: 0,
          transformOrigin: "bottom",
        },
        to: {
          opacity: 1,
          scaleY: 1,
        },
      },
      ".header-section-title1": {
        ...containerTrigger,
        x: isDesktop ? "-15%" : isMobile ? 0 : "15%",
        yPercent: isDesktop ? 50 : isMobile ? 120 : 0,
      },
      ".header-section-title2": {
        ...containerTrigger,
        x: isDesktop ? "15%" : isMobile ? 0 : "-15%",
        yPercent: isDesktop ? -30 : isMobile ? 140 : 0,
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
      ".header-section-title-reflection": {
        ...containerTrigger,
        from: {
          opacity: 1,
          y: 0,
        },
        to: {
          opacity: 0,
          y: -50,
        },
      },
      ".header-section-buttons": {
        ...containerTrigger,
        gap: isTablet ? 40 : 100,
        scale: 1.1,
      },
      ".header-section-title1-entry": {
        disableScrollTrigger: true,
        to: {
          keyframes: [
            {
              scale: 999,
              duration: 0,
              x: 100,
            },
            {
              color: "#fff",
              zIndex: 9999999,
              opacity: 1,
              scale: 0.8,
              x: 100,
              duration: 1.5,
              ease: "power3.out",
            },
            {
              zIndex: 9,
              scale: 1,
              opacity: 1,
              duration: 0.5,
              x: 0,
              ease: "power3.in",
            },
          ],
        },
      },
      ".header-section-title2-entry": {
        disableScrollTrigger: true,
        to: {
          keyframes: [
            {
              scale: 999,
              duration: 0,
              x: -100,
            },
            {
              zIndex: 999,
              delay: 0.5,
              opacity: 1,
              scale: 0.8,
              x: -100,
              duration: 1.5,
              ease: "power3.out",
            },
            {
              zIndex: 9,
              scale: 1,
              opacity: 1,
              duration: 0.5,
              x: 0,
              ease: "power3.in",
            },
          ],
        },
      },
      ".header-section-cinematic-bg": {
        disableScrollTrigger: true,
        to: {
          keyframes: [
            {
              zIndex: 999999,
              delay: 0,
              duration: 1.5,
              ease: "power3.out",
              opacity: 1,
            },
            {
              zindex: 0,
              backgroundColor: "transparent",
              opacity: 0,
              duration: 0.5,
              ease: "power3.in",
            },
          ],
        },
      },
    },
  });

  return (
    <section className="relative overflow-hidden pb-[5rem] xl:pb-[10rem]">
      <div className="header-section-cinematic-bg w-full h-full absolute top-0 left-0 bg-black" />
      <BackgroundTextAnimated />
      <div className="w-full absolute z-15 -bottom-[2px] h-[5rem] xl:h-[10rem] pointer-events-none bg-gradient-to-t from-white-bone via-white-bone/70 dark:from-black dark:via-black/70 to-transparent" />
      <SpaceX className="relative head-section-container z-20 flex flex-col justify-center gap-[3rem] xl:gap-[4rem] min-h-svh transform-gpu">
        <div className="hidden 4xl:flex header-section-line absolute top-1/2 left-0 w-full -translate-y-[65%] h-[15rem] bg-black dark:bg-soft-white pointer-events-none opacity-0" />
        <div className="flex flex-col gap-[2rem] max-w-[90rem] mx-auto">
          <div className="w-full flex flex-col -space-y-[2rem] lg:-space-y-[3rem]">
            <div className="flex justify-center xl:justify-between items-center">
              <ReflectedTitle
                text={t("title.first")}
                textClassName="header-section-title1 text-6xl md:text-8xl xl:text-9xl 2xl:text-10xl text-black dark:text-soft-white 4xl:text-soft-white font-bold font-fira-code"
                renderMain={(children) => (
                  <div className="opacity-0 header-section-title1-entry 4xl:mix-blend-difference">
                    {children}
                  </div>
                )}
                renderReflection={(children) => (
                  <MotionEntrySlide
                    order={2}
                    direction="up"
                    className="header-section-title-reflection 4xl:mix-blend-difference"
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
                <p className="header-section-opacity xl:ml-[1rem] xl:mt-[1rem] text-dark-gray dark:text-soft-gray text-base 2xl:text-xl">
                  <RichText t={t} translationKey={"personalDescription"} />
                </p>
              </MotionEntryFade>
              <ReflectedTitle
                text={t("title.second")}
                textClassName="header-section-title2 text-6xl md:text-8xl xl:text-9xl 2xl:text-10xl text-black dark:text-soft-white 4xl:text-soft-white font-bold font-fira-code"
                renderMain={(children) => (
                  <div className="opacity-0 header-section-title2-entry 4xl:mix-blend-difference">
                    {children}
                  </div>
                )}
                renderReflection={(children) => (
                  <MotionEntrySlide
                    order={2}
                    direction="up"
                    className="header-section-title-reflection 4xl:mix-blend-difference"
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
        <SocialButtonsSection order={2} />
      </SpaceX>
    </section>
  );
};

export default HeadSectionV2;

{
  /*
   <ResponsiveTitleWrapper direction="left" order={0}>
                    <div className="header-section-title1-entry">
                      {children}
                    </div>
                  </ResponsiveTitleWrapper>
  */
}
