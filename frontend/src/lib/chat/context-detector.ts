// context-detector.ts
import {
  buildThemeInstruction,
  detectThemeRequest,
  getCurrentThemeInstruction,
  type ChatThemeMode,
} from "@/lib/chatTheme";
import { getLatestUserText, getProjectKeyFromMessage } from "@/lib/chatUtils";
import type { UIMessage } from "ai";

export type MessageContext = {
  projectKey: string | null;
  theme: ChatThemeMode | null;
  hasProjectRequest: boolean;
  hasThemeRequest: boolean;
  themeInstruction: string;
};

export function detectMessageContext(
  messages: UIMessage[],
  currentTheme?: ChatThemeMode,
): MessageContext {
  const latestUserText = getLatestUserText(messages);
  const projectKey = getProjectKeyFromMessage(messages) ?? null;
  const requestedTheme = detectThemeRequest(latestUserText);

  // Validar/sanitize currentTheme
  const validCurrentTheme: ChatThemeMode | undefined =
    currentTheme === "light" || currentTheme === "dark"
      ? currentTheme
      : undefined;

  let themeInstruction = "";

  if (requestedTheme && validCurrentTheme) {
    themeInstruction = buildThemeInstruction(requestedTheme, validCurrentTheme);
  } else if (validCurrentTheme) {
    themeInstruction = getCurrentThemeInstruction(validCurrentTheme);
  }

  return {
    projectKey,
    theme: requestedTheme,
    hasProjectRequest: !!projectKey,
    hasThemeRequest: !!requestedTheme,
    themeInstruction,
  };
}
