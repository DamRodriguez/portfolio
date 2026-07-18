"use client";
import { ProjectCardWrapper } from "@/components/common/ProjectCardWrapper";
import {
  cleanCustomComponentText,
  extractCustomComponent,
} from "@/lib/chat/component-extractor";
import { useThemeHandler } from "@/lib/chat/theme-handler";
import { cleanThemeActionText } from "@/lib/chatUtils";
import { CodeBlock, ParagraphBlock } from "@/lib/markdown/blocks";
import { renderInlineMarkdown } from "@/lib/markdown/renderer";
import { useTheme } from "next-themes";

type MarkdownMessageProps = {
  text: string;
  isLatestAssistantMessage?: boolean;
  messageId?: string;
};

export default function MarkdownMessage({ text, isLatestAssistantMessage = false, messageId }: MarkdownMessageProps) {
  const { setTheme } = useTheme();

  // Manejar cambios de tema solo si es el último mensaje del asistente
  useThemeHandler({ text, setTheme, isLatestAssistantMessage, messageId });

  // Limpiar y procesar el texto
  const displayText = cleanThemeActionText(text);
  const blocks = displayText.split(/\n\s*\n/).filter(Boolean);

  // Extraer componente personalizado si existe
  const customComponent = extractCustomComponent(displayText);

  // Renderizar componente personalizado con texto introductorio
  if (
    displayText.includes("__CUSTOM_COMPONENT__") &&
    customComponent?.project
  ) {
    const introText = cleanCustomComponentText(displayText);

    return (
      <div className="space-y-6 break-words">
        {introText && (
          <div className="whitespace-pre-wrap leading-relaxed break-words">
            {renderInlineMarkdown(introText)}
          </div>
        )}
        <div className="space-y-2">
          <ProjectCardWrapper project={customComponent.project} />
        </div>
      </div>
    );
  }

  // Renderizar bloques de markdown normales
  return (
    <div className="space-y-2 whitespace-pre-wrap break-words">
      {blocks.map((block, blockIndex) => {
        const trimmed = block.trim();

        if (/^```/.test(trimmed)) {
          return <CodeBlock key={blockIndex} content={trimmed} />;
        }

        return <ParagraphBlock key={blockIndex} content={trimmed} />;
      })}
    </div>
  );
}
