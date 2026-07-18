import MarkdownMessage from "@/components/automation/MarkdownMessage";
import MotionEntrySlide from "@/components/motion/MotionEntrySlide";
import { type UIMessage } from "ai";
import { memo } from "react";

type ChatWidgetMessageProps = {
  message: UIMessage;
  isUser: boolean;
  isLatestAssistantMessage?: boolean;
};

const ChatWidgetMessage = memo(function ChatWidgetMessage({
  message,
  isUser,
  isLatestAssistantMessage = false,
}: ChatWidgetMessageProps) {
  const hasTextContent = message.parts?.some((part) => part.type === "text");

  if (!hasTextContent && message.role !== "user") {
    return null;
  }

  return (
    <MotionEntrySlide
      direction={isUser ? "right" : "left"}
      duration={0.4}
      className={`flex ${isUser ? "justify-end" : "justify-start backdrop-blur-[0.5rem] max-w-[85%]"}`}
    >
      <div
        className={`px-4 py-3 text-sm border break-words theme-transition-all ${
          isUser
            ? "bg-black dark:bg-soft-white text-soft-white dark:text-black border-black dark:border-soft-white rounded-t-[1.5rem] rounded-l-[1.5rem] rounded-br-[4px]"
            : "bg-black/10 dark:bg-soft-gray/10 text-black dark:text-soft-white border-black/15 dark:border-soft-gray/30 rounded-t-[1.5rem] rounded-r-[1.5rem] rounded-bl-[4px]"
        }`}
      >
        {message.parts?.map((part, index) =>
          part.type === "text" ? (
            <div key={index} className="space-y-1">
              <MarkdownMessage text={part.text} isLatestAssistantMessage={isLatestAssistantMessage} messageId={message.id} />
            </div>
          ) : null,
        )}
      </div>
    </MotionEntrySlide>
  );
});

export default ChatWidgetMessage;
