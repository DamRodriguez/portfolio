import { SendMessage } from "@/components/automation/chat-widget/ChatWidget";
import MotionStagger from "@/components/motion/MotionStagger";
import Button from "@/components/ui/buttons/Button";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ChatWidgetMessageOptionsProps = {
  sendMessage: SendMessage;
};

export default function ChatWidgetMessageOptions({
  sendMessage,
}: ChatWidgetMessageOptionsProps) {
  const t = useTranslations("virtualAssistant.messageOptions");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Solo usar resolvedTheme (después de hidratación) o fallback a "dark"
  // NO usar `theme` directamente porque puede ser "system" antes de hidratación
  const currentTheme = (resolvedTheme ?? "dark") as "light" | "dark";

  const suggestedOptions = [
    t("projects"),
    t("oneProject"),
    t("experience"),
    t("toggleTheme", { theme: currentTheme }),
  ];

  const handleOptionSubmit = (messageText: string) => {
    sendMessage({ text: messageText }, { body: { currentTheme } });
  };

  return (
    <MotionStagger
      order={2}
      className="flex flex-col items-center justify-center gap-[1rem]"
    >
      {suggestedOptions.map((option) => (
        <Button
          key={option}
          onClick={() => handleOptionSubmit(option)}
          className="h-fit shadow-s3 dark:shadow-s1"
        >
          {option}
        </Button>
      ))}
    </MotionStagger>
  );
}
