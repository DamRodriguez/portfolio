import Link from "next/link";
import config from "@/config/config";
import { GithubIcon, LinkedInIcon, TelegramIcon, WhatsAppIcon } from "../icons/social";

const SocialButtons = () => {
  const socialItems = [
    { href: config.urls.telegram, icon: <TelegramIcon /> },
    { href: config.urls.linkedin, icon: <LinkedInIcon /> },
    { href: config.urls.github, icon: <GithubIcon /> },
    { href: config.urls.whatsapp, icon: <WhatsAppIcon /> },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-[2rem] [&_svg]:fill-[#fff]">
      {socialItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          target="_blank"
          className="w-[4rem] h-[3rem] rounded-full flex items-center justify-center shadow-s6 bg-soft-gray/30 hover:scale-110 transition-all duration-300"
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default SocialButtons;
