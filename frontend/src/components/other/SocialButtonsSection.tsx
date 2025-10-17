import clsx from "clsx";
import MotionStagger from "../motion/MotionStagger";
import Button from "../ui/buttons/Button";
import config from "@/config/config";
import { GithubIcon, LinkedInIcon, TelegramIcon, WhatsAppIcon } from "@/components/icons/social";

const SocialButtonsSection = () => {
  const socialButtons = [
    { icon: TelegramIcon, text: "Telegram", href: config.urls.telegram },
    { icon: LinkedInIcon, text: "LinkedIn", href: config.urls.linkedin },
    { icon: GithubIcon, text: "Github", href: config.urls.github },
    { icon: WhatsAppIcon, text: "WhatsApp", href: config.urls.whatsapp }
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
                "xl:mt-[0.7rem] ": index === 0 || index === socialButtons.length - 1
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