import { useEffect } from "react";

type Props = {
  setIsMobileNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const useCloseMobileNavOnDesktop = ({ setIsMobileNavVisible }: Props) => {
  useEffect(() => {
    let frame: number;

    const handleResize = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        if (window.innerWidth >= 1280) {
          setIsMobileNavVisible(false);
        }
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsMobileNavVisible]);
};

export default useCloseMobileNavOnDesktop;