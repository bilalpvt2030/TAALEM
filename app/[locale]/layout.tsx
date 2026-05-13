import { I18nProvider } from "../../lib/i18n";

export default function LocaleLayout({
 children,
 params,
}: {
 children: React.ReactNode;
 params: { locale: string };
}) {
 const locale = params.locale || "en";
 return (
 <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
 <body>
 <I18nProvider locale={locale}>
 {children}
 </I18nProvider>
 </body>
 </html>
 );
}
