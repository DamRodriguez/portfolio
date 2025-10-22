"use client";
import { ArrowIcon } from "@/components/icons/buttons";
import { GithubIcon } from "@/components/icons/social";
import config from "@/config/config";
import Link from "next/link";

const GithubButton = () => {
  return (
    <Link
      href={config.urls.github}
      target="_blank"
      className="flex group cursor-pointer"
    >
      <div className="[&_svg]:fill-soft-white border rounded-full border-soft-gray/80 w-[3rem] h-[3rem] xl:w-[3.5rem] xl:h-[3.5rem] flex justify-center items-center group-hover:bg-soft-white group-hover:border-soft-white group-hover:[&_svg]:fill-black transition-all duration-400 ease-in-out">
        <GithubIcon className="w-[1.2rem] h-[1.2rem]" />
      </div>
      <div className="bg-soft-white rounded-full w-[3rem] h-[3rem] xl:w-[3.5rem] xl:h-[3.5rem] flex justify-center items-center -rotate-45 relative -left-3 xl:-left-4 group-hover:left-2 transition-all duration-400 ease-in-out group-hover:rotate-180 group-hover:border group-hover:border-soft-gray/80 group-hover:bg-transparent group-hover:[&_svg]:fill-soft-white">
        <ArrowIcon className="w-[1.9rem] h-[1.9rem] xl:w-[2.2rem] xl:h-[2.2rem]" />
      </div>
    </Link>
  );
};

export default GithubButton;