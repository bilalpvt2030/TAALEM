import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { isLocale, type Locale } from "../../../lib/i18n/routing";
import { Navbar } from "../../../components/layout/navbar";
import { BottomNav } from "../../../components/layout/bottom-nav";
import { notFound } from "next/navigation";
import { syncUserRoleFromEnv } from "../../../services/authService";
export const dynamic = "force-dynamic";
export default async function PublicLayout({
 children, params
}: { children: ReactNode; params: { locale: string } }) {
 const { locale } = params;
 if (!isLocale(locale)) notFound();
 await syncUserRoleFromEnv();
 const messages = await getMessages({ locale });
 return (
 <NextIntlClientProvider locale={locale as Locale} messages={messages}>
 <div className="min-h-screen bg-background text-text-primary" dir={locale === "ar" ? "rtl" : "ltr"}>
 <Navbar />
 <main className="pt-16">{children}</main>
 <BottomNav />
 </div>
 </NextIntlClientProvider>
 );
}
