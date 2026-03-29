import { AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "next-intl";
import { type JSX, useRef, useState } from "react";
import { ArgFlagIcon, DownIcon, EngFlagIcon, UpIcon } from "@/components/icons/languageDropdown";
import useBreakpoint from "@/hooks/useBreakpoint";
import { MotionHeight } from "@/components/motion/MotionHeight";
import { useClickOutside } from "@/utils/useClickOutside";

type LanguageDropdownProps = {
  locale: Locale;
};

const LanguageDropdown = ({ locale }: LanguageDropdownProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Locale>(locale);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef as React.RefObject<HTMLElement>, () => { setIsOpen(false); });
  const isMobile = useBreakpoint();
  const flagIconClassName = "w-5 h-5 xl:w-7 xl:h-7";

  const Languages: { lang: Locale; flag: JSX.Element }[] = [
    { lang: "es", flag: <ArgFlagIcon className={flagIconClassName} /> },
    { lang: "en", flag: <EngFlagIcon className={flagIconClassName} /> },
  ];

  const handleLanguageChange = (newLang: Locale) => {
    const langsRegex = Languages.map(l => l.lang).join("|");
    const newPathname = `/${newLang}${(pathname ?? "").replace(new RegExp(`^/(${langsRegex})`), "")}`;
    router.push(newPathname, { scroll: false });
    setSelectedLang(newLang);
    setIsOpen(false);
  };

  const currentLanguage = Languages.find(l => l.lang === selectedLang);
  const othersLanguages = Languages.filter(l => l.lang !== selectedLang);

  const arrowIconClassName = "w-2 h-2 xl:w-[0.6rem] xl:h-[0.6rem] fill-black dark:fill-soft-white";

  return (
    <div
      {...(!isMobile && {
        onMouseEnter: () => { setIsOpen(true); },
        onMouseLeave: () => { setIsOpen(false); },
      })}
      ref={dropdownRef}
      className="inline-block max-h-[2.17375rem] xl:max-h-[2.67375rem] w-[4.1rem] xl:w-[5.3rem] z-999">
      <div className="py-[0.4rem] px-[0.3rem] xl:px-[0.5rem] rounded-[0.5rem] overflow-hidden theme-transition backdrop-blur-xs border dark:border-soft-gray/5 shadow-s2 bg-soft-white dark:bg-soft-gray/20">
        <div
          onClick={() => { setIsOpen(!isOpen); }}
          className="flex items-center gap-[0.5rem] cursor-pointer"
        >
          <div className="flex items-center gap-[0.3rem] ">
            <div className="bg-black/50 dark:bg-black/50 rounded-full theme-transition">
              {currentLanguage?.flag}
            </div>
            <span className="capitalize text-xs xl:text-base text-black dark:text-soft-white theme-transition">
              {currentLanguage?.lang}
            </span>
          </div>
          {isOpen ? <UpIcon className={arrowIconClassName} /> : <DownIcon className={arrowIconClassName} />}
        </div>

        <AnimatePresence>
          {isOpen && (
            <MotionHeight duration={0.3}>
              <div className="flex flex-col gap-[0.6rem] pt-[0.6rem]">
                {othersLanguages.map(({ lang, flag }) => (
                  <div
                    key={lang}
                    onClick={() => { handleLanguageChange(lang); }}
                    className="group flex items-center gap-[0.3rem] cursor-pointer hover:bg-black/40 dark:hover:bg-soft-white/40 rounded-full theme-transition"
                  >
                    <div className="bg-black/50 dark:bg-black/50 rounded-full theme-transition">
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
    </div >
  );
};


export default LanguageDropdown;
