"use client";
import ServiceCard, {
  ServiceCardData,
} from "@/components/home/sections/services/service-card/ServiceCard";
import ServicesContactSection from "@/components/home/sections/services/ServicesContactSection";
import SpaceX from "@/components/layout/SpaceX";
import { RichText } from "@/components/next-intl/RichText";
import config from "@/config/config";
import { routes } from "@/constants/routes";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import { useCurrentTheme } from "@/hooks/theme/useCurrentTheme";
import useBreakpoint from "@/hooks/viewport/useBreakpoint";
import { removeHash } from "@/utils/removeHash";
import clsx from "clsx";
import { Cloud, CodeXml, PencilLine } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ServicesSection() {
  const t = useTranslations("servicesSection");
  const isTablet = useBreakpoint(config.breakpoints["2xl"]);
  const { isDark } = useCurrentTheme();

  const items: ServiceCardData[] = [
    {
      translationKey: "design",
      icon: <PencilLine />,
    },
    {
      translationKey: "development",
      icon: <CodeXml />,
    },
    {
      translationKey: "hosting",
      icon: <Cloud />,
    },
  ];

  const cardsTrigger = {
    start: "bottom bottom+=100",
    end: "center bottom+=100",
    scrub: 2,
  };

  useScrollAnimations({
    direction: "bottom",
    animations: {
      ".services-title-gsap": {
        from: { opacity: 0, filter: "blur(3px)", y: isTablet ? 25 : 50 },
        to: {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
        },
      },
      ".services-description-gsap": {
        from: {
          y: isTablet ? 25 : 50,
          filter: "blur(3px)",
          color: isDark ? "#121212" : "#f9f6ee",
        },
        to: {
          y: 0,
          filter: "blur(0px)",
          color: isDark ? "#c2c2c2" : "#3d3d3d",
        },
      },
      ".services-first-card-gsap": {
        from: {
          x: isTablet ? 0 : 200,
          rotate: isTablet ? 0 : -5,
          y: isTablet ? 25 : 0,
          opacity: isTablet ? 0 : 1,
        },
        to: {
          x: 0,
          rotate: 0,
          y: 0,
          opacity: 1,
        },
        scrollTrigger: cardsTrigger,
      },
      ".services-second-card-gsap": {
        from: {
          y: isTablet ? 25 : 0,
          opacity: isTablet ? 0 : 1,
        },
        to: {
          y: 0,
          opacity: 1,
        },
        scrollTrigger: cardsTrigger,
      },
      ".services-third-card-gsap": {
        from: {
          x: isTablet ? 0 : -200,
          rotate: isTablet ? 0 : 5,
          y: isTablet ? 25 : 0,
          opacity: isTablet ? 0 : 1,
        },
        to: { x: 0, rotate: 0, y: 0, opacity: 1 },
        scrollTrigger: cardsTrigger,
      },
    },
  });

  return (
    <SpaceX
      id={removeHash(routes.services)}
      className="flex flex-col gap-[3rem] xl:gap-[5rem] w-full"
    >
      <div className="text-center flex flex-col gap-[1.5rem] xl:gap-[2rem]">
        <h2 className="services-title-gsap text-black dark:text-soft-white font-fira-code uppercase font-bold text-5md xl:text-7xl tracking-[0.1em] ">
          {t("title")}
        </h2>
        <p className="services-description-gsap max-w-[22rem] sm:max-w-[30rem] xl:max-w-[34rem] mx-auto text-lg xl:text-xl">
          <RichText t={t} translationKey={"subtitle"} />
        </p>
      </div>

      <div className="flex flex-col gap-[3rem] xl:gap-[6rem]">
        <div className="grid 2xl:grid-cols-3 gap-[2.5rem] xl:gap-[4rem]">
          {items.map((item, index) => {
            const isPair = index % 2 === 0;
            return (
              <div
                key={index}
                className={clsx("h-full", {
                  "services-first-card-gsap": index === 0,
                  "services-second-card-gsap": index === 1,
                  "services-third-card-gsap": index === 2,
                  "2xl:mt-[1rem]": isPair,
                })}
              >
                <ServiceCard key={index} data={item} index={index} />
              </div>
            );
          })}
        </div>

        <ServicesContactSection />
      </div>
    </SpaceX>
  );
}
