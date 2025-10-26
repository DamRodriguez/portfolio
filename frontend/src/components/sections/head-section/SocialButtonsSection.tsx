import clsx from "clsx";
import MotionStagger from "@/components/motion/MotionStagger";
import Button from "@/components/ui/buttons/Button";
import config from "@/config/config";
import { GithubIcon, LinkedInIcon, TelegramIcon, WhatsAppIcon } from "@/components/icons/social";
import { useTranslations } from "next-intl";

type SocialButtonsSectionProps = {
  withoutMt?: boolean;
}

const SocialButtonsSection = (props: SocialButtonsSectionProps) => {
  const t = useTranslations("headSection.socialButtons");

  const socialButtons = [
    { icon: TelegramIcon, text: t("telegram"), href: config.urls.telegram },
    { icon: LinkedInIcon, text: t("linkedIn"), href: config.urls.linkedin },
    { icon: GithubIcon, text: t("github"), href: config.urls.github },
    { icon: WhatsAppIcon, text: t("whatsApp"), href: config.urls.whatsapp }
  ]

  return (
    <MotionStagger className="flex flex-wrap gap-[1.5rem] xl:gap-[3rem] justify-center">
      {socialButtons.map((item, index) => {
        const Icon = item.icon
        return (
          <Button
            routerPathNewTab={item.href}
            key={index}
            className={clsx("h-fit",
              {
                "xl:mt-[0.7rem] ": (index === 0 || index === socialButtons.length - 1) && !props.withoutMt
              }
            )}
          >
            <Icon />
            <p>
              {item.text}
            </p>
          </Button>
        )
      })}
    </MotionStagger>
  );
};

export default SocialButtonsSection;