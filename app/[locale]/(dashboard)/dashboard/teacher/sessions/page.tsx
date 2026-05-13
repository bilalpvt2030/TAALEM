import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TeacherSessionsClient from "@/components/teacher/TeacherSessionsClient";

export const metadata = { title: "Sessions | Teacher Dashboard | Taalem" };

export default async function SessionsPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/auth/login");

  const { data: sessions } = await supabase
    .from("bookings")
    .select(`
      id, scheduled_at, duration_minutes, status, notes,
      students(name, grade),
      payment_transactions(amount, status)
    `)
    .eq("teacher_id", session.user.id)
    .order("scheduled_at", { ascending: false });

  return <TeacherSessionsClient sessions={sessions ?? []} userId={session.user.id} />;
}
