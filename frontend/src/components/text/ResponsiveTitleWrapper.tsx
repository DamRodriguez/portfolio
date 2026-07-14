"use client";
import SplitTextWrapper from "@/components/gsap/SplitTextWrapper";
import MotionSlide from "@/components/motion/MotionSlide";
import useBreakpoint from "@/hooks/useBreakpoint";

type ResponsiveTitleWrapperProps = {
  children: React.ReactNode;
  direction: "left" | "right";
  order: number;
};

export default function ResponsiveTitleWrapper({
  children,
  direction,
  order,
}: ResponsiveTitleWrapperProps) {
  const isMobile = useBreakpoint();

  if (isMobile) {
    return (
      <MotionSlide direction={direction} order={order}>
        {children}
      </MotionSlide>
    );
  }

  return <SplitTextWrapper order={order}>{children}</SplitTextWrapper>;
}
