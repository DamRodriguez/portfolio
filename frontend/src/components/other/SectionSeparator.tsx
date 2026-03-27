import clsx from "clsx";
import MotionStretch from "@/components/motion/MotionStretch";
import { useRef } from "react";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

type SectionSeparatorProps = {
  className?: string;
};

const SectionSeparator = ({ className }: SectionSeparatorProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useScrollAnimations({
    animations: {
      ".project-item-separator": {
        scale: 0.6,
        opacity: 0,
      }
    },
    scope: itemRef
  })

  return (
    <div ref={itemRef} className={className}>
      <MotionStretch>
        <div className={clsx("project-item-separator h-[0.03125rem] w-full bg-soft-gray/30 shadow-s3")} />
      </MotionStretch>
    </div>
  );
};

export default SectionSeparator;
