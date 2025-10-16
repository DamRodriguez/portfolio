import SpaceX from "@/components/layout/SpaceX";
import Button from "@/components/ui/buttons/Button";
import { GithubIcon, InstagramIcon, LinkedInIcon, TelegramIcon } from "@/components/icons/social";
import clsx from "clsx";
import ButtonWithArrow from "@/components/ui/buttons/ButtonWithArrow";
import HorizontalCarouselVariant from "../carousel/horizontal-carousel-variant/HorizontalCarouselVariant";
import { HorizontalCarouselVariantData } from "../carousel/horizontal-carousel-variant/HorizontalCarouselVariantItem";
import bgTest from "@/assets/images/bg-test.png"

const HeadSection = () => {
  const socialButtons = [
    { icon: InstagramIcon, text: "Instagram" },
    { icon: TelegramIcon, text: "Telegram" },
    { icon: LinkedInIcon, text: "LinkedIn" },
    { icon: GithubIcon, text: "Github" }
  ]

  const carouselItems: HorizontalCarouselVariantData[] = [
    { image: bgTest, title: "Titulo", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quaerat? Aut nobis quis optio aperiam eius consequatur nemo pariatur reiciendis cum accusamus dolores doloribus atque tempore, totam reprehenderit recusandae voluptatem?" },
    { image: bgTest, title: "asd", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quaerat? Aut nobis quis optio aperiam eius consequatur nemo pariatur reiciendis cum accusamus dolores doloribus atque tempore, totam reprehenderit recusandae voluptatem?" },
    { image: bgTest, title: "asd", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quaerat? Aut nobis quis optio aperiam eius consequatur nemo pariatur reiciendis cum accusamus dolores doloribus atque tempore, totam reprehenderit recusandae voluptatem?" },
    { image: bgTest, title: "asd", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quaerat? Aut nobis quis optio aperiam eius consequatur nemo pariatur reiciendis cum accusamus dolores doloribus atque tempore, totam reprehenderit recusandae voluptatem?" },
  ]

  return (
    <SpaceX className="flex flex-col gap-[3rem]">
      <div className="w-full flex flex-col -space-y-[3rem]">
        <div className="flex justify-between items-center">
          <h1 className="text-10xl text-soft-white font-bold font-fira-code">
            Front-end
          </h1>
          <ButtonWithArrow text="Proyectos" />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xl text-soft-gray max-w-[30%]">
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
          <h1 className="text-10xl text-soft-white font-bold font-fira-code">
            Developer
          </h1>
        </div>
      </div>

      <div className="flex gap-[3rem] justify-center">
        {socialButtons.map((item, index) => {
          const Icon = item.icon
          return (
            <Button
              key={index}
              className={clsx("h-fit",
                {
                  "mt-[0.7rem] ": index === 0 || index === socialButtons.length - 1
                }
              )}
            >
              <Icon />
              <p>
                {item.text}
              </p>
            </Button>
          )
        })}
      </div>

      <HorizontalCarouselVariant items={carouselItems} />
    </SpaceX>
  );
};

export default HeadSection;