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
  {/*
    CSS Codificado:
    textarea { color-scheme: light !important; }

    [class*="vfrc-button"] { 
      box-shadow: 0 0 30px 0 rgba(255, 255, 255, 0.03) inset, 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.2) !important;
      border: 1px solid rgba(255, 255, 255, 0.5) !important;
    }
      
    [class*="vfrc-chat-dialog__container"] { 
      box-shadow: 0 0 30px 0 rgba(255, 255, 255, 0.03) inset, 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.2) !important;
      border: 1px solid rgba(255, 255, 255, 0.5) !important;
    }

    [class*="vfrc-header--button"] {
      box-shadow: none !important;
      border: none !important;
    }
  */}

  const customCSSBase64 = "data:text/css;base64,dGV4dGFyZWEgeyBjb2xvci1zY2hlbWU6IGxpZ2h0ICFpbXBvcnRhbnQ7IH0KW2NsYXNzKj0idmZyYy1idXR0b24iXSwgW2NsYXNzKj0idmZyYy1jaGF0LWRpYWxvZ19fY29udGFpbmVyIl0geyBib3gtc2hhZG93OiAwIDAgMzBweCAwIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMykgaW5zZXQsIDAgMnB4IDRweCAwIHJnYmEoMCwgMCwgMCwgMC4yKSwgMCA0cHggNXB4IDAgcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDFweCAxMHB4IDAgcmdiYSgwLCAwLCAwLCAwLjIpICFpbXBvcnRhbnQ7IGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KSAhaW1wb3J0YW50OyB9CltjbGFzcyo9InZmcmMtaGVhZGVyLS1idXR0b24iXSB7IGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDsgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7IH0=";

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