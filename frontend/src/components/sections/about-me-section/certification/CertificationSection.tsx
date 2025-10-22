import { useTranslations } from "next-intl";
import CertificationItem, { CertificationItemData } from "./CertificationItem";
import cacImage from "@/assets/certifications/cac/cac-certificado.png";
import MotionSlide from "@/components/motion/MotionSlide";

const CertificationSection = () => {
  const t = useTranslations("aboutMeSection.certificationSection");

  const certificationItems: CertificationItemData[] = [
    {
      title: t("certifications.codoACodo.title"),
      place: t("certifications.codoACodo.place"),
      image: cacImage,
      pdf: "https://damrodriguez.github.io/portfolio/es/certifications/cac/cac-certificado.pdf",
    },
  ]

  return (
    <div>
      {certificationItems.map((item, index) => (
        <MotionSlide key={index} direction="down">
          <CertificationItem data={item} />
        </MotionSlide>
      ))}
    </div>
  );
};

export default CertificationSection;