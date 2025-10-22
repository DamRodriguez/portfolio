import HorizontalCarouselVariant from "@/components/carousel/horizontal-carousel-variant/HorizontalCarouselVariant";
import { HorizontalCarouselVariantData } from "@/components/carousel/horizontal-carousel-variant/HorizontalCarouselVariantItem";
import MotionSlide from "@/components/motion/MotionSlide";
import bgTest from "@/assets/images/bg-test.png"
import vanicraciaBg from "@/assets/images/vanicracia.png"
import { useTranslations } from "next-intl";
import { projectsRoutes } from "@/constants/projectsRoutes";

const HorizontalCarouselSection = () => {
  const t = useTranslations("headSection.horizontalCarousel.carouselData")

  const horizontalCarouselItems: HorizontalCarouselVariantData[] = [
    {
      image: bgTest,
      title: t("dondeSalgo.title"),
      description: t("dondeSalgo.description"),
      routerPath: ""
    },
    {
      image: vanicraciaBg,
      title: t("vanicracia.title"),
      description: t("vanicracia.description"),
      routerPath: projectsRoutes.vanicracia,
    },
    {
      image: bgTest,
      title: t("alfombrasTauro.title"),
      description: t("alfombrasTauro.description"),
      routerPath: projectsRoutes.alfombrasTauro,
    },
    {
      image: bgTest,
      title: t("medicalSpace.title"),
      description: t("medicalSpace.description"),
      routerPath: ""
    },
  ]

  return (
    <MotionSlide direction="down">
      <HorizontalCarouselVariant items={horizontalCarouselItems} />
    </MotionSlide>
  );
};

export default HorizontalCarouselSection;