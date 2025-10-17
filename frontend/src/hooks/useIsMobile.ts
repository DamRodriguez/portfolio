import { useEffect, useState } from "react";
import config from "@/config/config";

type useIsMobileProps = {
  breakpoint?: number;
};

const useIsMobile = ({ breakpoint = Number(config.breakpoints.md) }: useIsMobileProps) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
