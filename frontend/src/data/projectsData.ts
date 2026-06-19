import { ProjectItemData } from "@/components/sections/projects-section/ProjectItem";
import config from "@/config/config";

// Primero se cargan los textos del proyecto en messages (es - en) y luego con la clave del nombre se completa el objeto.
export const projectsData: ProjectItemData[] = [
  {
    translationKey: "spotifyMobile",
    button: {
      type: "repository",
      link: config.repositories.spotifyMobile,
    },
    imageSource: {
      type: "mobile",
      images: [
        "/images/projects/spotify-mobile/image1.webp",
        "/images/projects/spotify-mobile/image2.webp",
        "/images/projects/spotify-mobile/image3.webp",
        "/images/projects/spotify-mobile/image4.webp",
      ],
    },
    demoVideo: "/videos/projects/spotify-mobile/spotify-mobile.mp4",
  },
  {
    translationKey: "lopezPropiedades",
    button: {
      type: "site",
      link: config.projects.lopezPropiedades,
    },
    imageSource: {
      type: "default",
      images: {
        rectangular: "/images/projects/lopez-propiedades/rectangular.webp",
        vertical: "/images/projects/lopez-propiedades/vertical.webp",
        square: "/images/projects/lopez-propiedades/square.webp",
        horizontal: "/images/projects/lopez-propiedades/horizontal.webp",
        extra: [
          "/images/projects/lopez-propiedades/actualizar-propiedad.webp",
          "/images/projects/lopez-propiedades/lista-propiedades.webp",
          "/images/projects/lopez-propiedades/contacto.webp",
          "/images/projects/lopez-propiedades/detalle-propiedad.webp",
          "/images/projects/lopez-propiedades/venta-propiedades.webp",
        ],
      },
    },
  },
  {
    translationKey: "vanicracia",
    button: {
      type: "site",
      link: config.projects.vanicracia,
    },
    imageSource: {
      type: "default",
      images: {
        rectangular: "/images/projects/vanicracia/rectangular.webp",
        vertical: "/images/projects/vanicracia/vertical.webp",
        square: "/images/projects/vanicracia/square.webp",
        horizontal: "/images/projects/vanicracia/horizontal.webp",
      },
    },
  },
  {
    translationKey: "alfombrasTauro",
    button: {
      type: "site",
      link: config.projects.alfombrasTauro,
    },
    imageSource: {
      type: "default",
      images: {
        rectangular: "/images/projects/alfombras-tauro/rectangular.webp",
        vertical: "/images/projects/alfombras-tauro/vertical.webp",
        square: "/images/projects/alfombras-tauro/square.webp",
        horizontal: "/images/projects/alfombras-tauro/horizontal.webp",
      },
    },
  },
  {
    translationKey: "dondeSalgo",
    button: {
      type: "inDevelopment",
    },
    imageSource: {
      type: "default",
      images: {
        rectangular: "/images/projects/donde-salgo/rectangular.webp",
        vertical: "/images/projects/donde-salgo/vertical.webp",
        square: "/images/projects/donde-salgo/square.webp",
        horizontal: "/images/projects/donde-salgo/horizontal.webp",
      },
    },
  },
];
