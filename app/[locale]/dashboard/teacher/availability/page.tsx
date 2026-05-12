"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";

export default function AvailabilityPage() {
 const t = useTranslations("availability");
 const [slots, setSlots] = useState<any[]>([]);
 const [teacherId, setTeacherId] = useState("");
 const [startTime, setStartTime] = useState("");
 const [endTime, setEndTime] = useState("");
 const [loading, setLoading] = useState(false);

 useEffect(() => {
 async function load() {
 const { data: { user } } = await supabase.auth.getUser();
 if (!user) return;
 const { data: p } = await supabase.from("teachers").select("id").eq("user_id", user.id).single();
 if (p) {
 setTeacherId(p.id);
 const { data: a } = await supabase.from("teacher_availability").select("*").eq("teacher_id", p.id).order("start_time");
 setSlots(a || []);
 }
 }
 load();
 }, []);

 async function addSlot(e: React.FormEvent) {
 e.preventDefault();
 setLoading(true);
 await supabase.from("teacher_availability").insert({ teacher_id: teacherId, start_time: startTime, end_time: endTime });
 setStartTime(""); setEndTime("");
 const { data: a } = await supabase.from("teacher_availability").select("*").eq("teacher_id", teacherId).order("start_time");
 setSlots(a || []);
 setLoading(false);
 }

 async function deleteSlot(id: string) {
 await supabase.from("teacher_availability").delete().eq("id", id);
 setSlots(slots.filter(s => s.id !== id));
 }

 return (
 <div className="p-4 max-w-lg mx-auto">
 <h1 className="text-2xl font-bold mb-6">{t("manageAvailability")}</h1>
 <form onSubmit={addSlot} className="space-y-3 mb-8 bg-card rounded-xl p-4 shadow-sm">
 <div className="grid grid-cols-2 gap-3">
 <div>
 <label className="block text-sm font-medium mb-1">{t("startTime")}</label>
 <input type="datetime-local" value={startTime} onChange={e=>setStartTime(e.target.value)}
 className="w-full border rounded-lg px-3 py-2 bg-background text-sm" required />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">{t("endTime")}</label>
 <input type="datetime-local" value={endTime} onChange={e=>setEndTime(e.target.value)}
 className="w-full border rounded-lg px-3 py-2 bg-background text-sm" required />
 </div>
 </div>
 <button type="submit" disabled={loading}
 className="w-full bg-primary text-primary-foreground rounded-lg py-2 font-semibold hover:opacity-90 disabled:opacity-50 text-sm">
 {loading ? "Adding..." : t("addSlot")}
 </button>
 </form>
 <div className="space-y-2">
 {slots.map(s => (
 <div key={s.id} className="bg-card rounded-xl p-3 shadow-sm flex justify-between items-center">
 <div>
 <p className="text-sm font-medium">{new Date(s.start_time).toLocaleString()}</p>
 <p className="text-xs text-muted-foreground">{s.is_booked ? "Booked" : "Available"}</p>
 </div>
 {!s.is_booked && (
 <button onClick={()=>deleteSlot(s.id)} className="text-red-500 text-xs hover:underline">Remove</button>
 )}
 </div>
 ))}
 </div>
 </div>
 );
}
