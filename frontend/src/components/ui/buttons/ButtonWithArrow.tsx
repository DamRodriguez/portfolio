import { ArrowIcon } from "@/components/icons/buttons";
import clsx from "clsx";

type ButtonWithArrowProps = {
  text: string;
  small?: boolean;
}

const ButtonWithArrow = (props: ButtonWithArrowProps) => {
  return (
    <button className={clsx("flex items-center transition-all duration-400 cursor-pointer group h-fit",
      {
        "gap-[0.5rem]": props.small,
        "gap-[1rem]": !props.small
      }
    )}>
      <div className={clsx("bg-soft-white  py-[1rem] flex items-center rounded-full italic font-medium group-hover:bg-transparent group-hover:text-soft-white group-hover:border-soft-gray border transition-all duration-400",
        {
          "h-[3rem] px-[2rem] text-base": props.small,
          "h-[3.5rem] px-[7rem] text-xl": !props.small
        }
      )}>
        {props.text}
      </div>
      <div className={clsx("rounded-full bg-soft-white flex items-center justify-center group-hover:rotate-180 transition-all duration-400",
        {
          "w-[3rem] h-[3rem]": props.small,
          "w-[3.5rem] h-[3.5rem]": !props.small
        }
      )}>
        <ArrowIcon className={clsx("",
          {
            "w-[1.5rem] h-[1.5rem]": props.small
          }
        )} />
      </div>
    </button>
  );
};

export default ButtonWithArrow;