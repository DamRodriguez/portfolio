"use client";
import SpaceX from "@/components/layout/SpaceX";
import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import { navRoutes } from "@/constants/navRoutes";
import { routes } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import SocialButtonsSection from "../head-section/SocialButtonsSection";

const FooterSection = () => {
  const t = useTranslations("footerSection.routes");
  const footerRoutes = [
    { href: routes.home, label: "home" },
    ...navRoutes,
  ] as const;

  const handleTopScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer>
      <SpaceX className="relative flex flex-col gap-[3rem] xl:gap-[4rem] pb-[5rem] xl:pb-[8rem] pt-[6rem] xl:pt-[10rem]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/10 dark:bg-soft-white/5 [clip-path:polygon(0_18%,100%_0,100%_3%,0_33%)] xl:[clip-path:polygon(0_30%,100%_0,100%_3%,0_33%)] blur-sm" />

          <div className="absolute inset-0 bg-soft-white dark:bg-strong-black [clip-path:polygon(0_20%,100%_0,100%_100%,0_100%)] xl:[clip-path:polygon(0_32%,100%_0,100%_100%,0_100%)]" />
        </div>

        <div className="relative flex flex-col items-center gap-10 z-10">
          <MotionFade className="flex flex-wrap gap-y-[0.8rem] gap-x-[2rem] xl:gap-x-[3rem] xl:gap-y-[1rem] justify-center max-w-[18rem] sm:max-w-full">
            {footerRoutes.map((route, index) => {
              const isHome = route.label === "home";

              return (
                <Link
                  key={index}
                  href={route.href}
                  onClick={(e) => {
                    if (!isHome) return;
                    e.preventDefault();
                    handleTopScroll();
                  }}
                  className="text-dark-gray dark:text-soft-gray text-base xl:text-lg hover:text-strong-black dark:hover:text-soft-white theme-transition cursor-pointer"
                >
                  {t(route.label)}
                </Link>
              );
            })}
          </MotionFade>
        </div>

        <SocialButtonsSection withoutMt gsapDisabled />

        <MotionSlide
          direction="down"
          className="absolute bottom-[2rem] 2xl:bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <p className="relative text-black dark:text-soft-white whitespace-nowrap font-fira-code font-extrabold text-[clamp(4.5rem,14vw,17rem)] opacity-6 leading-none">
            Developer
          </p>

          <div className="absolute inset-0 bg-gradient-to-b from-soft-white via-soft-white/30 dark:from-strong-black dark:via-strong-black/50 to-transparent" />
        </MotionSlide>
      </SpaceX>
    </footer>
  );
};

export default FooterSection;
