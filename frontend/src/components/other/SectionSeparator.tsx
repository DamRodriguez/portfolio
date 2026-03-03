import clsx from "clsx";
import MotionStretch from "@/components/motion/MotionStretch";

type SectionSeparatorProps = {
  className?: string;
};

const SectionSeparator = ({ className }: SectionSeparatorProps) => {
  return (
    <MotionStretch>
      <div className={clsx("h-[0.03125rem] w-full bg-soft-gray/30", className)} />
    </MotionStretch>
  );
};

export default SectionSeparator;
