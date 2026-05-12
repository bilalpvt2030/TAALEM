"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";

export default function BookTeacherPage() {
 const { teacherId } = useParams();
 const router = useRouter();
 const t = useTranslations("booking");
 const [teacher, setTeacher] = useState<any>(null);
 const [students, setStudents] = useState<any[]>([]);
 const [availability, setAvailability] = useState<any[]>([]);
 const [selectedStudent, setSelectedStudent] = useState("");
 const [selectedSlot, setSelectedSlot] = useState("");
 const [notes, setNotes] = useState("");
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 useEffect(() => {
 async function load() {
 const { data: t } = await supabase.from("teachers").select("*").eq("id", teacherId).single();
 setTeacher(t);
 const { data: { user } } = await supabase.auth.getUser();
 if (user) {
 const { data: s } = await supabase.from("students").select("*").eq("parent_id", user.id);
 setStudents(s || []);
 }
 const { data: a } = await supabase.from("teacher_availability").select("*").eq("teacher_id", teacherId).eq("is_booked", false);
 setAvailability(a || []);
 }
 load();
 }, [teacherId]);

 async function handleBook(e: React.FormEvent) {
 e.preventDefault();
 setLoading(true); setError("");
 const slot = availability.find(a => a.id === selectedSlot);
 const { data: { user } } = await supabase.auth.getUser();
 if (!user || !slot) { setError("Missing data"); setLoading(false); return; }
 const { error } = await supabase.from("bookings").insert({
 teacher_id: teacherId, parent_id: user.id, student_id: selectedStudent || null,
 scheduled_at: slot.start_time, duration_minutes: 60, notes,
 hourly_rate: teacher?.hourly_rate
 });
 if (error) { setError(error.message); setLoading(false); return; }
 router.push("/dashboard/parent");
 }

 return (
 <div className="p-4 max-w-lg mx-auto">
 <h1 className="text-2xl font-bold mb-2">{t("bookSession")}</h1>
 {teacher && <p className="text-muted-foreground mb-6">{teacher.full_name} • {teacher.subject}</p>}
 <form onSubmit={handleBook} className="space-y-4">
 <div>
 <label className="block text-sm font-medium mb-1">{t("selectStudent")}</label>
 <select value={selectedStudent} onChange={e=>setSelectedStudent(e.target.value)}
 className="w-full border rounded-lg px-3 py-2 bg-background">
 <option value="">{t("noStudent")}</option>
 {students.map(s=><option key={s.id} value={s.id}>{s.full_name}</option>)}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">{t("selectTime")}</label>
 <select value={selectedSlot} onChange={e=>setSelectedSlot(e.target.value)}
 className="w-full border rounded-lg px-3 py-2 bg-background" required>
 <option value="">{t("chooseSlot")}</option>
 {availability.map(a=><option key={a.id} value={a.id}>{new Date(a.start_time).toLocaleString()}</option>)}
 </select>
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">{t("notes")}</label>
 <textarea value={notes} onChange={e=>setNotes(e.target.value)}
 className="w-full border rounded-lg px-3 py-2 bg-background" rows={3} />
 </div>
 {teacher && <p className="text-sm font-medium">Rate: {teacher.hourly_rate} AED/hr</p>}
 {error && <p className="text-red-500 text-sm">{error}</p>}
 <button type="submit" disabled={loading}
 className="w-full bg-primary text-primary-foreground rounded-lg py-2 font-semibold hover:opacity-90 disabled:opacity-50">
 {loading ? "Booking..." : t("confirm")}
 </button>
 </form>
 </div>
 );
}
