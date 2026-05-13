import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TeacherAnalyticsClient from "@/components/teacher/TeacherAnalyticsClient";

export const metadata = { title: "Analytics | Teacher Dashboard | Taalem" };

export default async function AnalyticsPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/auth/login");

  const { data: sessions } = await supabase
    .from("bookings")
    .select("id, scheduled_at, status, duration_minutes, payment_transactions(amount)")
    .eq("teacher_id", session.user.id)
    .order("scheduled_at", { ascending: true });

  const { data: reviews } = await supabase
    .from("reviews")
    .select("id, rating, created_at")
    .eq("teacher_id", session.user.id);

  return <TeacherAnalyticsClient sessions={sessions ?? []} reviews={reviews ?? []} />;
}
