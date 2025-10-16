"use client";
import Image from "next/image";
import Link from "next/link";
import tauroLogoImage from "@/assets/images/logo/footerLogo.png";
import webSpaceLogoImage from "@/assets/images/logo/webSpaceLogo.png";
import SocialButtons from "@/components/common/layout/SocialButtons";
import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import config from "@/config/config";
import { routeItems } from "@/constants/routeItems";

const Footer = () => {
  return (
    <footer className="bg-secondary-500 flex flex-col justify-center items-center p-[0.62rem] gap-[1rem] xl:py-[2rem] xl:px-[8.75rem] xl:min-h-[25rem] xl:justify-between">
      <MotionSlide direction="up">
        <Image
          src={tauroLogoImage}
          alt="Alfombras Tauro"
          className="w-[8.75rem] xl:w-[15rem]"
        />
      </MotionSlide>
      <MotionFade>
        <ul className="flex text-neutral-100 flex-wrap justify-center text-cdm xl:text-be xl:leading-[1.625rem] leading-[1.375rem] space-y-[1rem] font-bold divide-x divide-neutral-100">
          {routeItems.map((item, index) => (
            <li key={index} className="px-[1rem]">
              <Link href={item.href} className="cursor-pointer hover:text-primary-300 transition-all duration-300">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </MotionFade>
      <MotionFade>
        <div className="py-[0.5rem]">
          <SocialButtons />
        </div>
      </MotionFade>
      <MotionSlide>
        <div className="flex items-center h-[2.25rem]">
          <p className="text-neutral-100 text-[0.75rem] leading-[1.5rem] xl:text-cdm xl:leading-[1.375rem]">
            Diseñado y desarrollado por
          </p>
          <Link
            href={config.urls.webspace}
            target="_blank"
            className="hover:scale-105 transition-all duration-300"
          >
            <Image
              src={webSpaceLogoImage}
              alt="Web Space"
              className="w-[4.625rem] xl:w-[5.94644rem]"
            />
          </Link>
        </div>
      </MotionSlide>
    </footer>
  );
};

export default Footer;
