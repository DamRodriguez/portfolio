"use client";
import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import SocialButtons from "@/components/other/SocialButtons";
import { navRoutes } from "@/constants/navRoutes";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type NavMobileProps = {
  onClose: () => void;
};

const NavMobile = ({ onClose }: NavMobileProps) => {
  const t = useTranslations("header.navItems");

  return (
    <div className="pt-[2rem] px-[4rem] justify-between pb-[calc(env(safe-area-inset-bottom)+4rem)] gap-[2.5rem] flex flex-col h-full">
      <nav>
        <ul className="flex flex-col gap-[2rem] max-w-[12rem] items-stretch mx-auto">
          {navRoutes.map((item, index) => {
            const { href, label } = item;

            return (
              <MotionSlide direction="down" key={index} order={index * 0.3}>
                <li className="flex flex-col w-full">
                  <Link
                    href={href}
                    onClick={onClose}
                    className="cursor-pointer w-full pb-2"
                  >
                    <p className="text-black/90 dark:text-soft-white/90 font-medium text-base text-center">
                      {t(label)}
                    </p>
                  </Link>
                  <div className="h-px rounded-full bg-gradient-to-r from-transparent via-dark-gray/50 to-transparent dark:via-soft-gray/50" />
                </li>
              </MotionSlide>
            );
          })}
        </ul>
      </nav>
      <MotionFade order={2.5}>
        <SocialButtons />
      </MotionFade>
    </div>
  );
};

export default NavMobile;
