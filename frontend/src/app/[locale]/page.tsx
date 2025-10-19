import Main from "@/components/layout/Main";
import AboutMeSection from "@/components/sections/about-me-section/AboutMeSection";
import HeadSection from "@/components/sections/head-section/HeadSection";

const HomePage = () => {
  return (
    <Main className="gap-[10rem] xl:gap-[15rem]">
      <HeadSection />
      <AboutMeSection />
    </Main>
  )
}

export default HomePage;