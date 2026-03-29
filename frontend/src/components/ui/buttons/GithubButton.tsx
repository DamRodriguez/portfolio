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
      aria-label="Ver perfil de GitHub"
    >
      <div className="border rounded-full bg-soft-white dark:bg-strong-black border-black/30 dark:border-soft-gray/50 w-[3rem] h-[3rem] xl:w-[3.5rem] xl:h-[3.5rem] flex justify-center items-center group-hover:bg-black dark:group-hover:bg-soft-white group-hover:border-black dark:group-hover:border-soft-white group-hover:[&_svg]:fill-soft-white dark:group-hover:[&_svg]:fill-black theme-transition-all dark:shadow-s1 shadow-s3">
        <GithubIcon className="w-[1.2rem] h-[1.2rem] fill-black dark:fill-soft-white" />
      </div>
      <div className="bg-black dark:bg-soft-white rounded-full w-[3rem] h-[3rem] xl:w-[3.5rem] xl:h-[3.5rem] flex justify-center items-center -rotate-45 relative -left-3 xl:-left-4 group-hover:left-2 theme-transition-all group-hover:rotate-180 group-hover:border group-hover:border-black/30 dark:group-hover:border-soft-gray/50 group-hover:bg-soft-white dark:group-hover:bg-strong-black group-hover:[&_svg]:fill-black  dark:group-hover:[&_svg]:fill-soft-white dark:shadow-s1 shadow-s3">
        <ArrowIcon className="w-[1.9rem] h-[1.9rem] xl:w-[2.2rem] xl:h-[2.2rem] fill-soft-white dark:fill-black" />
      </div>
    </Link>
  );
};

export default GithubButton;