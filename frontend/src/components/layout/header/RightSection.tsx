import { CloseIcon, HamburgerIcon } from "@/components/icons/header";
import MotionFade from "@/components/motion/MotionFade";
import LanguageDropdown from "@/components/other/LanguageDropdown";
import { ThemeToggle } from "@/components/ui/buttons/ThemeToggle";
import { Locale } from "@/i18n/routing";

type RightSectionProps = {
  locale: Locale;
  isMobileNavVisible: boolean;
  setIsMobileNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightSection = (props: RightSectionProps) => {
  return (
    <div className="flex items-center gap-[1rem] md:gap-[1.5rem] xl:gap-[2rem] ">

      <ThemeToggle />

      <MotionFade className="flex flex-col text-sm text-soft-white">
        <LanguageDropdown locale={props.locale} />
      </MotionFade>

      <MotionFade className="flex xl:hidden">
        {props.isMobileNavVisible ? (
          <button
            onClick={() => { props.setIsMobileNavVisible(false); }}
            className="cursor-pointer"
            aria-label="Cerrar menú de navegación"
          >
            <CloseIcon className="fill-black dark:fill-soft-white theme-transition" />
          </button>
        ) : (
          <button
            onClick={() => { props.setIsMobileNavVisible(true); }}
            className="cursor-pointer"
            aria-label="Abrir menú de navegación"
          >
            <HamburgerIcon className="fill-black dark:fill-soft-white theme-transition" />
          </button>
        )}
      </MotionFade>
    </div>
  );
};

export default RightSection;