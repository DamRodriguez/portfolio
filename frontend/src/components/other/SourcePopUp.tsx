"use client";
import MotionOpacity from "@/components/motion/MotionOpacity";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../icons/header";

type SourcePopUpProps = {
  source: string | null;
  onClose: () => void;
  children: React.ReactElement<{ className?: string }>;
};

export const SourcePopUp = ({
  source,
  onClose,
  children,
}: SourcePopUpProps) => {
  const [mounted, setMounted] = useState(false);

  useLockBodyScroll(!!source);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const mediaClassName =
    "h-auto w-auto max-w-full max-h-[90vh] rounded-[0.5rem] object-contain bg-black/75";

  const childWithClass = React.cloneElement(children, {
    className: `${children.props.className ?? ""} ${mediaClassName}`,
  });

  return createPortal(
    <AnimatePresence>
      {source && (
        <MotionOpacity
          duration={0.3}
          className="fixed inset-0 z-99999999 bg-black/90 flex items-center justify-center"
          onClick={onClose}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] rounded-[0.5rem] xl:rounded-2xl overflow-hidden rounded-tr-[1.3rem] xl:rounded-tr-[2rem] shadow-s1 border border-soft-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {childWithClass}

            <button
              type="button"
              onClick={onClose}
              className="absolute top-0 right-0 cursor-pointer p-[0.4rem] xl:p-[0.5rem] bg-black/60 backdrop-blur-[0.2rem] border border-soft-gray rounded-full m-1 xl:m-2 transition-all duration-400 ease-in-out [&_svg]:fill-[#fff] hover:[&_svg]:fill-[#000] hover:bg-soft-white hover:border-black"
            >
              <CloseIcon className="w-[1.5rem] h-[1.5rem] xl:w-[2rem] xl:h-[2rem] transition-all duration-400 ease-in-out" />
            </button>
          </div>
        </MotionOpacity>
      )}
    </AnimatePresence>,
    document.body,
  );
};
