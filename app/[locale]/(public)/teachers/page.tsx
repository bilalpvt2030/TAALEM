import { createSupabaseServerClient } from '../../../../lib/supabase/server';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function TeachersPage({ params, searchParams }: { params: { locale: string }; searchParams: { subject?: string; grade?: string } }) {
  const t = await getTranslations('teachers');
  const supabase = await createSupabaseServerClient();
  let query = supabase.from('teacherprofiles').select('*').limit(20);
  if (searchParams?.subject) {
    query = query.ilike('subjects', `%${searchParams.subject}%`);
  }
  if (searchParams?.grade) {
    query = query.ilike('grade', `%${searchParams.grade}%`);
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
              <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
                {(teacher.teachername || 'T').charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-text-primary">{teacher.teachername}</p>
                  {teacher.isverified && <span className="text-green-600 font-medium">&#10003; Verified</span>}
                </div>
              </div>
            </div>
            <p className="text-xs text-text-secondary">
              {Array.isArray(teacher.subjects) ? teacher.subjects.join(' \u00b7 ') : teacher.subjects}
            </p>
            <div className="flex gap-3 text-xs text-text-secondary">
              <span>{teacher.hourlyrate ? `${teacher.hourlyrate} SAR/hr` : 'Price on request'}</span>
              <span>{teacher.experienceyears || 0} yrs exp</span>
              <span>{teacher.mode || 'online'}</span>
            </div>
            <Link href={`/${params.locale}/teachers/${teacher.id}`}
              className="mt-auto bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg text-sm text-center transition-colors">
              {t('bookNow')}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
