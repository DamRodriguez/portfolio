import { ArrowIcon, PlayIcon } from "@/components/icons/buttons";
import { VideoPopUp } from "@/components/pop-up/VideoPopUp";
import CustomButton from "@/components/ui/buttons/CustomButton";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";

export type ProjectButton =
  | {
      type: "site";
      link: string;
    }
  | {
      type: "repository";
      link: string;
    }
  | {
      type: "inDevelopment";
    };

type ButtonsSectionProps = {
  button: ProjectButton;
  demoVideo?: string;
  containerClassName?: string;
  lockScroll?: boolean;
};

const ButtonsSection = ({
  button,
  demoVideo,
  containerClassName,
  lockScroll,
}: ButtonsSectionProps) => {
  const t = useTranslations("projectsSection.buttons");
  const [demoVideoState, setDemoVideoState] = useState<string>("");

  return (
    <>
      <div
        className={clsx(
          "flex flex-col gap-[1rem] xl:gap-[1.5rem]",
          containerClassName,
        )}
      >
        {button.type === "site" && (
          <CustomButton
            text={t("visitSite")}
            icon={ArrowIcon}
            variant={{
              type: "link",
              href: button.link,
            }}
          />
        )}
        {button.type === "repository" && (
          <CustomButton
            text={t("seeCode")}
            icon={ArrowIcon}
            variant={{
              type: "link",
              href: button.link,
            }}
          />
        )}
        {button.type === "inDevelopment" && (
          <div className="bg-soft-white w-fit dark:bg-black flex items-center text-black dark:text-soft-gray text-base xl:text-lg border border-black/30 dark:border-soft-gray/80 h-[2.5rem] xl:h-[3rem] px-[1rem] xl:px-[1.5rem] hover:bg-black dark:hover:bg-soft-white hover:text-soft-white dark:hover:text-black theme-transition rounded-full group-hover:rounded-r-full shadow-s3 dark:shadow-s1">
            {t("inDevelopment")}
          </div>
        )}
        {demoVideo && (
          <CustomButton
            text={t("seeDemo")}
            icon={PlayIcon}
            variant={{
              type: "button",
              onClick: () => {
                setDemoVideoState(demoVideo);
              },
            }}
          />
        )}
      </div>
      <VideoPopUp
        video={demoVideoState}
        lockScroll={lockScroll}
        onClose={() => {
          setDemoVideoState("");
        }}
      />
    </>
  );
};

export default ButtonsSection;
