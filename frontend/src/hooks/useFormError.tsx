import { useEffect, useState } from "react";
import type { FormState } from "react-hook-form";

type UseFormErrorReturn = {
  apiErrorMessage: string | undefined;
  setApiErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const useFormError = <T extends Record<string, unknown>>(
  formState: FormState<T>,
): UseFormErrorReturn => {
  const [apiErrorMessage, setApiErrorMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (formState.isSubmitting) {
      setApiErrorMessage(undefined);
    }
  }, [formState.isSubmitting]);

  return { apiErrorMessage, setApiErrorMessage };
};

export default useFormError;
