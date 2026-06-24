import Main from "@/components/layout/Main";
import ViewportActiveSection from "@/components/other/ViewportActiveSection";
import AboutMeSection from "@/components/sections/about-me-section/AboutMeSection";
import ContactSection from "@/components/sections/contact/ContactSection";
import HeadSection from "@/components/sections/head-section/HeadSection";
import ProjectsSection from "@/components/sections/projects-section/ProjectsSection";
import ServicesSection from "@/components/sections/services/ServicesSection";
import WorkSection from "@/components/sections/work/WorkSection";

const HomePage = () => {
  return (
    <Main className="gap-[9rem] xl:gap-[15rem]">
      <HeadSection />

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
    </Main>
  );
};

export default HomePage;
