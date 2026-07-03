import clsx from "clsx";

type MainProps = {
  children: React.ReactNode;
  className?: string;
};

const Main = ({ children, className }: MainProps) => {
  return (
    <main
      className={clsx(
        "min-h-dvh overflow-hidden flex flex-col pt-[calc(var(--height-header-mobile)+1.5rem)] xl:pt-[calc(var(--height-header-desktop)+3rem)]",
        className,
      )}
    >
      {children}
    </main>
  );
};

export default Main;
