import { cva } from "class-variance-authority";

export const buttonClass = cva("text-sm xl:text-xl leading-[1.5rem] font-semibold rounded-[0.375rem] flex items-center justify-center flex gap-[0.7rem] min-h-[2.5rem]", {
  variants: {
    intent: {
      primary: "bg-black text-soft-gray rounded-full border border-soft-gray/60 italic hover:border-soft-white hover:[&_svg]:fill-black [&_svg]:fill-soft-white hover:text-dark-gray hover:bg-soft-white transition-all duration-400 xl:py-[0.5rem] px-[1.5rem]",
      secondary: "bg-soft-white text-xl flex items-center rounded-full italic font-medium hover:bg-transparent hover:text-soft-white border hover:border-soft-gray hover:[&_svg]:fill-black [&_svg]:fill-[#000] transition-all duration-400 py-[0.62rem] px-[1.62rem]",
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
      false: "transition-all duration-400 hover:scale-110 cursor-pointer",
      true: "cursor-default"
    }
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
      class: "h-0 xl:h-[3rem] !text-sm !px-[1rem]",
    },
    {
      intent: "secondary",
      small: true,
      class: "h-0 xl:h-[3rem] !text-sm !px-[1rem]",
    },
  ],
  defaultVariants: {
    intent: "primary",
    disabled: false,
  },
})

export type ButtonVariants = "primary" | "secondary" | "empty";
