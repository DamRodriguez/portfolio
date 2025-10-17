import { cva } from "class-variance-authority";

export const buttonClass = cva("text-sm xl:text-xl leading-[1.5rem] font-semibold tracking-[-0.04375rem] rounded-[0.375rem] flex items-center cursor-pointer justify-center min-h-[2.75rem] flex gap-[0.7rem]", {
  variants: {
    intent: {
      primary: "bg-black text-soft-gray rounded-full border border-soft-gray italic hover:border-soft-white hover:[&_svg]:fill-black [&_svg]:fill-soft-white hover:text-dark-gray hover:bg-soft-white transition-all duration-400 hover:scale-110 py-[0.62rem] px-[1.62rem]",
      secondary: "bg-soft-white text-xl flex items-center rounded-full italic font-medium hover:bg-transparent hover:text-soft-white border hover:border-soft-gray hover:[&_svg]:fill-black [&_svg]:fill-[#000] transition-all duration-400 hover:scale-110 py-[0.62rem] px-[1.62rem]",
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
  },
  compoundVariants: [
    {
      intent: "primary",
      outline: true,
      class: "border-secondary-300 text-secondary-300 [&_svg]:stroke-secondary-300",
    },
  ],
  defaultVariants: {
    intent: "primary",
    disabled: false,
  },
})

export type ButtonVariants = "primary" | "secondary" | "empty";
