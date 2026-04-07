'use client';
import Script from 'next/script';
import { Locale } from 'next-intl';

type VoiceflowChatProps = {
  locale: Locale;
}

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

declare global {
  interface Window {
    voiceflow: any;
  }
}