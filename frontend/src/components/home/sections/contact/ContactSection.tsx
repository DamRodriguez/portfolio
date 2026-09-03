"use client";
import SpaceX from "@/components/layout/SpaceX";
import { ReflectedTitle } from "@/components/text/ReflectedTitle";
import { routes } from "@/constants/routes";
import ContactForm from "@/features/contact/components/ContactForm";
import { useScrollAnimations } from "@/hooks/gsap/useScrollAnimations";
import { removeHash } from "@/utils/removeHash";
import { useTranslations } from "next-intl";
import NameSection from "./NameSection";

const ContactSection = () => {
  const t = useTranslations("contactSection");

  const curtainScrollTrigger = {
    trigger: ".pin-contactSection",
    start: "top 60%",
    end: "top 20%",
    scrub: 2,
  };

  useScrollAnimations({
    animations: {
      ".contact-section-title-entry": {
        direction: "bottom",
        from: {
          opacity: 0,
          filter: "blur(3px)",
          y: 15,
        },
        to: {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
        },
      },
      ".curtain-fade-left-element": {
        scrollTrigger: curtainScrollTrigger,
        from: {
          y: 0,
          x: 0,
          scale: 1,
        },
        to: {
          y: 100,
          x: -50,
          scale: 0.85,
        },
      },
      ".curtain-fade-right-element": {
        scrollTrigger: curtainScrollTrigger,
        from: {
          y: 0,
          x: 0,
          scale: 1,
        },
        to: {
          y: 100,
          x: 50,
          scale: 0.85,
        },
      },
      ".curtain-left": {
        from: {
          width: "50%",
          borderTopRightRadius: "0rem",
        },
        to: {
          width: "0%",
          borderTopRightRadius: "3rem",
          ease: "power1.in",
        },
        scrollTrigger: curtainScrollTrigger,
      },
      ".curtain-right": {
        from: {
          width: "50%",
          borderTopLeftRadius: "0rem",
        },
        to: {
          width: "0%",
          borderTopLeftRadius: "3rem",
          ease: "power1.in",
        },
        scrollTrigger: curtainScrollTrigger,
      },
      ".contact-section-content": {
        from: { opacity: 0, scale: 0.85 },
        to: { opacity: 1, scale: 1, ease: "power1.in" },
        scrollTrigger: curtainScrollTrigger,
      },
    },
  });

  return (
    <div className="pin-contactSection pb-[8rem] xl:pb-[0rem] z-22">
      <SpaceX
        id={removeHash(routes.contact)}
        className="relative w-full min-h-svh flex flex-col gap-[5rem] xl:gap-[10rem] pt-[2rem] xl:pt-[5rem]"
      >
        <div className="curtain-left bg-black dark:bg-soft-white absolute top-0 bottom-0 left-0 w-1/2 z-10 origin-left overflow-hidden">
          <div className="contact-section-title-entry">
            <div className="curtain-fade-left-element pt-[3rem] pr-[0.05rem] absolute inset-0 flex items-start justify-end pointer-events-none z-30">
              <ReflectedTitle
                text={t("curtain.leftTitle")}
                textClassName="font-fira-code tracking-widest font-bold text-6xl xl:text-9xl text-soft-white dark:text-black"
                renderMain={(children) => <div>{children}</div>}
                renderReflection={(children) => <div>{children}</div>}
              />
            </div>
          </div>
        </div>

        <div className="curtain-right bg-black dark:bg-soft-white absolute top-0 bottom-0 right-0 w-1/2 z-10 origin-right overflow-hidden">
          <div className="contact-section-title-entry">
            <div className="curtain-fade-right-element curtain-fade-entry pt-[3rem] pl-[0.05rem] absolute inset-0 flex items-start justify-start pointer-events-none z-30">
              <ReflectedTitle
                text={t("curtain.rightTitle")}
                textClassName="font-fira-code tracking-widest font-bold text-6xl xl:text-9xl text-soft-white dark:text-black"
                renderMain={(children) => <div>{children}</div>}
                renderReflection={(children) => <div>{children}</div>}
              />
            </div>
          </div>
        </div>

        <div className="pin-contactSection-content">
          <div className="contact-section-content flex flex-col-reverse 2xl:flex-row gap-[5rem] 4xl:gap-[8rem]">
            <NameSection />
            <ContactForm />
          </div>
        </div>
      </SpaceX>
    </div>
  );
};

export default ContactSection;
