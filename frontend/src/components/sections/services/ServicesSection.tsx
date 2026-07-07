"use client";
import SpaceX from "@/components/layout/SpaceX";
import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import MotionStagger from "@/components/motion/MotionStagger";
import { RichText } from "@/components/other/RichText";
import ServiceCard, {
  ServiceCardData,
} from "@/components/sections/services/service-card/ServiceCard";
import ServicesContactSection from "@/components/sections/services/ServicesContactSection";
import SecondTitle from "@/components/text/SecondTitle";
import { routes } from "@/constants/routes";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { removeHash } from "@/utils/removeHash";
import clsx from "clsx";
import { Cloud, CodeXml, PencilLine } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ServicesSection() {
  const t = useTranslations("servicesSection");

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

  useScrollAnimations({
    animations: {
      ".services-title-gsap": {
        y: -50,
        x: -50,
        rotate: -5,
      },
      ".services-description-gsap": {
        scale: 0.85,
      },
      ".services-first-card-gsap": {
        x: -50,
        rotate: -5,
      },
      ".services-second-card-gsap": {
        scale: 0.9,
      },
      ".services-third-card-gsap": {
        x: 50,
        rotate: 5,
      },
      ".services-contact-gsap": {
        opacity: 0,
        scale: 0.9,
      },
    },
  });

  return (
    <SpaceX
      id={removeHash(routes.services)}
      className="flex flex-col gap-[3rem] xl:gap-[6rem] w-full"
    >
      <div className="text-center flex flex-col gap-[2rem] xl:gap-[3rem]">
        <MotionSlide>
          <SecondTitle text={t("title")} className="services-title-gsap" />
        </MotionSlide>
        <MotionFade>
          <p className="services-description-gsap max-w-[34rem] mx-auto text-dark-gray dark:text-soft-gray text-lg xl:text-xl">
            <RichText t={t} translationKey={"subtitle"} />
          </p>
        </MotionFade>
      </div>

      <div className="flex flex-col gap-[3rem] xl:gap-[6rem]">
        <MotionStagger className="grid 2xl:grid-cols-3 gap-[2.5rem] xl:gap-[4rem]">
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
        </MotionStagger>

        <div className="services-contact-gsap">
          <ServicesContactSection />
        </div>
      </div>
    </SpaceX>
  );
}
