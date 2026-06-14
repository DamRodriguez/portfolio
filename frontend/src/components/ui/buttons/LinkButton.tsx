import {
  buttonClass,
  type ButtonVariants,
} from "@/components/ui/buttons/Button.style";
import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

type QueryValue = string | number | boolean | undefined | null;

type LinkButtonProps = {
  children: ReactNode;
  href: string;
  query?: Record<string, QueryValue>;
  className?: string;
  variant?: ButtonVariants;
  outline?: boolean;
  full?: boolean;
  cursorNormal?: boolean;
  external?: boolean;
  customUppercase?: boolean;
  border?: boolean;
  small?: boolean;
};

const LinkButton = ({
  children,
  href,
  query,
  className,
  variant,
  outline,
  full,
  cursorNormal = false,
  external = false,
  customUppercase,
  border = false,
  small = false,
}: LinkButtonProps) => {
  const cleanQuery = query
    ? Object.fromEntries(
        Object.entries(query).filter(
          ([_, value]) => value !== undefined && value !== null && value !== "",
        ),
      )
    : undefined;

  const classes = clsx(
    buttonClass({
      intent: variant,
      outline,
      full,
      cursorNormal,
      small,
    }),
    className,
  );

  return (
    <Link
      href={{
        pathname: href,
        query:
          Object.keys(cleanQuery || {}).length > 0 ? cleanQuery : undefined,
      }}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={classes}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
