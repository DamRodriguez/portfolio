import Main from "@/components/layout/Main";
import AboutMeSection from "@/components/sections/about-me-section/AboutMeSection";
import HeadSection from "@/components/sections/head-section/HeadSection";
import WorkSection from "@/components/sections/work-section/WorkSection";

const HomePage = () => {
  return (
    <Main className="gap-[8rem] xl:gap-[12rem]">
      <HeadSection />
      <AboutMeSection />
      <WorkSection />
    </Main>
  )
}

export default HomePage;