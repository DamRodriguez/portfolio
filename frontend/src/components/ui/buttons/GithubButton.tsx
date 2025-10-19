"use client";
import { ArrowIcon } from "@/components/icons/buttons";
import { GithubIcon } from "@/components/icons/social";

type GithubButtonProps = {
  onClick?: () => void;
}

const GithubButton = (props: GithubButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className="flex group cursor-pointer"
    >
      <div className="[&_svg]:fill-soft-white border rounded-full border-soft-gray w-[3.5rem] h-[3.5rem] flex justify-center items-center group-hover:bg-soft-white group-hover:border-soft-white group-hover:[&_svg]:fill-black transition-all duration-400 ease-in-out">
        <GithubIcon />
      </div>
      <div className="bg-soft-white rounded-full w-[3.5rem] h-[3.5rem] flex justify-center items-center -rotate-45 relative -left-4 group-hover:left-2 transition-all duration-400 ease-in-out group-hover:rotate-180 group-hover:border group-hover:border-soft-gray group-hover:bg-transparent group-hover:[&_svg]:fill-soft-white">
        <ArrowIcon className="w-[2.2rem] h-[2.2rem] " />
      </div>
    </button>
  );
};

export default GithubButton;