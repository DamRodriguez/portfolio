import type { MessageContext } from "./context-detector";

type PromptConfig = {
  representativeProfile: string | null;
  context: MessageContext;
};

export function buildSystemPrompt({
  representativeProfile,
  context,
}: PromptConfig): string {
  const basePrompt = representativeProfile ?? "";
  const themeInstruction = context.themeInstruction;

  return `${basePrompt}${themeInstruction}`;
}
