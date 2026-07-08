"use client";
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
    <div className="pt-[2rem] px-[4rem] justify-between pb-[calc(env(safe-area-inset-bottom)+3rem)] gap-[2.5rem] flex flex-col h-full">
      <nav>
        <ul className="flex flex-col gap-[1.7rem] max-w-[15rem] items-stretch mx-auto">
          {navRoutes.map((item, index) => {
            const { href, label, icon } = item;
            const Icon = icon;

            return (
              <MotionSlide direction="down" key={index} order={index * 0.3}>
                <li className="flex flex-col w-full">
                  <Link
                    href={href}
                    onClick={onClose}
                    className="cursor-pointer w-full pb-2"
                  >
                    <div className="flex gap-2.5 items-center justify-center w-full">
                      {/* <div className="bg-white-bone/70 dark:bg-soft-gray/5 border border-dark-gray/10 dark:border-soft-gray/10 p-[0.5rem] rounded-full">
                        <Icon className="w-4 h-4 stroke-dark-gray/90 dark:stroke-soft-gray" />
                      </div> */}

                      <span className="text-black/90 dark:text-soft-white/90 font-medium text-base">
                        {t(label)}
                      </span>
                    </div>
                  </Link>
                  <div className="h-px rounded-full bg-gradient-to-r from-transparent via-dark-gray/50 to-transparent dark:via-soft-gray/50" />
                </li>
              </MotionSlide>
            );
          })}
        </ul>
      </nav>
      <MotionSlide direction="down" order={2.5}>
        <SocialButtons />
      </MotionSlide>
    </div>
  );
};

export default NavMobile;
