import Link from "next/link";
import { useLocale } from "@/lib/i18n";
export function TaalemLogo() {
 const locale = useLocale();
 return (
 <Link href={`/${locale}`} className="flex items-center gap-2">
 <span className="text-xl font-bold text-primary">Taalem</span>
 <span className="text-xl font-bold text-accent" dir="rtl">تعلّم</span>
 </Link>
 );
}
