"use client";
import { RichText } from "@/components/other/RichText";
import CardIcon from "@/components/sections/services/service-card/CardIcon";
import clsx from "clsx";
import { CircleCheckBig } from "lucide-react";
import { Messages, useTranslations } from "next-intl";
import React from "react";

export type ProjectKey = keyof Messages["servicesSection"]["data"];
export type DescriptionKey = `data.${ProjectKey}.description`;

export type ServiceCardData = {
  translationKey: ProjectKey;
  icon: React.ReactNode;
};

type ServiceCardProps = {
  data: ServiceCardData;
  index: number;
  containerClassName?: string;
};

export default function ServiceCard({
  data,
  index,
  containerClassName,
}: ServiceCardProps) {
  const t = useTranslations("servicesSection");
  const isHostingCard = index === 2;

  const title = t(`data.${data.translationKey}.title`);
  const technologies = t(`data.${data.translationKey}.technologies`)
    .split(",")
    .map((s) => s.trim());
  const numeration = String(index + 1).padStart(2, "0");

  const backItems = t(`data.${data.translationKey}.backItems`)
    .split(",")
    .map((s) => s.trim());

  return (
    <div
      className={clsx(
        "group w-full h-full [perspective:1000px]",
        "2xl:hover:-translate-y-[2.5rem] theme-transition-all",
        containerClassName,
        {
          "2xl:-rotate-2": index === 0,
          "2xl:rotate-2": index === 2,
        },
      )}
    >
      <div className="relative w-full h-full theme-transition-all [transform-style:preserve-3d] 2xl:group-hover:[transform:rotateY(180deg)]">
        {/* --- LADO FRONTAL --- */}
        <article
          className={clsx(
            "w-full h-full [backface-visibility:hidden]",
            "border border-black/20 dark:border-soft-gray/20 p-[1.5rem] xl:p-[2rem] rounded-[3rem] bg-soft-white dark:bg-strong-black shadow-s2 dark:shadow-s1 flex flex-col justify-between  group-hover:dark:border-soft-gray group-hover:border-black/20 theme-transition-all",
          )}
        >
          <div>
            <div className="flex justify-between">
              <span className="font-fira-code text-base xl:text-xl text-dark-gray/70 dark:text-soft-gray/80">
                {numeration}
              </span>
              <CardIcon icon={data.icon} />
            </div>
            <p className="text-black dark:text-soft-white text-2xl xl:text-3xl font-fira-code tracking-wider font-medium mb-[1rem] mt-4">
              {title}
              {isHostingCard && (
                <span className="text-sm font-normal text-dark-gray dark:text-soft-gray">
                  {" "}
                  <span className="text-lg">/</span> {t("extra.free")}
                </span>
              )}
            </p>
            <p className="text-dark-gray dark:text-soft-gray text-base xl:text-lg whitespace-pre-line mb-[2rem] ">
              <RichText
                t={t}
                translationKey={`data.${data.translationKey}.description`}
              />
            </p>
          </div>

          <div className="pt-[1.5rem] xl:pt-[2rem] border-t border-black/15 dark:border-soft-gray/15 flex flex-wrap gap-[0.5rem] xl:gap-[0.8rem]">
            {technologies.map((item, i) => (
              <div
                key={i}
                className="border border-black/10 dark:border-soft-gray/10 rounded-full bg-white-bone/50 dark:bg-strong-black/50 py-[0.3rem] px-[0.8rem]"
              >
                <p className="text-xs xl:text-sm italic font-medium text-dark-gray/80 dark:text-soft-gray/90">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </article>

        {/* --- LADO TRASERO --- */}
        <article
          className={clsx(
            "hidden 2xl:flex absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]",
            "border border-black/20 dark:border-soft-gray/20 p-[1.5rem] xl:p-[2rem] rounded-[3rem] bg-soft-white dark:bg-strong-black shadow-s2 dark:shadow-s1 flex flex-col justify-between group-hover:dark:border-soft-gray group-hover:border-black/20 theme-transition-all",
          )}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-dark-gray/40 dark:bg-soft-gray"></div>
              <p className="font-fira-code text-3xl tracking-wider text-black dark:text-soft-white font-medium">
                {title}
                {isHostingCard && (
                  <span className="text-sm font-normal text-dark-gray dark:text-soft-gray">
                    {" "}
                    <span className="text-lg">/</span> {t("extra.free")}
                  </span>
                )}
              </p>
            </div>

            <ul className="space-y-4">
              {backItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CircleCheckBig className="stroke-black/80 dark:stroke-soft-white/90 w-[1.2rem] h-[1.2rem] " />
                  <p className="text-dark-gray dark:text-soft-gray text-base xl:text-lg">
                    {item}
                  </p>
                </li>
              ))}
            </ul>

            <div className="justify-end flex">
              <CardIcon icon={data.icon} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
