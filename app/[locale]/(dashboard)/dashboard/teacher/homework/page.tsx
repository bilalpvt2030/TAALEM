import { createSupabaseServerClient } from '../../../../../../lib/supabase/server';
import { redirect } from 'next/navigation';
import TeacherHomeworkClient from '@/components/teacher/TeacherHomeworkClient';

export const metadata = { title: 'Homework & Notes | Taalem' };

export default async function HomeworkPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  const { data: homework } = await supabase
    .from('homework')
    .select('*, students(id, name, grade)')
    .eq('teacher_id', user.id)
    .order('due_date', { ascending: true });

  return <TeacherHomeworkClient homework={homework ?? []} userId={user.id} />;
}
