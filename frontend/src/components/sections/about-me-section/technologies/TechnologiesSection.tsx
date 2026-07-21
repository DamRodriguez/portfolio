import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import { RichText } from "@/components/next-intl/RichText";
import TechnologyItem, {
  TechnologyItemData,
} from "@/components/sections/about-me-section/technologies/TechnologyItem";
import GithubButton from "@/components/ui/buttons/GithubButton";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

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

  useScrollAnimations({
    animations: {
      ".front-gsap": {
        scale: 0.9,
        rotate: 5,
        x: 100,
      },
      ".styles-gsap": {
        scale: 0.9,
        rotate: -5,
        x: -100,
      },
      ".back-gsap": {
        scale: 0.9,
        rotate: 5,
        x: 100,
      },
      ".tools-gsap": {
        scale: 0.9,
        rotate: -5,
        x: -100,
      },
      ".github-gsap": {
        rotate: 5,
        x: 100,
      },
      ".tools-text-gsap": {
        rotate: -5,
        x: -100,
      },
    },
  });

  return (
    <div className="gap-[1.5rem] xl:gap-[2rem] flex flex-col xl:w-1/2">
      <div className="front-gsap">
        <MotionSlide direction="right">
          <TechnologyItem data={frontTechnologyData} animation="left" />
        </MotionSlide>
      </div>

      <div className="flex justify-between items-center">
        <div className="styles-gsap w-1/2">
          <MotionSlide>
            <TechnologyItem data={stylesTechnologyData} animation="right" />
          </MotionSlide>
        </div>

        <div className="github-gsap w-1/2 flex justify-center">
          <MotionFade>
            <GithubButton />
          </MotionFade>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <MotionFade className="w-[40%]">
          <p className="tools-text-gsap text-dark-gray dark:text-soft-gray text-sm xl:text-lg">
            <RichText t={t} translationKey={"favoritesTools"} />
          </p>
        </MotionFade>

        <div className="back-gsap w-1/2">
          <MotionSlide direction="right">
            <TechnologyItem data={backendTechnologyData} animation="left" />
          </MotionSlide>
        </div>
      </div>

      <div className="tools-gsap">
        <MotionSlide>
          <TechnologyItem data={toolsData} animation="right" />
        </MotionSlide>
      </div>
    </div>
  );
};

export default TechnologiesSection;
