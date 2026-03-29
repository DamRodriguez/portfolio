"use client"
import SpaceX from "@/components/layout/SpaceX";
import { useTranslations } from "next-intl";
import WorkItem, { WorkItemData } from "./WorkItem";
import { removeHash } from "@/utils/removeHash";
import { routes } from "@/constants/routes";
import MotionSlide from "@/components/motion/MotionSlide";
import config from "@/config/config";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

const WorkSection = () => {
  const t = useTranslations("workSection");
  const workItems: WorkItemData[] = [
    {
      initialDate: "2025-02-01",
      finalDate: "2025-10-02",
      employer: t("workData.webSpace.employer"),
      position: t("workData.webSpace.position"),
      employerLink: config.work.webSpace,
    },
    {
      initialDate: "2023-04-05",
      finalDate: "2024-01-05",
      employer: t("workData.telecentro.employer"),
      position: t("workData.telecentro.position")
    },
    {
      initialDate: "2021-04-05",
      finalDate: "2021-12-05",
      employer: t("workData.mercadoLibre.employer"),
      position: t("workData.mercadoLibre.position")
    }
  ]

  useScrollAnimations({
    animations: {
      ".title-gsap": {
        x: 100,
        y: -100,
      },
    },
  })

  return (
    <div
      id={removeHash(routes.work)}
      className="w-full flex flex-col gap-[1.5rem] xl:gap-[2rem] scroll-mt-[8.5rem] xl:scroll-mt-[14rem]"
    >
      <MotionSlide direction="right">
        <SpaceX>
          <h2 className="title-gsap text-black dark:text-soft-white theme-transition text-end font-fira-code font-semibold text-5md xl:text-8xl">
            {t("title")}
          </h2>
        </SpaceX>
      </MotionSlide>
      <div className="shadow-s3 dark:shadow-s1">
        {workItems.map((item, index) => {
          const isLast = index === workItems.length - 1;
          const isPair = index % 2 === 0;
          return (
            <MotionSlide
              key={index}
              order={0.4 * index}
            >
              <WorkItem data={{ ...item }} isPair={isPair} isLast={isLast} />
            </MotionSlide>
          )
        })}
      </div>
    </div>
  );
};

export default WorkSection;