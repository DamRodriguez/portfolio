"use client";
import personalImage from "@/assets/images/damian.jpg";
import CustomImage from "@/components/image/CustomImage";
import SpaceX from "@/components/layout/SpaceX";
import { RichText } from "@/components/next-intl/RichText";
import FadeShadow from "@/components/other/FadeShadow";
import SecondTitle from "@/components/text/SecondTitle";
import config from "@/config/config";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import useBreakpoint from "@/hooks/viewport/useBreakpoint";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import CertificationSection from "./certification/CertificationSection";
import TechnologiesSection from "./technologies/TechnologiesSection";

const AboutMeSection = () => {
  const t = useTranslations("aboutMeSection");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDesktop = useBreakpoint(config.breakpoints["4xl"], "min");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useScrollAnimations({
    scope: sectionRef,
    animations: {
      ".aboutme-section-image-y": {
        from: { y: 0 },
        to: { y: isDesktop ? 200 : 0 },
        scrollTrigger: {
          start: "top top+=200",
          end: "bottom center",
          scrub: 2,
        },
      },
      ".aboutme-section-image-opacity": {
        from: { opacity: 0 },
        to: { opacity: 1 },
        scrollTrigger: {
          start: "top bottom",
          end: "bottom center",
          scrub: 2,
        },
      },
      ".aboutme-section-title": {
        direction: "bottom",
        from: {
          opacity: 0,
          x: -25,
        },
        to: {
          opacity: 1,
          x: 0,
        },
      },
      ".aboutme-section-description": {
        direction: "bottom",
        from: {
          opacity: 0,
          scale: 0.95,
        },
        to: {
          opacity: 1,
          scale: 1,
        },
      },
    },
  });

  return (
    <SpaceX
      ref={sectionRef}
      className="flex flex-col gap-[3rem] xl:gap-[6rem] w-full relative"
    >
      <div className="flex md:items-end md:flex-row md:justify-between w-full flex-col gap-[2rem] md:gap-[5rem] 2xl:w-[85%]">
        <SecondTitle
          text={t("header.sectionName")}
          className="aboutme-section-title"
        />
        <p className="aboutme-section-description whitespace-pre-line text-dark-gray dark:text-soft-gray text-base xl:text-xl">
          <RichText t={t} translationKey={"header.description"} />
        </p>
      </div>

      <div className="flex flex-col-reverse xl:flex-row items-center xl:justify-between gap-[2rem]">
        <TechnologiesSection />

        <div className="relative aboutme-section-image-y aboutme-section-image-opacity overflow-hidden shadow-s1 dark:shadow-none rounded-full dark:rounded-none border border-soft-white/50 dark:border-none">
          <CustomImage
            src={personalImage}
            priority={true}
            alt="Personal image"
            className="object-cover w-fit h-120 md:h-150 xl:h-full hover:scale-110 theme-transition-all"
          />
          {mounted && theme === "dark" && (
            <>
              <FadeShadow direction="left" sizeClasses="w-20 xl:w-30" />
              <FadeShadow direction="right" sizeClasses="w-20 xl:w-20" />
              <FadeShadow direction="bottom" sizeClasses="h-30 xl:h-60" />
              <FadeShadow direction="top" sizeClasses="h-25 xl:h-45" />
            </>
          )}
        </div>
      </div>

      <CertificationSection />
    </SpaceX>
  );
};

export default AboutMeSection;
