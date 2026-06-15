import config from "@/config/config";
import useBreakpoint from "@/hooks/useBreakpoint";
import { AnimatePresence, motion } from "framer-motion";

type LeftTechnologyMarkerProps = {
  isSectionOnScreen: boolean;
  activeIndex: number | null;
};

export default function LeftTechnologyMarker({
  isSectionOnScreen,
  activeIndex,
}: LeftTechnologyMarkerProps) {
  const isActive = activeIndex !== null;
  const isTablet = useBreakpoint(config.breakpoints.xl);

  return (
    <AnimatePresence mode="popLayout">
      {isSectionOnScreen && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="hidden md:flex fixed left-[1rem] xl:left-[2rem] top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        >
          <motion.div
            animate={
              isActive
                ? {
                    x: isTablet ? [0, 10, 20, 20] : [0, 20, 40, 40],
                    scaleX: [1, 1, 1.2, 1],
                    scaleY: [1, 1, 0.85, 1],
                  }
                : {
                    x: 0,
                    y: 0,
                    scaleX: 1,
                    scaleY: 1,
                  }
            }
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="relative"
          >
            <div className="absolute inset-0 scale-[1] rounded-full bg-black dark:bg-soft-white dark:bg-white/15 animate-ping" />

            <div className="h-4 w-4 rounded-full bg-black dark:bg-soft-white animate-pulse" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
