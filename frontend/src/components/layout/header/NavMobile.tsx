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
      <div className="pt-[1.5rem] px-[1rem] md:px-[5.5rem] pb-[4rem] justify-between flex flex-col h-full">
        <nav>
          <ul className="flex flex-col items-center text-center text-base leading-[1.5rem] font-semibold">
            {routeItems.map(({ href, label }) => (
              <li key={href} className="w-full">
                <Link
                  href={href}
                  onClick={onClose}
                  className="cursor-pointer text-soft-white">
                  {label}
                </Link>
                <div className="h-[0.0625rem] bg-soft-gray my-[0.5rem] " />
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
