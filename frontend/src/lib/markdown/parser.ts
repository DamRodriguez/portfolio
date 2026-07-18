export type ParsedToken = {
  type: "text" | "bold" | "italic" | "code" | "link";
  content: string;
  href?: string;
};

const TOKEN_REGEX =
  /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^\)]+\)|https?:\/\/[^\s]+|www\.[^\s]+)/gi;
const URL_TOKEN_REGEX = /^(?:https?:\/\/|www\.)[^\s]+$/i;

export function parseMarkdownTokens(text: string): ParsedToken[] {
  // Si el texto está vacío, retornar array vacío
  if (!text) return [];

  const tokens: string[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // Reiniciar el lastIndex de la regex global
  TOKEN_REGEX.lastIndex = 0;

  while ((match = TOKEN_REGEX.exec(text)) !== null) {
    // Agregar texto antes del token si existe
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index);
      if (beforeText) {
        tokens.push(beforeText);
      }
    }

    // Agregar el token encontrado
    tokens.push(match[0]);
    lastIndex = TOKEN_REGEX.lastIndex;
  }

  // Agregar el texto restante después del último token
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    if (remainingText) {
      tokens.push(remainingText);
    }
  }

  // Si no se encontraron tokens, retornar todo el texto como texto plano
  if (tokens.length === 0) {
    return [{ type: "text", content: text }];
  }

  // Convertir cada token al formato ParsedToken
  return tokens.map((token) => {
    if (/^\*\*[^*]+\*\*$/.test(token)) {
      return { type: "bold", content: token.slice(2, -2) };
    }

    if (/^\*[^*]+\*$/.test(token)) {
      return { type: "italic", content: token.slice(1, -1) };
    }

    if (/^`[^`]+`$/.test(token)) {
      return { type: "code", content: token.slice(1, -1) };
    }

    if (/^\[[^\]]+\]\([^\)]+\)$/.test(token)) {
      const match = token.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
      if (match) {
        return { type: "link", content: match[1], href: match[2] };
      }
    }

    if (URL_TOKEN_REGEX.test(token)) {
      const href = token.startsWith("www.") ? `https://${token}` : token;
      return { type: "link", content: token, href };
    }

    return { type: "text", content: token };
  });
}

export type ParsedBlock = {
  type: "paragraph" | "code" | "bullet-list" | "ordered-list" | "heading";
  content?: string;
  items?: string[];
  level?: number;
  code?: string;
  language?: string;
};

export function parseMarkdownBlocks(text: string): ParsedBlock[] {
  const blocks = text.split(/\n\s*\n/).filter(Boolean);

  return blocks.map((block) => {
    const trimmed = block.trim();

    // Bloque de código
    if (/^```/.test(trimmed)) {
      const languageMatch = trimmed.match(/^```(\w+)?/);
      const language = languageMatch?.[1] || undefined;
      const code = trimmed.replace(/^```[\w-]*\s*/, "").replace(/```$/, "");

      return { type: "code", code, language };
    }

    // Listas y otros elementos se procesan en el renderizado
    return { type: "paragraph", content: trimmed };
  });
}
