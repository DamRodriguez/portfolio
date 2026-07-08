import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Params = Promise<{
  locale: Locale;
}>;

export async function getValidatedLocale(params: Params): Promise<Locale> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return locale as Locale;
}
