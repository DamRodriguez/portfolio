import { useTranslations } from "next-intl";
import CertificationItem, { CertificationItemData } from "./CertificationItem";
import cacImage from "@/assets/certifications/cac/cac-certificado.png";
import MotionSlide from "@/components/motion/MotionSlide";

const CertificationSection = () => {
  const t = useTranslations("aboutMeSection.certificationSection");
  const basePath =
    typeof window !== "undefined" &&
      window.location.hostname.includes("github.io")
      ? "/portfolio"
      : "";

  const cacPdf = `${basePath}/pdf/cac-certificado.pdf`

  const certificationItems: CertificationItemData[] = [
    {
      title: t("certifications.codoACodo.title"),
      place: t("certifications.codoACodo.place"),
      image: cacImage,
      pdf: cacPdf,
    },
  ]

  return (
    <>
      {certificationItems.map((item, index) => (
        <MotionSlide key={index} direction="down">
          <CertificationItem data={item} />
        </MotionSlide>
      ))}
    </>
  );
};

export default CertificationSection;