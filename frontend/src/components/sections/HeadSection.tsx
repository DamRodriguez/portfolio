import SpaceX from "@/components/layout/SpaceX";
import Button from "@/components/ui/buttons/Button";
import { GithubIcon, LinkedInIcon, TelegramIcon, WhatsAppIcon } from "@/components/icons/social";
import clsx from "clsx";
import ButtonWithArrow from "@/components/ui/buttons/ButtonWithArrow";
import HorizontalCarouselVariant from "../carousel/horizontal-carousel-variant/HorizontalCarouselVariant";
import { HorizontalCarouselVariantData } from "../carousel/horizontal-carousel-variant/HorizontalCarouselVariantItem";
import bgTest from "@/assets/images/bg-test.png"
import config from "@/config/config";

const HeadSection = () => {
  const socialButtons = [
    { icon: TelegramIcon, text: "Telegram", href: config.urls.telegram },
    { icon: LinkedInIcon, text: "LinkedIn", href: config.urls.linkedin },
    { icon: GithubIcon, text: "Github", href: config.urls.github },
    { icon: WhatsAppIcon, text: "WhatsApp", href: config.urls.whatsapp }
  ]

  const carouselItems: HorizontalCarouselVariantData[] = [
    { image: bgTest, title: "Titulo", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quaerat? Aut nobis quis optio aperiam eius consequatur nemo pariatur reiciendis cum accusamus dolores doloribus atque tempore, totam reprehenderit recusandae voluptatem?" },
    { image: bgTest, title: "Titulo", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quaerat? Aut nobis quis optio aperiam eius consequatur nemo pariatur reiciendis cum accusamus dolores doloribus atque tempore, totam reprehenderit recusandae voluptatem?" },
    { image: bgTest, title: "Titulo", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quaerat? Aut nobis quis optio aperiam eius consequatur nemo pariatur reiciendis cum accusamus dolores doloribus atque tempore, totam reprehenderit recusandae voluptatem?" },
    { image: bgTest, title: "Titulo", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quaerat? Aut nobis quis optio aperiam eius consequatur nemo pariatur reiciendis cum accusamus dolores doloribus atque tempore, totam reprehenderit recusandae voluptatem?" },
  ]

  return (
    <SpaceX className="flex flex-col gap-[3rem] xl:gap-[4rem]">

      <div className="flex flex-col gap-[2rem]">
        <div className="w-full flex flex-col -space-y-[2rem] lg:-space-y-[3rem]">
          <div className="flex justify-center xl:justify-between items-center">
            <h1 className="text-6xl lg:text-8xl xl:text-9xl 2xl:text-10xl text-soft-white font-bold font-fira-code">
              Front-end
            </h1>
            <div className="hidden 2xl:flex">
              <ButtonWithArrow text="Proyectos" />
            </div>
          </div>
          <div className="flex flex-col-reverse text-center xl:text-start items-center xl:flex xl:flex-row xl:justify-between xl:items-center gap-[1rem]">
            <p className="text-base 2xl:text-xl text-soft-gray max-w-[70%] xl:max-w-[30%]">
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
            <h1 className="text-6xl lg:text-8xl xl:text-9xl 2xl:text-10xl text-soft-white font-bold font-fira-code">
              Developer
            </h1>
          </div>
        </div>
        <div className="flex 2xl:hidden justify-center">
          <ButtonWithArrow text="Proyectos" />
        </div>
      </div>

      <div className="flex flex-wrap gap-[1.5rem] xl:gap-[3rem] justify-center">
        {socialButtons.map((item, index) => {
          const Icon = item.icon
          return (
            <Button
              routerPathNewTab={item.href}
              key={index}
              className={clsx("h-fit",
                {
                  "xl:mt-[0.7rem] ": index === 0 || index === socialButtons.length - 1
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