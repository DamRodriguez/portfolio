import { projectsData } from "@/data/projectsData";
import { ChatThemeMode } from "@/lib/chatTheme";

export type ChatMessagePart = {
  type: string;
  text?: string;
};

export type ChatMessage = {
  role: string;
  parts?: ChatMessagePart[];
};

export const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .trim();

export function getLatestUserText(messages: ChatMessage[]) {
  const latestUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user");

  return (latestUserMessage?.parts ?? [])
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join(" ");
}

export function getProjectKeyFromMessage(messages: ChatMessage[]) {
  const latestUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user");

  const textParts = latestUserMessage?.parts ?? [];
  const rawText = textParts
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join(" ");

  const normalizedText = normalizeText(rawText);

  const aliasMap: Record<string, string> = {
    "spotify mobile": "spotifyMobile",
    spotify: "spotifyMobile",
    "lopez propiedades": "lopezPropiedades",
    lopez: "lopezPropiedades",
    vanicracia: "vanicracia",
    "alfombras tauro": "alfombrasTauro",
    tauro: "alfombrasTauro",
    "donde salgo": "dondeSalgo",
  };

  for (const [alias, translationKey] of Object.entries(aliasMap)) {
    if (normalizedText.includes(alias)) {
      return translationKey;
    }
  }

  return projectsData.find((project) =>
    normalizedText.includes(normalizeText(project.translationKey)),
  )?.translationKey;
}

export function cleanThemeActionText(text: string): string {
  return text
    .replace(/__THEME_ACTION__\s*:\s*(dark|light)/gi, "")
    .replace(/^\s*[\n\r]+/gm, "")
    .replace(/\n{2,}/g, "\n\n")
    .trim();
}

export function hasThemeAction(text: string): boolean {
  return /__THEME_ACTION__\s*:\s*(dark|light)/i.test(text);
}

export function extractThemeAction(text: string): ChatThemeMode | null {
  const match = text.match(/__THEME_ACTION__\s*:\s*(dark|light)/i);
  return (match?.[1] as ChatThemeMode) || null;
}
