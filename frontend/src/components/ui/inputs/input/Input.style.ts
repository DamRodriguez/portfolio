import { tv } from "tailwind-variants"

export const inputClass = tv({
  base: "border rounded-[0.5rem] py-[0.25rem] px-[1rem] group-focus-within:border-soft-white outline-none transition-all text-base text-soft-gray bg-transparent hover:bg-soft-gray/5 placeholder:italic placeholder:text-sm shadow-s3",
  variants: {
    intent: {
      default: "border-soft-gray/50",
    },
    size: {
      small: "",
      large: "w-full",
    },
    disabled: {
      true: "cursor-not-allowed",
    },
    hasValue: {
      true: "border-soft-white",
    },
    hasError: {
      true: "border-red-error/50",
    },
  },
  defaultVariants: {
    intent: "default",
    size: "large",
  }
})