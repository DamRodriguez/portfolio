import clsx from "clsx";
import MotionStretch from "@/components/motion/MotionStretch";
import { BorderBeam } from "@/components/magic-ui/border-beam"
import useIsMobile from "@/hooks/useIsMobile";

type SectionSeparatorProps = {
  className?: string;
};

const SectionSeparator = ({ className }: SectionSeparatorProps) => {
  const isMobile = useIsMobile();
  return (
    <MotionStretch>
      <div className={clsx("h-[0.03125rem] w-full bg-soft-gray/30 relative", className)}>
        <BorderBeam initialOffset={50} duration={8} size={isMobile ? 200 : 1000} colorFrom="var(--color-soft-gray/30)" colorTo="var(--color-opaque-gray)" />
      </div>
    </MotionStretch>
  );
};

export default SectionSeparator;
