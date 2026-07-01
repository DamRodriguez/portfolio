import { ArgFlagIcon, EngFlagIcon } from "@/components/icons/languageDropdown";
import MotionHeight from "@/components/motion/MotionHeight";
import { AnimatedChevron } from "@/components/other/AnimatedChevron";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useClickOutside } from "@/utils/useClickOutside";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import type { Locale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { type JSX, useRef, useState } from "react";

type LanguageDropdownProps = {
  locale: Locale;
  hasScrolled: boolean;
};

const LanguageDropdown = ({ locale, hasScrolled }: LanguageDropdownProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Locale>(locale);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef as React.RefObject<HTMLElement>, () => {
    setIsOpen(false);
  });
  const isMobile = useBreakpoint();
  const flagIconClassName = "w-5 h-5 xl:w-7 xl:h-7";

  const Languages: { lang: Locale; flag: JSX.Element }[] = [
    { lang: "es", flag: <ArgFlagIcon className={flagIconClassName} /> },
    { lang: "en", flag: <EngFlagIcon className={flagIconClassName} /> },
  ];

  const handleLanguageChange = (newLang: Locale) => {
    const langsRegex = Languages.map((l) => l.lang).join("|");
    const newPathname = `/${newLang}${(pathname ?? "").replace(new RegExp(`^/(${langsRegex})`), "")}`;
    router.push(newPathname, { scroll: false });
    setSelectedLang(newLang);
    setIsOpen(false);
  };

  const currentLanguage = Languages.find((l) => l.lang === selectedLang);
  const othersLanguages = Languages.filter((l) => l.lang !== selectedLang);

  return (
    <div
      {...(!isMobile && {
        onMouseEnter: () => {
          setIsOpen(true);
        },
        onMouseLeave: () => {
          setIsOpen(false);
        },
      })}
      ref={dropdownRef}
      className="inline-block max-h-[2.17375rem] xl:max-h-[2.67375rem] w-[4.1rem] xl:w-[5.3rem] z-999"
    >
      <div
        className={clsx(
          "py-[0.4rem] px-[0.3rem] xl:px-[0.5rem] rounded-[0.5rem] overflow-hidden backdrop-blur-xs border dark:border-soft-gray/5 shadow-s2 dark:bg-soft-gray/20",
          {
            "bg-white-bone": hasScrolled,
            "bg-soft-white": !hasScrolled,
          },
        )}
      >
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-[0.5rem] cursor-pointer"
        >
          <div className="flex items-center gap-[0.3rem] ">
            <div className="bg-black/50 dark:bg-black/50 rounded-full">
              {currentLanguage?.flag}
            </div>
            <span className="capitalize text-xs xl:text-base text-black dark:text-soft-white">
              {currentLanguage?.lang}
            </span>
          </div>
          <div>
            <AnimatedChevron small isOpen={isOpen} />
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <MotionHeight duration={0.3}>
              <div className="flex flex-col gap-[0.6rem] pt-[0.6rem]">
                {othersLanguages.map(({ lang, flag }) => (
                  <div
                    key={lang}
                    onClick={() => {
                      handleLanguageChange(lang);
                    }}
                    className="group flex items-center gap-[0.3rem] cursor-pointer hover:bg-black/90 dark:hover:bg-soft-white/90 rounded-full theme-transition"
                  >
                    <div className="bg-black/50 dark:bg-black/50 rounded-full">
                      {flag}
                    </div>
                    <span className="capitalize text-xs xl:text-base text-black/80 dark:text-soft-white/80 group-hover:text-soft-white dark:group-hover:text-strong-black theme-transition">
                      {lang}
                    </span>
                  </div>
                ))}
              </div>
            </MotionHeight>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LanguageDropdown;
