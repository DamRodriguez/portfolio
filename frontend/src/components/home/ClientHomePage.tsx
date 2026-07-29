"use client";
import ViewportActiveSection from "@/components/gsap/in-view/ViewportActiveSection";
import AboutMeSection from "@/components/home/sections/about-me-section/AboutMeSection";
import ContactSection from "@/components/home/sections/contact/ContactSection";
import FooterSection from "@/components/home/sections/footer/FooterSection";
import HeadSection from "@/components/home/sections/head-section/HeadSection";
import ProjectsSection from "@/components/home/sections/projects-section/ProjectsSection";
import ServicesSection from "@/components/home/sections/services/ServicesSection";
import WorkSection from "@/components/home/sections/work/WorkSection";
import Main from "@/components/layout/Main";

export default function ClientHomePage() {
  return (
    <Main className="gap-[9rem] xl:gap-[15rem]">
      <ViewportActiveSection section={undefined}>
        <HeadSection />
      </ViewportActiveSection>

      <ViewportActiveSection section="aboutme">
        <AboutMeSection />
      </ViewportActiveSection>

      <ViewportActiveSection section="services">
        <ServicesSection />
      </ViewportActiveSection>

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
