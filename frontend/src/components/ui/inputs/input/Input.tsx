"use client";
import clsx from "clsx";
import type { RefCallBack } from "react-hook-form";
import { inputClass } from "@/components/ui/inputs/input/Input.style";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "className" | "disabled"> & {
  ref?: RefCallBack;
  error?: boolean;
  size?: "small" | "large";
  value?: string;
  className?: string;
  disabled?: boolean;
};

const Input = ({ ref, error, size, value, className, disabled, ...props }: InputProps) => {
  return (
    <input
      value={value}
      {...props}
      className={clsx(inputClass({
        hasError: error,
        hasValue: value ? value.length > 0 : undefined,
        disabled: disabled,
        size: size,
      }), className)}
      ref={ref}
    />
  );
};

export default Input;
