"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase/client";

export default function AddStudentPage() {
 const t = useTranslations("student");
 const router = useRouter();
 const [fullName, setFullName] = useState("");
 const [gradeLevel, setGradeLevel] = useState("");
 const [notes, setNotes] = useState("");
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 async function handleSubmit(e: React.FormEvent) {
 e.preventDefault();
 setLoading(true); setError("");
 const { data: { user } } = await supabase.auth.getUser();
 if (!user) { setError("Not authenticated"); setLoading(false); return; }
 const { error } = await supabase.from("students").insert({ full_name: fullName, grade_level: gradeLevel, notes, parent_id: user.id });
 if (error) { setError(error.message); setLoading(false); return; }
 router.push("/dashboard/parent");
 }

 return (
 <div className="p-4 max-w-lg mx-auto">
 <h1 className="text-2xl font-bold mb-6">{t("addStudent")}</h1>
 <form onSubmit={handleSubmit} className="space-y-4">
 <div>
 <label className="block text-sm font-medium mb-1">{t("fullName")}</label>
 <input type="text" value={fullName} onChange={e=>setFullName(e.target.value)}
 className="w-full border rounded-lg px-3 py-2 bg-background" required />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">{t("gradeLevel")}</label>
 <input type="text" value={gradeLevel} onChange={e=>setGradeLevel(e.target.value)}
 className="w-full border rounded-lg px-3 py-2 bg-background" required />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">{t("notes")}</label>
 <textarea value={notes} onChange={e=>setNotes(e.target.value)}
 className="w-full border rounded-lg px-3 py-2 bg-background" rows={3} />
 </div>
 {error && <p className="text-red-500 text-sm">{error}</p>}
 <button type="submit" disabled={loading}
 className="w-full bg-primary text-primary-foreground rounded-lg py-2 font-semibold hover:opacity-90 disabled:opacity-50">
 {loading ? "Saving..." : t("save")}
 </button>
 </form>
 </div>
 );
}
