"use client";
import clsx from "clsx";
import { CSSProperties } from "react";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
};

const SpaceX = ({ children, className, id }: SectionProps) => {
  return (
    <div
      id={id}
      className={clsx(
        "px-[1rem] anchor-offset",
        "md:px-[6rem]",
        "xl:px-[9rem]",
        "4xl:px-[15rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default SpaceX;
