"use client";
import {
  EmailIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/icons/social";
import LinkButton from "@/components/ui/buttons/LinkButton";
import config from "@/config/config";

type ContactItem = {
  icon: React.ElementType;
  name: string;
  link: string;
};

export default function ContactCard() {
  const contacts: ContactItem[] = [
    {
      icon: LinkedInIcon,
      name: "LinkedIn",
      link: config.urls.linkedin,
    },
    {
      icon: EmailIcon,
      name: "Email",
      link: `mailto:damrod1999@gmail.com`,
    },
    {
      icon: WhatsAppIcon,
      name: "WhatsApp",
      link: config.urls.whatsapp,
    },
  ];

  return (
    <div className="flex flex-wrap gap-[1rem] justify-center">
      {contacts.map((contact) => {
        const Icon = contact.icon;
        return (
          <LinkButton
            variant="secondary"
            key={contact.name}
            href={contact.link}
            className="h-fit shadow-s3 dark:shadow-s1"
            external
          >
            <Icon />
            {contact.name}
          </LinkButton>
        );
      })}
    </div>
  );
}
