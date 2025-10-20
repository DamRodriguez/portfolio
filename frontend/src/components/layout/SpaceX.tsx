"use client";
import clsx from "clsx";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

const SpaceX = ({ children, className, id }: SectionProps) => {
  return (
    <div id={id} className={clsx("px-[1rem] scroll-mt-[8.5rem] xl:scroll-mt-[14rem]",
      "md:px-[6rem]",
      "xl:px-[9rem]",
      "4xl:px-[15rem]",
      className)}
    >
      {children}
    </div>
  );
};

export default SpaceX;
