import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import TechnologyItem, { TechnologyItemData } from "@/components/sections/about-me-section/technologies/TechnologyItem";
import GithubButton from "@/components/ui/buttons/GithubButton";
import { useTranslations } from "next-intl";

const TechnologiesSection = () => {
  const t = useTranslations("aboutMeSection");

  const frontTechnologyData: TechnologyItemData = {
    title: t("technologies.frontend.title"), items: t("technologies.frontend.items")
  }
  const stylesTechnologyData: TechnologyItemData = {
    title: t("technologies.styles.title"), items: t("technologies.styles.items")
  }
  const backendTechnologyData: TechnologyItemData = {
    title: t("technologies.backend.title"), items: t("technologies.backend.items")
  }
  const toolsData: TechnologyItemData = {
    title: t("technologies.tools.title"), items: t("technologies.tools.items")
  }

  return (
    <div className="xl:w-1/2 gap-[1.5rem] xl:gap-[2rem] flex flex-col">
      <MotionSlide direction="right">
        <TechnologyItem
          data={frontTechnologyData}
        />
      </MotionSlide>
      <div className="flex justify-between items-center">
        <MotionSlide className="w-1/2">
          <TechnologyItem
            data={stylesTechnologyData}
          />
        </MotionSlide>
        <MotionFade className="w-1/2 flex justify-center">
          <GithubButton />
        </MotionFade>
      </div>
      <div className="flex items-end justify-between">
        <MotionFade className="w-[40%]">
          <p className="text-soft-gray text-sm lg:text-lg whitespace-pre-line">
            {t.rich("favoritesTools", {
              strong: (chunks) => <span className="text-soft-white">{chunks}</span>,
            })}
          </p>
        </MotionFade>
        <MotionSlide direction="right" className="w-1/2">
          <TechnologyItem
            data={backendTechnologyData}
          />
        </MotionSlide>
      </div>
      <MotionSlide>
        <TechnologyItem
          data={toolsData}
        />
      </MotionSlide>
    </div>
  );
};

export default TechnologiesSection;