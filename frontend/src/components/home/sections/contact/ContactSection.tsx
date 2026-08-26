"use client";
import SpaceX from "@/components/layout/SpaceX";
import { routes } from "@/constants/routes";
import ContactForm from "@/features/contact/components/ContactForm";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import { removeHash } from "@/utils/removeHash";
import { useTranslations } from "next-intl";
import NameSection from "./NameSection";

const ContactSection = () => {
  const t = useTranslations("contactSection");

  useScrollAnimations({
    direction: "bottom",
    animations: {
      ".contact-section-title": {
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
    <SpaceX
      id={removeHash(routes.contact)}
      className="w-full flex flex-col gap-[5rem] xl:gap-[10rem]"
    >
      <div className="flex flex-col-reverse 2xl:flex-row gap-[5rem] 4xl:gap-[8rem]">
        <NameSection />
        <div className="w-full flex flex-col gap-[2rem] xl:gap-[3rem]">
          <h2 className="contact-section-title text-black dark:text-soft-white font-fira-code font-semibold text-4xl xl:text-6xl">
            ../{t("title")}
          </h2>
          <ContactForm />
        </div>
      </div>
    </SpaceX>
  );
};

export default ContactSection;
