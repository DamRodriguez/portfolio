import {
  buildRateLimitErrorHeaders,
  buildRateLimitHeaders,
} from "@/lib/chat/security/headers";
import { extractClientIp } from "@/lib/chat/security/ip";
import {
  RATE_LIMIT_MAX_REQUESTS,
  rateLimiter,
} from "@/lib/chat/security/rate-limiter";
import { RequestSchema } from "@/lib/chat/security/validation";
import { handleChatStream } from "@/lib/chat/stream-handler";
import { ChatThemeMode } from "@/lib/chatTheme";
import type { UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Rate limiting por IP
    const ip = extractClientIp(req);
    const rateLimitResult = rateLimiter.check(ip);

    if (!rateLimitResult.success) {
      return Response.json(
        {
          error:
            "Demasiadas solicitudes. Esperá un momento y volvé a intentarlo.",
        },
        {
          status: 429,
          headers: buildRateLimitErrorHeaders(
            RATE_LIMIT_MAX_REQUESTS,
            rateLimitResult,
          ),
        },
      );
    }

    // Parsear y validar body
    const body = await req.json();
    const parseResult = RequestSchema.safeParse(body);

    if (!parseResult.success) {
      return Response.json(
        {
          error: "Formato de mensaje inválido",
          details: parseResult.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { messages, currentTheme } = parseResult.data;

    // Validar tema
    let validTheme: ChatThemeMode | undefined;
    if (currentTheme === "light" || currentTheme === "dark") {
      validTheme = currentTheme;
    }

    // Cast de mensajes validados a UIMessage (Zod valida en runtime, TS necesita hint)
    const validatedMessages = messages as UIMessage[];

    const response = await handleChatStream({
      messages: validatedMessages,
      currentTheme: validTheme,
    });

    // Agregar headers de rate limit a respuesta exitosa
    const headers = new Headers(response.headers);
    const rateLimitHeaders = buildRateLimitHeaders(
      RATE_LIMIT_MAX_REQUESTS,
      rateLimitResult,
    );
    rateLimitHeaders.forEach((value, key) => headers.set(key, value));

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  } catch (error) {
    console.error("[chat API] Error:", error);
    return Response.json(
      { error: "No se pudo procesar el mensaje" },
      { status: 500 },
    );
  }
}
