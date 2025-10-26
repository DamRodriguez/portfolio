"use client";
import clsx from "clsx";
import { useTranslations } from "next-intl";

type RichTextProps = {
  t: ReturnType<typeof useTranslations>;
  translationKey: Parameters<ReturnType<typeof useTranslations>>[0];
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
