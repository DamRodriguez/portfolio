import HorizontalCarouselVariant from "@/components/carousel/horizontal-carousel-variant/HorizontalCarouselVariant";
import { HorizontalCarouselVariantData } from "@/components/carousel/horizontal-carousel-variant/HorizontalCarouselVariantItem";
import { projectsRoutes } from "@/constants/projectsRoutes";
import { useTranslations } from "next-intl";

const HorizontalCarouselSection = () => {
  const t = useTranslations("headSection.horizontalCarousel.carouselData");

  const horizontalCarouselItems: HorizontalCarouselVariantData[] = [
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
      isNew: true,
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

  return <HorizontalCarouselVariant items={horizontalCarouselItems} />;
};

export default HorizontalCarouselSection;
