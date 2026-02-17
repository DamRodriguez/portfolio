"use client";
import clsx from "clsx";
import { buttonClass, type ButtonVariants } from "@/components/ui/buttons/Button.style";
import React from "react";

type ItemHoverProps = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: ButtonVariants;
  outline?: boolean;
  full?: boolean;
  small?: boolean;
  cursorNormal?: boolean;
};

const ItemHover = ({
  cursorNormal = false,
  ...props
}: ItemHoverProps) => {

  const className = clsx(buttonClass({
    intent: props.variant,
    disabled: props.disabled,
    outline: props.outline,
    full: props.full,
    small: props.small,
    cursorNormal: cursorNormal,
  }), props.className);

  return (
    <div className={clsx("", className)}>
      {props.children}
    </div>
  );
};

export default ItemHover;
