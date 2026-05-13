
import { createSupabaseServerClient } from '../../../../lib/supabase/server';
import { useI18n } from '@/lib/i18n';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function TeachersPage({ params, searchParams }: { params: { locale: string }; searchParams: { subject?: string; grade?: string } }) {
  const t = await useI18n('teachers');
  const supabase = createSupabaseServerClient();
  let query = supabase.from('teacherprofiles').select('*').limit(20);
  if (searchParams?.subject) {
    query = query.ilike('subjects', `%${searchParams.subject}%`);
  }
  const { data } = await query;
  const teachers = (data ?? []) as any[];

  return (
    <div className="container-taalem py-8">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h1 className="text-xl font-semibold text-text-primary">{t('title')}</h1>
        <span className="text-xs text-text-secondary">{teachers.length} tutors found</span>
      </div>
      {teachers.length === 0 && (
        <div className="text-center py-20">
          <p className="text-text-muted text-sm">No teachers found. <Link href={`/${params.locale}/teachers`} className="text-primary underline">Clear filters</Link></p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher: any) => (
          <div key={teacher.id} className="surface p-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {(teacher.teachername || 'T').charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-text-primary">{teacher.teachername || 'Taalem Tutor'}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-amber-500 text-xs">{'★'.repeat(Math.round(teacher.ratingavg || 4))}</span>
                  <span className="text-xs text-text-muted">({teacher.totalreviews || 0})</span>
                  {teacher.isverified && <span className="text-xs text-green-600 font-medium ml-1">✓ Verified</span>}
                </div>
              </div>
            </div>
            <p className="text-xs text-text-secondary line-clamp-2">
              {Array.isArray(teacher.subjects) ? teacher.subjects.join(' · ') : teacher.subjects || 'General Tutoring'}
            </p>
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span className="font-semibold text-primary">{teacher.hourlyrate ? `${teacher.hourlyrate} SAR/hr` : 'Price on request'}</span>
              <span>{teacher.experienceyears || 0} yrs exp</span>
              <span className="capitalize">{teacher.mode || 'online'}</span>
            </div>
            <Link href={`/${params.locale}/teachers/${teacher.id}`}
              className="btn-primary text-center text-sm py-2 rounded-xl w-full mt-1">
              {t('bookNow')}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
