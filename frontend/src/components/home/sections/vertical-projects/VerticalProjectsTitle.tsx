"use client";
import SpaceX from "@/components/layout/SpaceX";
import config from "@/config/config";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import useBreakpoint from "@/hooks/viewport/useBreakpoint";
import clsx from "clsx";
import { useTranslations } from "next-intl";

export default function VerticalProjectsTitle() {
  const t = useTranslations("verticalProjectsSection");
  const words = t("description").split(" ");
  const title = t("title");
  const isTablet = useBreakpoint(config.breakpoints.lg);

  useScrollAnimations({
    direction: "bottom",
    animations: {
      ".projects-vertical-title-x": {
        from: { x: "0%", scale: 1, opacity: 1 },
        to: { x: "-40%", scale: 0.4, opacity: 0.8 },
        scrollTrigger: {
          trigger: ".projects-vertical-title-pin-wrapper",
          start: "top 30%",
          end: "top 20%",
          scrub: 2,
        },
      },
      ".projects-vertical-word": {
        from: { opacity: 0, y: 10 },
        to: { opacity: 1, y: 0, stagger: 0.1 },
        scrollTrigger: {
          trigger: ".projects-vertical-container",
          start: "top top",
          end: "+=400",
          scrub: 2,
        },
      },
      ".projects-vertical-fill": {
        from: { clipPath: "inset(0% 100% 0% 0%)" },
        to: { clipPath: "inset(0% 0% 0% 0%)" },
        scrollTrigger: {
          trigger: ".projects-vertical-title-pin-wrapper",
          scrub: 2,
        },
      },
    },
  });

  return (
    <SpaceX>
      <div className="projects-vertical-title-pin-wrapper relative w-full flex flex-col">
        <h2
          className={clsx(
            "relative flex items-center justify-center font-fira-code font-semibold text-6xl xl:text-8md w-full",
            {
              "projects-vertical-title-x": !isTablet,
            },
          )}
        >
          <span className="projects-vertical-text relative z-10 inline-block">
            <span className="text-dark-gray/20 dark:text-soft-gray/20">
              {title}
            </span>
            <span
              className="projects-vertical-fill absolute left-0 top-0 whitespace-nowrap text-black dark:text-soft-white"
              aria-hidden="true"
            >
              {title}
            </span>
          </span>
        </h2>

        <p className="hidden lg:flex flex-wrap -mt-[1rem] gap-x-[0.4em] text-dark-gray dark:text-soft-gray text-base xl:text-lg font-fira-code w-fit max-w-1/5 justify-center">
          {words.map((word, index) => (
            <span key={index} className="projects-vertical-word inline-block">
              {word}
            </span>
          ))}
        </p>
      </div>
    </SpaceX>
  );
}
