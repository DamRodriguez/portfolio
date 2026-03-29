import { tv } from "tailwind-variants"

export const inputClass = tv({
  base: "border rounded-[0.5rem] py-[0.25rem] px-[1rem] group-focus-within:border-black dark:group-focus-within:border-soft-white outline-none theme-transition-all text-base text-black dark:text-soft-gray bg-transparent hover:bg-soft-white/40 dark:hover:bg-soft-gray/5 placeholder:italic placeholder:text-sm shadow-s3",
  variants: {
    intent: {
      default: "border-dark-gray/50 dark:border-soft-gray/50",
    },
    size: {
      small: "",
      large: "w-full",
    },
    disabled: {
      true: "cursor-not-allowed",
    },
    hasValue: {
      true: "border-black dark:border-soft-white/80 bg-soft-white/40 dark:bg-soft-gray/5",
    },
    hasError: {
      true: "border-red-error/50 dark:border-red-error/50",
    },
  },
  defaultVariants: {
    intent: "default",
    size: "large",
  }
})