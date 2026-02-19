import type { ReactElement } from "react";
import { Controller, type FieldValues, type Path, useFormContext } from "react-hook-form";
import FormErrorMessage from "@/components/ui/form/FormErrorMessage";
import Label from "@/components/ui/inputs/Label";

export type FormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  error?: boolean;
  input?: (
    props: Record<string, unknown>
  ) => ReactElement;
  errorMessage?: string;
  isLastErrorMessageField?: boolean;
};

function FormField<T extends FieldValues>({
  name,
  label,
  error,
  input,
  errorMessage,
  isLastErrorMessageField,
}: FormFieldProps<T>): ReactElement {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="w-full flex flex-col gap-[0.5rem]">
          <div className="flex flex-col gap-[0.5rem] group">
            <div className="flex flex-col-reverse gap-[0.5rem]">
              <div className="w-full flex flex-col">
                {input &&
                  input({
                    ...field,
                    id: name,
                    error: error || fieldState.error !== undefined,
                  })}
              </div>
              {label && (
                <Label
                  htmlFor={name}
                  error={error || fieldState.error !== undefined}
                  hasValue={!!field.value}
                >
                  {label}
                </Label>
              )}
            </div>
          </div>
          {(isLastErrorMessageField && errorMessage) || fieldState.error?.message ? (
            <FormErrorMessage
              errorMessage={isLastErrorMessageField && errorMessage
                ? errorMessage
                : fieldState.error?.message}
            />
          ) : null}
        </div>
      )}
    />
  );
}

export default FormField;
