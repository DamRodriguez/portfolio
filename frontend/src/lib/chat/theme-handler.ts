// lib/chat/theme-handler.ts
import {
  buildThemeActionConfirmation,
  type ChatThemeMode,
} from "@/lib/chatTheme";
import { extractThemeAction } from "@/lib/chatUtils";
import { applyThemeTransition } from "@/lib/themeActions";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

const STORAGE_KEY = "chat-theme-actions-applied";

function getAppliedThemeActions(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function markThemeActionApplied(messageId: string) {
  if (typeof window === "undefined") return;
  try {
    const applied = getAppliedThemeActions();
    applied.add(messageId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...applied]));
  } catch {
    // ignore storage errors
  }
}

function wasThemeActionApplied(messageId: string): boolean {
  return getAppliedThemeActions().has(messageId);
}

type ThemeHandlerConfig = {
  text: string;
  setTheme: (theme: string) => void;
  isLatestAssistantMessage?: boolean;
  messageId?: string;
};

export function useThemeHandler({ text, setTheme, isLatestAssistantMessage = false, messageId }: ThemeHandlerConfig) {
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

    // Si ya procesamos este messageId, saltar
    if (messageId && wasThemeActionApplied(messageId)) {
      return;
    }

    const currentTheme = (resolvedTheme ??
      theme ??
      systemTheme ??
      "dark") as ChatThemeMode;

    if (action === currentTheme || lastAppliedAction.current === action) {
      lastAppliedAction.current = action;
      pendingAction.current = null;
      if (messageId) markThemeActionApplied(messageId);
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

      if (messageId) markThemeActionApplied(messageId);
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
  }, [text, setTheme, theme, resolvedTheme, systemTheme, isLatestAssistantMessage, messageId]);

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

  // Primero buscar el contenedor del chat widget (prioridad en móvil/pantalla completa)
  const chatWidgetContainer = document.querySelector(
    "[data-chat-widget-container]",
  ) as HTMLElement | null;
  if (chatWidgetContainer) {
    // Verificar si el widget está "abierto" (no colapsado)
    const isOpen = chatWidgetContainer.classList.contains("translate-x-0") &&
      chatWidgetContainer.classList.contains("translate-y-0");
    // En móvil (pantalla completa) también tiene las clases de posición fija completa
    const isMobileFullscreen = window.innerWidth < 1280 && isOpen;

    if (isOpen && (isMobileFullscreen || window.innerWidth < 1280)) {
      return chatWidgetContainer;
    }
  }

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
