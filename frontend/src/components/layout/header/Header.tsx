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
    <header className={clsx("sticky z-9999 transition-all duration-400", {
      "top-0": !hasScrolled,
      "top-6": hasScrolled,
    })}>
      <SpaceX className={clsx("sticky min-h-[5rem] xl:min-h-[7rem] flex items-center justify-between z-999999 transition-all duration-400 ease-in-out", {
        "m-6 shadow-s4 rounded-full bg-black/98": hasScrolled,
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
        className={clsx("pb-[7rem] bg-black/90 xl:hidden", {
          "mt-[7.5rem] md:mt-[8rem] shadow-s4 border border-soft-gray/15 rounded-t-[5rem]": hasScrolled,
          "mt-[5.1rem]": !hasScrolled
        })}>
        <NavMobile onClose={() => { setIsMobileNavVisible(false); }} />
      </Drawer>
    </header>
  );
};

export default Header;
