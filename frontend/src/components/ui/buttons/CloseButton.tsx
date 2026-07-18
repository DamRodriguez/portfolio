import clsx from "clsx";
import { X } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";

type CloseButtonProps = ComponentPropsWithoutRef<"button"> & {
  small?: boolean;
};

export default function CloseButton({
  className,
  small = false,
  ...props
}: CloseButtonProps) {
  return (
    <button
      type="button"
      aria-label="Close button"
      className={clsx(
        "flex items-center justify-center border rounded-full shadow-s1 cursor-pointer theme-transition-all",
        "pointer-events-auto disabled:pointer-events-none disabled:opacity-50",

        "bg-soft-white border-black/15 hover:border-black/50 hover:bg-white-bone/50",

        "dark:bg-strong-black dark:border-soft-gray/30 dark:hover:border-soft-gray/70",
        {
          "w-[2.8rem] h-[2.8rem] xl:w-[3.5rem] xl:h-[3.5rem]": !small,
          "w-[2.5rem] h-[2.5rem] xl:w-[3rem] xl:h-[3rem]": small,
        },
        className,
      )}
      {...props}
    >
      <X
        className={clsx(
          "theme-transition-all",
          "w-[1.5rem] h-[1.5rem]",
          "xl:w-[1.7rem] xl:h-[1.7rem]",
          "stroke-black",
          "dark:stroke-soft-white",
        )}
      />
    </button>
  );
}
