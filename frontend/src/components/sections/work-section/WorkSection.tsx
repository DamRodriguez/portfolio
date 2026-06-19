"use client";
import SpaceX from "@/components/layout/SpaceX";
import MotionSlide from "@/components/motion/MotionSlide";
import MotionStagger from "@/components/motion/MotionStagger";
import config from "@/config/config";
import { routes } from "@/constants/routes";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { removeHash } from "@/utils/removeHash";
import { useTranslations } from "next-intl";
import WorkItem, { WorkItemData } from "./WorkItem";

const WorkSection = () => {
  const t = useTranslations("workSection");
  const workItems: WorkItemData[] = [
    {
      initialDate: "2026-02-02",
      finalDate: "present",
      employer: t("data.freelance.employer"),
      position: t("data.freelance.position"),
    },
    {
      initialDate: "2024-12-02",
      finalDate: "2025-10-02",
      employer: t("data.webSpace.employer"),
      position: t("data.webSpace.position"),
      employerLink: config.work.webSpace,
    },
  ];

  useScrollAnimations({
    animations: {
      ".title-gsap": {
        x: 100,
        y: -100,
      },
    },
  });

  return (
    <div
      id={removeHash(routes.work)}
      className="w-full flex flex-col gap-[1.5rem] xl:gap-[2rem] scroll-mt-[8.5rem] xl:scroll-mt-[14rem]"
    >
      <MotionSlide direction="right">
        <SpaceX>
          <h2 className="title-gsap text-black dark:text-soft-white text-end font-fira-code font-semibold text-5md xl:text-8xl">
            {t("title")}
          </h2>
        </SpaceX>
      </MotionSlide>
      <MotionStagger direction="left">
        {workItems.map((item, index) => {
          const isLast = index === workItems.length - 1;
          const isPair = index % 2 === 0;
          return (
            <div key={index}>
              <WorkItem data={{ ...item }} isPair={isPair} isLast={isLast} />
            </div>
          );
        })}
      </MotionStagger>
    </div>
  );
};

export default WorkSection;
