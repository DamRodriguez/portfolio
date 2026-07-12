import SpaceX from "@/components/layout/SpaceX";
import MotionSlide from "@/components/motion/MotionSlide";
import ButtonWithArrow from "@/components/ui/buttons/ButtonWithArrow";
import config from "@/config/config";
import useActiveSection from "@/redux/active-section/useActiveSection";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ServicesContactSection() {
  const t = useTranslations("servicesSection.contactSection");
  const { activeSection } = useActiveSection();
  const isSectionActive = activeSection === "services";

  return (
    <AnimatePresence>
      {isSectionActive && (
        <MotionSlide
          direction="down"
          className="fixed bottom-[1rem] xl:bottom-[1.5rem] left-0 z-10 w-full flex flex-col justify-center items-center"
        >
          <SpaceX className="w-full lg:w-fit">
            <div
              className={clsx(
                "relative overflow-hidden group group/second theme-transition-all flex flex-col lg:flex-row gap-[1rem] lg:gap-[4rem] rounded-[1.5rem] lg:rounded-[3rem] lg:rounded-r-[10rem] w-auto items-center justify-between max-w-[65rem] p-[0.8rem] sm:p-[1rem] text-center lg:text-start border-2",
                "border-black/20 bg-soft-white shadow-s2",
                "dark:border dark:border-soft-gray/60 dark:bg-strong-black dark:shadow-s1 hover:dark:border-soft-gray",
              )}
            >
              <div className="flex flex-row items-center gap-[0.7rem] xl:gap-[1rem]">
                <div
                  className={clsx(
                    "hidden lg:flex justify-center items-center w-[3rem] h-[3rem] xl:w-[3.5rem] xl:h-[3.5rem] rounded-full group-hover/second:animate-pulse border z-10",
                    "bg-black/10 border-dark-gray/30",
                    "dark:bg-soft-white/20 dark:border-soft-gray/25",
                  )}
                >
                  <Lightbulb
                    className={clsx(
                      "w-[1.3rem] h-[1.3rem] xl:w-[1.5rem] xl:h-[1.5rem]",
                      "stroke-black",
                      "dark:stroke-soft-white",
                    )}
                  />
                </div>
                <div className="flex flex-col gap-[0.5rem] lg:gap-[0.2rem]">
                  <p
                    className={clsx(
                      "font-medium text-base xl:text-lg",
                      "text-black",
                      "dark:text-soft-white",
                    )}
                  >
                    {t("title")}
                  </p>
                  <p
                    className={clsx(
                      "hidden lg:flex text-sm xl:text-base",
                      "text-dark-gray",
                      "dark:text-soft-gray",
                    )}
                  >
                    {t("subtitle")}
                  </p>
                </div>
              </div>
              <ButtonWithArrow
                text={t("buttonText")}
                routerPath={config.urls.whatsapp}
                external
              />

              <div className="absolute -bottom-[1.5rem] lg:-bottom-[2.5rem] left-0 right-0 w-full h-full flex items-end justify-center">
                <div className="bg-gradient-to-t from-soft-white via-soft-white/70 dark:from-strong-black dark:via-strong-black/70 to-transparent h-full w-full absolute z-2" />
                <p className="text-[clamp(4.6rem,9vw,7rem)] font-fira-code font-bold opacity-5 z-1 text-nowrap">
                  {t("buttonText")}
                </p>
              </div>
            </div>
          </SpaceX>
        </MotionSlide>
      )}
    </AnimatePresence>
  );
}
