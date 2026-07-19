"use client";
import clsx from "clsx";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

type ChatWidgetHeaderProps = {
  onClose: () => void;
  onToggle: () => void;
  isOpen: boolean;
};

export default function ChatWidgetHeader({
  onClose,
  onToggle,
  isOpen,
}: ChatWidgetHeaderProps) {
  const t = useTranslations("virtualAssistant");
  return (
    <div
      className={clsx(
        "shrink-0 overflow-hidden relative border theme-transition-all flex items-center flex-row w-full rounded-t-[1.5rem] 2xl:flex-col 2xl:w-width-widget-header 2xl:h-full 2xl:rounded-r-none 2xl:rounded-l-[2rem]",
        "hover:border-black",
        "hover:dark:border-soft-white",
        {
          "text-black dark:text-soft-white border-black/50 dark:border-soft-gray/50 bg-soft-white/60 dark:bg-strong-black/60 border-b-0 2xl:border-b 2xl:border-r-0 h-height-widget-header":
            !isOpen,
          "bg-black dark:bg-soft-white text-soft-white dark:text-black border-transparent h-[calc(var(--height-widget-header)+1rem)] ":
            isOpen,
        },
      )}
    >
      <button
        onClick={onClose}
        aria-label="Close button"
        className={clsx(
          "absolute right-0 theme-transition-all 2xl:w-full aspect-square flex items-center justify-center cursor-pointer px-[1.5rem] 2xl:h-[4rem] h-full 2xl:px-0",
          "hover:bg-soft-white hover:[&_svg]:stroke-black z-10",
          "dark:hover:bg-black dark:hover:[&_svg]:stroke-soft-white",
          {
            hidden: !isOpen,
          },
        )}
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={onToggle}
        aria-label="Toggle Open-Close Assistant Widget"
        className={clsx(
          "cursor-pointer h-full flex items-center justify-center theme-transition-all",
          "hover:bg-soft-white hover:text-black",
          "dark:hover:bg-black dark:hover:text-soft-white",
          {
            "w-full 2xl:w-auto 2xl:h-[calc(100%-4rem)] 2xl:mt-[4rem]": isOpen,
            "w-full": !isOpen,
          },
        )}
      >
        <p
          className={clsx(
            "2xl:text-xl font-medium font-fira-code flex-1 z-5 2xl:[writing-mode:vertical-rl] 2xl:rotate-180 2xl:py-4 theme-transition-all",
            {
              "text-sm": !isOpen,
              "text-base": isOpen,
            },
          )}
        >
          {t("headerTitle")}
        </p>
      </button>
    </div>
  );
}
