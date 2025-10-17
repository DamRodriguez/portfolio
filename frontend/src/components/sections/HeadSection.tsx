import SpaceX from "@/components/layout/SpaceX";
import ButtonWithArrow from "@/components/ui/buttons/ButtonWithArrow";
import HorizontalCarouselVariant from "../carousel/horizontal-carousel-variant/HorizontalCarouselVariant";
import MotionSlide from "../motion/MotionSlide";
import MotionFade from "../motion/MotionFade";
import { horizontalCarouselItems } from "@/constants/data/horizontalCarouselData";
import SocialButtonsSection from "../other/SocialButtonsSection";

const HeadSection = () => {
  return (
    <SpaceX className="flex flex-col gap-[3rem] xl:gap-[4rem]">

      <div className="flex flex-col gap-[2rem]">
        <div className="w-full flex flex-col -space-y-[2rem] lg:-space-y-[3rem]">
          <div className="flex justify-center xl:justify-between items-center">
            <MotionSlide>
              <h1 className="text-6xl lg:text-8xl xl:text-9xl 2xl:text-10xl text-soft-white font-bold font-fira-code">
                Front-end
              </h1>
            </MotionSlide>
            <MotionFade className="hidden 2xl:flex">
              <ButtonWithArrow text="Proyectos" />
            </MotionFade>
          </div>
          <div className="flex flex-col-reverse text-center xl:text-start items-center xl:flex xl:flex-row xl:justify-between xl:items-center gap-[1rem]">
            <MotionFade className="max-w-[70%] xl:max-w-[30%]">
              <p className="text-base 2xl:text-xl text-soft-gray">
                Mi objetivo es desarrollar
                <span className="text-soft-white">
                  {" "}interfaces atractivas{" "}
                </span>
                utilizando
                <span className="text-soft-white">
                  {" "}tecnologías modernas
                </span>
                , manteniendo un
                <span className="text-soft-white">
                  {" "}código limpio
                </span>
                ,
                <span className="text-soft-white">
                  {" "}eficiente{" "}
                </span>
                y
                <span className="text-soft-white">
                  {" "}escalable
                </span>
                .
              </p>
            </MotionFade>
            <MotionSlide direction="right">
              <h1 className="text-6xl lg:text-8xl xl:text-9xl 2xl:text-10xl text-soft-white font-bold font-fira-code">
                Developer
              </h1>
            </MotionSlide>
          </div>
        </div>
        <MotionFade className="flex 2xl:hidden justify-center">
          <ButtonWithArrow text="Proyectos" />
        </MotionFade>
      </div>

      <SocialButtonsSection />

      <MotionSlide direction="down">
        <HorizontalCarouselVariant items={horizontalCarouselItems} />
      </MotionSlide>
    </SpaceX>
  );
};

export default HeadSection;