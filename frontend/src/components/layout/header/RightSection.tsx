import LanguageDropdown from "@/components/other/LanguageDropdown";
import { ThemeToggle } from "@/components/ui/buttons/ThemeToggle";
import { Locale } from "@/i18n/routing";
import clsx from "clsx";

type RightSectionProps = {
  locale: Locale;
  isMobileNavVisible: boolean;
  setIsMobileNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
  hasScrolled: boolean;
};

const RightSection = (props: RightSectionProps) => {
  const { isMobileNavVisible, setIsMobileNavVisible } = props;

  const handleToggleMobileNav = () => {
    setIsMobileNavVisible((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-[1rem] md:gap-[1.5rem] xl:gap-[2rem] ">
      <ThemeToggle hasScrolled={props.hasScrolled} />

      <LanguageDropdown locale={props.locale} hasScrolled={props.hasScrolled} />

      <div className="flex xl:hidden">
        <button
          onClick={handleToggleMobileNav}
          className="relative flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center"
          aria-label={
            isMobileNavVisible
              ? "Cerrar menú de navegación"
              : "Abrir menú de navegación"
          }
          aria-expanded={isMobileNavVisible}
        >
          <span
            className={clsx(
              "absolute h-[2px] w-[1.5rem] rounded-full bg-black dark:bg-soft-white theme-transition-all",
              isMobileNavVisible
                ? "translate-y-0 rotate-45"
                : "-translate-y-[0.3rem] rotate-0",
            )}
          />

          <span
            className={clsx(
              "absolute h-[2px] w-[1.5rem] rounded-full bg-black dark:bg-soft-white theme-transition-all",
              isMobileNavVisible
                ? "translate-y-0 -rotate-45"
                : "translate-y-[0.3rem] rotate-0",
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default RightSection;
