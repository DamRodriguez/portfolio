import clsx from "clsx";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type TranslationKey = Parameters<
  ReturnType<typeof useTranslations<"contactSection">>
>[0];

type FormErrorProps = {
  errorMessage?: TranslationKey;
  className?: string;
};

const FormErrorMessage = ({ errorMessage, className }: FormErrorProps) => {
  const t = useTranslations("contactSection");
  if (!errorMessage) return null;

  return (
    errorMessage && (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.2 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={clsx("text-red-error text-sm", className)}
      >
        {t(errorMessage)}
      </motion.span>
    )
  );
};

export default FormErrorMessage;
