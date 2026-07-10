"use client";
import { ActiveSection } from "@/redux/active-section/activeSectionSlice";
import useActiveSection from "@/redux/active-section/useActiveSection";
import ViewportTrigger from "./ViewportTrigger";

type Props = {
  section: ActiveSection;
  children: React.ReactNode;
};

export default function ViewportActiveSection({ section, children }: Props) {
  const { setActiveSection } = useActiveSection();

  return (
    <ViewportTrigger
      className="w-full"
      onEnter={() => setActiveSection(section)}
      onEnterBack={() => setActiveSection(section)}
      onLeave={() => setActiveSection(undefined)}
      onLeaveBack={() => setActiveSection(undefined)}
    >
      {children}
    </ViewportTrigger>
  );
}
