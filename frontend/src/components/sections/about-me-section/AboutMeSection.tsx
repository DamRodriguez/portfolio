"use client";
import SpaceX from "@/components/layout/SpaceX";
import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import { useTranslations } from "next-intl";
import TechnologiesSection from "./technologies/TechnologiesSection";
import { removeHash } from "@/utils/removeHash";
import { routes } from "@/constants/routes";
import Image from "next/image";
import personalImage from "@/assets/images/damian.jpg"
import CertificationSection from "./certification/CertificationSection";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import FadeShadow from "@/components/other/FadeShadow";
import { useTheme } from "next-themes";

const AboutMeSection = () => {
  const t = useTranslations("aboutMeSection");
  const { theme } = useTheme();

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
  })

  return (
    <SpaceX
      id={removeHash(routes.aboutMe)}
      className="flex flex-col gap-[3rem] xl:gap-[6rem] w-full"
    >
      <div className="flex md:flex-row md:justify-between xl:w-[80%] flex-col gap-[2rem]">
        <MotionSlide>
          <h2 className="section-name-gsap text-black dark:text-soft-white text-2xl xl:text-3xl font-fira-code">
            {t("header.sectionName")}
          </h2>
        </MotionSlide>
        <MotionFade>
          <p className="description-gsap text-dark-gray/85 dark:text-soft-gray theme-transition text-base lg:text-xl whitespace-pre-line">
            {t.rich("header.description", {
              strong: (chunks) => <span className="text-strong-black dark:text-soft-white theme-transition font-medium">{chunks}</span>,
            })}
          </p>
        </MotionFade>
      </div>

      <div className="flex flex-col-reverse xl:flex-row items-center xl:justify-between gap-[2rem]">
        <TechnologiesSection />

        <div className="personal-image-gsap">
          <MotionSlide viewAmount={0.2} direction="down" className=" relative overflow-hidden shadow-s1 dark:shadow-none rounded-full dark:rounded-none border border-soft-white/50 dark:border-none">
            <Image
              src={personalImage}
              priority={true}
              alt="Personal image"
              className="object-cover w-fit h-120 md:h-150 xl:h-full hover:scale-110 theme-transition-all"
            />
            {theme === "dark" && (
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