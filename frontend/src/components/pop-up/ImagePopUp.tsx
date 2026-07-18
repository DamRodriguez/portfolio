"use client";
import { PopUp } from "@/components/pop-up/PopUp";
import Image from "next/image";

type ImagePopUpProps = {
  image: string;
  alt?: string;
  onClose: () => void;
};

export const ImagePopUp = ({
  image,
  alt = "Imagen ampliada",
  onClose,
}: ImagePopUpProps) => {
  return (
    <PopUp
      isOpen={!!image}
      onClose={onClose}
      containerClassName="border-soft-white/10 border shadow-s1 rounded-[0.5rem] xl:rounded-2xl overflow-hidden rounded-tr-[1.8rem] xl:rounded-tr-[2rem]"
      closeButtonClassName="m-2"
    >
      <Image src={image} alt={alt} width={1200} height={800} />
    </PopUp>
  );
};
