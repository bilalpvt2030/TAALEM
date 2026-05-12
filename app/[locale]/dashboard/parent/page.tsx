"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ParentDashboard() {
 const t = useTranslations("dashboard");
 const [students, setStudents] = useState<any[]>([]);
 const [bookings, setBookings] = useState<any[]>([]);

 useEffect(() => {
 async function load() {
 const { data: { user } } = await supabase.auth.getUser();
 if (!user) return;
 const { data: s } = await supabase.from("students").select("*").eq("parent_id", user.id);
 setStudents(s || []);
 const { data: b } = await supabase.from("bookings").select("*, teachers(full_name, subject)").eq("parent_id", user.id).order("created_at", { ascending: false }).limit(5);
 setBookings(b || []);
 }
 load();
 }, []);

 return (
 <div className="p-4 max-w-2xl mx-auto">
 <h1 className="text-2xl font-bold mb-6">{t("welcome")}</h1>
 <section className="mb-8">
 <div className="flex justify-between items-center mb-3">
 <h2 className="text-lg font-semibold">{t("myStudents")}</h2>
 <Link href="/dashboard/parent/add-student" className="text-primary text-sm hover:underline">{t("addStudent")}</Link>
 </div>
 {students.length === 0 ? (
 <p className="text-muted-foreground text-sm">{t("noStudents")}</p>
 ) : (
 <div className="space-y-2">
 {students.map(s => (
 <div key={s.id} className="bg-card rounded-xl p-4 shadow-sm">
 <p className="font-medium">{s.full_name}</p>
 <p className="text-sm text-muted-foreground">{s.grade_level}</p>
 </div>
 ))}
 </div>
 )}
 </section>
 <section>
 <h2 className="text-lg font-semibold mb-3">{t("recentBookings")}</h2>
 {bookings.length === 0 ? (
 <p className="text-muted-foreground text-sm">{t("noBookings")}</p>
 ) : (
 <div className="space-y-2">
 {bookings.map(b => (
 <div key={b.id} className="bg-card rounded-xl p-4 shadow-sm">
 <p className="font-medium">{b.teachers?.full_name}</p>
 <p className="text-sm text-muted-foreground">{b.teachers?.subject} • {b.status}</p>
 </div>
 ))}
 </div>
 )}
 </section>
 </div>
 );
}
