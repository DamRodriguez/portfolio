import config from "@/config/config";
import { useCallback, useSyncExternalStore } from "react";

const useBreakpoint = (
  breakpoint = Number(config.breakpoints.xl),
  type: "max" | "min" = "max",
) => {
  const query = `(${type}-width: ${breakpoint}px)`;

  const subscribe = useCallback(
    (callback: () => void) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", callback);

      return () => mediaQuery.removeEventListener("change", callback);
    },
    [query],
  );

  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

export default useBreakpoint;
