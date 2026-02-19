import clsx from "clsx";
import { motion } from "framer-motion";
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
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.2 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={clsx("text-red-error text-sm", className)}
      >
        {isTranslationKey(errorMessage) ? t(errorMessage) : errorMessage}
      </motion.span>
    )
  );
};

export default FormErrorMessage;
