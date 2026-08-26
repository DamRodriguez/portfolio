import cacImage from "@/assets/certifications/cac/cac-certificado.png";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import { useTranslations } from "next-intl";
import CertificationItem, { CertificationItemData } from "./CertificationItem";

const CertificationSection = () => {
  const t = useTranslations("aboutMeSection.certificationSection");
  const cacPdf = "/pdf/cac-certificado.pdf";

  const certificationItems: CertificationItemData[] = [
    {
      title: t("certifications.codoACodo.title"),
      place: t("certifications.codoACodo.place"),
      image: cacImage,
      pdf: cacPdf,
    },
  ];

  useScrollAnimations({
    direction: "bottom",
    animations: {
      ".certification-section-title": {
        from: {
          opacity: 0,
          x: -25,
        },
        to: {
          opacity: 1,
          x: 0,
        },
      },
      ".certification-section-item": {
        from: {
          opacity: 0,
          x: -25,
        },
        to: {
          opacity: 1,
          x: 0,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-[1.5rem] xl:gap-[2rem]">
      <h3 className="certification-section-title text-black dark:text-soft-white text-xl xl:text-2xl font-fira-code">
        {t("title")}
      </h3>
      {certificationItems.map((item, index) => (
        <div key={index} className="certification-section-item">
          <CertificationItem data={item} />
        </div>
      ))}
    </div>
  );
};

export default CertificationSection;
