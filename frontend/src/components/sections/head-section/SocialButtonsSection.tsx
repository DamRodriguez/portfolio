import {
  GithubIcon,
  LinkedInIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "@/components/icons/social";
import MotionEntryStagger from "@/components/motion/MotionEntryStagger";
import LinkButton from "@/components/ui/buttons/LinkButton";
import config from "@/config/config";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useRef } from "react";

type SocialButtonsSectionProps = {
  withoutMt?: boolean;
  order?: number;
  gsapDisabled?: boolean;
};

const SocialButtonsSection = (props: SocialButtonsSectionProps) => {
  const t = useTranslations("headSection.socialButtons");
  const containerRef = useRef(null);
  const isTablet = useBreakpoint(Number(config.breakpoints.lg));

  const socialButtons = [
    { icon: WhatsAppIcon, text: t("whatsApp"), href: config.urls.whatsapp },
    { icon: LinkedInIcon, text: t("linkedIn"), href: config.urls.linkedin },
    { icon: GithubIcon, text: t("github"), href: config.urls.github },
    { icon: TelegramIcon, text: t("telegram"), href: config.urls.telegram },
  ];

  useScrollAnimations({
    animations: {
      ".item-pair-gsap": isTablet
        ? {
            rotate: -20,
            x: -100,
            stagger: 0.1,
          }
        : {
            rotate: 20,
            x: 50,
            y: -50,
            stagger: 0.1,
          },
      ".item-odd-gsap": isTablet
        ? {
            rotate: 20,
            x: 100,
            stagger: 0.1,
          }
        : {
            rotate: -20,
            x: -50,
            y: 50,
            stagger: 0.1,
          },
    },
    scope: containerRef,
    disabled: props.gsapDisabled,
  });

  return (
    <div ref={containerRef} className="flex justify-center z-10">
      <MotionEntryStagger
        order={props.order}
        className="grid grid-cols-2 w-fit justify-items-center-safe gap-[1.5rem] lg:flex lg:justify-center xl:gap-[3rem]"
      >
        {socialButtons.map((item, index) => {
          const Icon = item.icon;
          const isPair = index % 2 === 0;

          return (
            <div
              key={index}
              className={clsx("", {
                "item-pair-gsap": isPair,
                "item-odd-gsap": !isPair,
              })}
            >
              <LinkButton
                href={item.href}
                external
                className={clsx("h-fit shadow-s3 dark:shadow-s1", {
                  "2xl:mt-[0.7rem] ":
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
