"use client";
import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import SocialButtons from "@/components/other/SocialButtons";
import { routeItems } from "@/constants/routeItems";
import { useTranslations } from "next-intl";
import Link from "next/link";

type NavMobileProps = {
  onClose: () => void;
};

const NavMobile = ({ onClose }: NavMobileProps) => {
  const t = useTranslations("header.navItems");
  return (
    <MotionFade className="h-full">
      <div className="pt-[1.5rem] px-[5rem] lg:px-[15rem] pb-[8rem] justify-between flex flex-col h-full">
        <nav>
          <ul className="flex flex-col items-center text-center text-base gap-[1rem] font-semibold">
            {routeItems.map(({ href, label }) => (
              <li key={href} className="w-full max-w-[12rem]">
                <Link
                  href={href}
                  onClick={onClose}
                  className="cursor-pointer text-black dark:text-soft-white"
                >
                  {t(label)}
                </Link>
                <div className="h-[0.05rem] bg-soft-gray dark:bg-soft-gray/30 my-[0.5rem] mx-auto w-full" />
              </li>
            ))}
          </ul>
        </nav>
        <MotionSlide direction="down">
          <SocialButtons />
        </MotionSlide>
      </div>
    </MotionFade>
  );
};

export default NavMobile;
