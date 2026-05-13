import { createSupabaseServerClient } from '../../../../../../lib/supabase/server';
import { redirect } from 'next/navigation';
import TeacherAnalyticsClient from '@/components/teacher/TeacherAnalyticsClient';

export const metadata = { title: 'Analytics | Teacher Dashboard | Taalem' };

export default async function AnalyticsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  const { data: sessions } = await supabase
    .from('bookings')
    .select('id, scheduled_at, status, duration_minutes, payment_transactions(amount)')
    .eq('teacher_id', user.id);

  const { data: profile } = await supabase
    .from('teacherprofiles')
    .select('rating, totalreviews, hourlyrate')
    .eq('user_id', user.id)
    .single();

  return <TeacherAnalyticsClient sessions={sessions ?? []} profile={profile} userId={user.id} />;
}
