"use client";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavMobile from "@/components/layout/header/NavMobile";
import MotionFade from "@/components/motion/MotionFade";
import MotionStagger from "@/components/motion/MotionStagger";
import { routeItems } from "@/constants/routeItems";
import { routes } from "@/constants/routes";
import { CloseIcon, HamburgerIcon } from "@/components/icons/header";
import Drawer from "@/components/other/Drawer";
import SpaceX from "@/components/layout/SpaceX";

const Header = () => {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={clsx("sticky z-9999 transition-all duration-400", {
      "top-0": !scrolled,
      "top-10": scrolled
    })}>
      <SpaceX className={clsx("sticky min-h-[7rem] backdrop-blur-[1rem] bg-black/70 flex items-center justify-between z-999999 transition-all duration-400 ease-in-out", {
        "w-screen": isMobileNavVisible,
        "shadow-s4 m-10 rounded-full": scrolled
      })}
      >
        <MotionFade>
          <Link
            href={routes.home}
            onClick={() => { if (isMobileNavVisible) { setIsMobileNavVisible(false); } }}
            className="text-soft-white xl:text-xl font-fira-code flex items-center gap-[0.5rem] font-light"
          >
            <div className="text-6xl text-soft-gray">
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
            <div className="text-6xl flex text-soft-gray">
              <span>
                /
              </span>
              &gt;
            </div>
          </Link>
        </MotionFade>
        <nav className="hidden xl:flex">
          <ul className="text-lg leading-[1.5rem] text-soft-white">
            <MotionStagger className="flex gap-[3rem]" direction="up" duration={0.3}>
              {routeItems.map(({ href, label }) => {
                return (
                  <li key={href} className="flex flex-col group relative">
                    <Link
                      href={href}
                      onClick={() => { }}
                      className="cursor-pointer group-hover:scale-110 transition-all duration-400 ease-in-out"
                    >
                      {label}
                    </Link>
                    <span className="block h-[0.1rem] bg-soft-white w-full scale-x-0 origin-center transition-transform duration-400 group-hover:scale-x-100 ease-in-out"></span>
                  </li>
                );
              })}
            </MotionStagger>
          </ul>
        </nav>
        <div className="flex flex-col text-soft-white">
          <button>
            Es
          </button>
          <button>
            En
          </button>
        </div>
        <MotionFade className="flex xl:hidden">
          {isMobileNavVisible ? (
            <button
              onClick={() => { setIsMobileNavVisible(false); }}
              className="cursor-pointer"
            >
              <CloseIcon />
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
      </SpaceX>
      <Drawer
        visible={isMobileNavVisible}
        onClose={() => { setIsMobileNavVisible(false); }}
        position="top"
        hideOverlay
        closeButton={null}
        className="mt-[7rem] pb-[7rem] backdrop-blur-[20px] bg-alpha-50 xl:hidden"
      >
        <NavMobile onClose={() => { setIsMobileNavVisible(false); }} />
      </Drawer>
    </header>
  );
};

export default Header;
