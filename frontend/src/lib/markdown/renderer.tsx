import type { ReactNode } from "react";
import { parseMarkdownTokens } from "./parser";

export function renderInlineMarkdown(text: string): ReactNode[] {
  const tokens = parseMarkdownTokens(text);

  return tokens.map((token, index) => {
    switch (token.type) {
      case "bold":
        return (
          <strong key={index} className="font-semibold">
            {token.content}
          </strong>
        );

      case "italic":
        return (
          <em key={index} className="italic">
            {token.content}
          </em>
        );

      case "code":
        return (
          <code
            key={index}
            className="rounded bg-black/50 dark:bg-soft-white/50 px-1 py-0.5 font-mono text-xs break-words"
          >
            {token.content}
          </code>
        );

      case "link":
        return (
          <a
            key={index}
            href={token.href}
            target="_blank"
            rel="noreferrer"
            className="bg-black/70 dark:bg-soft-white/70 text-soft-white dark:text-black rounded-[0.2rem] px-[0.3rem] cursor-pointer break-words"
          >
            {token.content}
          </a>
        );

      default:
        return (
          <span key={index} className="break-words">
            {token.content}
          </span>
        );
    }
  });
}
