import ButtonWithArrow from "@/components/ui/buttons/ButtonWithArrow";
import Image, { type StaticImageData } from "next/image";

export type HorizontalCarouselVariantData = {
  image: string | StaticImageData;
  title: string;
  description: string;
};

type HorizontalCarouselVariantItemProps = {
  data: HorizontalCarouselVariantData;
};

const HorizontalCarouselVariantItem = ({ data }: HorizontalCarouselVariantItemProps) => {
  return (
    <div className="h-[20rem] relative">
      <Image
        src={data.image}
        alt={data.title}
        className="h-full w-full rounded-3xl"
      />
      <div className="w-2/3 h-full bg-black/50 shadow-s4 absolute right-0 bottom-0 p-[3rem] flex flex-col justify-between">
        <p className="text-soft-white">
          {data.title}
        </p>
        <p className="text-soft-gray w-full line-clamp-4">
          {data.description}
        </p>
        <ButtonWithArrow small text="Ver más" />
      </div>
    </div>
  );
};

export default HorizontalCarouselVariantItem;
