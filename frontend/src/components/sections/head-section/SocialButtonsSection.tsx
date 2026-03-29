import clsx from "clsx";
import Button from "@/components/ui/buttons/Button";
import config from "@/config/config";
import { GithubIcon, LinkedInIcon, TelegramIcon, WhatsAppIcon } from "@/components/icons/social";
import { useTranslations } from "next-intl";
import MotionStagger from "@/components/motion/MotionStagger";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useRef } from "react";
import useBreakpoint from "@/hooks/useBreakpoint";

type SocialButtonsSectionProps = {
  withoutMt?: boolean;
  order?: number;
  gsapDisabled?: boolean;
}

const SocialButtonsSection = (props: SocialButtonsSectionProps) => {
  const t = useTranslations("headSection.socialButtons");
  const containerRef = useRef(null);
  const isTablet = useBreakpoint(Number(config.breakpoints.lg));

  const socialButtons = [
    { icon: TelegramIcon, text: t("telegram"), href: config.urls.telegram },
    { icon: LinkedInIcon, text: t("linkedIn"), href: config.urls.linkedin },
    { icon: GithubIcon, text: t("github"), href: config.urls.github },
    { icon: WhatsAppIcon, text: t("whatsApp"), href: config.urls.whatsapp }
  ]

  useScrollAnimations({
    animations: {
      ".item-pair-gsap": isTablet ? {
        rotate: -20,
        x: -100,
        stagger: 0.1
      } : {
        rotate: 20,
        x: 50,
        y: -50,
        stagger: 0.1
      },
      ".item-odd-gsap": isTablet ? {
        rotate: 20,
        x: 100,
        stagger: 0.1
      } : {
        rotate: -20,
        x: -50,
        y: 50,
        stagger: 0.1
      }
    },
    scope: containerRef,
    disabled: props.gsapDisabled
  })

  return (
    <div ref={containerRef} className="flex justify-center">
      <MotionStagger
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
              })}>
              <Button
                routerPathNewTab={item.href}
                key={index}
                className={clsx("h-fit shadow-s3 dark:shadow-s1", {
                  "xl:mt-[0.7rem] ": (index === 0 || index === socialButtons.length - 1) && !props.withoutMt,
                })}>
                <Icon />
                <p>
                  {item.text}
                </p>
              </Button>
            </div>
          )
        })}
      </MotionStagger>
    </div>
  );
};

export default SocialButtonsSection;