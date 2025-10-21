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

const AboutMeSection = () => {
  const t = useTranslations("aboutMeSection");

  return (
    <SpaceX
      id={removeHash(routes.aboutMe)}
      className="flex flex-col gap-[3rem] xl:gap-[6rem] w-full"
    >
      <div className="flex md:flex-row md:justify-between xl:w-[80%] flex-col gap-[2rem]">
        <MotionSlide>
          <h3 className="text-soft-white text-xl xl:text-2xl font-fira-code">
            {t("header.sectionName")}
          </h3>
        </MotionSlide>
        <MotionFade>
          <p className="text-soft-gray text-base lg:text-xl whitespace-pre-line bg-black">
            {t.rich("header.description", {
              strong: (chunks) => <span className="text-soft-white">{chunks}</span>,
            })}
          </p>
        </MotionFade>
      </div>

      <div className="flex flex-col-reverse xl:flex-row items-center xl:justify-between gap-[2rem] ">
        <TechnologiesSection />

        <MotionSlide viewAmount={0.2} direction="down" className="relative overflow-hidden">
          <Image
            src={personalImage}
            alt="Personal image"
            className="object-cover w-fit h-120 md:h-150 xl:h-full hover:scale-110 transition-all duration-400 ease-in-out"
          />
          <div className="absolute inset-y-0 left-0 w-20 xl:w-50 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 xl:w-30 bg-gradient-to-l from-black to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-30 xl:h-60 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-25 xl:h-45 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        </MotionSlide>
      </div>

      <div className="flex flex-col gap-[1.5rem] xl:gap-[2rem]">
        <MotionSlide>
          <h5 className="text-soft-white text-xl xl:text-2xl font-fira-code">
            {t("certificationSection.title")}
          </h5>
        </MotionSlide>
        <CertificationSection />
      </div>
    </SpaceX>
  );
};

export default AboutMeSection;