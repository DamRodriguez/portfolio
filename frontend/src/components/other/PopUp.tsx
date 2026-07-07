"use client";
import SpaceX from "@/components/layout/SpaceX";
import MotionOpacity from "@/components/motion/MotionOpacity";
import CloseButton from "@/components/ui/buttons/CloseButton";
import { useScrollLock } from "@/hooks/useScrollLock";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PopUpProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactElement<{ className?: string }>;
  containerClassName?: string;
  closeButtonClassName?: string;
  lockScroll?: boolean;
};

export const PopUp = ({
  isOpen,
  onClose,
  children,
  containerClassName,
  closeButtonClassName,
  lockScroll,
}: PopUpProps) => {
  const [mounted, setMounted] = useState(false);

  useScrollLock(isOpen && !lockScroll);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const mediaClassName = "h-auto w-auto max-w-full object-contain";

  const childWithClass = React.cloneElement(children, {
    className: `${children.props.className ?? ""} ${mediaClassName}`,
  });

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <MotionOpacity
          duration={0.3}
          className="fixed inset-0 z-99999999 popup-glass flex items-center justify-center"
          onClick={onClose}
        >
          <SpaceX className="w-full xl:w-fit">
            <div
              className={clsx("relative max-h-[90vh]", containerClassName)}
              onClick={(e) => e.stopPropagation()}
            >
              {childWithClass}

              <div
                className={clsx("absolute top-0 right-0", closeButtonClassName)}
              >
                <CloseButton onClose={onClose} />
              </div>
            </div>
          </SpaceX>
        </MotionOpacity>
      )}
    </AnimatePresence>,
    document.body,
  );
};
