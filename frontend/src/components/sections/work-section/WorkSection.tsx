"use client"
import SpaceX from "@/components/layout/SpaceX";
import { useTranslations } from "next-intl";
import WorkItem, { WorkItemData } from "./WorkItem";
import { removeHash } from "@/utils/removeHash";
import { routes } from "@/constants/routes";
import MotionSlide from "@/components/motion/MotionSlide";
import clsx from "clsx";

const WorkSection = () => {
  const t = useTranslations("workSection");
  const workItems: WorkItemData[] = [
    {
      initialDate: "2025-02-05",
      finalDate: "present",
      employer: t("workData.webSpace.employer"),
      position: t("workData.webSpace.position")
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

  return (
    <div
      id={removeHash(routes.work)}
      className="w-full flex flex-col gap-[1.5rem] xl:gap-[2rem]"
    >
      <MotionSlide direction="right">
        <SpaceX>
          <h3 className="text-soft-white text-end font-fira-code font-semibold text-5md xl:text-8xl">
            {t("title")}
          </h3>
        </SpaceX>
      </MotionSlide>
      <div className="">
        {workItems.map((item, index) => {
          const isLast = index === workItems.length - 1;

          return (
            <MotionSlide
              key={index}
              direction="down"
              className={clsx("border-t border-t-soft-gray/50",
                {
                  "border-b border-b-soft-gray/50": isLast
                }
              )}
            >
              <WorkItem
                data={{ ...item }}
              />
            </MotionSlide>
          )
        })}
      </div>
    </div>
  );
};

export default WorkSection;