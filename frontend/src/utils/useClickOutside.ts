import { useEffect } from "react";

export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  onClickOutside: () => void,
  ignoreRef?: React.RefObject<HTMLElement>,
) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedOutside =
        !ref.current.contains(target) &&
        (!ignoreRef?.current || !ignoreRef.current.contains(target));

      if (clickedOutside) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, onClickOutside, ignoreRef]);
}
