"use client";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { DescriptionKey } from "../sections/projects-section/ProjectItem";

type RichTextProps = {
  t: ReturnType<typeof useTranslations>;
  translationKey: DescriptionKey;
};

export const RichText = ({
  t,
  translationKey,
}: RichTextProps) => {
  return (
    <>
      {t.rich(translationKey, {
        strong: (chunks: React.ReactNode) => (
          <span className={clsx("text-soft-white")}>{chunks}</span>
        ),
      })}
    </>
  );
};
