"use client";
import { CloseIcon } from "@/components/icons/header";
import clsx from "clsx";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useCallback, useEffect } from "react";

type DrawerCircleExitProps = {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  className?: string;
  closeButton?: React.ReactNode | null;
  closeButtonClassName?: string;
  position?: "left" | "right" | "bottom" | "top";
  transition?: Transition;
  overlayClassName?: string;
  hideOverlay?: boolean;
  disableOutsideOnClose?: boolean;
};

const circleOriginByPosition = {
  left: "0% 50%",
  right: "100% 50%",
  top: "50% 0%",
  bottom: "50% 100%",
};

const DrawerCircleExit = ({
  children,
  visible,
  onClose,
  className,
  closeButtonClassName,
  position = "right",
  closeButton = <CloseIcon className="fill-soft-white" />,
  transition = { duration: 0.4, ease: "easeInOut" },
  overlayClassName,
  hideOverlay,
  disableOutsideOnClose,
}: DrawerCircleExitProps) => {
  const drawerPosition = {
    left: {
      initial: { x: "-100%", clipPath: "circle(150% at 0% 50%)" },
      animate: { x: 0, clipPath: "circle(150% at 0% 50%)" },
      exit: { clipPath: "circle(0% at 0% 50%)" },
      className: "top-0 bottom-0 left-0",
    },
    right: {
      initial: { x: "100%", clipPath: "circle(150% at 100% 50%)" },
      animate: { x: 0, clipPath: "circle(150% at 100% 50%)" },
      exit: { clipPath: "circle(0% at 100% 50%)" },
      className: "top-0 bottom-0 right-0",
    },
    top: {
      initial: { y: "-100%", clipPath: "circle(150% at 50% 0%)" },
      animate: { y: 0, clipPath: "circle(150% at 50% 0%)" },
      exit: { clipPath: "circle(0% at 50% 0%)" },
      className: "left-0 right-0 top-0",
    },
    bottom: {
      initial: { y: "100%", clipPath: "circle(150% at 50% 100%)" },
      animate: { y: 0, clipPath: "circle(150% at 50% 100%)" },
      exit: { clipPath: "circle(0% at 50% 100%)" },
      className: "left-0 right-0 bottom-0",
    },
  };

  const lockScroll = useCallback(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${String(scrollbarWidth)}px`;
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }, []);

  useEffect(() => {
    if (visible) {
      lockScroll();
    }

    return () => {
      if (!visible) {
        unlockScroll();
      }
    };
  }, [visible, lockScroll, unlockScroll]);

  return (
    <AnimatePresence mode="wait" onExitComplete={unlockScroll}>
      {visible && (
        <>
          <motion.div
            initial={drawerPosition[position].initial}
            animate={drawerPosition[position].animate}
            exit={drawerPosition[position].exit}
            transition={{
              ...transition,
              clipPath: {
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
            style={{
              willChange: "transform, clip-path",
              clipPath: `circle(150% at ${circleOriginByPosition[position]})`,
            }}
            className={clsx(
              "fixed top-0 z-999 w-full h-screen overflow-hidden",
              "backface-visibility-hidden",
              className,
              drawerPosition[position].className,
            )}
          >
            {closeButton && (
              <button
                onClick={onClose}
                className={clsx(
                  "z-999 absolute cursor-pointer right-[1.5rem] top-[1.5rem]",
                  closeButtonClassName,
                )}
              >
                {closeButton}
              </button>
            )}

            {children}
          </motion.div>

          {!disableOutsideOnClose && (
            <div
              onClick={onClose}
              className="fixed top-0 left-0 w-full h-full inset-0 z-900"
            />
          )}

          {!hideOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={clsx(
                "fixed top-0 left-0 right-0 w-screen h-screen bg-black/90 dark:bg-black theme-transition-all",
                overlayClassName,
              )}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default DrawerCircleExit;
