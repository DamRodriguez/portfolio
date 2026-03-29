import { ArrowIcon } from "@/components/icons/buttons";
import clsx from "clsx";
import Button from "@/components/ui/buttons/Button";

type ButtonWithArrowProps = {
  text: string;
  small?: boolean;
  routerPath?: string;
}

const ButtonWithArrow = (props: ButtonWithArrowProps) => {
  return (
    <Button
      routerPath={props.routerPath}
      variant="empty"
      cursorNormal
      className="flex cursor-pointer group h-fit gap-[0.2rem] xl:gap-[0.5rem]">
      <div className={clsx("backdrop-blur[0.1rem] py-[0.5rem] xl:py-[1rem] flex items-center rounded-full italic font-medium border shadow-s3 theme-transition",
        "bg-black dark:bg-soft-white group-hover:text-strong-black dark:group-hover:text-soft-white border-black dark:border-soft-white text-soft-white dark:text-black group-hover:border-black/80 dark:group-hover:border-soft-gray/80 group-hover:bg-soft-white/90 dark:group-hover:bg-black/50",
        {
          "h-[1.7rem] xl:h-[2.5rem] px-[2rem] text-xs xl:text-base": props.small,
          "h-[2.5rem] lg:h-[3rem] px-[3rem] xl:px-[4rem] 2xl:px-[5rem] 4xl:px-[7rem] text-base xl:text-xl": !props.small
        }
      )}>
        {props.text}
      </div>
      <div className={clsx("rounded-full bg-black dark:bg-soft-white flex items-center justify-center group-hover:rotate-180 theme-transition-all shadow-s3",
        {
          "w-[1.7rem] h-[1.7rem] xl:w-[2.5rem] xl:h-[2.5rem]": props.small,
          "w-[2.5rem] h-[2.5rem] lg:w-[3rem] lg:h-[3rem]": !props.small
        }
      )}>
        <ArrowIcon className={clsx("",
          {
            "w-[1.3rem] h-[1.3rem] xl:w-[1.5rem] xl:h-[1.5rem] fill-soft-white dark:fill-black": props.small,
            "w-[1.5rem] h-[1.5rem] lg:w-[2rem] lg:h-[2rem] fill-soft-white dark:fill-black": !props.small
          }
        )} />
      </div>
    </Button>
  );
};

export default ButtonWithArrow;