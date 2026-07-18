"use client";
import useActiveSection from "@/redux/active-section/useActiveSection";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function BackgroundText() {
  const t = useTranslations("header.navItems");
  const { activeSection } = useActiveSection();

  function getActiveSection() {
    switch (activeSection) {
      case "aboutme":
        return t("aboutme");
      case "services":
        return t("services");
      case "work":
        return t("work");
      case "projects":
        return t("projects");
      case "contact":
        return t("contact");
      default:
        return "";
    }
  }

  const isLeftSide =
    activeSection === "aboutme" ||
    activeSection === "contact" ||
    activeSection === "services" ||
    activeSection === "projects";
  const isRightSide = "";
  const isCenter = activeSection === "work";

  return (
    <div className="hidden xl:flex pointer-events-none fixed inset-0 z-21 overflow-hidden">
      <div className="absolute top-[calc(var(--height-header-desktop)+1rem)] w-full h-[calc(100vh-var(--height-header-desktop))]">
        <AnimatePresence mode="popLayout">
          {activeSection && (
            <motion.div
              key={activeSection}
              className={clsx("absolute flex h-full justify-center", {
                "left-0 items-center": isLeftSide,
                "right-0 items-center": isRightSide,
                "inset-x-0 mx-auto w-full items-start mt-[1rem]": isCenter,
              })}
              initial={{
                opacity: 0,
                filter: "blur(20px)",
                y: -20,
                scale: 0.96,
              }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
              exit={{ opacity: 0, filter: "blur(20px)", y: -20, scale: 1.04 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative flex items-center justify-center">
                <p
                  className="font-fira-code text-nowrap xl:text-[clamp(4rem,10vh,16rem)] 4xl:text-[clamp(4rem,14vh,16rem)] font-bold uppercase tracking-[0.08em] text-black dark:text-soft-white opacity-8"
                  style={
                    isCenter
                      ? {}
                      : {
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                        }
                  }
                >
                  {getActiveSection()}
                </p>

                <div
                  className={clsx(
                    "absolute inset-0 pointer-events-none from-white-bone via-white-bone/30 dark:from-black dark:via-black/70 to-transparent",
                    {
                      "bg-gradient-to-l": isRightSide,
                      "bg-gradient-to-r": isLeftSide,
                      "bg-gradient-to-b": isCenter,
                    },
                  )}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
