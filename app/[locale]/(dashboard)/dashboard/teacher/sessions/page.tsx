import { createSupabaseServerClient } from '../../../../../../lib/supabase/server';
import { redirect } from 'next/navigation';
import TeacherSessionsClient from '@/components/teacher/TeacherSessionsClient';

export const metadata = { title: 'Sessions | Teacher Dashboard | Taalem' };

export default async function SessionsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  const { data: sessions } = await supabase
    .from('bookings')
    .select(`
      id, scheduled_at, duration_minutes, status, notes,
      students(name, grade),
      payment_transactions(amount, status)
    `)
    .eq('teacher_id', user.id)
    .order('scheduled_at', { ascending: false });

  return <TeacherSessionsClient sessions={sessions ?? []} userId={user.id} />;
}
