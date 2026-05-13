"use client";
import Link from "next/link";
import { useLocale, useI18n } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import { TaalemLogo } from "./taalem-logo";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
const NAV_LINKS = ["home", "findTutors", "howItWorks", "about"] as const;
export function Navbar() {
 const { t, locale } = useI18n();
 const locale = useLocale();
 const pathname = usePathname();
 const [scrolled, setScrolled] = useState(false);
 useEffect(() => {
 const handler = () => setScrolled(window.scrollY > 8);
 handler();
 window.addEventListener("scroll", handler);
 return () => window.removeEventListener("scroll", handler);
 }, []);
 const isActive = (key: typeof NAV_LINKS[number]) => {
 if (key === "home") return pathname === `/${locale}`;
 if (key === "findTutors") return pathname?.startsWith(`/${locale}/teachers`);
 return pathname === `/${locale}/${key}`;
 };
 return (
 <header className={cn("fixed inset-x-0 top-0 z-40 border-b border-border navbar-blur", scrolled && "shadow-sm")}>
 <nav className="container-taalem flex h-16 items-center justify-between gap-4">
 <div className={cn("flex flex-1 items-center", locale === "ar" ? "justify-end" : "justify-start")}>
 <TaalemLogo />
 </div>
 <div className="hidden flex-1 items-center justify-center lg:flex">
 <ul className="flex items-center gap-6 text-sm font-medium">
 {NAV_LINKS.map((key) => (
 <li key={key}>
 <Link href={key === "home" ? `/${locale}` : key === "findTutors" ? `/${locale}/teachers` : `/${locale}/${key}`}
 className={cn("pb-1 transition-colors", isActive(key) ? "text-primary border-b-2 border-accent" : "text-text-secondary hover:text-primary")}>
 {t(key)}
 </Link>
 </li>
 ))}
 </ul>
 </div>
 <div className={cn("flex flex-1 items-center gap-3", locale === "ar" ? "justify-start" : "justify-end")}>
 <LanguageToggle />
 <ThemeToggle />
 <div className="hidden items-center gap-2 md:flex">
 <Link href={`/${locale}/auth/login`} className="text-sm font-medium text-text-secondary hover:text-primary">{t("login")}</Link>
 <Link href={`/${locale}/auth/signup`} className="btn-accent text-xs font-semibold">{t("signup")}</Link>
 </div>
 </div>
 </nav>
 </header>
 );
}
