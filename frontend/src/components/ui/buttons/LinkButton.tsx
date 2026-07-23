import {
  buttonClass,
  type ButtonVariants,
} from "@/components/ui/buttons/Button.style";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";
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
  small?: boolean;
  iconStroke?: boolean;
};

const LinkButton = ({
  cursorNormal = false,
  external = false,
  iconStroke = false,
  ...props
}: LinkButtonProps) => {
  const cleanQuery = props.query
    ? Object.fromEntries(
        Object.entries(props.query).filter(
          ([_, value]) => value !== undefined && value !== null && value !== "",
        ),
      )
    : undefined;

  const href = props.href.includes("#")
    ? props.href
    : {
        pathname: props.href,
        query:
          Object.keys(cleanQuery || {}).length > 0 ? cleanQuery : undefined,
      };

  const className = clsx(
    buttonClass({
      intent: props.variant,
      outline: props.outline,
      full: props.full,
      small: props.small,
      cursorNormal: cursorNormal,
      iconStroke: iconStroke,
    }),
    props.className,
  );

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={clsx("", className)}
    >
      {props.children}
    </Link>
  );
};

export default LinkButton;
