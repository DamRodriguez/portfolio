import Main from "@/components/layout/Main";
import AboutMeSection from "@/components/sections/about-me-section/AboutMeSection";
import ContactSection from "@/components/sections/contact-section/ContactSection";
import HeadSection from "@/components/sections/head-section/HeadSection";
import ProjectsSection from "@/components/sections/projects-section/ProjectsSection";
import WorkSection from "@/components/sections/work-section/WorkSection";
import { Particles } from "@/components/magic-ui/particles"

const HomePage = () => {
  return (
    <>
      <Particles
        className="fixed h-full inset-0 -z-999"
      />
      <Main className="gap-[6rem] xl:gap-[12rem]">
        <HeadSection />
        <AboutMeSection />
        <WorkSection />
        <ProjectsSection />
        <ContactSection />
      </Main>
    </>
  )
}

export default HomePage;