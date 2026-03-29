"use client";
import clsx from "clsx";
import { useState } from "react";
import NavMobile from "@/components/layout/header/NavMobile";
import Drawer from "@/components/other/Drawer";
import SpaceX from "@/components/layout/SpaceX";
import { Locale } from "@/i18n/routing";
import useHasScrolled from "@/hooks/useHasScrolled";
import ShineBorderCustom from "@/components/other/ShineBorderCustom";
import NavDesk from "./NavDesk";
import LeftItem from "./LeftItem";
import RightSection from "./RightSection";
import useCloseMobileNavOnDesktop from "@/hooks/useCloseMobileNavOnDesktop";

type HeaderProps = {
  locale: Locale;
}

const Header = ({ locale }: HeaderProps) => {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const { hasScrolled } = useHasScrolled();
  useCloseMobileNavOnDesktop({ setIsMobileNavVisible });

  return (
    <header className="sticky top-0 z-9999">
      <SpaceX className={clsx("sticky z-9999 min-h-[5rem] xl:min-h-[7rem] bg-white-bone dark:bg-black flex items-center justify-between theme-transition-all", {
        "translate-y-4 mx-4 xl:translate-y-6 xl:mx-6 shadow-s9 dark:shadow-s1 rounded-full": hasScrolled,
        "translate-y-0": !hasScrolled,
      })}>
        <ShineBorderCustom isVisible={hasScrolled} />
        <LeftItem
          onClick={() => { if (isMobileNavVisible) { setIsMobileNavVisible(false); } }}
        />
        <NavDesk />
        <RightSection
          locale={locale}
          isMobileNavVisible={isMobileNavVisible}
          setIsMobileNavVisible={setIsMobileNavVisible}
        />
      </SpaceX>

      <Drawer
        visible={isMobileNavVisible}
        onClose={() => { setIsMobileNavVisible(false); }}
        position="top"
        closeButton={null}
        className={clsx("pb-[7rem] bg-white-bone/90 dark:bg-black/90 xl:hidden shadow-s2 dark:shadow-s1 theme-transition", {
          "translate-y-[7.5rem] md:translate-y-[8rem] border border-black/30 dark:border-soft-gray/15 rounded-t-[5rem]": hasScrolled,
          "translate-y-[5rem]": !hasScrolled
        })}>
        <NavMobile onClose={() => { setIsMobileNavVisible(false); }} />
      </Drawer>
    </header>
  );
};

export default Header;
