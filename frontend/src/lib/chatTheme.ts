import { normalizeText } from "@/lib/chatUtils";

export type ChatThemeMode = "light" | "dark";

export function detectThemeRequest(text: string): ChatThemeMode | null {
  const normalizedText = normalizeText(text);

  if (
    normalizedText.includes("modo oscuro") ||
    normalizedText.includes("oscuro") ||
    normalizedText.includes("dark")
  ) {
    return "dark";
  }

  if (
    normalizedText.includes("modo claro") ||
    normalizedText.includes("claro") ||
    normalizedText.includes("light")
  ) {
    return "light";
  }

  return null;
}

export function buildThemeActionConfirmation(
  detectedTheme: ChatThemeMode | null,
) {
  if (!detectedTheme) return null;

  return detectedTheme === "dark"
    ? "Listo, cambié al modo oscuro."
    : "Listo, cambié al modo claro.";
}

export function getCurrentThemeInstruction(
  currentTheme: ChatThemeMode,
): string {
  return `\n\nESTADO ACTUAL DEL SISTEMA:
- El tema actual es: ${currentTheme === "dark" ? "oscuro" : "claro"} (${currentTheme} mode)
- SI el usuario pide cambiar al tema ${currentTheme === "dark" ? "oscuro" : "claro"}, NO apliques el cambio. 
- En ese caso, responde indicando que el tema ya es ese. Ejemplos:
  * "El tema ya está en modo oscuro 😊"
  * "Ya tienes activado el modo claro ☀️"
  * "No he hecho ningún cambio, el tema ya estaba en modo oscuro."`;
}

export function buildThemeInstruction(
  detectedTheme: ChatThemeMode | null,
  currentTheme?: ChatThemeMode,
) {
  if (!detectedTheme) return "";

  // Si el tema solicitado es el mismo que el actual, damos una instrucción especial
  if (currentTheme && detectedTheme === currentTheme) {
    const themeLabel = detectedTheme === "dark" ? "oscuro" : "claro";
    const emoji = detectedTheme === "dark" ? "🌙" : "☀️";

    return `\n\nIMPORTANTE - Regla para cambio de tema (SIN CAMBIO):
- El usuario ha pedido cambiar al modo ${themeLabel}, pero el sistema YA está en ese modo.
- NO agregues el marcador __THEME_ACTION__ porque NO hay que hacer ningún cambio.
- Responde de forma breve y amable indicando que el tema ya es ese. Ejemplos:
  * "¡El tema ya está en modo ${themeLabel}! ${emoji}"
  * "No te preocupes, ya tienes el modo ${themeLabel} activado."
  * "El modo ${themeLabel} ya está aplicado, no hace falta cambiarlo."
  * "Ya estamos en modo ${themeLabel}, no he hecho ningún cambio 😊"`;
  }

  // Si el tema es diferente, damos la instrucción normal de cambio
  const themeLabel = detectedTheme === "dark" ? "oscuro" : "claro";
  const emoji = detectedTheme === "dark" ? "🌙" : "☀️";

  return `\n\nIMPORTANTE - Regla para cambio de tema (CON CAMBIO):
- El usuario ha pedido cambiar el tema a modo ${themeLabel}.
- Responde confirmando el cambio de forma breve y natural. Ejemplos:
  * "¡Listo! Te cambié al modo ${themeLabel} ${emoji}"
  * "¡Hecho! Ahora estás en modo ${themeLabel}."
  * "Modo ${themeLabel} activado correctamente ✨"
- AL FINAL de tu respuesta, en una NUEVA LÍNEA SEPARADA, agrega EXACTAMENTE esta línea:
__THEME_ACTION__:${detectedTheme}
- No agregues ningún texto adicional antes, durante o después de esa línea.
- No uses marcas de código ni comillas alrededor del marcador.
- IMPORTANTE: El marcador __THEME_ACTION__:${detectedTheme} debe ser lo ÚLTIMO que aparezca en tu respuesta, sin excepción.`;
}

// Función de utilidad para verificar si realmente hay que cambiar el tema
export function shouldApplyThemeChange(
  detectedTheme: ChatThemeMode | null,
  currentTheme: ChatThemeMode,
): boolean {
  if (!detectedTheme) return false;
  return detectedTheme !== currentTheme;
}

// Función helper para obtener la respuesta completa del tema
export function getThemeChangeResponse(
  detectedTheme: ChatThemeMode | null,
  currentTheme: ChatThemeMode,
): {
  shouldChange: boolean;
  instruction: string;
  themeLabel?: string;
} {
  if (!detectedTheme) {
    return { shouldChange: false, instruction: "" };
  }

  const themeLabel = detectedTheme === "dark" ? "oscuro" : "claro";

  if (detectedTheme === currentTheme) {
    return {
      shouldChange: false,
      instruction: `El tema ya está en modo ${themeLabel}.`,
      themeLabel,
    };
  }

  return {
    shouldChange: true,
    instruction: buildThemeInstruction(detectedTheme, currentTheme),
    themeLabel,
  };
}
