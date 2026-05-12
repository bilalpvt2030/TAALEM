import { SectionWrapper } from "../../../../components/layout/section-wrapper";
import { getTranslations } from "next-intl/server";
import { createSupabaseServerClient } from "../../../../lib/supabase/server";
import type { TeacherProfile } from "../../../../types";
import { TeacherCard } from "../../../../components/shared/teacher-card";
import { EmptyState } from "../../../../components/shared/empty-state";
export const dynamic = "force-dynamic";
export default async function TeachersPage() {
 const t = await getTranslations("teachers");
 const supabase = createSupabaseServerClient();
 const { data } = await supabase.from("teacher_profiles").select("*").limit(20);
 const teachers = (data as TeacherProfile[]) ?? [];
 return (
 <SectionWrapper>
 <div className="flex items-center justify-between gap-3">
 <h1 className="text-xl font-semibold text-text-primary">{t("title")}</h1>
 </div>
 <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
 {teachers.length === 0 ? (
 <div className="col-span-full"><EmptyState message="No tutors found yet. Check back soon!" /></div>
 ) : (
 teachers.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} />)
 )}
 </div>
 </SectionWrapper>
 );
}
