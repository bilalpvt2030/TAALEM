"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { cn } from "../../lib/utils";
export function LanguageToggle() {
 const locale = useLocale();
 const router = useRouter();
 const pathname = usePathname();
 const switchLocale = (nextLocale: "en" | "ar") => {
 if (!pathname) return;
 const segments = pathname.split("/");
 segments[1] = nextLocale;
 router.push(segments.join("/"));
 };
 return (
 <div className="flex rounded-full border border-border bg-surface text-xs">
 <button type="button" onClick={() => switchLocale("en")}
 className={cn("px-3 py-1 rounded-full transition-colors", locale === "en" ? "bg-primary text-white" : "text-text-secondary")}>EN</button>
 <button type="button" onClick={() => switchLocale("ar")}
 className={cn("px-3 py-1 rounded-full transition-colors", locale === "ar" ? "bg-primary text-white" : "text-text-secondary")}>AR</button>
 </div>
 );
}
