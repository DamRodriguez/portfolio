import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"] as const,

  defaultLocale: "es",
});

export type Locale = (typeof routing.locales)[number];
