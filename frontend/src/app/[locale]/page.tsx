import Main from "@/components/layout/Main";
import AboutMeSection from "@/components/sections/about-me-section/AboutMeSection";
import ContactSection from "@/components/sections/contact-section/ContactSection";
import HeadSection from "@/components/sections/head-section/HeadSection";
import ProjectsSection from "@/components/sections/projects-section/ProjectsSection";
import WorkSection from "@/components/sections/work-section/WorkSection";
import ViewportActiveSection from "@/components/other/ViewportActiveSection";

const HomePage = () => {
  return (
    <Main className="gap-[6rem] xl:gap-[12rem]">
      <HeadSection />
      <ViewportActiveSection section="aboutme">
        <AboutMeSection />
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
  )
}

export default HomePage;