import clsx from "clsx";

type HamburgerButtonProps = {
  isMobileNavVisible: boolean;
  setIsMobileNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
  containerClassName?: string;
};

export default function HamburgerButton({
  isMobileNavVisible,
  setIsMobileNavVisible,
  containerClassName,
}: HamburgerButtonProps) {
  const handleToggleMobileNav = () => {
    setIsMobileNavVisible((prev) => !prev);
  };

  return (
    <div className={clsx("flex 2xl:hidden", containerClassName)}>
      <button
        onClick={handleToggleMobileNav}
        className="relative flex h-[2rem] w-[2rem] cursor-pointer items-center justify-center"
        aria-label={
          isMobileNavVisible
            ? "Cerrar menú de navegación"
            : "Abrir menú de navegación"
        }
        aria-expanded={isMobileNavVisible}
      >
        <span
          className={clsx(
            "absolute h-[2px] w-[1.5rem] rounded-full bg-black dark:bg-soft-white theme-transition-all",
            isMobileNavVisible
              ? "translate-y-0 rotate-45"
              : "-translate-y-[0.3rem] rotate-0",
          )}
        />

        <span
          className={clsx(
            "absolute h-[2px] w-[1.5rem] rounded-full bg-black dark:bg-soft-white theme-transition-all",
            isMobileNavVisible
              ? "translate-y-0 -rotate-45"
              : "translate-y-[0.3rem] rotate-0",
          )}
        />
      </button>
    </div>
  );
}
