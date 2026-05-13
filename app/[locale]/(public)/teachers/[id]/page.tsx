
import { createSupabaseServerClient } from '../../../../../lib/supabase/server';
import { useI18n } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import BookingForm from '../../../../../components/features/booking-form';

export const dynamic = 'force-dynamic';

export default async function TeacherProfilePage({ params }: { params: { locale: string; id: string } }) {
  const t = await useI18n('teacherProfile');
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from('teacherprofiles').select('*').eq('id', params.id).single();
  if (!data) notFound();
  const teacher = data as any;

  return (
    <div className="container-taalem py-8">
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="surface p-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
              {(teacher.teachername || 'T').charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-semibold text-text-primary">{teacher.teachername || t('defaultTeacherName')}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-amber-500">{'★'.repeat(Math.round(teacher.ratingavg || 4))}</span>
                <span className="text-xs text-text-muted">({teacher.totalreviews || 0} reviews)</span>
                {teacher.isverified && <span className="text-xs text-green-600 font-semibold">✓ Verified</span>}
              </div>
              <p className="text-xs text-text-secondary mt-1">
                {Array.isArray(teacher.subjects) ? teacher.subjects.join(' · ') : teacher.subjects}
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
            <div className="surface p-3 text-center">
              <p className="font-semibold text-text-primary text-lg">{teacher.experienceyears || 0}</p>
              <p className="text-xs text-text-secondary">{t('experience')}</p>
            </div>
            <div className="surface p-3 text-center">
              <p className="font-semibold text-text-primary text-lg capitalize">{teacher.mode || 'Online'}</p>
              <p className="text-xs text-text-secondary">{t('mode')}</p>
            </div>
            <div className="surface p-3 text-center">
              <p className="font-semibold text-primary text-lg">{teacher.hourlyrate ? `${teacher.hourlyrate} SAR` : 'TBD'}</p>
              <p className="text-xs text-text-secondary">per hour</p>
            </div>
          </div>
          {(teacher.bioen || teacher.bioar) && (
            <div className="mt-5">
              <h2 className="text-sm font-semibold text-text-primary mb-2">{t('bio')}</h2>
              <p className="text-sm text-text-secondary">{teacher.bioen || teacher.bioar}</p>
            </div>
          )}
        </div>
        <BookingForm teacherId={teacher.id} teacherName={teacher.teachername || 'Tutor'} locale={params.locale} hourlyRate={teacher.hourlyrate} />
      </div>
    </div>
  );
}
