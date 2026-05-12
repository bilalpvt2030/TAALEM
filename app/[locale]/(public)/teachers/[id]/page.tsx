import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createSupabaseServerClient } from "../../../../../lib/supabase/server";
import { SectionWrapper } from "../../../../../components/layout/section-wrapper";
import { StarRating } from "../../../../../components/shared/star-rating";
import { VerifiedBadge } from "../../../../../components/shared/status-badge";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default async function TeacherProfilePage({ params }: { params: { locale: string; id: string } }) {
 const t = await getTranslations("teacherProfile");
 const supabase = createSupabaseServerClient();
 const { data } = await supabase.from("teacher_profiles").select("*").eq("id", params.id).single();
 if (!data) notFound();
 const teacher = data as any;
 return (
 <SectionWrapper>
 <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
 <div className="surface p-5">
 <div className="flex items-center gap-4">
 <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
 {(teacher.teacher_name ?? "T")[0]}
 </div>
 <div>
 <h1 className="text-lg font-semibold text-text-primary">{teacher.teacher_name ?? t("defaultTeacherName")}</h1>
 <div className="mt-1 flex items-center gap-2">
 <StarRating value={teacher.rating_avg ?? 0} />
 <VerifiedBadge status={teacher.is_verified} />
 </div>
 <p className="mt-1 text-xs text-text-secondary">{teacher.subjects}</p>
 </div>
 </div>
 <div className="mt-5 grid gap-3 text-xs text-text-secondary sm:grid-cols-3">
 <div><p className="font-semibold text-text-primary">{t("experience")}</p><p>{teacher.experience_years} {t("years")}</p></div>
 <div><p className="font-semibold text-text-primary">{t("mode")}</p><p>{teacher.mode}</p></div>
 <div><p className="font-semibold text-text-primary">{t("languages")}</p><p>{Array.isArray(teacher.languages) ? teacher.languages.join(", ") : teacher.languages}</p></div>
 </div>
 {(teacher.bio_en || teacher.bio_ar) && (
 <div className="mt-6">
 <h2 className="text-sm font-semibold text-text-primary">{t("bio")}</h2>
 <p className="mt-2 text-sm text-text-secondary">{teacher.bio_en ?? teacher.bio_ar}</p>
 </div>
 )}
 </div>
 <aside className="surface flex flex-col gap-3 p-4">
 <p className="text-sm font-semibold text-text-primary">{t("sidebarTitle")}</p>
 <p className="text-xs text-text-secondary">{t("pricePerHour", { value: teacher.hourly_rate ?? 0 })}</p>
 <Link href={`/${params.locale}/dashboard/parent/book/${teacher.id}`} className="btn-primary w-full text-xs text-center">{t("requestBooking")}</Link>
 <p className="text-[11px] text-text-muted">{t("safetyNote")}</p>
 </aside>
 </div>
 </SectionWrapper>
 );
}
