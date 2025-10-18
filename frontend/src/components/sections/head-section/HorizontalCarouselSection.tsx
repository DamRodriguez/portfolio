import HorizontalCarouselVariant from "@/components/carousel/horizontal-carousel-variant/HorizontalCarouselVariant";
import { HorizontalCarouselVariantData } from "@/components/carousel/horizontal-carousel-variant/HorizontalCarouselVariantItem";
import MotionSlide from "@/components/motion/MotionSlide";
import bgTest from "@/assets/images/bg-test.png"
import vanicraciaBg from "@/assets/images/vanicracia.png"
import { useTranslations } from "next-intl";

const HorizontalCarouselSection = () => {
  const t = useTranslations("headSection.horizontalCarousel.carouselData")

  const horizontalCarouselItems: HorizontalCarouselVariantData[] = [
    {
      image: bgTest,
      title: t("dondeSalgo.title"),
      description: t("dondeSalgo.description")
    },
    {
      image: vanicraciaBg,
      title: t("vanicracia.title"),
      description: t("vanicracia.description")
    },
    {
      image: bgTest,
      title: t("alfombrasTauro.title"),
      description: t("alfombrasTauro.description")
    },
    {
      image: bgTest,
      title: t("medicalSpace.title"),
      description: t("medicalSpace.description")
    },
  ]

  return (
    <MotionSlide direction="down">
      <HorizontalCarouselVariant items={horizontalCarouselItems} />
    </MotionSlide>
  );
};

export default HorizontalCarouselSection;