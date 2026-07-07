"use client";
import { routes } from "@/constants/routes";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HomeBackButton() {
  const t = useTranslations("allProjectsPage.header");

  return (
    <Link
      href={routes.home}
      className="flex items-center gap-[1rem] group cursor-pointer"
    >
      <div
        aria-label="Back button"
        className={clsx(
          "rounded-full w-8 h-8 xl:w-10 xl:h-10 theme-transition-all flex items-center justify-center pr-[0.1rem] border",
          "bg-white-bone shadow-s2 group-hover:bg-black",
          "dark:shadow-s1 dark:bg-soft-gray/20 dark:border-soft-gray/5 dark:group-hover:bg-soft-white",
        )}
      >
        <ChevronLeft className="stroke-black dark:stroke-soft-white w-4 h-4 xl:w-6 xl:h-6 group-hover:stroke-soft-white dark:group-hover:stroke-black theme-transition-all" />
      </div>
      <p
        className={clsx(
          "xl:text-base hidden xl:flex theme-transition-all",
          "text-dark-gray group-hover:text-black",
          "dark:text-soft-gray dark:group-hover:text-soft-white",
        )}
      >
        {t("homeButton")}
      </p>
    </Link>
  );
}
