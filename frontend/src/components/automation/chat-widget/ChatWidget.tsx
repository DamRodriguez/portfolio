"use client";
import ChatWidgetFooter from "@/components/automation/chat-widget/ChatWidgetFooter";
import ChatWidgetHeader from "@/components/automation/chat-widget/ChatWidgetHeader";
import ChatWidgetMessagesSection from "@/components/automation/chat-widget/messages-body/ChatWidgetMessagesSection";
import MotionEntrySlide from "@/components/motion/MotionEntrySlide";
import MotionOpacity from "@/components/motion/MotionOpacity";
import config from "@/config/config";
import { routes } from "@/constants/routes";
import useBreakpoint from "@/hooks/useBreakpoint";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export type SendMessage = ReturnType<typeof useChat>["sendMessage"];

export default function ChatWidget() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { messages, status, sendMessage } = useChat({
    transport: new DefaultChatTransport({ api: routes.api.chat }),
  });
  const isLoading = status === "submitted" || status === "streaming";

  const isTablet = useBreakpoint(config.breakpoints["2xl"]);
  const isMobile = useBreakpoint(config.breakpoints.sm);
  useScrollLock(isMobile && isWidgetOpen);

  const handleCloseWidget = () => {
    setIsWidgetOpen(false);
  };

  const handleToggleWidget = () => setIsWidgetOpen((prev) => !prev);

  return (
    <>
      <AnimatePresence>
        {isMobile && isWidgetOpen && (
          <MotionOpacity className="popup-glass w-screen h-screen z-999 fixed top-0 left-0">
            <span />
          </MotionOpacity>
        )}
      </AnimatePresence>
      <div
        className={clsx(
          "fixed right-0 bottom-0 z-9999 m-[1rem] xl:m-[1.5rem] flex flex-col items-end theme-transition-all 2xl:rounded-[2rem] rounded-[1.5rem] overflow-hidden",
          {
            "translate-x-0 translate-y-0 shadow-s1": isWidgetOpen,

            "translate-y-[calc(100%-var(--height-widget-header)+1rem)] xl:translate-y-[calc(100%-var(--height-widget-header)+1.5rem)] translate-x-0":
              !isWidgetOpen,

            "2xl:translate-x-[calc(100%-var(--width-widget-header)+1.5rem)] 2xl:translate-y-0":
              !isWidgetOpen,
          },
        )}
      >
        <div className="h-[calc(100svh-2rem)] sm:h-[calc(100svh-var(--height-header-mobile)-5rem)] xl:h-[calc(100svh-var(--height-header-mobile)-7rem)] flex flex-col 2xl:flex-row w-[calc(100vw-2rem)] sm:w-[32rem]">
          <MotionEntrySlide
            order={2}
            direction={isTablet ? "down" : "right"}
            className="backdrop-blur-[0.5rem]"
          >
            <ChatWidgetHeader
              onClose={handleCloseWidget}
              onToggle={handleToggleWidget}
              isOpen={isWidgetOpen}
            />
          </MotionEntrySlide>
          <AnimatePresence>
            {isWidgetOpen && (
              <motion.div
                initial={{ opacity: 0.99 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.99 }}
                transition={{ duration: 0.4 }}
                className={clsx(
                  "relative border w-full h-full flex flex-col overflow-hidden rounded-b-[1.5rem] 2xl:rounded-l-none 2xl:rounded-r-[2rem]",
                  "bg-soft-white border-black/50",
                  "dark:bg-strong-black dark:border-soft-white/50",
                )}
              >
                <ChatWidgetMessagesSection
                  messages={messages}
                  sendMessage={sendMessage}
                  isLoading={isLoading}
                  inputValue={inputValue}
                />

                <ChatWidgetFooter
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  isLoading={isLoading}
                  sendMessage={sendMessage}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
