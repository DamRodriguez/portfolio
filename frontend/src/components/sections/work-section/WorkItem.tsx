"use client";
import SpaceX from "@/components/layout/SpaceX";
import { calculateTotalTime } from "@/utils/calculateTotalTime";
import { useTranslations } from "next-intl";
import Link from "next/link";

export type WorkItemData = {
  initialDate: string;
  finalDate: string | "present";
  employer: string;
  position: string;
  employerLink?: string;
};

type WorkItemProps = {
  data: WorkItemData;
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

  return (
    <SpaceX className="grid grid-cols-[0.5fr_1fr] xl:grid-cols-[0.5fr_1fr_1fr] items-center group hover:bg-soft-white transition-all duration-400 ease-in-out py-[1rem] xl:py-[1.5rem] gap-[1rem] xl:gap-[2rem]">
      <div className="text-soft-gray group-hover:text-black transition-all duration-400 ease-in-out">
        <div className="text-sm xl:text-xl">
          <span>{initialYear}</span>
          <span>{" - "}</span>
          <span>{finalYear}</span>
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
            className="text-soft-white text-base xl:text-xl group-hover:text-black transition-all duration-400 ease-in-out cursor-pointer w-fit hover:scale-110"
          >
            {data.employer}
          </Link>
        ) : (
          <div className="text-soft-white text-base xl:text-xl group-hover:text-black transition-all duration-400 ease-in-out">
            {data.employer}
          </div>
        )}

        <div className="text-soft-white text-sm xl:text-xl font-fira-code group-hover:text-black transition-all duration-400 ease-in-out">
          {data.position}
        </div>
      </div>
    </SpaceX>
  );
};

export default WorkItem;
