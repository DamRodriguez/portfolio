import config from "@/config/config";
import { useEffect, useState } from "react";

const useBreakpoint = (breakpoint = Number(config.breakpoints.md)) => {
  const getQuery = (breakpoint: number) => `(max-width: ${breakpoint}px)`;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(getQuery(breakpoint));

    setIsMobile(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useBreakpoint;
