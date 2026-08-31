"use client";
import RightSection from "@/components/layout/header/RightSection";
import SpaceX from "@/components/layout/SpaceX";
import MotionOpacity from "@/components/motion/MotionOpacity";
import ShineBorderCustom from "@/components/other/ShineBorderCustom";
import useHasScrolled from "@/hooks/scroll/useHasScrolled";
import { Locale } from "@/i18n/routing";
import clsx from "clsx";

type HeaderProps = {
  locale: Locale;
  navComponent: React.ReactNode;
  outsideNavComponent?: React.ReactNode;
  rightSectionComponent?: React.ReactNode;
  order?: number;
};

const Header = ({
  locale,
  navComponent,
  outsideNavComponent,
  rightSectionComponent,
  order = 0,
}: HeaderProps) => {
  const { hasScrolled } = useHasScrolled();

  return (
    <header>
      <MotionOpacity
        order={order}
        className="z-9999 fixed top-0 w-full site-size"
      >
        <div
          className={clsx(
            "pointer-events-none absolute left-0 -top-[2px] h-[calc(var(--height-header-mobile)+1.5rem)] xl:h-[calc(var(--height-header-desktop)+3rem)] w-full bg-gradient-to-b from-white-bone via-white-bone dark:from-black dark:via-black to-transparent theme-transition-all",
          )}
        />
        <SpaceX
          className={clsx(
            "min-h-header-mobile xl:min-h-header-desktop flex items-center justify-between theme-transition-all",
            {
              "translate-y-4 mx-4 xl:translate-y-6 xl:mx-6 shadow-s3 dark:shadow-s1 rounded-full bg-soft-white dark:bg-strong-black":
                hasScrolled,
              "translate-y-0 bg-white-bone dark:bg-black": !hasScrolled,
            },
          )}
        >
          <ShineBorderCustom isVisible={hasScrolled} />
          {navComponent}
          <RightSection
            locale={locale}
            hasScrolled={hasScrolled}
            component={rightSectionComponent}
          />
        </SpaceX>
      </MotionOpacity>
      {outsideNavComponent && outsideNavComponent}
    </header>
  );
};

export default Header;
