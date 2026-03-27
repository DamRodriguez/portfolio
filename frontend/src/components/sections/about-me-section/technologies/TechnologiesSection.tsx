import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import TechnologyItem, { TechnologyItemData } from "@/components/sections/about-me-section/technologies/TechnologyItem";
import GithubButton from "@/components/ui/buttons/GithubButton";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
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

  useScrollAnimations({
    animations: {
      ".front-gsap": {
        scale: 0.8,
        rotate: 5,
        x: 100,
      },
      ".styles-gsap": {
        scale: 0.8,
        rotate: -5,
        x: -100,
      },
      ".back-gsap": {
        scale: 0.8,
        rotate: 5,
        x: 100,
      },
      ".tools-gsap": {
        scale: 0.8,
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
        color: "var(--color-black)"
      },
    },
  })

  return (
    <div className="xl:w-1/2 gap-[1.5rem] xl:gap-[2rem] flex flex-col">
      <div className="front-gsap">
        <MotionSlide direction="right">
          <TechnologyItem
            data={frontTechnologyData}
            animation="left"
          />
        </MotionSlide>
      </div>
      <div className="flex justify-between items-center">
        <div className="styles-gsap w-1/2">
          <MotionSlide>
            <TechnologyItem
              data={stylesTechnologyData}
              animation="right"
            />
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
          <p className="tools-text-gsap text-soft-gray text-sm lg:text-lg whitespace-pre-line">
            {t.rich("favoritesTools", {
              strong: (chunks) => <span className="text-soft-white">{chunks}</span>,
            })}
          </p>
        </MotionFade>
        <div className="back-gsap w-1/2">
          <MotionSlide direction="right">
            <TechnologyItem
              data={backendTechnologyData}
              animation="left"
            />
          </MotionSlide>
        </div>
      </div>
      <div className="tools-gsap">
        <MotionSlide>
          <TechnologyItem
            data={toolsData}
            animation="right"
          />
        </MotionSlide>
      </div>
    </div>
  );
};

export default TechnologiesSection;