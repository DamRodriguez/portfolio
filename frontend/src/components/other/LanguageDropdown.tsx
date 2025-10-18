import { AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "next-intl";
import { type JSX, useRef, useState } from "react";
import { ArgFlagIcon, DownIcon, EngFlagIcon, UpIcon } from "@/components/icons/languageDropdown";
import config from "@/config/config";
import useIsMobile from "@/hooks/useIsMobile";
import { MotionHeight } from "@/components/motion/MotionHeight";
import { useClickOutside } from "@/utils/useClickOutside";
import clsx from "clsx";

type LanguageDropdownProps = {
  locale: Locale;
  hasScrolled: boolean;
};

const Languages: { lang: Locale; flag: JSX.Element }[] = [
  { lang: "es", flag: <ArgFlagIcon className="w-5 h-5 xl:w-7 xl:h-7" /> },
  { lang: "en", flag: <EngFlagIcon className="w-5 h-5 xl:w-7 xl:h-7" /> },
];

const LanguageDropdown = ({ locale, hasScrolled }: LanguageDropdownProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Locale>(locale);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef as React.RefObject<HTMLElement>, () => { setIsOpen(false); });
  const isMobile = useIsMobile({ breakpoint: Number(config.breakpoints.md) });

  const handleLanguageChange = (newLang: Locale) => {
    const langsRegex = Languages.map(l => l.lang).join("|");
    const newPathname = `/${newLang}${(pathname ?? "").replace(new RegExp(`^/(${langsRegex})`), "")}`;
    router.push(newPathname, { scroll: false });
    setSelectedLang(newLang);
    setIsOpen(false);
  };

  const currentLanguage = Languages.find(l => l.lang === selectedLang);
  const othersLanguages = Languages.filter(l => l.lang !== selectedLang);

  return (
    <div
      {...(!isMobile && {
        onMouseEnter: () => { setIsOpen(true); },
        onMouseLeave: () => { setIsOpen(false); },
      })}
      ref={dropdownRef}
      className="inline-block max-h-[2rem] w-[4.5rem] xl:w-[5.7rem] z-40">
      <div className={clsx("py-[0.4rem] px-[0.3rem] xl:px-[0.5rem] rounded-[0.5rem] overflow-hidden transition-all duration-400 ease-in-out",
        {
          "bg-dark-gray/90": isOpen,
          "bg-soft-gray/10": !isOpen,
          "shadow-s4": hasScrolled
        }
      )}>
        <div
          onClick={() => { setIsOpen(!isOpen); }}
          className="flex items-center gap-[0.6rem] cursor-pointer"
        >
          <div className="flex items-center gap-[0.3rem] ">
            <div className="bg-black rounded-full">
              {currentLanguage?.flag}
            </div>
            <span className="capitalize text-xs xl:text-base">
              {currentLanguage?.lang}
            </span>
          </div>
          {isOpen ? <UpIcon className="w-2 h-2 xl:w-[0.6rem] xl:h-[0.6rem]" /> : <DownIcon className="w-2 h-2 xl:w-[0.6rem] xl:h-[0.6rem]" />}
        </div>

        <AnimatePresence>
          {isOpen && (
            <MotionHeight>
              <div className="flex flex-col gap-[0.6rem] pt-[0.6rem]">
                {othersLanguages.map(({ lang, flag }) => (
                  <div
                    key={lang}
                    onClick={() => { handleLanguageChange(lang); }}
                    className="group flex items-center gap-[0.3rem] cursor-pointer hover:bg-soft-gray/20 rounded-full transition-all duration-400 ease-in-out"
                  >
                    {flag}
                    <span className="capitalize text-xs xl:text-base text-soft-gray group-hover:text-soft-white">
                      {lang}
                    </span>
                  </div>
                ))}
              </div>
            </MotionHeight>
          )}
        </AnimatePresence>
      </div>
    </div >
  );
};


export default LanguageDropdown;
