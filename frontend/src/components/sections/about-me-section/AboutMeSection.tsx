"use client";
import personalImage from "@/assets/images/damian.jpg";
import SpaceX from "@/components/layout/SpaceX";
import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import FadeShadow from "@/components/other/FadeShadow";
import { RichText } from "@/components/other/RichText";
import SecondTitle from "@/components/text/SecondTitle";
import { routes } from "@/constants/routes";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { removeHash } from "@/utils/removeHash";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import CertificationSection from "./certification/CertificationSection";
import TechnologiesSection from "./technologies/TechnologiesSection";

const AboutMeSection = () => {
  const t = useTranslations("aboutMeSection");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useScrollAnimations({
    animations: {
      ".personal-image-gsap": {
        y: -50,
        x: 50,
        rotate: -5,
      },
      ".section-name-gsap": {
        x: -100,
        y: -100,
      },
      ".description-gsap": {
        x: 100,
        y: -100,
      },
      ".certificacion-title-gsap": {
        x: -100,
      },
    },
  });

  return (
    <SpaceX
      id={removeHash(routes.aboutMe)}
      className="flex flex-col gap-[3rem] xl:gap-[6rem] w-full"
    >
      <div className="flex md:items-end md:flex-row md:justify-between w-full flex-col gap-[2rem] md:gap-[5rem] 2xl:w-[85%]">
        <MotionSlide>
          <SecondTitle
            text={t("header.sectionName")}
            className="section-name-gsap"
          />
        </MotionSlide>
        <MotionFade>
          <p className="description-gsap whitespace-pre-line text-dark-gray dark:text-soft-gray text-lg xl:text-xl">
            <RichText t={t} translationKey={"header.description"} />
          </p>
        </MotionFade>
      </div>

      <div className="flex flex-col-reverse xl:flex-row items-center xl:justify-between gap-[2rem]">
        <TechnologiesSection />

        <div className="personal-image-gsap">
          <MotionSlide
            viewAmount={0.2}
            direction="down"
            className=" relative overflow-hidden shadow-s1 dark:shadow-none rounded-full dark:rounded-none border border-soft-white/50 dark:border-none"
          >
            <Image
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
          </MotionSlide>
        </div>
      </div>

      <CertificationSection />
    </SpaceX>
  );
};

export default AboutMeSection;
