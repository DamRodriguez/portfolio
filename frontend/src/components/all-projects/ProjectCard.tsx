"use client";
import TiltCard from "@/components/motion/TiltCard";
import { RichText } from "@/components/next-intl/RichText";
import {
  CategoryTranslationKey,
  ProjectCategory,
  ProjectItemData,
} from "@/components/sections/projects-section/ProjectItem";
import clsx from "clsx";
import {
  LucideIcon,
  MonitorSmartphone,
  ScanEye,
  ShoppingBag,
  TabletSmartphone,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

type ProjectCardProps = {
  project: ProjectItemData;
  onClick: () => void;
  small?: boolean;
};

export default function ProjectCard({
  project,
  onClick,
  small,
}: ProjectCardProps) {
  const allProjectsT = useTranslations("allProjectsPage");
  const t = useTranslations("projectsSection");
  const title = t(`data.${project.translationKey}.title`);
  const technologiesString = t(`data.${project.translationKey}.technologies`);
  const categoryString = t(`data.${project.translationKey}.category`);

  const technologies = technologiesString.split(",").map((t) => t.trim());
  const categoryKeys: ProjectCategory[] = categoryString
    .split(",")
    .map((key) => key.trim() as ProjectCategory);

  const categoryIcons: Record<ProjectCategory, LucideIcon> = {
    webPlatform: MonitorSmartphone,
    mobileApp: TabletSmartphone,
    ecommerce: ShoppingBag,
  };

  return (
    <TiltCard className="h-full">
      <button
        onClick={onClick}
        className="rounded-[2rem] overflow-hidden border border-black/30 dark:border-soft-gray/30 h-full flex flex-col bg-soft-white dark:bg-strong-black theme-transition-all group hover:border-black dark:hover:border-soft-gray cursor-pointer text-left"
      >
        <div
          className={clsx("overflow-hidden relative", {
            "h-[10rem]": small,
            "h-[12rem] xl:h-[16rem]": !small,
          })}
        >
          <Image
            src={project.imageLogo}
            width={300}
            height={300}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 theme-transition-all"
            priority
          />

          <span className="absolute left-0 -bottom-[2px] bg-gradient-to-t from-soft-white via-soft-white/30 dark:from-strong-black dark:via-strong-black/30 to-transparent h-full w-full" />

          <div className="opacity-0 xl:group-hover:opacity-100 bg-soft-white/70 dark:bg-strong-black/70 w-full h-full absolute bottom-0 flex justify-center items-center theme-transition-all backdrop-blur-[0.2rem]">
            <div className="flex items-center gap-2">
              <ScanEye
                className={clsx("stroke-black dark:stroke-soft-white", {
                  "w-6 h-6": small,
                  "w-8 h-8": !small,
                })}
              />
              <p
                className={clsx("text-black dark:text-soft-white font-medium", {
                  "text-lg": small,
                  "text-xl": !small,
                })}
              >
                {allProjectsT("projectCard.seeMore")}
              </p>
            </div>
          </div>
        </div>

        <div
          className={clsx("p-6 flex flex-col flex-1", {
            "gap-[1.5rem]": small,
            "gap-[2rem]": !small,
          })}
        >
          <div
            className={clsx("flex flex-col", {
              "gap-[0.5rem]": small,
              "gap-[1rem]": !small,
            })}
          >
            <h3
              className={clsx(
                "font-semibold text-black dark:text-soft-white font-fira-code group-hover:tracking-wider theme-transition-all",
                {
                  "text-lg": small,
                  "text-xl xl:text-2xl": !small,
                },
              )}
            >
              {title}
            </h3>

            <p
              className={clsx(
                "text-dark-gray dark:text-soft-gray line-clamp-2",
                {
                  "text-sm": small,
                  "text-sm xl:text-base": !small,
                },
              )}
            >
              <RichText
                t={t}
                translationKey={`data.${project.translationKey}.description`}
              />
            </p>

            <div className="flex flex-wrap gap-2 mt-[0.5rem] max-h-[1.5rem] xl:max-h-[2rem] overflow-hidden">
              {technologies.slice(0, 5).map((tech, index) => (
                <span
                  key={index}
                  className={clsx(
                    "px-3 h-[1.5rem] xl:h-[2rem] border border-black/10 dark:border-soft-gray/15 bg-white-bone/50 dark:bg-soft-gray/5 font-medium rounded-full flex items-center justify-center",
                    {
                      "text-xs": small,
                      "text-xs xl:text-sm": !small,
                    },
                  )}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-wrap gap-2">
            {categoryKeys.map((key) => {
              const Icon = categoryIcons[key];

              return (
                <span
                  key={key}
                  className={clsx(
                    "px-3 py-1 border border-black/10 dark:border-soft-gray/15 italic rounded-full flex items-center gap-2 group-hover:dark:border-soft-gray/50 group-hover:border-black/50 theme-transition-all",
                    {
                      "text-xs": small,
                      "text-sm": !small,
                    },
                  )}
                >
                  <Icon className="stroke-black dark:stroke-soft-white w-4 h-4 " />
                  {t(`categories.${key}` as CategoryTranslationKey)}
                </span>
              );
            })}
          </div>
        </div>
      </button>
    </TiltCard>
  );
}
