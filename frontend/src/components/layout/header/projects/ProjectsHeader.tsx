"use client";
import Header from "@/components/layout/header/Header";
import HomeBackButton from "@/components/layout/header/projects/HomeBackButton";
import { Locale } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type ProjectsHeaderProps = {
  locale: Locale;
};

export default function ProjectsHeader({ locale }: ProjectsHeaderProps) {
  const t = useTranslations("allProjectsPage.header");

  return (
    <Header
      locale={locale}
      navComponent={
        <>
          <HomeBackButton />
          <h1 className="text-xl sm:text-5xl xl:text-5md font-fira-code font-bold tracking-widest text-black dark:text-soft-white">
            {t("title")}
          </h1>
        </>
      }
    />
  );
}
