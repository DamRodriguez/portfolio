import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const lang = locale ?? 'es';

  return {
    locale: lang,
    messages: (await import(`@/messages/${lang}.json`)).default
  };
});
