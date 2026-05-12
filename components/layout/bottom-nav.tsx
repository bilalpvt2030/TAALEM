"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
export function BottomNav() {
 const t = useTranslations("bottomNav");
 const locale = useLocale();
 const pathname = usePathname();
 const items = [
 { key: "home", href: `/${locale}`, icon: "⌂" },
 { key: "search", href: `/${locale}/teachers`, icon: "⌕" },
 { key: "bookings", href: `/${locale}/dashboard/parent`, icon: "📅" },
 { key: "profile", href: `/${locale}/auth/login`, icon: "👤" },
 ] as const;
 return (
 <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface md:hidden">
 <div className="flex h-14 items-center justify-around">
 {items.map(({ key, href, icon }) => (
 <Link key={key} href={href} className={cn("flex flex-col items-center gap-0.5 text-xs", pathname === href ? "text-primary" : "text-text-muted")}>
 <span className="text-lg leading-none">{icon}</span>
 <span>{t(key as any)}</span>
 </Link>
 ))}
 </div>
 </nav>
 );
}
