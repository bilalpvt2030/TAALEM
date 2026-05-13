import { createSupabaseServerClient } from '../../../../../../lib/supabase/server';
import { redirect } from 'next/navigation';
import TeacherProfileClient from '@/components/teacher/TeacherProfileClient';

export const metadata = { title: 'Edit Profile | Taalem' };

export default async function TeacherProfilePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  const { data: profile } = await supabase
    .from('teacherprofiles')
    .select('full_name, phone, avatar_url, bio, subjects, grade, mode, hourlyrate, experienceyears, isverified')
    .eq('user_id', user.id)
    .single();

  return <TeacherProfileClient profile={profile} userId={user.id} />;
}
