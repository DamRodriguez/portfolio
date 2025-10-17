"use client";
import Link from "next/link";
import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import { routeItems } from "@/constants/routeItems";
import SocialButtons from "@/components/other/SocialButtons";

type NavMobileProps = {
  onClose: () => void;
};

const NavMobile = ({ onClose }: NavMobileProps) => {
  return (
    <MotionFade className="h-full">
      <div className="pt-[1.5rem] px-[5rem] lg:px-[15rem] pb-[4rem] justify-between flex flex-col h-full">
        <nav>
          <ul className="flex flex-col items-center text-center text-base gap-[1rem] leading-[1.5rem] font-semibold">
            {routeItems.map(({ href, label }) => (
              <li key={href} className="w-full group">
                <Link
                  href={href}
                  onClick={onClose}
                  className="cursor-pointer text-soft-white">
                  {label}
                </Link>
                <div className="h-[0.0625rem] bg-soft-gray my-[0.5rem] group-hover:bg-soft-white transition-all duration-400 ease-in-out group-hover:w-[50%] mx-auto w-full shadow-s4" />
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
