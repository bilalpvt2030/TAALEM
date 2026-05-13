import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TeacherProfileClient from "@/components/teacher/TeacherProfileClient";

export const metadata = { title: "Edit Profile | Taalem" };

export default async function TeacherProfilePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, avatar_url")
    .eq("id", session.user.id)
    .single();

  const { data: teacher } = await supabase
    .from("teachers")
    .select("bio, subjects, hourly_rate")
    .eq("id", session.user.id)
    .single();

  return <TeacherProfileClient profile={profile} teacher={teacher} userId={session.user.id} />;
}
