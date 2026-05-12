import Link from "next/link";
import { TeacherProfile } from "../../types";
import { VerifiedBadge } from "./status-badge";
import { StarRating } from "./star-rating";
import { useTranslations, useLocale } from "next-intl";
export function TeacherCard({ teacher }: { teacher: TeacherProfile }) {
 const t = useTranslations("teachers");
 const locale = useLocale();
 return (
 <div className="surface flex flex-col p-4">
 <div className="flex items-center gap-3">
 <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
 {(teacher.teacher_name ?? "T")[0]}
 </div>
 <div className="flex min-w-0 flex-1 flex-col">
 <div className="flex items-center gap-2">
 <h3 className="truncate text-sm font-semibold text-text-primary">
 {teacher.teacher_name ?? t("defaultTeacherName")}
 </h3>
 <VerifiedBadge status={teacher.is_verified} />
 </div>
 <StarRating value={teacher.rating_avg ?? 0} />
 <p className="mt-1 line-clamp-1 text-xs text-text-secondary">{teacher.subjects}</p>
 </div>
 </div>
 <div className="mt-3 flex items-center justify-between text-xs text-text-secondary">
 <span>{t("pricePerHour", { value: teacher.hourly_rate ?? 0 })}</span>
 <span>{t("modeLabel", { mode: teacher.mode })}</span>
 </div>
 <div className="mt-4 flex items-center justify-between gap-2">
 <Link href={`/${locale}/teachers/${teacher.id}`} className="btn-primary flex-1 text-xs text-center">
 {t("bookNow")}
 </Link>
 </div>
 </div>
 );
}
