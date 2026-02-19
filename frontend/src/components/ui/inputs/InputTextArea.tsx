import "@/styles/scrollbarVerticalTextArea.css";
import clsx from "clsx";
import type { RefCallBack } from "react-hook-form";
import { inputClass } from "@/components/ui/inputs/input/Input.style";

export type InputTextAreaProps = {
  name?: string;
  placeholder?: string;
  className?: string;
  success?: boolean;
  maxLength?: number;
  id?: string;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  value?: string;
  disabled?: boolean;
  ref?: RefCallBack;
  autoComplete?: string;
  error?: boolean;
};

export const InputTextArea = ({
  name,
  placeholder,
  maxLength,
  id,
  ref,
  value,
  onFocus,
  onBlur,
  onChange,
  disabled,
  autoComplete,
  error,
  className,
}: InputTextAreaProps) => {
  const remainingChars = maxLength ? maxLength - (value?.length ?? 0) : undefined;

  return (
    <div className="flex flex-col gap-[0.25rem]">
      <textarea
        id={id}
        name={name}
        ref={ref}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        autoComplete={autoComplete}
        className={clsx(
          "resize-none scrollbarCustomTextArea",
          inputClass({
            hasError: error,
            hasValue: !!value,
            disabled: disabled,
          }),
          className,
        )}
      />
      {maxLength !== undefined && (
        <p className="text-b2 text-[#ABAFB1]">
          Caracteres restantes {remainingChars}.
        </p>
      )}
    </div>
  );
};
