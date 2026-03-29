import { tv } from "tailwind-variants"

export const buttonClass = tv({
  base: "text-sm xl:text-xl leading-[1.5rem] font-semibold rounded-[0.375rem] flex items-center justify-center flex gap-[0.7rem] min-h-[2.5rem]",

  variants: {
    intent: {
      primary:
        "bg-soft-white/50 dark:bg-black text-dark-gray dark:text-medium-gray rounded-full border border-black/60 dark:border-soft-gray/60 italic dark:hover:border-soft-white dark:hover:[&_svg]:fill-black [&_svg]:fill-black hover:[&_svg]:fill-soft-white dark:[&_svg]:fill-soft-white dark:hover:text-dark-gray hover:bg-black hover:text-soft-white/90 dark:hover:bg-soft-white xl:py-[0.5rem] px-[1.5rem] theme-transition-all",
      secondary:
        "bg-black dark:bg-soft-white hover:dark:bg-black text-soft-white dark:text-dark-gray text-xl flex items-center rounded-full italic font-medium hover:bg-soft-white hover:text-dark-gray dark:hover:text-soft-white border border-black dark:border-transparent hover:border-black/60 dark:hover:border-soft-gray/60 hover:[&_svg]:fill-black [&_svg]:fill-soft-white theme-transition-all py-[0.62rem] px-[1.62rem]",
      empty: "",
    },

    disabled: {
      false: null,
      true: "cursor-not-allowed",
    },

    outline: {
      false: null,
      true: "bg-transparent border",
    },

    full: {
      false: null,
      true: "w-full",
    },

    small: {
      false: null,
      true: "",
    },

    cursorNormal: {
      false: "transition-all duration-400 hover:scale-105 cursor-pointer",
      true: "cursor-default",
    },
  },

  compoundVariants: [
    {
      intent: "primary",
      outline: true,
      class: "border-secondary-300 text-secondary-300 [&_svg]:stroke-secondary-300",
    },
    {
      intent: "primary",
      small: true,
      class: "min-h-0 !text-xs lg:!text-sm !px-[0.5rem] lg:!px-[1rem]",
    },
    {
      intent: "secondary",
      small: true,
      class: "!h-0 !lg:h-[3rem] !text-xs lg:!text-sm !px-[0.7rem] lg:!px-[1rem]",
    },
  ],

  defaultVariants: {
    intent: "primary",
    disabled: false,
  },
})

export type ButtonVariants = "primary" | "secondary" | "empty"