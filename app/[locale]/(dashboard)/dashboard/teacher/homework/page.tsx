import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TeacherHomeworkClient from "@/components/teacher/TeacherHomeworkClient";

export const metadata = { title: "Homework & Notes | Taalem" };

export default async function HomeworkPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/auth/login");

  const { data: students } = await supabase
    .from("bookings")
    .select("students(id, name, grade)")
    .eq("teacher_id", session.user.id)
    .eq("status", "completed");

  const uniqueStudents = Array.from(
    new Map((students ?? []).map((b: any) => [b.students?.id, b.students])).values()
  ).filter(Boolean);

  const { data: homework } = await supabase
    .from("homework")
    .select("*")
    .eq("teacher_id", session.user.id)
    .order("created_at", { ascending: false });

  return <TeacherHomeworkClient students={uniqueStudents} homework={homework ?? []} teacherId={session.user.id} />;
}
