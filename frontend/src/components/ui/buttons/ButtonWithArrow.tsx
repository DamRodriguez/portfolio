import { ArrowIcon } from "@/components/icons/buttons";
import clsx from "clsx";
import Button from "./Button";

type ButtonWithArrowProps = {
  text: string;
  small?: boolean;
}

const ButtonWithArrow = (props: ButtonWithArrowProps) => {
  return (
    <Button
      variant="empty"
      className="flex transition-all duration-400 cursor-pointer group h-fit gap-[0.3rem] xl:gap-[0.5rem]">
      <div className={clsx("bg-soft-white backdrop-blur-[0.1rem] py-[0.5rem] xl:py-[1rem] flex items-center rounded-full italic font-medium group-hover:bg-transparent group-hover:text-soft-white border-soft-white group-hover:border-soft-gray border transition-all duration-400",
        {
          "h-[1.7rem] xl:h-[2.5rem] px-[2rem] text-xs xl:text-base": props.small,
          "h-[2.5rem] lg:h-[3rem] px-[3rem] xl:px-[4rem] 2xl:px-[5rem] 4xl:px-[7rem] text-base xl:text-xl": !props.small
        }
      )}>
        {props.text}
      </div>
      <div className={clsx("rounded-full bg-soft-white flex items-center justify-center group-hover:rotate-180 transition-all duration-400",
        {
          "w-[1.7rem] h-[1.7rem] xl:w-[2.5rem] xl:h-[2.5rem]": props.small,
          "w-[2.5rem] h-[2.5rem] lg:w-[3rem] lg:h-[3rem]": !props.small
        }
      )}>
        <ArrowIcon className={clsx("",
          {
            "w-[1.3rem] h-[1.3rem] xl:w-[1.5rem] xl:h-[1.5rem]": props.small,
            "w-[1.5rem] h-[1.5rem] lg:w-[2rem] lg:h-[2rem]": !props.small
          }
        )} />
      </div>
    </Button>
  );
};

export default ButtonWithArrow;