import clsx from "clsx";
import Link from "next/link";
import config from "@/config/config";
import { InstagramIcon } from "../icons/social";

const SocialButtons = () => {
  const socialItems = [
    { href: config.urls.instagram, icon: <InstagramIcon />, className: "bg-instagram" },
  ];
  return (
    <div className="flex justify-center gap-[2rem]">
      {socialItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          target="_blank"
          className={clsx("w-[2.5rem] h-[2.5rem] flex items-center justify-center rounded-[0.875rem] shadow-s1 hover:scale-110 transition-all duration-300", item.className)}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default SocialButtons;
