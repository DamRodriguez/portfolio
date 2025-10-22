import Main from "@/components/layout/Main";
import AboutMeSection from "@/components/sections/about-me-section/AboutMeSection";
import HeadSection from "@/components/sections/head-section/HeadSection";
import ProjectsSection from "@/components/sections/projects-section/ProjectsSection";
import WorkSection from "@/components/sections/work-section/WorkSection";

const HomePage = () => {
  return (
    <Main className="gap-[6rem] xl:gap-[12rem]">
      <HeadSection />
      <AboutMeSection />
      <WorkSection />
      <ProjectsSection />
    </Main>
  )
}

export default HomePage;