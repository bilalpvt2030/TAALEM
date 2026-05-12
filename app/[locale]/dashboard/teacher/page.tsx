"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function TeacherDashboard() {
 const t = useTranslations("teacher");
 const [profile, setProfile] = useState<any>(null);
 const [bookings, setBookings] = useState<any[]>([]);
 const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });

 useEffect(() => {
 async function load() {
 const { data: { user } } = await supabase.auth.getUser();
 if (!user) return;
 const { data: p } = await supabase.from("teachers").select("*").eq("user_id", user.id).single();
 setProfile(p);
 if (p) {
 const { data: b } = await supabase.from("bookings").select("*, students(full_name), users!bookings_parent_id_fkey(full_name)").eq("teacher_id", p.id).order("scheduled_at", { ascending: false }).limit(10);
 setBookings(b || []);
 const total = (b || []).length;
 const pending = (b || []).filter((x:any) => x.status === "pending").length;
 const completed = (b || []).filter((x:any) => x.status === "completed").length;
 setStats({ total, pending, completed });
 }
 }
 load();
 }, []);

 return (
 <div className="p-4 max-w-2xl mx-auto">
 <h1 className="text-2xl font-bold mb-2">{t("dashboard")}</h1>
 {profile && <p className="text-muted-foreground mb-6">{profile.subject} • {profile.hourly_rate} AED/hr</p>}
 <div className="grid grid-cols-3 gap-3 mb-8">
 <div className="bg-card rounded-xl p-4 text-center shadow-sm">
 <p className="text-2xl font-bold">{stats.total}</p>
 <p className="text-xs text-muted-foreground">Total</p>
 </div>
 <div className="bg-card rounded-xl p-4 text-center shadow-sm">
 <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
 <p className="text-xs text-muted-foreground">Pending</p>
 </div>
 <div className="bg-card rounded-xl p-4 text-center shadow-sm">
 <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
 <p className="text-xs text-muted-foreground">Completed</p>
 </div>
 </div>
 <div className="flex justify-between items-center mb-3">
 <h2 className="text-lg font-semibold">{t("bookings")}</h2>
 <Link href="/dashboard/teacher/availability" className="text-primary text-sm hover:underline">{t("manageAvailability")}</Link>
 </div>
 {bookings.length === 0 ? (
 <p className="text-muted-foreground text-sm">{t("noBookings")}</p>
 ) : (
 <div className="space-y-2">
 {bookings.map(b => (
 <div key={b.id} className="bg-card rounded-xl p-4 shadow-sm flex justify-between items-center">
 <div>
 <p className="font-medium">{b.students?.full_name || "Direct booking"}</p>
 <p className="text-sm text-muted-foreground">{new Date(b.scheduled_at).toLocaleDateString()}</p>
 </div>
 <span className={`text-xs px-2 py-1 rounded-full ${ b.status=="completed" ? "bg-green-100 text-green-700" : b.status=="cancelled" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700" }`}>{b.status}</span>
 </div>
 ))}
 </div>
 )}
 </div>
 );
}
