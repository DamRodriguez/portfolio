// lib/chat/theme-handler.ts
import {
  buildThemeActionConfirmation,
  type ChatThemeMode,
} from "@/lib/chatTheme";
import { extractThemeAction } from "@/lib/chatUtils";
import { applyThemeTransition } from "@/lib/themeActions";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

type ThemeHandlerConfig = {
  text: string;
  setTheme: (theme: string) => void;
  isLatestAssistantMessage?: boolean;
};

export function useThemeHandler({ text, setTheme, isLatestAssistantMessage = false }: ThemeHandlerConfig) {
  const { theme, resolvedTheme, systemTheme } = useTheme();
  const lastAppliedAction = useRef<ChatThemeMode | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const pendingAction = useRef<ChatThemeMode | null>(null);

  useEffect(() => {
    // Solo procesar cambios de tema si es el último mensaje del asistente
    if (!isLatestAssistantMessage) {
      return;
    }

    const action = extractThemeAction(text);

    if (!action) {
      return;
    }

    const currentTheme = (resolvedTheme ??
      theme ??
      systemTheme ??
      "dark") as ChatThemeMode;

    if (action === currentTheme || lastAppliedAction.current === action) {
      lastAppliedAction.current = action;
      pendingAction.current = null;
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("chat-theme-change", {
            detail: {
              theme: action,
              message: buildThemeActionConfirmation(action),
            },
          }),
        );
      }
      return;
    }

    pendingAction.current = action;
    lastAppliedAction.current = action;

    if (typeof window === "undefined") {
      return;
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      const triggerElement = findThemeToggleElement();
      const resolvedAction = pendingAction.current;

      if (!resolvedAction) {
        return;
      }

      applyThemeTransition({
        targetTheme: resolvedAction,
        setTheme,
        triggerElement: triggerElement || null,
      });

      pendingAction.current = null;

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("chat-theme-change", {
            detail: {
              theme: resolvedAction,
              message: buildThemeActionConfirmation(resolvedAction),
            },
          }),
        );
      }
    }, 150);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [text, setTheme, theme, resolvedTheme, systemTheme, isLatestAssistantMessage]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);
}

function findThemeToggleElement(): HTMLElement | null {
  if (typeof window === "undefined") return null;

  const dataElement = document.querySelector(
    "[data-theme-toggle]",
  ) as HTMLElement | null;
  if (dataElement) return dataElement;

  const switchInput = document.getElementById(
    "switch",
  ) as HTMLInputElement | null;
  if (switchInput?.parentElement) {
    return switchInput.parentElement as HTMLElement;
  }

  const classElement = document.querySelector(
    ".theme-transition-all",
  ) as HTMLElement | null;
  if (classElement) return classElement;

  return null;
}
