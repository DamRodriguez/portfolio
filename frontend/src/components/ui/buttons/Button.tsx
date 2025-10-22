"use client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import Spinner from "@/components/spinner/Spinner";
import { buttonClass, type ButtonVariants } from "@/components/ui/buttons/Button.style";

type ButtonProps = {
  children: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  routerPath?: string;
  routerPathNewTab?: string;
  disabled?: boolean;
  spinnerColor?: string;
  className?: string;
  variant?: ButtonVariants;
  outline?: boolean;
  full?: boolean;
  form?: string;
  backButton?: boolean;
  small?: boolean;
  cursorNormal?: boolean;
};

const Button = ({
  cursorNormal = false,
  ...props
}: ButtonProps) => {
  const router = useRouter();

  const className = clsx(buttonClass({
    intent: props.variant,
    disabled: props.disabled,
    outline: props.outline,
    full: props.full,
    small: props.small,
    cursorNormal: cursorNormal,
  }), props.className);
  return (
    <button
      onClick={event => {
        if (props.routerPathNewTab) {
          window.open(props.routerPathNewTab, "_blank");
          return;
        }
        if (props.routerPath) {
          router.push(props.routerPath);
        }
        if (props.backButton) {
          router.back();
        }
        if (props.onClick) {
          void props.onClick(event);
        }
      }}
      type={props.type}
      disabled={props.disabled}
      className={clsx("", className)}
      form={props.form}
    >
      {
        props.isLoading ? (
          <div className="flex gap-x-[1rem] h-[1.3125rem]">
            <Spinner size={1.2} color={props.spinnerColor} />
          </div>
        ) : (
          props.children
        )
      }
    </button >
  );
};

export default Button;
