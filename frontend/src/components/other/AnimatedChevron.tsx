import clsx from "clsx";

type AnimatedChevronProps = {
  isOpen: boolean;
  small?: boolean;
};

export function AnimatedChevron({
  isOpen,
  small = false,
}: AnimatedChevronProps) {
  const getArrowIconClassName = () => {
    if (isOpen) return `bg-black dark:bg-soft-white`;
    return `bg-soft-gray dark:bg-opaque-gray`;
  };

  const sizeClass = small ? "w-2.5 h-2.5" : "w-4 h-4";

  const lineWidth = small ? "w-1.5 h-[1px]" : "w-2.5 h-[1.5px]";

  return (
    <div className={clsx("relative", sizeClass)}>
      <span
        className={clsx(
          "absolute left-0 top-1/2 origin-center theme-transition-all",
          lineWidth,
          isOpen ? "rotate-45 -translate-y-1/2" : "-rotate-45 -translate-y-1/2",
          getArrowIconClassName(),
        )}
      />

      <span
        className={clsx(
          "absolute right-0 top-1/2 origin-center theme-transition-all",
          lineWidth,
          isOpen ? "-rotate-45 -translate-y-1/2" : "rotate-45 -translate-y-1/2",
          getArrowIconClassName(),
        )}
      />
    </div>
  );
}
