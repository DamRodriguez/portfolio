import type { ReactNode } from "react";
import { renderInlineMarkdown } from "./renderer";

type BlockRendererProps = {
  content: string;
};

export function CodeBlock({ content }: BlockRendererProps) {
  const codeLines = content
    .replace(/^```[\w-]*\s*/, "")
    .replace(/```$/, "")
    .split("\n");

  return (
    <pre className="overflow-x-auto rounded bg-black/50 dark:bg-soft-white/50 p-2 text-xs">
      <code className="break-words">{codeLines.join("\n")}</code>
    </pre>
  );
}

export function ParagraphBlock({ content }: BlockRendererProps) {
  const lines = content.split("\n");
  const elements: ReactNode[] = [];

  lines.forEach((line, lineIndex) => {
    if (line.includes("__THEME_ACTION__")) return;

    const bulletMatch = line.match(/^[-*]\s+(.*)$/);
    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);

    if (bulletMatch) {
      elements.push(
        <div key={`${lineIndex}`} className="ml-4 list-disc">
          <span className="text-black/50 dark:text-soft-white/50">•</span>{" "}
          {renderInlineMarkdown(bulletMatch[1])}
        </div>,
      );
      return;
    }

    if (orderedMatch) {
      elements.push(
        <div key={`${lineIndex}`} className="ml-4">
          {lineIndex + 1}. {renderInlineMarkdown(orderedMatch[1])}
        </div>,
      );
      return;
    }

    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingClass =
        level === 1
          ? "text-base font-semibold"
          : level === 2
            ? "text-sm font-semibold"
            : "text-xs font-semibold";

      elements.push(
        <div key={`${lineIndex}`} className={headingClass}>
          {renderInlineMarkdown(headingMatch[2])}
        </div>,
      );
      return;
    }

    elements.push(
      <div key={`${lineIndex}`} className="leading-relaxed">
        {renderInlineMarkdown(line)}
      </div>,
    );
  });

  if (elements.length === 0) return null;

  return <div className="space-y-1 whitespace-pre-wrap break-words">{elements}</div>;
}
