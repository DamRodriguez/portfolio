"use client";
import {
  buttonClass,
  type ButtonVariants,
} from "@/components/ui/buttons/Button.style";
import { useWipeTransition } from "@/hooks/useWipeTransition";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

export type HrefType =
  | string
  | { pathname: string; query: { [k: string]: QueryValue } | undefined };

type QueryValue = string | number | boolean | undefined | null;

type LinkButtonProps = {
  onClick?: () => void;
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
  const t = useTranslations("navigationCurtain");
  const { navigateWithTransition, isPending } = useWipeTransition();

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
    isPending && "pointer-events-none opacity-80",
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    props.onClick?.();
    if (external || props.href.startsWith("#") || e.metaKey || e.ctrlKey) {
      return;
    }

    e.preventDefault();

    navigateWithTransition(
      href,
      <span className="text-base lg:text-xl font-bold text-black dark:text-soft-white tracking-widest font-fira-code uppercase animate-pulse">
        {t("loadingText")}
      </span>,
    );
  };

  return (
    <Link
      href={href as any}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
      onClick={handleClick}
    >
      {props.children}
    </Link>
  );
};

export default LinkButton;
