
import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '../../../lib/i18n/routing';

export const dynamic = 'force-dynamic';

export default async function AuthLayout({ children, params }: { children: ReactNode; params: { locale: string } }) {
  const locale = params.locale;
  if (!locales.includes(locale as any)) notFound();
  let messages;
  try { messages = (await import(`../../../locales/${locale}.json`)).default; } catch { notFound(); }
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen bg-background text-text-primary">
        <nav className="fixed inset-x-0 top-0 z-40 border-b border-border bg-white/90 backdrop-blur">
          <div className="container-taalem flex h-16 items-center justify-between">
            <a href={`/${locale}`} className="text-xl font-black text-primary">TAALEM</a>
            <a href={`/${locale}/teachers`} className="text-sm text-text-secondary hover:text-primary">Find Tutors</a>
          </div>
        </nav>
        <main className="pt-16">{children}</main>
      </div>
    </NextIntlClientProvider>
  );
}
