import TechnologyItem, {
  TechnologyItemData,
} from "@/components/home/sections/about-me-section/technologies/TechnologyItem";
import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import { RichText } from "@/components/next-intl/RichText";
import GithubButton from "@/components/ui/buttons/GithubButton";
import { useTranslations } from "next-intl";

const TechnologiesSection = () => {
  const t = useTranslations("aboutMeSection");

  const frontTechnologyData: TechnologyItemData = {
    title: t("technologies.frontend.title"),
    items: t("technologies.frontend.items"),
  };

  const stylesTechnologyData: TechnologyItemData = {
    title: t("technologies.styles.title"),
    items: t("technologies.styles.items"),
  };

  const backendTechnologyData: TechnologyItemData = {
    title: t("technologies.backend.title"),
    items: t("technologies.backend.items"),
  };

  const toolsData: TechnologyItemData = {
    title: t("technologies.tools.title"),
    items: t("technologies.tools.items"),
  };

  return (
    <div className="gap-[1.5rem] xl:gap-[2rem] flex flex-col xl:w-1/2">
      <MotionSlide direction="right">
        <TechnologyItem data={frontTechnologyData} animation="left" />
      </MotionSlide>

      <div className="flex justify-between items-center">
        <MotionSlide className="w-1/2">
          <TechnologyItem data={stylesTechnologyData} animation="right" />
        </MotionSlide>

        <MotionFade className="w-1/2 flex justify-center">
          <GithubButton />
        </MotionFade>
      </div>

      <div className="flex items-end justify-between">
        <MotionFade className="w-[40%]">
          <p className="text-dark-gray dark:text-soft-gray text-sm xl:text-lg">
            <RichText t={t} translationKey={"favoritesTools"} />
          </p>
        </MotionFade>

        <MotionSlide direction="right" className="w-1/2">
          <TechnologyItem data={backendTechnologyData} animation="left" />
        </MotionSlide>
      </div>

      <MotionSlide>
        <TechnologyItem data={toolsData} animation="right" />
      </MotionSlide>
    </div>
  );
};

export default TechnologiesSection;
