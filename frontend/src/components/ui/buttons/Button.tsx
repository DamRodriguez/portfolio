"use client";
import Spinner from "@/components/spinner/Spinner";
import {
  buttonClass,
  type ButtonVariants,
} from "@/components/ui/buttons/Button.style";
import clsx from "clsx";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  isLoading?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void | Promise<void>;
  disabled?: boolean;
  spinnerColor?: string;
  className?: string;
  variant?: ButtonVariants;
  outline?: boolean;
  full?: boolean;
  form?: string;
  small?: boolean;
  cursorNormal?: boolean;
};

const Button = ({ cursorNormal = false, ...props }: ButtonProps) => {
  const className = clsx(
    buttonClass({
      intent: props.variant,
      disabled: props.disabled,
      outline: props.outline,
      full: props.full,
      small: props.small,
      cursorNormal: cursorNormal,
    }),
    props.className,
  );
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled || props.isLoading}
      className={clsx("", className)}
      form={props.form}
    >
      {props.isLoading ? (
        <div className="flex gap-x-[1rem] h-[1.5rem]">
          <Spinner size={20} color={props.spinnerColor} />
        </div>
      ) : (
        props.children
      )}
    </button>
  );
};

export default Button;
