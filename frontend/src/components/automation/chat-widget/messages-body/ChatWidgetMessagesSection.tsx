import { SendMessage } from "@/components/automation/chat-widget/ChatWidget";
import ChatWidgetMessage from "@/components/automation/chat-widget/messages-body/ChatWidgetMessage";
import ChatWidgetMessageOptions from "@/components/automation/chat-widget/messages-body/ChatWidgetMessageOptions";
import BackgroundEffects from "@/components/motion/BackgroundEffects";
import MotionFade from "@/components/motion/MotionFade";
import TextReveal from "@/components/motion/TextReveal";
import InfiniteSpinner from "@/components/spinner/InfiniteSpinner";
import { usePreventScrollBehind } from "@/hooks/usePreventScrollBehind";
import { type UIMessage } from "ai";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef } from "react";

type ChatWidgetMessagesSectionProps = {
  messages: UIMessage[];
  sendMessage: SendMessage;
  isLoading: boolean;
  inputValue: string;
};

export default function ChatWidgetMessagesSection({
  messages,
  sendMessage,
  isLoading,
  inputValue,
}: ChatWidgetMessagesSectionProps) {
  const t = useTranslations("virtualAssistant");
  const isInitialMount = useRef(true);
  const containerRef = usePreventScrollBehind();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessage = messages[messages.length - 1];
  const hasText = inputValue.trim().length > 0;
  const noMessages = messages.length === 0;

  const isLastMessageEmptyAssistant =
    lastMessage?.role !== "user" &&
    (!lastMessage?.parts ||
      !lastMessage.parts.some(
        (part) => part.type === "text" && part.text.trim() !== "",
      ));

  const isWaitingForResponse =
    isLoading && (lastMessage?.role === "user" || isLastMessageEmptyAssistant);

  const validMessages = useMemo(() => {
    return messages.filter((m) => {
      if (m.role === "user") return true;
      return m.parts && m.parts.length > 0;
    });
  }, [messages]);

  const messagesContent = useMemo(() => {
    return messages
      .map((m) => {
        const textPart = m.parts?.find((part) => part.type === "text");
        return textPart?.text ?? "";
      })
      .join("");
  }, [messages]);

  useEffect(() => {
    const scrollContainer = messagesEndRef.current?.parentElement;
    if (!scrollContainer) return;

    const isFirstRender = isInitialMount.current;

    const scrollToBottom = () => {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: isFirstRender ? "auto" : "smooth",
      });
    };

    if (isFirstRender) {
      setTimeout(scrollToBottom, 0);

      isInitialMount.current = false;
    } else {
      requestAnimationFrame(scrollToBottom);
    }
  }, [messages.length, messagesContent]);

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      className="flex-1 scrollbarCustom overflow-hidden p-4 space-y-4 border-b border-black/50 dark:border-soft-white/50"
    >
      <BackgroundEffects
        tailwindColors={[
          "color-ribbon-sides",
          hasText
            ? "color-ribbon-center-active"
            : "color-ribbon-center-default",
          "color-ribbon-sides",
        ]}
      />
      {noMessages && (
        <div className="space-y-[2rem]">
          <div className="flex flex-col gap-2 text-black dark:text-soft-white text-center text-base xl:text-lg mt-[0.5rem] font-fira-code">
            <TextReveal>{t("welcomeMessage")}</TextReveal>
          </div>
          <ChatWidgetMessageOptions sendMessage={sendMessage} />
        </div>
      )}

      {validMessages.map((m) => {
        const isUser = m.role === "user";
        return <ChatWidgetMessage key={m.id} message={m} isUser={isUser} />;
      })}

      {isWaitingForResponse && (
        <MotionFade>
          <InfiniteSpinner />
        </MotionFade>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
