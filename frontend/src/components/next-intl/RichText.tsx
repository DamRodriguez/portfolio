import clsx from "clsx";
import { useTranslations } from "next-intl";

type RichTextProps = {
  t: ReturnType<typeof useTranslations>;
  translationKey: Parameters<ReturnType<typeof useTranslations>["rich"]>[0];
  className?: string;
};

export const RichText = ({ t, translationKey, className }: RichTextProps) => {
  return t.rich(translationKey, {
    strong: (chunks: React.ReactNode) => (
      <span
        className={clsx("text-strong-black dark:text-soft-white", className)}
      >
        {chunks}
      </span>
    ),
  });
};
