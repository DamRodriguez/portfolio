import HorizontalCarouselVariant from "@/components/carousel/horizontal-carousel-variant/HorizontalCarouselVariant";
import { HorizontalCarouselVariantData } from "@/components/carousel/horizontal-carousel-variant/HorizontalCarouselVariantItem";
import MotionSlide from "@/components/motion/MotionSlide";
import vanicraciaBg from "@/assets/images/vanicracia.png"
import { useTranslations } from "next-intl";
import { projectsRoutes } from "@/constants/projectsRoutes";
import alfombrasTauroBg from "@/assets/images/alfombras-tauro.jpg"
import dondeSalgoBg from "@/assets/images/donde-salgo.png"
import spotifyBg from "@/assets/images/spotify.png"

const HorizontalCarouselSection = () => {
  const t = useTranslations("headSection.horizontalCarousel.carouselData")

  const horizontalCarouselItems: HorizontalCarouselVariantData[] = [
    {
      image: dondeSalgoBg,
      title: t("dondeSalgo.title"),
      description: t("dondeSalgo.description"),
      routerPath: projectsRoutes.dondeSalgo,
    },
    {
      image: vanicraciaBg,
      title: t("vanicracia.title"),
      description: t("vanicracia.description"),
      routerPath: projectsRoutes.vanicracia,
    },
    {
      image: alfombrasTauroBg,
      title: t("alfombrasTauro.title"),
      description: t("alfombrasTauro.description"),
      routerPath: projectsRoutes.alfombrasTauro,
    },
    {
      image: spotifyBg,
      title: t("spotifyMobile.title"),
      description: t("spotifyMobile.description"),
      routerPath: projectsRoutes.spotifyMobile
    },
  ]

  return (
    <MotionSlide direction="down">
      <HorizontalCarouselVariant items={horizontalCarouselItems} />
    </MotionSlide>
  );
};

export default HorizontalCarouselSection;