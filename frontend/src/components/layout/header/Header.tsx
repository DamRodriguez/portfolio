"use client";
import Drawer from "@/components/drawer/Drawer";
import LeftItem from "@/components/layout/header/LeftItem";
import NavDesk from "@/components/layout/header/NavDesk";
import NavMobile from "@/components/layout/header/NavMobile";
import RightSection from "@/components/layout/header/RightSection";
import SpaceX from "@/components/layout/SpaceX";
import MotionEntrySlide from "@/components/motion/MotionEntrySlide";
import ShineBorderCustom from "@/components/other/ShineBorderCustom";
import useCloseMobileNavOnDesktop from "@/hooks/useCloseMobileNavOnDesktop";
import useHasScrolled from "@/hooks/useHasScrolled";
import { Locale } from "@/i18n/routing";
import clsx from "clsx";
import { useState } from "react";

type HeaderProps = {
  locale: Locale;
};

const Header = ({ locale }: HeaderProps) => {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const { hasScrolled } = useHasScrolled();
  useCloseMobileNavOnDesktop({ setIsMobileNavVisible });

  return (
    <header>
      <MotionEntrySlide direction="up" className="z-99999 fixed top-0 w-full">
        <SpaceX
          className={clsx(
            "min-h-header-mobile xl:min-h-header-desktop flex items-center justify-between theme-transition-all",
            {
              "translate-y-4 mx-4 xl:translate-y-6 xl:mx-6 shadow-s9 dark:shadow-s1 rounded-full bg-soft-white dark:bg-strong-black":
                hasScrolled,
              "translate-y-0 bg-white-bone dark:bg-black": !hasScrolled,
            },
          )}
        >
          <ShineBorderCustom isVisible={hasScrolled} />
          <LeftItem
            onClick={() => {
              if (isMobileNavVisible) {
                setIsMobileNavVisible(false);
              }
            }}
          />
          <NavDesk />
          <RightSection
            locale={locale}
            isMobileNavVisible={isMobileNavVisible}
            setIsMobileNavVisible={setIsMobileNavVisible}
            hasScrolled={hasScrolled}
          />
        </SpaceX>
      </MotionEntrySlide>

      <Drawer
        visible={isMobileNavVisible}
        onClose={() => {
          setIsMobileNavVisible(false);
        }}
        position="top"
        closeButton={null}
        className={clsx("pb-[7rem] xl:hidden shadow-s2 dark:shadow-s1", {
          "translate-y-[calc(var(--height-header-mobile)+2.5rem)] border border-black/30 dark:border-soft-gray/15 rounded-t-[5rem] bg-soft-white/90 dark:bg-strong-black/90":
            hasScrolled,
          "translate-y-header-mobile bg-white-bone/90 dark:bg-black/90":
            !hasScrolled,
        })}
      >
        <NavMobile
          onClose={() => {
            setIsMobileNavVisible(false);
          }}
        />
      </Drawer>
    </header>
  );
};

export default Header;
