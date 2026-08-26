"use client";
import SpaceX from "@/components/layout/SpaceX";
import config from "@/config/config";
import { routes } from "@/constants/routes";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import { removeHash } from "@/utils/removeHash";
import clsx from "clsx";
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
    direction: "bottom",
    animations: {
      ".work-section-title": {
        from: {
          opacity: 0,
          x: 25,
        },
        to: {
          opacity: 1,
          x: 0,
        },
      },
      ".work-section-item-pair": {
        individual: true,
        from: {
          opacity: 0,
          x: -50,
        },
        to: {
          opacity: 1,
          x: 0,
        },
      },
      ".work-section-item-odd": {
        individual: true,
        from: {
          opacity: 0,
          x: 50,
        },
        to: {
          opacity: 1,
          x: 0,
        },
      },
    },
  });

  return (
    <div
      id={removeHash(routes.work)}
      className="relative w-full flex flex-col gap-[1.5rem] xl:gap-[2rem] anchor-offset"
    >
      <div className="absolute w-full h-[3rem] bg-gradient-to-t from-white-bone via-white-bone dark:from-black dark:via-black to-transparent z-20 -top-[2.5rem] " />
      <div className="absolute w-full h-full bg-white-bone dark:bg-black z-20" />
      <div className="z-22">
        <SpaceX>
          <h2 className="work-section-title text-black dark:text-soft-white text-end font-fira-code font-semibold text-5md xl:text-8xl">
            {t("title")}
          </h2>
        </SpaceX>
      </div>
      <div className="z-22">
        {workItems.map((item, index) => {
          const isLast = index === workItems.length - 1;
          const isPair = index % 2 === 0;
          return (
            <div
              key={index}
              className={clsx("", {
                "work-section-item-pair": isPair,
                "work-section-item-odd": !isPair,
              })}
            >
              <WorkItem data={{ ...item }} isPair={isPair} isLast={isLast} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkSection;
