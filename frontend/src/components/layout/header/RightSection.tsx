import LanguageDropdown from "@/components/next-intl/LanguageDropdown";
import { ThemeToggle } from "@/components/ui/buttons/ThemeToggle";
import { Locale } from "@/i18n/routing";

type RightSectionProps = {
  locale: Locale;
  hasScrolled: boolean;
  component?: React.ReactNode;
};

const RightSection = (props: RightSectionProps) => {
  return (
    <div className="flex items-center gap-[1rem] md:gap-[1.5rem] xl:gap-[2rem] ">
      <ThemeToggle hasScrolled={props.hasScrolled} />
      <LanguageDropdown locale={props.locale} hasScrolled={props.hasScrolled} />
      {props.component && props.component}
    </div>
  );
};

export default RightSection;
