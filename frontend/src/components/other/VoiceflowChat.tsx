'use client';

import Script from 'next/script';

interface VoiceflowChatConfig {
  verify: { projectID: string | undefined };
  url: string;
  versionID: string;
  assistant?: {
    stylesheet: string;
  };
  voice?: {
    url: string;
  };
  initialize?: {
    variables: {
      user_language: string;
    };
  };
}

interface VoiceflowObject {
  chat: {
    load: (config: VoiceflowChatConfig) => void;
  };
}

declare global {
  interface Window {
    voiceflow?: VoiceflowObject;
  }
}

const VoiceflowChat = ({ locale }: { locale: string }) => {
  // CSS Codificado:
  // textarea { color-scheme: light !important; }
  // [class*="vfrc-chat-input"] { color-scheme: light !important; }
  // [class*="vfrc-chat-input-container"] { color-scheme: light !important; }

  const customCSSBase64 = "data:text/css;base64,dGV4dGFyZWEgeyBjb2xvci1zY2hlbWU6IGxpZ2h0ICFpbXBvcnRhbnQ7IH0KW2NsYXNzKj0idmZyYy1jaGF0LWlucHV0Il0geyBjb2xvci1zY2hlbWU6IGxpZ2h0ICFpbXBvcnRhbnQ7IH0KW2NsYXNzKj0idmZyYy1jaGF0LWlucHV0LWNvbnRhaW5lciIgeyBjb2xvci1zY2hlbWU6IGxpZ2h0ICFpbXBvcnRhbnQ7IH0=";

  return (
    <Script
      key={locale}
      id="voiceflow-widget"
      src="https://cdn.voiceflow.com/widget-next/bundle.mjs"
      strategy="afterInteractive"
      type="text/javascript"
      onLoad={() => {
        if (window.voiceflow?.chat) {
          window.voiceflow.chat.load({
            verify: { projectID: process.env.NEXT_PUBLIC_VOICEFLOW_PROJECT_ID },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production',
            assistant: {
              stylesheet: customCSSBase64
            },
            voice: {
              url: "https://runtime-api.voiceflow.com"
            },
            initialize: {
              variables: {
                user_language: locale
              }
            },
          });
        }
      }}
    />
  );
};

export default VoiceflowChat;