import { cva } from "class-variance-authority";

export const inputClass = cva("border rounded-[0.5rem] py-[0.25rem] px-[1rem] group-focus-within:border-soft-white outline-none transition-all text-base text-soft-gray bg-transparent hover:bg-soft-gray/5 placeholder:italic placeholder:text-sm", {
  variants: {
    intent: {
      default: "border-soft-gray/50",
    },
    size: {
      small: null,
      large: "w-full",
    },
    disabled: {
      false: null,
      true: "cursor-not-allowed",
    },
    hasValue: {
      false: null,
      true: "border-soft-white",
    },
    hasError: {
      false: null,
      true: "border-red-error",
    },
  },
  compoundVariants: [

  ],
  defaultVariants: {
    intent: "default",
    size: "large",
    disabled: false,
  },
});
