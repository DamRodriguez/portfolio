"use client";
import Drawer from "@/components/drawer/Drawer";
import HamburgerButton from "@/components/layout/header/HamburgerButton";
import Header from "@/components/layout/header/Header";
import LeftItem from "@/components/layout/header/home/LeftItem";
import NavDesk from "@/components/layout/header/home/NavDesk";
import NavMobile from "@/components/layout/header/home/NavMobile";
import useCloseMobileNavOnDesktop from "@/hooks/useCloseMobileNavOnDesktop";
import useHasScrolled from "@/hooks/useHasScrolled";
import { Locale } from "@/i18n/routing";
import { clsx } from "clsx";
import { useState } from "react";

type HomeHeaderProps = {
  locale: Locale;
};

export default function HomeHeader({ locale }: HomeHeaderProps) {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const { hasScrolled } = useHasScrolled();
  useCloseMobileNavOnDesktop({ setIsMobileNavVisible });

  return (
    <Header
      locale={locale}
      navComponent={
        <>
          <LeftItem
            onClick={() => {
              if (isMobileNavVisible) {
                setIsMobileNavVisible(false);
              }
            }}
          />
          <NavDesk />
        </>
      }
      outsideNavComponent={
        <Drawer
          visible={isMobileNavVisible}
          onClose={() => {
            setIsMobileNavVisible(false);
          }}
          position="top"
          closeButton={null}
          className={clsx(
            "pb-[7rem] 2xl:hidden shadow-s2 dark:shadow-s1 h-full",
            {
              "translate-y-[calc(var(--height-header-mobile)+2.5rem)] xl:translate-y-[calc(var(--height-header-mobile)+4.5rem)] border border-black/30 dark:border-soft-gray/15 rounded-t-[5rem] bg-soft-white/90 dark:bg-strong-black/90":
                hasScrolled,
              "translate-y-header-mobile bg-white-bone/90 dark:bg-black/90":
                !hasScrolled,
            },
          )}
        >
          <NavMobile
            onClose={() => {
              setIsMobileNavVisible(false);
            }}
          />
        </Drawer>
      }
      rightSectionComponent={
        <HamburgerButton
          isMobileNavVisible={isMobileNavVisible}
          setIsMobileNavVisible={setIsMobileNavVisible}
        />
      }
    />
  );
}
