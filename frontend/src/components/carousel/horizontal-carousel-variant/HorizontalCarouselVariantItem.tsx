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
    <div className="relative overflow-hidden">
      <div className="group overflow-hidden h-[17rem] xl:h-[20rem] rounded-3xl">
        <Image
          src={data.image}
          alt={data.title}
          className="h-full w-full rounded-3xl group-hover:scale-110 transition-all duration-400 ease-in-out"
        />
      </div>
      <div className="w-[75%] h-full bg-black/50 shadow-s4 absolute right-0 bottom-0 pr-[4rem] xl:pr-[1rem] p-[2rem] xl:p-[1rem] flex flex-col justify-between pointer-events-none">
        <p className="text-soft-white text-xl xl:text-2xl font-fira-code">
          {data.title}
        </p>
        <p className="text-soft-gray text-base w-full line-clamp-3 xl:line-clamp-4">
          {data.description}
        </p>
        <div className="pointer-events-auto">
          <ButtonWithArrow small text="Ver más" />
        </div>
      </div>
    </div>
  );
};

export default HorizontalCarouselVariantItem;
