"use client";
import SpaceX from "@/components/layout/SpaceX";
import { useTranslations } from "next-intl";
import { routes } from "@/constants/routes";
import { removeHash } from "@/utils/removeHash";
import MotionFade from "@/components/motion/MotionFade";
import ContactForm from "@/features/contact/components/ContactForm";
import FooterSection from "./FooterSection";
import NameSection from "./NameSection";

const ContactSection = () => {
  const t = useTranslations("contactSection");

  return (
    <SpaceX
      id={removeHash(routes.contact)}
      className="w-full flex flex-col gap-[5rem] xl:gap-[10rem] pb-[3rem] xl:pb-[5rem]"
    >
      <div className="flex flex-col-reverse 2xl:flex-row gap-[5rem] 4xl:gap-[8rem]">
        <NameSection />
        <div className="w-full flex flex-col gap-[2rem] xl:gap-[3rem]">
          <MotionFade>
            <h2 className="text-black dark:text-soft-white theme-transition text-2xl xl:text-3xl font-fira-code">
              {t("title")}
            </h2>
          </MotionFade>
          <ContactForm />
        </div>
      </div>
      <FooterSection />
    </SpaceX>
  );
};

export default ContactSection;