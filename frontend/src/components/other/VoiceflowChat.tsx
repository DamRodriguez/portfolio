'use client';
import Script from 'next/script';

interface VoiceflowChatConfig {
  verify: { projectID: string | undefined };
  url: string;
  versionID: string;
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

type VoiceflowChatProps = {
  locale: string;
};

const VoiceflowChat = ({ locale }: VoiceflowChatProps) => {
  return (
    <Script
      key={locale}
      id="voiceflow-widget"
      strategy="lazyOnload"
      onLoad={() => {
        if (window.voiceflow?.chat) {
          window.voiceflow.chat.load({
            verify: { projectID: process.env.NEXT_PUBLIC_VOICEFLOW_PROJECT_ID },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production',
            voice: {
              url: "https://runtime-api.voiceflow.com"
            },
            initialize: {
              variables: {
                user_language: locale
              }
            }
          });
        }
      }}
      src="https://cdn.voiceflow.com/widget-next/bundle.mjs"
    />
  );
};

export default VoiceflowChat;