import { ChatThemeMode } from "@/lib/chatTheme";
import type { UIMessage } from "ai";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from "ai";
import { detectMessageContext } from "./context-detector";
import { getLLMProvider } from "./llm-provider";
import { loadRepresentativeProfile } from "./profile-loader";
import { buildSystemPrompt } from "./prompt-builder";

export type StreamConfig = {
  messages: UIMessage[];
  currentTheme?: ChatThemeMode;
};

export async function handleChatStream({
  messages,
  currentTheme,
}: StreamConfig) {
  const { sdk, modelId } = getLLMProvider();
  const representativeProfile = await loadRepresentativeProfile();
  const context = detectMessageContext(messages, currentTheme);
  const systemPrompt = buildSystemPrompt({
    representativeProfile,
    context,
  });

  const result = streamText({
    model: sdk.chat(modelId),
    messages: await convertToModelMessages(messages),
    system: systemPrompt,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      originalMessages: messages,
    }),
  });
}
