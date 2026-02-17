import clsx from "clsx";
import Link from "next/link";

type CustomButtonVariant =
  {
    type: "link",
    href: string
  }
  |
  {
    type: "button",
    onClick: () => void;
  }

type CustomButtonContainerProps = CustomButtonVariant & {
  children: React.ReactNode;
};

type IconComponent = React.ComponentType<{
  className?: string;
}>;

type CustomButtonProps = {
  text: string;
  icon: IconComponent;
  variant: CustomButtonVariant;
}

const CustomButtonContainer = (props: CustomButtonContainerProps) => {
  const containerClassName = "flex group cursor-pointer w-fit transition-all";

  return (
    <>
      {props.type === "link" && (
        <Link
          href={props.href}
          target="_blank"
          className={containerClassName}
        >
          {props.children}
        </Link>
      )}
      {props.type === "button" && (
        <button
          onClick={props.onClick}
          className={containerClassName}
        >
          {props.children}
        </button>
      )}
    </>
  )
}

const CustomButton = (props: CustomButtonProps) => {
  const Icon = props.icon;
  const isButton = props.variant.type === "button";

  return (
    <CustomButtonContainer {...props.variant}>
      <div
        className={clsx(
          "flex items-center text-soft-gray text-base xl:text-lg border border-soft-gray/80 h-[2.5rem] xl:h-[3rem] pl-[1rem] xl:pl-[1.5rem] pr-[2rem] group-hover:bg-soft-white group-hover:text-black transition-all duration-400 ease-in-out rounded-l-full border-r-0",
          {
            "group-hover:pr-[1rem] xl:group-hover:pr-[1.5rem] group-hover:rounded-r-full": props.variant.type !== "button",
          }
        )}
      >
        {props.text}
      </div>
      <div
        className={clsx(
          "bg-soft-white rounded-full w-[2.5rem] h-[2.5rem] xl:w-[3rem] xl:h-[3rem] flex justify-center items-center relative -left-[1.3rem] xl:-left-[1.5rem] transition-all duration-400 ease-in-out group-hover:border group-hover:border-soft-gray/80 group-hover:bg-black group-hover:[&_svg]:fill-soft-white",
          {
            "group-hover:left-2 -rotate-45 group-hover:rotate-180": props.variant.type !== "button",
          }
        )}
      >
        <Icon className={clsx("w-[1.5rem] h-[1.5rem] xl:w-[2rem] xl:h-[2rem]",
          {
            "left-[0.15rem] relative": isButton
          }
        )} />
      </div>
    </CustomButtonContainer>
  );
};

export default CustomButton;