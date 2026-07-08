import config from "@/config/config";
import Link from "next/link";
import {
  GithubIcon,
  LinkedInIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "../icons/social";

const SocialButtons = () => {
  const socialItems = [
    { href: config.urls.whatsapp, icon: <WhatsAppIcon /> },
    { href: config.urls.linkedin, icon: <LinkedInIcon /> },
    { href: config.urls.github, icon: <GithubIcon /> },
    { href: config.urls.telegram, icon: <TelegramIcon /> },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-[1.5rem] [&_svg]:fill-dark-gray dark:[&_svg]:fill-soft-white">
      {socialItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          target="_blank"
          className="w-[4rem] h-[3rem] rounded-full flex items-center justify-center border border-dark-gray/15 shadow-s2 dark:shadow-s6 bg-soft-white/50 dark:bg-soft-gray/30"
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default SocialButtons;
