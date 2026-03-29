"use client";
import SpaceX from "@/components/layout/SpaceX";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { calculateTotalTime } from "@/utils/calculateTotalTime";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef } from "react";

export type WorkItemData = {
  initialDate: string;
  finalDate: string | "present";
  employer: string;
  position: string;
  employerLink?: string;
};

type WorkItemProps = {
  data: WorkItemData;
  isPair?: boolean;
  isLast?: boolean;
};

const WorkItem = (props: WorkItemProps) => {
  const data = props.data;
  const t = useTranslations("workSection");
  const totalTime = calculateTotalTime(data.initialDate, data.finalDate, t);
  const getYear = (date: string) => {
    if (date === "present") return t("workItem.present");
    return new Date(date).getFullYear();
  };

  const initialYear = getYear(data.initialDate);
  const finalYear = getYear(data.finalDate);

  const itemRef = useRef<HTMLDivElement>(null);

  useScrollAnimations({
    animations: {
      ".work-item-gsap": {
        scale: 1.05,
        x: props.isPair ? 50 : -50,
      },
    },
    scope: itemRef
  })

  return (
    <div ref={itemRef}>
      <div className="work-item-gsap">
        <SpaceX className={clsx("grid grid-cols-[0.5fr_1fr] xl:grid-cols-[0.5fr_1fr_1fr] items-center group hover:bg-black dark:hover:bg-soft-white theme-transition py-[1rem] xl:py-[1.5rem] gap-[1rem] xl:gap-[2rem] border-t border-t-black/60 dark:border-t-soft-gray/60 bg-soft-white/40 dark:bg-strong-black/40", {
          "border-b border-b-black/60 dark:border-b-soft-gray/60": props.isLast
        })}>
          <div className="text-dark-gray dark:text-medium-gray group-hover:text-soft-white dark:group-hover:text-black theme-transition">
            <div className="text-sm xl:text-xl">
              {initialYear === finalYear ? (
                <span className="font-medium">{initialYear}</span>
              ) : (
                <>
                  <span className="font-medium">{initialYear}</span>
                  <span className="font-medium">{" - "}</span>
                  <span className="font-medium">{finalYear}</span>
                </>
              )}
            </div>
            <p className="text-xs xl:text-sm">
              {totalTime}
            </p>
          </div>

          <div className="grid gap-[0.5rem] xl:contents">
            {data.employerLink ? (
              <Link
                href={data.employerLink}
                target="_blank"
                className="text-black dark:text-soft-white text-base xl:text-xl group-hover:text-soft-white dark:group-hover:text-black theme-transition-all cursor-pointer w-fit hover:scale-105 font-medium"
              >
                {data.employer}
              </Link>
            ) : (
              <div className="text-black dark:text-soft-white text-base xl:text-xl group-hover:text-soft-white dark:group-hover:text-black theme-transition font-medium">
                {data.employer}
              </div>
            )}

            <div className="text-black dark:text-soft-white text-sm xl:text-xl font-fira-code group-hover:text-soft-white dark:group-hover:text-black theme-transition">
              {data.position}
            </div>
          </div>
        </SpaceX>
      </div>
    </div>
  );
};

export default WorkItem;
