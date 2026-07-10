import ViewportActiveSection from "@/components/gsap/in-view/ViewportActiveSection";
import Main from "@/components/layout/Main";
import AboutMeSection from "@/components/sections/about-me-section/AboutMeSection";
import ContactSection from "@/components/sections/contact/ContactSection";
import FooterSection from "@/components/sections/footer/FooterSection";
import HeadSection from "@/components/sections/head-section/HeadSection";
import ProjectsSection from "@/components/sections/projects-section/ProjectsSection";
import ServicesSection from "@/components/sections/services/ServicesSection";
import WorkSection from "@/components/sections/work/WorkSection";

export default function HomePage() {
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
