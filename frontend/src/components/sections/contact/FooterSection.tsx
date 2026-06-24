import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import { routes } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import SocialButtonsSection from "../head-section/SocialButtonsSection";

const FooterSection = () => {
  const t = useTranslations("contactSection");
  const routeItems = [
    { text: t("routes.home"), href: routes.home },
    { text: t("routes.aboutMe"), href: routes.aboutMe },
    { text: t("routes.services"), href: routes.services },
    { text: t("routes.work"), href: routes.work },
    { text: t("routes.projects"), href: routes.projects },
  ];

  return (
    <div className="relative flex flex-col gap-8 xl:gap-10 pb-[5rem] xl:pb-[8rem]">
      <div className="flex flex-col items-center gap-10 z-10">
        <MotionFade className="flex flex-wrap gap-y-[0.8rem] gap-x-[2rem] xl:gap-x-[3rem] xl:gap-y-[1rem] justify-center max-w-[18rem] sm:max-w-full ">
          {routeItems.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              className="text-dark-gray dark:text-soft-gray text-base xl:text-lg hover:text-strong-black dark:hover:text-soft-white theme-transition cursor-pointer"
            >
              {route.text}
            </Link>
          ))}
        </MotionFade>
      </div>
      <SocialButtonsSection withoutMt gsapDisabled />

      <MotionSlide
        direction="down"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <p className="relative text-black dark:text-soft-white whitespace-nowrap font-fira-code font-extrabold text-[clamp(4.5rem,14vw,17rem)] opacity-6 leading-none">
          Developer
        </p>

        <div className="absolute inset-0 bg-gradient-to-b from-white-bone via-white-bone/30 dark:from-black dark:via-black/30 to-transparent" />
      </MotionSlide>
    </div>
  );
};

export default FooterSection;
