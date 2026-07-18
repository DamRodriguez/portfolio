import { createOpenAI } from "@ai-sdk/openai";

export type LLMProvider = {
  sdk: ReturnType<typeof createOpenAI>;
  modelId: string;
};

export function getLLMProvider(): LLMProvider {
  // const providerType = process.env.ACTIVE_LLM_PROVIDER;

  return {
    sdk: createOpenAI({
      apiKey: process.env.NVIDIA_API_KEY,
      baseURL: process.env.NVIDIA_BASE_URL,
    }),
    modelId: process.env.NVIDIA_MODEL || "",
  };

  // return {
  //   sdk: createOpenAI({ apiKey: process.env.OPENAI_API_KEY }),
  //   modelId: process.env.OPENAI_MODEL || "",
  // };
}
