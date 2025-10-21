"use client";
import clsx from "clsx";

type MainProps = {
  children: React.ReactNode;
  className?: string;
};
// pading bottom temporal
const Main = ({ children, className }: MainProps) => {
  return (
    <main className={clsx("min-h-dvh overflow-hidden flex flex-col items-center py-[1.5rem] md:py-[2rem] xl:py-[3rem] pb-100", className)}>
      {children}
    </main>
  );
};

export default Main;
