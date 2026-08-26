"use client";
import ViewportActiveSection from "@/components/gsap/in-view/ViewportActiveSection";
import ProjectsVerticalGsap from "@/components/home/ProjectsVerticalGsap";
import AboutMeSection from "@/components/home/sections/about-me-section/AboutMeSection";
import AboutMeSectionWrapper from "@/components/home/sections/about-me-section/AboutMeSectionWrapper";
import ContactSection from "@/components/home/sections/contact/ContactSection";
import FooterSection from "@/components/home/sections/footer/FooterSection";
import HeadSectionV2 from "@/components/home/sections/head-section/HeadSectionV2";
import ProjectsSection from "@/components/home/sections/projects-section/ProjectsSection";
import ServicesSection from "@/components/home/sections/services/ServicesSection";
import ServicesSectionWrapper from "@/components/home/sections/services/ServicesSectionWrapper";
import WorkSection from "@/components/home/sections/work/WorkSection";
import Main from "@/components/layout/Main";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import useBreakpoint from "@/hooks/viewport/useBreakpoint";
import { useMemo, useRef } from "react";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useBreakpoint();

  const aboutMeTransitionTrigger = useMemo(
    () => ({
      trigger: ".pin-projects",
      start: "bottom bottom",
      endTrigger: ".overlay-services",
      end: "bottom bottom",
      scrub: 2,
    }),
    [],
  );

  const curvedTextTrigger = useMemo(
    () => ({
      trigger: ".overlay-services",
      start: "top bottom",
      end: "bottom top",
      scrub: 2,
    }),
    [],
  );

  useScrollAnimations({
    scope: mainRef,
    animations: {
      ".pin-projects": {
        scrollTrigger: {
          ...aboutMeTransitionTrigger,
          pin: true,
          pinSpacing: false,
        },
      },
      ".pin-aboutme-content": {
        from: {
          opacity: 1,
          scale: 1,
          y: 0,
        },
        to: {
          opacity: 0,
          scale: 0.85,
          y: 100,
        },
        scrollTrigger: aboutMeTransitionTrigger,
      },
      ".pin-aboutme-content-bg": {
        from: {},
        to: {},
        scrollTrigger: {
          start: "top top",
          end: "top center",
          scrub: 2,
        },
      },
      ".curved-scrolling-text": {
        from: {
          attr: { startOffset: "0%" },
        },
        to: {
          attr: { startOffset: isMobile ? "-200%" : "-150%" },
        },
        scrollTrigger: curvedTextTrigger,
      },
    },
  });

  return (
    <Main ref={mainRef} className="relative gap-[9rem] xl:gap-[15rem]">
      <ViewportActiveSection section={undefined}>
        <HeadSectionV2 />
      </ViewportActiveSection>

      <ViewportActiveSection section={undefined}>
        <ProjectsVerticalGsap />
      </ViewportActiveSection>

      <AboutMeSectionWrapper>
        <AboutMeSection />
      </AboutMeSectionWrapper>

      <ServicesSectionWrapper>
        <ServicesSection />
      </ServicesSectionWrapper>

      <ViewportActiveSection section="work">
        <WorkSection />
      </ViewportActiveSection>

      <ViewportActiveSection section="projects">
        <ProjectsSection />
      </ViewportActiveSection>

      <ViewportActiveSection section="contact">
        <ContactSection />
      </ViewportActiveSection>

      <FooterSection />
    </Main>
  );
}
