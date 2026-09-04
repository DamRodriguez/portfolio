"use client";
import BackgroundTextAnimated from "@/components/gsap/BackgroundTextAnimated";
import SocialButtonsSection from "@/components/home/sections/head-section/SocialButtonsSection";
import SpaceX from "@/components/layout/SpaceX";
import MotionOpacity from "@/components/motion/MotionOpacity";
import { RichText } from "@/components/next-intl/RichText";
import { ReflectedTitle } from "@/components/text/ReflectedTitle";
import ButtonWithArrow from "@/components/ui/buttons/ButtonWithArrow";
import config from "@/config/config";
import { routes } from "@/constants/routes";
import { useCinematicIntro } from "@/hooks/gsap/head-section/useCinematicIntro";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import useBreakpoint from "@/hooks/viewport/useBreakpoint";
import clsx from "clsx";
import { useTranslations } from "next-intl";

const HeadSectionV2 = () => {
  const t = useTranslations("headSection");
  const projectsButtonText = t("projectsButton");
  const isMobile = useBreakpoint(config.breakpoints.md);
  const isTablet = useBreakpoint();
  const isDesktop = useBreakpoint(config.breakpoints["4xl"], "min");
  const { isCinematicActive } = useCinematicIntro();

  const containerTrigger = {
    scrollTrigger: {
      trigger: ".head-section-container",
      scrub: 2,
    },
  };

  useScrollAnimations({
    dependencies: [isMobile, isTablet, isDesktop],
    animations: {
      ".head-section-container": {
        from: {
          rotationX: 0,
          scale: 1,
          transformOrigin: "bottom center",
          transformPerspective: 1000,
          boxShadow: "none",
        },
        to: {
          rotationX: 30,
          scale: isTablet ? 0.95 : 0.85,
          transformPerspective: 1000,
          boxShadow: "var(--shadow-s6)",
          ease: "power3.out",
        },
      },
      ".header-section-line": {
        scrollTrigger: {
          start: "top center-=150",
          end: "bottom center",
          scrub: 2,
        },
        from: {
          scaleY: 0,
          transformOrigin: "bottom",
        },
        to: {
          scaleY: 1,
          ease: "power2.inOut",
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
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
      ".header-section-title-reflection": {
        ...containerTrigger,
        from: { opacity: 1, y: 0 },
        to: { opacity: 0, y: -50 },
      },
      ".header-section-buttons": {
        ...containerTrigger,
        gap: isTablet ? 40 : 100,
        scale: 1.1,
      },
    },
  });

  return (
    <section
      className={clsx("relative pb-[5rem] xl:pb-[10rem]", {
        "overflow-hidden": !isCinematicActive,
      })}
    >
      <BackgroundTextAnimated />

      <div className="w-full absolute z-15 -bottom-[2px] h-[5rem] xl:h-[10rem] pointer-events-none bg-gradient-to-t from-white-bone via-white-bone/70 dark:from-black dark:via-black/70 to-transparent" />

      <SpaceX
        className={clsx(
          "relative head-section-container z-20 flex flex-col justify-center gap-[3rem] xl:gap-[4rem] min-h-svh bg-white-bone dark:bg-black rounded-[5rem]",
          {
            "transform-gpu": !isCinematicActive,
          },
        )}
      >
        <div className="header-section-cinematic-bg w-dvw h-dvh fixed top-0 left-0 bg-black dark:bg-soft-white origin-bottom z-10 pointer-events-none" />

        <div className="hidden 4xl:flex header-section-line absolute top-1/2 left-0 w-full -translate-y-[65%] h-[15rem] bg-black dark:bg-soft-white pointer-events-none" />

        <div className="flex flex-col gap-[2rem] max-w-[90rem] mx-auto">
          <div className="w-full flex flex-col -space-y-[2rem] lg:-space-y-[3rem]">
            <div className="flex justify-center xl:justify-between items-center">
              <ReflectedTitle
                text={t("title.first")}
                textClassName="header-section-title1 text-6xl md:text-8xl xl:text-9xl 2xl:text-10xl text-soft-white font-bold font-fira-code"
                renderMain={(children) => (
                  <div className="relative opacity-0 header-section-title1-entry mix-blend-difference">
                    {children}
                  </div>
                )}
                renderReflection={(children) => (
                  <MotionOpacity
                    order={5}
                    className="header-section-title-reflection mix-blend-difference"
                  >
                    {children}
                  </MotionOpacity>
                )}
              />
              <MotionOpacity className="hidden xl:flex header-section-opacity">
                <ButtonWithArrow
                  text={projectsButtonText}
                  routerPath={routes.projects}
                />
              </MotionOpacity>
            </div>
            <div className="flex flex-col-reverse text-center xl:text-start items-center xl:flex xl:flex-row xl:justify-between xl:items-center gap-[1rem]">
              <MotionOpacity className="max-w-[70%] xl:max-w-[24%]">
                <p className="header-section-opacity xl:ml-[1rem] xl:mt-[1rem] text-dark-gray dark:text-soft-gray text-base 2xl:text-xl">
                  <RichText t={t} translationKey={"personalDescription"} />
                </p>
              </MotionOpacity>
              <ReflectedTitle
                text={t("title.second")}
                textClassName="header-section-title2 text-6xl md:text-8xl xl:text-9xl 2xl:text-10xl text-soft-white font-bold font-fira-code"
                renderMain={(children) => (
                  <div className="relative opacity-0 header-section-title2-entry mix-blend-difference">
                    {children}
                  </div>
                )}
                renderReflection={(children) => (
                  <MotionOpacity
                    order={5}
                    className="header-section-title-reflection mix-blend-difference"
                  >
                    {children}
                  </MotionOpacity>
                )}
              />
            </div>
          </div>
          <MotionOpacity className="flex xl:hidden justify-center header-section-opacity">
            <ButtonWithArrow
              text={projectsButtonText}
              routerPath={routes.projects}
            />
          </MotionOpacity>
        </div>
        <MotionOpacity>
          <SocialButtonsSection containerClassName="header-section-buttons" />
        </MotionOpacity>
      </SpaceX>
    </section>
  );
};

export default HeadSectionV2;
