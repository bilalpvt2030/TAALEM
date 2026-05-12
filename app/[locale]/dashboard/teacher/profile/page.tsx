"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";

export default function TeacherProfilePage() {
 const t = useTranslations("teacher");
 const [form, setForm] = useState({ full_name:"", subject:"", bio:"", hourly_rate:"", location:"" });
 const [teacherId, setTeacherId] = useState("");
 const [loading, setLoading] = useState(false);
 const [saved, setSaved] = useState(false);

 useEffect(() => {
 async function load() {
 const { data: { user } } = await supabase.auth.getUser();
 if (!user) return;
 const { data: p } = await supabase.from("teachers").select("*").eq("user_id", user.id).single();
 if (p) { setTeacherId(p.id); setForm({ full_name: p.full_name||"" , subject: p.subject||"", bio: p.bio||"", hourly_rate: p.hourly_rate||"", location: p.location||"" }); }
 }
 load();
 }, []);

 async function handleSave(e: React.FormEvent) {
 e.preventDefault(); setLoading(true); setSaved(false);
 const { data: { user } } = await supabase.auth.getUser();
 if (!user) return;
 if (teacherId) {
 await supabase.from("teachers").update({ ...form, hourly_rate: Number(form.hourly_rate) }).eq("id", teacherId);
 } else {
 await supabase.from("teachers").insert({ ...form, hourly_rate: Number(form.hourly_rate), user_id: user.id });
 }
 setSaved(true); setLoading(false);
 }

 return (
 <div className="p-4 max-w-lg mx-auto">
 <h1 className="text-2xl font-bold mb-6">{t("editProfile")}</h1>
 <form onSubmit={handleSave} className="space-y-4">
 {(["full_name","subject","location"] as const).map(field=>(
 <div key={field}>
 <label className="block text-sm font-medium mb-1 capitalize">{field.replace("_"," ")}</label>
 <input type="text" value={form[field as keyof typeof form]} onChange={e=>setForm({...form,[field]:e.target.value})}
 className="w-full border rounded-lg px-3 py-2 bg-background" />
 </div>
 ))}
 <div>
 <label className="block text-sm font-medium mb-1">Hourly Rate (AED)</label>
 <input type="number" value={form.hourly_rate} onChange={e=>setForm({...form,hourly_rate:e.target.value})}
 className="w-full border rounded-lg px-3 py-2 bg-background" />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">Bio</label>
 <textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})}
 className="w-full border rounded-lg px-3 py-2 bg-background" rows={4} />
 </div>
 {saved && <p className="text-green-500 text-sm">Saved successfully!</p>}
 <button type="submit" disabled={loading}
 className="w-full bg-primary text-primary-foreground rounded-lg py-2 font-semibold hover:opacity-90 disabled:opacity-50">
 {loading ? "Saving..." : t("save")}
 </button>
 </form>
 </div>
 );
}
