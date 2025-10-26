import ButtonWithArrow from "@/components/ui/buttons/ButtonWithArrow";
import { useTranslations } from "next-intl";
import Image, { type StaticImageData } from "next/image";

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
    <div className="relative overflow-hidden shadow-s6 rounded-3xl">
      <div className="group overflow-hidden h-[17rem] xl:h-[20rem] rounded-3xl">
        <Image
          src={data.image}
          alt={data.title}
          className="h-full w-full rounded-3xl group-hover:scale-110 transition-all duration-400 ease-in-out object-cover"
        />
      </div>
      <div className="w-[75%] h-full bg-black/70 shadow-s4 backdrop-blur-[0.1rem] absolute right-0 bottom-0 pr-[4rem] xl:pr-[1rem] px-[1rem] xl:px-[1rem] py-[2rem] flex flex-col justify-between pointer-events-none items-start rounded-r-3xl">
        <p className="text-soft-white text-xl xl:text-2xl font-fira-code">
          {data.title}
        </p>
        <p className="text-soft-white text-sm xl:text-base w-full line-clamp-4">
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

export default HorizontalCarouselVariantItem;
