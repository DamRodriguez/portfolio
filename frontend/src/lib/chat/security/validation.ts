import { z } from "zod";

export const MessagePartSchema = z
  .object({
    type: z.enum(["text", "tool-invocation", "tool-result", "step-start"]),
    text: z.string().max(8000).optional(),
    // Permitir otros tipos de parts (tool calls, etc.)
  })
  .passthrough();

export const MessageSchema = z
  .object({
    id: z.string().min(1),
    role: z.enum(["user", "assistant", "system"]),
    parts: z.array(MessagePartSchema).max(50).default([]),
    createdAt: z.number().optional(),
    // Permitir campos adicionales del AI SDK
  })
  .passthrough();

export const RequestSchema = z.object({
  messages: z.array(MessageSchema).max(50),
  currentTheme: z.enum(["light", "dark"]).optional(),
});

export type ChatRequest = z.infer<typeof RequestSchema>;
export type ChatMessage = z.infer<typeof MessageSchema>;