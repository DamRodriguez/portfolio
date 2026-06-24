import MotionFade from "@/components/motion/MotionFade";
import ButtonWithArrow from "@/components/ui/buttons/ButtonWithArrow";
import config from "@/config/config";
import { Lightbulb } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ServicesContactSection() {
  const t = useTranslations("servicesSection.contactSection");
  return (
    <MotionFade>
      <div className="hover:bg-black/5 hover:dark:bg-soft-white/5 theme-transition-all flex flex-col gap-[2rem] xl:flex-row xl:rounded-r-[10rem] rounded-[3rem] w-fit xl:w-full items-center justify-between max-w-[60rem] mx-auto dark:border border-2 border-black/20 dark:border-soft-gray/50 px-[4rem] xl:px-[1.5rem] p-[1.5rem] bg-soft-white dark:bg-strong-black shadow-s2 dark:shadow-s1 group-hover:dark:border-soft-gray group-hover:border-black/40 text-center xl:text-start group/second">
        <div className="flex flex-col xl:flex-row items-center gap-[1rem] xl:gap-[1.5rem]">
          <div className="flex justify-center items-center bg-black/10 dark:bg-soft-white/30 border border-dark-gray/30 dark:border-soft-gray/50 w-[3.5rem] h-[3.5rem] xl:w-[4rem] xl:h-[4rem] rounded-full group-hover/second:animate-pulse">
            <Lightbulb className="stroke-black dark:stroke-soft-white" />
          </div>
          <div className="flex flex-col gap-[0.5rem] ">
            <p className="text-black dark:text-soft-white font-medium text-lg">
              {t("title")}
            </p>
            <p className="text-dark-gray dark:text-soft-gray text-base">
              {t("subtitle")}
            </p>
          </div>
        </div>
        <ButtonWithArrow
          text={t("buttonText")}
          routerPath={config.urls.whatsapp}
          external
        />
      </div>
    </MotionFade>
  );
}
