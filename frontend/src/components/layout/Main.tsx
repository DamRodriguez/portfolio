import clsx from "clsx";
import { Ref } from "react";

type MainProps = {
  children: React.ReactNode;
  className?: string;
  ref?: Ref<HTMLElement>;
};

const Main = ({ children, className, ref }: MainProps) => {
  return (
    <main ref={ref} className={clsx("flex flex-col", className)}>
      {children}
    </main>
  );
};

export default Main;
