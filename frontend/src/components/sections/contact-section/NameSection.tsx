import { DownloadIcon } from '@/components/icons/buttons';
import MotionFade from '@/components/motion/MotionFade';
import MotionSlide from '@/components/motion/MotionSlide';
import Button from '@/components/ui/buttons/Button';
import { useTranslations } from 'next-intl';
import React from 'react';

const NameSection = () => {
  const t = useTranslations("contactSection");
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/portfolio/pdf/CV.pdf";
    link.download = "CV-Damian-Rodriguez.pdf";
    link.click();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="-space-y-4 xl:-space-y-10 4xl:-space-y-15">
        <div className="flex items-center gap-4">
          <MotionSlide>
            <h6 className="text-soft-white font-fira-code font-semibold text-5md xl:text-8xl 4xl:text-9xl">
              {t("name.firstName")}
            </h6>
          </MotionSlide>
          <MotionFade className="flex justify-center flex-1">
            <Button
              onClick={handleDownloadCV}
              className="!px-4"
            >
              {t("buttons.downloadCV")}
              <DownloadIcon />
            </Button>
          </MotionFade>
        </div>
        <div className="flex items-center gap-[1rem] xl:gap-[4rem]">
          <MotionSlide direction="down">
            <p className="text-soft-gray text-xs xl:text-xl whitespace-break-spaces">
              {t("position")}
            </p>
          </MotionSlide>
          <MotionSlide direction="right">
            <h6 className="text-soft-white font-fira-code font-semibold text-5md xl:text-8xl 4xl:text-9xl">
              {t("name.lastName")}
            </h6>
          </MotionSlide>
        </div>
      </div>
    </div>
  );
};

export default NameSection;