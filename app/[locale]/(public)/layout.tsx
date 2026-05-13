import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { isLocale, type Locale } from "@/lib/i18n/routing";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function PublicLayout({
 children, params
}: { children: ReactNode; params: { locale: string } }) {
 const { locale } = params;
 if (!isLocale(locale)) notFound();
 const messages = await getMessages({ locale });
 return (
 <NextIntlClientProvider locale={locale as Locale} messages={messages}>
 <div className="min-h-screen bg-background text-text-primary">
 <main className="pt-16">{children}</main>
 </div>
 </NextIntlClientProvider>
 );
}
