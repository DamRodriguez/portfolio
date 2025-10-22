import { ArrowIcon } from "@/components/icons/buttons";
import Link from "next/link";

type CustomButtonProps = {
  text: string;
  href: string;
}

const CustomButton = (props: CustomButtonProps) => {
  return (
    <Link
      href={props.href}
      target="_blank"
      className="flex group cursor-pointer w-fit transition-all"
    >
      <div className="flex items-center text-soft-gray text-base xl:text-lg border border-soft-gray/80 h-[2.5rem] xl:h-[3rem] pl-[1rem] xl:pl-[1.5rem] pr-[2rem] group-hover:bg-soft-white group-hover:pr-[1rem] xl:group-hover:pr-[1.5rem] group-hover:text-black transition-all duration-400 ease-in-out rounded-l-full border-r-0 group-hover:rounded-r-full ">
        {props.text}
      </div>
      <div className="bg-soft-white rounded-full w-[2.5rem] h-[2.5rem] xl:w-[3rem] xl:h-[3rem] flex justify-center items-center -rotate-45 relative -left-[1.3rem] xl:-left-[1.5rem] group-hover:left-2 transition-all duration-400 ease-in-out group-hover:rotate-180 group-hover:border group-hover:border-soft-gray/80 group-hover:bg-transparent group-hover:[&_svg]:fill-soft-white">
        <ArrowIcon className="w-[1.9rem] h-[1.9rem] xl:w-[2.2rem] xl:h-[2.2rem]" />
      </div>
    </Link>
  );
};

export default CustomButton;