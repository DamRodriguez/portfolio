"use client";
import LinkButton from "@/components/ui/buttons/LinkButton";
import { routes } from "@/constants/routes";
import { useTranslations } from "next-intl";

export default function RedirectAllProjectsCard() {
  const t = useTranslations("virtualAssistant.redirectAllProjects");

  return (
    <LinkButton
      variant="secondary"
      href={routes.allProjects}
      className="h-fit shadow-s3 dark:shadow-s1"
    >
      {t("buttonText")}
    </LinkButton>
  );
}
