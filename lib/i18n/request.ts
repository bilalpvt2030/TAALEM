import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale, type Locale } from "./routing";
export default getRequestConfig(async ({ locale }) => {
 const isSupported = locales.includes(locale as Locale);
 const resolvedLocale = isSupported ? (locale as Locale) : defaultLocale;
 return {
 locale: resolvedLocale,
 messages: (await import(`../../locales/${resolvedLocale}.json`)).default,
 };
});
