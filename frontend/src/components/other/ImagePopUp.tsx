"use client";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { MotionOpacity } from "@/components/motion/MotionOpacity";
import { CloseIcon } from "../icons/header";

type ImagePopUpProps = {
  image: string | null;
  alt?: string;
  onClose: () => void;
};

export const ImagePopUp = ({ image, alt = "Imagen ampliada", onClose }: ImagePopUpProps) => {
  useEffect(() => {
    if (image) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${String(scrollBarWidth)}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [image]);

  return (
    <AnimatePresence>
      {image && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[99999]"
          onClick={onClose}
        >
          <MotionOpacity>
            <div
              className="relative max-w-[90vw] max-h-[90vh] rounded-[0.5rem] xl:rounded-2xl overflow-hidden rounded-tr-[1.3rem] xl:rounded-tr-[2rem] shadow-s6 border border-soft-gray/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={image}
                alt={alt}
                width={1200}
                height={800}
                className="h-auto w-auto max-w-full max-h-[90vh] rounded-[0.5rem] object-contain"
              />
              <button
                onClick={onClose}
                className="absolute top-0 right-0 cursor-pointer p-[0.4rem] xl:p-[0.5rem] bg-black/60 backdrop-blur-[0.2rem] border border-soft-gray rounded-full m-1 xl:m-2 transition-all duration-400 ease-in-out [&_svg]:fill-[#fff] hover:[&_svg]:fill-[#000] hover:bg-soft-white hover:border-black"
              >
                <CloseIcon className="w-[1.5rem] h-[1.5rem] xl:w-[2rem] xl:h-[2rem] transition-all duration-400 ease-in-out" />
              </button>
            </div>
          </MotionOpacity>
        </div>
      )}
    </AnimatePresence>
  );
};
