import MotionFade from '@/components/motion/MotionFade';
import React from 'react';
import SocialButtonsSection from '../head-section/SocialButtonsSection';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { routes } from '@/constants/routes';

const FooterSection = () => {
  const t = useTranslations("contactSection");
  const routeItems = [
    { text: t("routes.home"), href: routes.home },
    { text: t("routes.aboutMe"), href: routes.aboutMe },
    { text: t("routes.work"), href: routes.work },
    { text: t("routes.projects"), href: routes.projects },
  ]
  return (
    <div className="flex flex-col gap-6 xl:gap-10">
      <div className="flex flex-col items-center gap-10">
        <MotionFade className="flex flex-wrap gap-y-[0.8rem] gap-x-[2rem] xl:gap-x-[3rem] xl:gap-y-[1rem]">
          {routeItems.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              className="text-soft-gray text-base xl:text-lg hover:text-soft-white transition-all duration-400 ease-in-out cursor-pointer"
            >
              {route.text}
            </Link>
          ))}
        </MotionFade>
      </div>
      <SocialButtonsSection withoutMt />
    </div>
  );
};

export default FooterSection;