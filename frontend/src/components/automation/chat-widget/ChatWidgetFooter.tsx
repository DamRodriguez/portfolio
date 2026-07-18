import { SendMessage } from "@/components/automation/chat-widget/ChatWidget";
import clsx from "clsx";
import { SendHorizonal } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

type ChatWidgetFooterProps = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  sendMessage: SendMessage;
};

export default function ChatWidgetFooter({
  inputValue,
  setInputValue,
  isLoading,
  sendMessage,
}: ChatWidgetFooterProps) {
  const t = useTranslations("virtualAssistant");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const hasText = inputValue.trim().length > 0;

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Solo usar resolvedTheme (después de hidratación) o fallback a "dark"
  // NO usar `theme` directamente porque puede ser "system" antes de hidratación
  const currentTheme = (resolvedTheme ?? "dark") as "light" | "dark";

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasText || isLoading) return;

    const messageText = inputValue;
    setInputValue("");

    await sendMessage({ text: messageText }, { body: { currentTheme } });
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={clsx(
        "flex items-center theme-transition-all border-b border-r border-l 2xl:border-l-0 border-transparent focus-within:border-black dark:focus-within:border-soft-white 2xl:rounded-br-[2rem] rounded-b-[1.5rem] 2xl:rounded-bl-none",
        {
          "bg-white-bone dark:bg-soft-gray/5": !hasText,
          "bg-soft-gray/40 dark:bg-soft-gray/15": hasText,
        },
      )}
    >
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={t("footerInputPlaceholder")}
        className="placeholder:text-black/50 dark:placeholder:text-soft-gray/50 flex-1 px-5 2xl:px-6 py-4 2xl:py-5 text-base outline-none text-black dark:text-soft-white"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !hasText}
        className="disabled:opacity-50 px-5 2xl:px-6 py-4 2xl:py-5 theme-transition-all cursor-pointer hover:bg-black hover:[&_svg]:stroke-soft-white dark:hover:bg-soft-white dark:hover:[&_svg]:stroke-black disabled:hover:bg-transparent disabled:hover:[&_svg]:stroke-black dark:disabled:hover:bg-transparent dark:disabled:hover:[&_svg]:stroke-soft-white disabled:!cursor-not-allowed"
      >
        <SendHorizonal className="w-6 h-6 stroke-black dark:stroke-soft-white theme-transition-all" />
      </button>
    </form>
  );
}
