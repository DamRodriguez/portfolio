import clsx from "clsx";
import { CSSProperties, Ref } from "react";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
};

const SpaceX = ({ children, className, id, style, ref }: SectionProps) => {
  return (
    <div
      ref={ref}
      id={id}
      style={style}
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
