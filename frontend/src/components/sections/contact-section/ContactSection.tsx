"use client";
import SpaceX from "@/components/layout/SpaceX";
import SocialButtonsSection from "../head-section/SocialButtonsSection";
import { useTranslations } from "next-intl";
import { routes } from "@/constants/routes";
import { removeHash } from "@/utils/removeHash";
import { Link } from "@/i18n/navigation";
import MotionSlide from "@/components/motion/MotionSlide";
import MotionFade from "@/components/motion/MotionFade";
import MotionStagger from "@/components/motion/MotionStagger";
import Button from "@/components/ui/buttons/Button";
import { DownloadIcon } from "@/components/icons/buttons";

const ContactSection = () => {
  const t = useTranslations("contactSection");
  const routeItems = [
    { text: t("routes.home"), href: routes.home },
    { text: t("routes.aboutMe"), href: routes.aboutMe },
    { text: t("routes.work"), href: routes.work },
    { text: t("routes.projects"), href: routes.projects },
  ]

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/portfolio/pdf/CV.pdf";
    link.download = "CV-Damian-Rodriguez.pdf";
    link.click();
  };

  return (
    <SpaceX
      id={removeHash(routes.contact)}
      className="w-full flex flex-col gap-[3rem] xl:gap-[5rem] pb-[3rem] xl:pb-[5rem] "
    >
      <div className="flex flex-col-reverse 4xl:flex-row gap-[3rem] xl:gap-[3rem] 4xl:gap-[8rem]">
        <div className="-space-y-4 xl:-space-y-10 4xl:-space-y-15">
          <MotionSlide>
            <h6 className="text-soft-white font-fira-code font-semibold text-5md xl:text-8xl 4xl:text-9xl">
              {t("name.firstName")}
            </h6>
          </MotionSlide>
          <div className="flex items-center gap-[1rem] xl:gap-[4rem]">
            <MotionSlide direction="down">
              <p className="text-soft-gray text-xs xl:text-xl whitespace-break-spaces">
                {t("position")}
              </p>
            </MotionSlide>
            <MotionSlide direction="right">
              <h6 className="text-soft-white font-fira-code font-semibold text-5md xl:text-8xl 4xl:text-9xl">
                {t("name.lastName")}
              </h6>
            </MotionSlide>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[2rem] xl:gap-[3rem] ">
          <MotionFade>
            <h3 className="text-soft-white text-xl xl:text-2xl font-fira-code">
              {t("title")}
            </h3>
          </MotionFade>
          <MotionStagger direction="up" className="flex flex-wrap gap-y-[0.8rem] gap-x-[2rem] xl:gap-x-[3rem] xl:gap-y-[1rem] ">
            {routeItems.map((route, index) => (
              <Link
                key={index}
                href={route.href}
                className="text-soft-gray text-base xl:text-lg hover:text-soft-white transition-all duration-400 ease-in-out cursor-pointer"
              >
                {route.text}
              </Link>
            ))}
          </MotionStagger>

          <MotionFade>
            <Button
              onClick={handleDownloadCV}
            >
              {t("buttons.downloadCV")}
              <DownloadIcon />
            </Button>
          </MotionFade>
        </div>
      </div>

      <SocialButtonsSection withoutMt />
    </SpaceX>
  );
};

export default ContactSection;