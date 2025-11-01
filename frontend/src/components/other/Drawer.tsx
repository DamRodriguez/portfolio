import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useEffect } from "react";
import clsx from "clsx";
import { CloseIcon } from "@/components/icons/header";
import useScreen from "@/hooks/useScreen";
import config from "@/config/config";

type DrawerProps = {
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

const Drawer = ({
  children,
  visible,
  onClose,
  className,
  closeButtonClassName,
  position = "right",
  closeButton = <CloseIcon className="fill-[#fff]" />,
  transition = { duration: 0.4, ease: "easeInOut" },
  overlayClassName,
  hideOverlay,
  disableOutsideOnClose,
}: DrawerProps) => {
  const drawerPosition = {
    left: {
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
      className: "top-0 bottom-0 left-0",
    },
    right: {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
      className: "top-0 bottom-0 right-0",
    },
    top: {
      initial: { y: "-100%" },
      animate: { y: 0 },
      exit: { y: "-100%" },
      className: "left-0 right-0 top-0",
    },
    bottom: {
      initial: { y: "100%" },
      animate: { y: 0 },
      exit: { y: "100%" },
      className: "left-0 right-0 bottom-0",
    },
  };
  const { screenWidth } = useScreen();
  const isXlDown = screenWidth < config.breakpoints.xl;

  useEffect(() => {
    if (visible) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${String(scrollbarWidth)}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }
  }, [visible, isXlDown]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={drawerPosition[position].initial}
            animate={drawerPosition[position].animate}
            exit={drawerPosition[position].exit}
            transition={transition}
            className={clsx(
              "fixed top-0 z-999 w-full h-screen overflow-hidden shadow-s4",
              className,
              drawerPosition[position].className,
            )}
          >
            {closeButton && (
              <button
                onClick={onClose}
                className={clsx("z-999 absolute cursor-pointer right-[1.5rem] top-[1.5rem]", closeButtonClassName)}
              >
                {closeButton}
              </button>
            )}
            {children}
          </motion.div>
          {!disableOutsideOnClose && (
            <div
              onClick={onClose}
              className="fixed top-0 left-0 w-full h-full z-900"
            />
          )}
          {!hideOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={clsx("fixed top-0 left-0 w-full h-full bg-[#000] z-800", overlayClassName)}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
