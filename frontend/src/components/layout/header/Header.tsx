"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import NavMobile from "@/components/layout/header/NavMobile";
import MotionFade from "@/components/motion/MotionFade";
import MotionStagger from "@/components/motion/MotionStagger";
import { routeItems } from "@/constants/routeItems";
import { routes } from "@/constants/routes";
import { CloseIcon, HamburgerIcon } from "@/components/icons/header";
import Drawer from "@/components/other/Drawer";
import SpaceX from "@/components/layout/SpaceX";
import { useTranslations } from "next-intl";
import LanguageDropdown from "@/components/other/LanguageDropdown";
import { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ShineBorder } from "@/components/magic-ui/shine-border"
import useActiveSection from "@/redux/active-section/useActiveSection";

type HeaderProps = {
  locale: Locale
}

const Header = ({ locale }: HeaderProps) => {
  const t = useTranslations("header.navItems");
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { activeSection } = useActiveSection();

  useEffect(() => {
    const saved = sessionStorage.getItem("hasScrolled");
    if (saved === "true") setHasScrolled(true);

    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setHasScrolled(scrolled);
      sessionStorage.setItem("hasScrolled", String(scrolled));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={clsx("sticky z-9999 transition-all duration-400", {
      "top-0": !hasScrolled,
      "top-6": hasScrolled
    })}>
      <SpaceX className={clsx("sticky min-h-[5rem] xl:min-h-[7rem] bg-black/98 flex items-center justify-between z-999999 transition-all duration-400 ease-in-out", {
        "m-6 shadow-s4 rounded-full": hasScrolled,
      })}
      >
        {hasScrolled && (
          <ShineBorder className={clsx("", {
            "border border-soft-gray/15": hasScrolled,
          })} />
        )}
        <MotionFade>
          <Link
            href={routes.home}
            onClick={() => { if (isMobileNavVisible) { setIsMobileNavVisible(false); } }}
            className="text-soft-white text-xs xl:text-xl font-fira-code flex items-center gap-[0.2rem] xl:gap-[0.5rem] font-light group"
          >
            <div className="text-3xl xl:text-6xl text-soft-gray group-hover:text-soft-white transition-all duration-400">
              &lt;
            </div>
            <div>
              <p>
                Damián
              </p>
              <p>
                Rodríguez
              </p>
            </div>
            <div className="text-3xl xl:text-6xl flex text-soft-gray group-hover:text-soft-white transition-all duration-400">
              <span className="group-hover:rotate-10 transition-all duration-400">
                /
              </span>
              &gt;
            </div>
          </Link>
        </MotionFade>
        <nav className="hidden xl:flex">
          <ul className="text-lg leading-[1.5rem]">
            <MotionStagger className="flex gap-[3rem]" direction="up" duration={0.3}>
              {routeItems.map((item, index) => {
                const isActive = activeSection === item.label;

                return (
                  <li key={index} className={clsx("flex flex-col group relative hover:text-soft-white transition-all duration-600", {
                    "text-soft-white": isActive,
                    "text-medium-gray": !isActive
                  })}>
                    <Link
                      href={item.href}
                      onClick={() => { }}
                      className="cursor-pointer"
                    >
                      {t(item.label)}
                    </Link>
                    <span className={clsx("block top-[0.2rem] relative h-[0.05rem] bg-soft-gray w-full scale-x-0 origin-center transition-transform duration-600 group-hover:scale-x-100 ease-in-out rounded-full ", {
                      "scale-x-100": isActive,
                    })}></span>
                  </li>
                );
              })}
            </MotionStagger>
          </ul>
        </nav>
        <div className="flex gap-[1rem] md:gap-[2rem]">
          <MotionFade className="flex flex-col text-sm text-soft-white">
            <LanguageDropdown locale={locale} />
          </MotionFade>
          <MotionFade className="flex xl:hidden">
            {isMobileNavVisible ? (
              <button
                onClick={() => { setIsMobileNavVisible(false); }}
                className="cursor-pointer"
              >
                <CloseIcon className="fill-[#fff]" />
              </button>
            ) : (
              <button
                onClick={() => { setIsMobileNavVisible(true); }}
                className="cursor-pointer"
              >
                <HamburgerIcon />
              </button>
            )}
          </MotionFade>
        </div>
      </SpaceX>
      <Drawer
        visible={isMobileNavVisible}
        onClose={() => { setIsMobileNavVisible(false); }}
        position="top"
        hideOverlay
        closeButton={null}
        className={clsx("pb-[7rem] bg-black/90 xl:hidden",
          {
            "mt-[7.5rem] md:mt-[8rem] shadow-s4 border border-soft-gray/15 rounded-t-[5rem]": hasScrolled,
            "mt-[5.5rem] ": !hasScrolled
          }
        )}
      >
        {hasScrolled && (
          <ShineBorder className={clsx("", {
            "border border-soft-gray/15": hasScrolled,
          })} />
        )}
        <NavMobile onClose={() => { setIsMobileNavVisible(false); }} />
      </Drawer>
      <div className={clsx("bg-black/80 absolute w-screen h-screen -top-6 xl:hidden",
        {
          "flex": isMobileNavVisible,
          "hidden": !isMobileNavVisible
        }
      )} />
    </header>
  );
};

export default Header;
