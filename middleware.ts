import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./lib/i18n/routing";
const intlMiddleware = createMiddleware({ locales, defaultLocale, localeDetection: false });
export default intlMiddleware;
export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"] };
