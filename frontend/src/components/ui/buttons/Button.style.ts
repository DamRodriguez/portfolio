import { tv } from "tailwind-variants";

export const buttonClass = tv({
  base: "text-sm xl:text-xl leading-[1.5rem] font-semibold rounded-[0.375rem] flex items-center justify-center gap-[0.7rem] min-h-[2.5rem]",

  variants: {
    intent: {
      primary: [
        "rounded-full border italic xl:py-[0.5rem] px-[1.5rem] theme-transition-all",

        "bg-soft-white text-dark-gray border-black/60 hover:bg-black hover:text-soft-white/90 hover:border-black/60",

        "dark:bg-black dark:text-medium-gray dark:border-soft-gray/60 dark:hover:bg-soft-white dark:hover:text-dark-gray dark:hover:border-soft-white",
      ],

      secondary: [
        "rounded-full border italic xl:py-[0.5rem] px-[1.5rem] theme-transition-all",

        "bg-black text-soft-white border-black hover:bg-soft-white hover:text-dark-gray hover:border-black/60",

        "dark:bg-soft-white dark:text-dark-gray dark:border-transparent dark:hover:bg-black dark:hover:text-soft-white dark:hover:border-soft-gray/60",
      ],
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

    iconStroke: {
      false: "",
      true: "",
    },
  },

  compoundVariants: [
    {
      intent: "primary",
      outline: true,
      class:
        "border-secondary-300 text-secondary-300 [&_svg]:stroke-secondary-300",
    },
    {
      intent: "primary",
      small: true,
      class: "min-h-0 !text-xs lg:!text-sm !px-[0.5rem] lg:!px-[1rem]",
    },
    {
      intent: "secondary",
      small: true,
      class:
        "!h-0 !lg:h-[3rem] !text-xs lg:!text-sm !px-[0.7rem] lg:!px-[1rem]",
    },
    {
      intent: "primary",
      iconStroke: true,
      class:
        "hover:[&_svg]:stroke-soft-white [&_svg]:stroke-black dark:hover:[&_svg]:stroke-black dark:[&_svg]:stroke-soft-white",
    },
    {
      intent: "primary",
      iconStroke: false,
      class:
        "hover:[&_svg]:fill-soft-white [&_svg]:fill-black dark:hover:[&_svg]:fill-black dark:[&_svg]:fill-soft-white",
    },
    {
      intent: "secondary",
      iconStroke: true,
      class:
        "[&_svg]:stroke-soft-white hover:[&_svg]:stroke-black dark:[&_svg]:stroke-black dark:hover:[&_svg]:stroke-soft-white",
    },
    {
      intent: "secondary",
      iconStroke: false,
      class:
        "[&_svg]:fill-soft-white hover:[&_svg]:fill-black dark:[&_svg]:fill-black dark:hover:[&_svg]:fill-soft-white",
    },
  ],

  defaultVariants: {
    intent: "primary",
    disabled: false,
  },
});

export type ButtonVariants = "primary" | "secondary" | "empty";
