import type { HTMLInputTypeAttribute } from "react";
import type { RefCallBack } from "react-hook-form";
import Input from "@/components/ui/inputs/input/Input";

export type InputTextProps = {
  name?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  success?: boolean;
  maxLength?: number;
  id?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  disabled?: boolean;
  ref?: RefCallBack;
  autoComplete?: string;
  error?: boolean;
};

export const InputText = ({
  name,
  type,
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
}: InputTextProps) => {
  return (
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      name={name}
      ref={ref}
      value={value}
      maxLength={maxLength}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      autoComplete={autoComplete}
      error={error}
      className={className}
    />
  );
};
