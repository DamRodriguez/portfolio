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
      "top-6": scrolled
    })}>
      <SpaceX className={clsx("sticky min-h-[5.5rem] xl:min-h-[7rem] backdrop-blur-[1rem] bg-black/70 flex items-center justify-between z-999999 transition-all duration-400 ease-in-out", {
        "shadow-s4 m-6 rounded-full border border-soft-gray/15": scrolled
      })}
      >
        <MotionFade>
          <Link
            href={routes.home}
            onClick={() => { if (isMobileNavVisible) { setIsMobileNavVisible(false); } }}
            className="text-soft-white text-sm xl:text-xl font-fira-code flex items-center gap-[0.5rem] font-light group"
          >
            <div className="text-5xl xl:text-6xl text-soft-gray group-hover:text-soft-white transition-all duration-400">
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
            <div className="text-5xl xl:text-6xl flex text-soft-gray group-hover:text-soft-white transition-all duration-400">
              <span className="group-hover:rotate-10 transition-all duration-400">
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
        <div className="flex gap-[1rem] md:gap-[2rem] ">
          <div className="flex flex-col text-sm text-soft-white">
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
        </div>
      </SpaceX>
      <Drawer
        visible={isMobileNavVisible}
        onClose={() => { setIsMobileNavVisible(false); }}
        position="top"
        hideOverlay
        closeButton={null}
        className={clsx("pb-[7rem] backdrop-blur-[1rem] bg-black/10 xl:hidden",
          {
            "mt-[7.5rem] md:mt-[8rem] shadow-s4 border border-soft-gray/15 rounded-[5rem]": scrolled,
            "mt-[5.5rem] ": !scrolled
          }
        )}
      >
        <NavMobile onClose={() => { setIsMobileNavVisible(false); }} />
      </Drawer>
    </header>
  );
};

export default Header;
