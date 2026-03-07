import { CloseIcon, HamburgerIcon } from "@/components/icons/header";
import MotionFade from "@/components/motion/MotionFade";
import LanguageDropdown from "@/components/other/LanguageDropdown";
import { Locale } from "@/i18n/routing";

type RightSectionProps = {
  locale: Locale;
  isMobileNavVisible: boolean;
  setIsMobileNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const RightSection = (props: RightSectionProps) => {
  return (
    <div className="flex gap-[1rem] md:gap-[2rem]">
      <MotionFade className="flex flex-col text-sm text-soft-white">
        <LanguageDropdown locale={props.locale} />
      </MotionFade>

      <MotionFade className="flex xl:hidden">
        {props.isMobileNavVisible ? (
          <button
            onClick={() => { props.setIsMobileNavVisible(false); }}
            className="cursor-pointer"
          >
            <CloseIcon className="fill-[#fff]" />
          </button>
        ) : (
          <button
            onClick={() => { props.setIsMobileNavVisible(true); }}
            className="cursor-pointer"
          >
            <HamburgerIcon />
          </button>
        )}
      </MotionFade>
    </div>
  );
};

export default RightSection;