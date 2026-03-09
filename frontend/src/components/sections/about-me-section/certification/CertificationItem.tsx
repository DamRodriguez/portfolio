"use client";
import { ImagePopUp } from "@/components/other/ImagePopUp";
import Button from "@/components/ui/buttons/Button";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { StaticImageData } from "next/image";
import { useState } from "react";

export type CertificationItemData = {
  title: string;
  place: string;
  image: StaticImageData;
  pdf: string;
}

type CertificationItemProps = {
  data: CertificationItemData;
  containerClassName?: string;
}

const CertificationItem = (props: CertificationItemProps) => {
  const data = props.data;
  const t = useTranslations("aboutMeSection.certificationSection");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = data.pdf;
    link.download = `${data.title.replace(/ /g, "-")}-Damian-Rodriguez.pdf`;
    link.click();
  };

  useScrollAnimations({
    animations: {
      ".certification-item-gsap": {
        x: 100,
        rotate: 2,
      },
    },
  })

  return (
    <>
      <div className="relative group certification-item-gsap">
        <div
          className={clsx(" group-hover:bg-soft-white/10 transition-all duration-400 ease-in-out flex items-center justify-between md:w-[70%] xl:w-[60%] gap-[1rem] p-[1rem] rounded-[1rem] border border-soft-gray/15", props.containerClassName)}
        >
          <div>
            <p className="text-soft-white text-sm xl:text-base">
              {data.title}
            </p>
          </div>

          <div>
            <p className="text-soft-white text-sm xl:text-base">
              {data.place}
            </p>
          </div>

          <div className="flex gap-2 xl:gap-4">
            <Button
              onClick={() => { setSelectedImage(data.image.src); }}
              variant="secondary"
              small
            >
              {t("buttons.see")}
            </Button>
            <Button
              onClick={handleDownload}
              small
            >
              {t("buttons.download")}
            </Button>
          </div>
        </div>
      </div>
      <ImagePopUp
        image={selectedImage}
        alt={data.title}
        onClose={() => setSelectedImage("")}
      />
    </>
  );
};

export default CertificationItem;