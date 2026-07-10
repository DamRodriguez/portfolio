import HorizontalCarousel from "@/components/carousel/horizontal-carousel/HorizontalCarousel";
import { HorizontalCarouselItemData } from "@/components/carousel/horizontal-carousel/HorizontalCarouselItem";
import { projectsRoutes } from "@/constants/projectsRoutes";
import { useTranslations } from "next-intl";

const HorizontalCarouselSection = () => {
  const t = useTranslations("headSection.horizontalCarousel.carouselData");

  const horizontalCarouselItems: HorizontalCarouselItemData[] = [
    {
      image: "/images/projects/spotify-mobile/logo.webp",
      title: t("spotifyMobile.title"),
      description: t("spotifyMobile.description"),
      routerPath: projectsRoutes.spotifyMobile,
    },
    {
      image: "/images/projects/lopez-propiedades/logo.webp",
      title: t("lopezPropiedades.title"),
      description: t("lopezPropiedades.description"),
      routerPath: projectsRoutes.lopezPropiedades,
    },
    {
      image: "/images/projects/vanicracia/logo.webp",
      title: t("vanicracia.title"),
      description: t("vanicracia.description"),
      routerPath: projectsRoutes.vanicracia,
    },
    {
      image: "/images/projects/alfombras-tauro/logo.webp",
      title: t("alfombrasTauro.title"),
      description: t("alfombrasTauro.description"),
      routerPath: projectsRoutes.alfombrasTauro,
    },
    {
      image: "/images/projects/donde-salgo/logo.webp",
      title: t("dondeSalgo.title"),
      description: t("dondeSalgo.description"),
      routerPath: projectsRoutes.dondeSalgo,
    },
  ];

  return <HorizontalCarousel items={horizontalCarouselItems} />;
};

export default HorizontalCarouselSection;
