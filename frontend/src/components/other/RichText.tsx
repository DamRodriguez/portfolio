import { useTranslations } from "next-intl";

type RichTextProps = {
  t: ReturnType<typeof useTranslations>;
  translationKey: Parameters<ReturnType<typeof useTranslations>["rich"]>[0];
};

export const RichText = ({ t, translationKey }: RichTextProps) => {
  return t.rich(translationKey, {
    strong: (chunks: React.ReactNode) => (
      <span className="text-black dark:text-soft-white font-medium dark:font-normal">
        {chunks}
      </span>
    ),
  });
};
