"use client";
import {
  GithubIcon,
  LinkedInIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/components/icons/social";
import MotionEntryStagger from "@/components/motion/MotionEntryStagger";
import LinkButton from "@/components/ui/buttons/LinkButton";
import config from "@/config/config";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useRef } from "react";

type SocialButtonsSectionProps = {
  withoutMt?: boolean;
  order?: number;
};

const SocialButtonsSection = (props: SocialButtonsSectionProps) => {
  const t = useTranslations("headSection.socialButtons");
  const containerRef = useRef(null);

  const socialButtons = [
    { icon: WhatsAppIcon, text: t("whatsApp"), href: config.urls.whatsapp },
    { icon: LinkedInIcon, text: t("linkedIn"), href: config.urls.linkedin },
    { icon: GithubIcon, text: t("github"), href: config.urls.github },
    { icon: TelegramIcon, text: t("telegram"), href: config.urls.telegram },
  ];

  return (
    <div ref={containerRef} className="flex justify-center z-10">
      <MotionEntryStagger
        order={props.order}
        className="header-section-buttons grid grid-cols-2 w-fit justify-items-center-safe gap-[1.5rem] lg:flex lg:justify-center xl:gap-[3rem]"
      >
        {socialButtons.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={index}>
              <LinkButton
                href={item.href}
                external
                className={clsx("h-fit shadow-s3 dark:shadow-s1", {
                  "lg:mt-[0.7rem] ":
                    (index === 0 || index === socialButtons.length - 1) &&
                    !props.withoutMt,
                })}
              >
                <Icon />
                <p>{item.text}</p>
              </LinkButton>
            </div>
          );
        })}
      </MotionEntryStagger>
    </div>
  );
};

export default SocialButtonsSection;
