"use client";
import ViewportActiveSection from "@/components/gsap/in-view/ViewportActiveSection";
import AboutMeSection from "@/components/home/sections/about-me-section/AboutMeSection";
import AboutMeSectionWrapper from "@/components/home/sections/about-me-section/AboutMeSectionWrapper";
import ContactSection from "@/components/home/sections/contact/ContactSection";
import FooterSection from "@/components/home/sections/footer/FooterSection";
import HeadSectionV2 from "@/components/home/sections/head-section/HeadSectionV2";
import ProjectsSection from "@/components/home/sections/projects-section/ProjectsSection";
import ServicesSection from "@/components/home/sections/services/ServicesSection";
import ServicesSectionWrapper from "@/components/home/sections/services/ServicesSectionWrapper";
import VerticalProjects from "@/components/home/sections/vertical-projects/VerticalProjects";
import WorkSection from "@/components/home/sections/work/WorkSection";
import Main from "@/components/layout/Main";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import useBreakpoint from "@/hooks/viewport/useBreakpoint";
import { useRef } from "react";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const isMobile = useBreakpoint();

  const aboutMeTransitionTrigger = {
    trigger: ".pin-aboutme",
    start: "bottom bottom",
    endTrigger: ".overlay-services",
    end: "bottom bottom",
    scrub: 2,
  };

  const curvedTextTrigger = {
    trigger: ".overlay-services",
    start: "top bottom",
    end: "bottom top",
    scrub: 2,
  };

  const contactSectionTransitionTrigger = {
    trigger: ".pin-contactSection",
    start: "bottom bottom",
    endTrigger: ".overlay-footer",
    end: "bottom bottom",
    scrub: 2,
  };

  useScrollAnimations({
    scope: mainRef,
    animations: {
      ".pin-aboutme": {
        scrollTrigger: {
          ...aboutMeTransitionTrigger,
          pin: true,
          pinSpacing: false,
        },
      },
      ".pin-aboutme-content": {
        scrollTrigger: aboutMeTransitionTrigger,
        from: {
          opacity: 1,
          scale: 1,
          y: 0,
        },
        to: {
          opacity: 0,
          scale: 0.8,
          y: 100,
        },
      },
      ".curved-scrolling-text": {
        scrollTrigger: curvedTextTrigger,
        individual: true,
        from: {
          attr: { startOffset: "0%" },
        },
        to: {
          attr: { startOffset: isMobile ? "-200%" : "-150%" },
        },
      },
      ".pin-contactSection": {
        scrollTrigger: {
          ...contactSectionTransitionTrigger,
          pin: true,
          pinSpacing: false,
        },
      },
      ".pin-contactSection-content": {
        scrollTrigger: contactSectionTransitionTrigger,
        from: {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        },
        to: {
          opacity: 0.2,
          scale: 0.8,
          filter: "blur(5px)",
        },
      },
    },
  });

  return (
    <Main ref={mainRef} className="relative gap-[9rem] xl:gap-[15rem]">
      <ViewportActiveSection section={undefined}>
        <HeadSectionV2 />
      </ViewportActiveSection>

      <ViewportActiveSection section={undefined}>
        <VerticalProjects />
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
