import { MotionOpacity } from "@/components/motion/MotionOpacity";
import clsx from "clsx";
import { useTranslations } from "next-intl";

type ErrorMessageTranslationKey = Parameters<
  ReturnType<typeof useTranslations<"contactSection">>
>[0];

type FormErrorProps = {
  errorMessage?: string | ErrorMessageTranslationKey;
  className?: string;
};

const FormErrorMessage = ({ errorMessage, className }: FormErrorProps) => {
  const t = useTranslations("contactSection");
  if (!errorMessage) return null;

  const isTranslationKey = (key: string | ErrorMessageTranslationKey): key is ErrorMessageTranslationKey => {
    return typeof key === "string";
  };

  return (
    errorMessage && (
      <MotionOpacity
        className={clsx("text-red-error text-xs xl:text-sm", className)}
      >
        {isTranslationKey(errorMessage) ? t(errorMessage) : errorMessage}
      </MotionOpacity>
    )
  );
};

export default FormErrorMessage;
