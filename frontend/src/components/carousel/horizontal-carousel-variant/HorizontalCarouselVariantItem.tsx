import ButtonWithArrow from "@/components/ui/buttons/ButtonWithArrow";
import { useTranslations } from "next-intl";
import Image, { type StaticImageData } from "next/image";
import React from "react";

export type HorizontalCarouselVariantData = {
  image: string | StaticImageData;
  title: string;
  description: string;
  routerPath: string;
};

type HorizontalCarouselVariantItemProps = {
  data: HorizontalCarouselVariantData;
};

const HorizontalCarouselVariantItem = ({ data }: HorizontalCarouselVariantItemProps) => {
  const t = useTranslations("headSection.horizontalCarousel")
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-s1">
      <div className="group h-[17rem] xl:h-[20rem]">
        <Image
          src={data.image}
          alt={data.title}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          className="h-full w-full group-hover:scale-110 theme-transition-all object-cover"
        />
      </div>
      <div className="w-[75%] h-full bg-soft-white/80 dark:bg-black/70 shadow-s4 backdrop-blur-[0.2rem] absolute right-0 bottom-0 pr-[4rem] xl:pr-[1rem] px-[1rem] xl:px-[1rem] py-[2rem] flex flex-col justify-between pointer-events-none items-start theme-transition rounded-r-3xl"
      >
        <p className="text-black dark:text-soft-white text-xl xl:text-2xl font-fira-code theme-transition">
          {data.title}
        </p>
        <p className="text-black dark:text-soft-white text-sm sm:text-base 2xl:text-lg w-full 2xl:w-[80%] line-clamp-4 theme-transition">
          {data.description}
        </p>
        <div className="pointer-events-auto">
          <ButtonWithArrow
            small
            text={t("seeMoreButton")}
            routerPath={data.routerPath}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(HorizontalCarouselVariantItem)