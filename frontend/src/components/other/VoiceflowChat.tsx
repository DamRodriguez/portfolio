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
  // CSS: 
  // textarea { background-color: white !important; color: black !important; color-scheme: light !important; }
  // [class*="vfrc-chat-input"] { background-color: white !important; color-scheme: light !important; }
  const customCSSBase64 = "data:text/css;base64,dGV4dGFyZWEgeyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50OyBjb2xvcjogYmxhY2sgIWltcG9ydGFudDsgY29sb3Itc2NoZW1lOiBsaWdodCAhaW1wb3J0YW50OyB9CltjbGFzcyo9InZmcmMtY2hhdC1pbnB1dCJdIHsgYmFja2dyb3VuZC1jb2xvcjogd2hpdGUgIWltcG9ydGFudDsgY29sb3Itc2NoZW1lOiBsaWdodCAhaW1wb3J0YW50OyB9CltjbGFzcyo9InZmcmMtY2hhdC1pbnB1dC1jb250YWluZXIiXSB7IGJhY2tncm91bmQtY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7IGNvbG9yLXNjaGVtZTogbGlnaHQgIWltcG9ydGFudDsgfQ==";

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