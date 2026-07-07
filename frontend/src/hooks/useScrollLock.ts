import { getLenis } from "@/constants/lenis";
import { useCallback, useEffect } from "react";

export const useScrollLock = (isVisible: boolean) => {
  const lockScroll = useCallback(() => {
    getLenis()?.stop();

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }, []);

  const unlockScroll = useCallback(() => {
    getLenis()?.start();

    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [isVisible, lockScroll, unlockScroll]);
};
