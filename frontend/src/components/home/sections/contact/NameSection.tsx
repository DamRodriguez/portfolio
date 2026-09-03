import { DownloadIcon } from "@/components/icons/buttons";
import Button from "@/components/ui/buttons/Button";
import { useTranslations } from "next-intl";

const NameSection = () => {
  const t = useTranslations("contactSection");
  const CV = "/pdf/Damian-Rodriguez-CV.pdf";

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = CV;
    link.download = "Damian-Rodriguez-CV.pdf";
    link.click();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="-space-y-4 xl:-space-y-10 4xl:-space-y-15">
        <div className="flex items-center gap-4">
          <h4 className="text-black dark:text-soft-white font-fira-code font-semibold text-5md xl:text-8xl 4xl:text-9xl">
            {t("name.firstName")}
          </h4>
          <div className="flex justify-center flex-1">
            <Button
              onClick={handleDownloadCV}
              className="!px-4 shadow-s3 dark:shadow-s1"
            >
              {t("buttons.downloadCV")}
              <DownloadIcon />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-[1rem] xl:gap-[4rem]">
          <p className="text-dark-gray dark:text-soft-gray text-xs xl:text-xl whitespace-break-spaces">
            {t("position")}
          </p>
          <h4 className="text-black dark:text-soft-white font-fira-code font-semibold text-5md xl:text-8xl 4xl:text-9xl">
            {t("name.lastName")}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default NameSection;
