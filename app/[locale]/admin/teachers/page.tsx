"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AdminTeachersPage() {
 const [teachers, setTeachers] = useState<any[]>([]);

 useEffect(() => {
 supabase.from("teachers").select("*").order("created_at", { ascending: false }).then(({ data }) => setTeachers(data || []));
 }, []);

 async function toggleVerify(id: string, current: boolean) {
 await supabase.from("teachers").update({ is_verified: !current }).eq("id", id);
 setTeachers(teachers.map(t => t.id === id ? { ...t, is_verified: !current } : t));
 }

 return (
 <div>
 <h1 className="text-2xl font-bold mb-6">Teachers</h1>
 <div className="bg-card rounded-xl shadow overflow-hidden">
 <table className="w-full text-sm">
 <thead className="bg-muted">
 <tr>
 <th className="px-4 py-3 text-left">Name</th>
 <th className="px-4 py-3 text-left">Subject</th>
 <th className="px-4 py-3 text-left">Rate</th>
 <th className="px-4 py-3 text-left">Status</th>
 <th className="px-4 py-3 text-left">Action</th>
 </tr>
 </thead>
 <tbody className="divide-y">
 {teachers.map(t => (
 <tr key={t.id}>
 <td className="px-4 py-3">{t.full_name}</td>
 <td className="px-4 py-3">{t.subject}</td>
 <td className="px-4 py-3">{t.hourly_rate} AED</td>
 <td className="px-4 py-3">
 <span className={`px-2 py-1 rounded-full text-xs ${t.is_verified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
 {t.is_verified ? "Verified" : "Pending"}
 </span>
 </td>
 <td className="px-4 py-3">
 <button onClick={() => toggleVerify(t.id, t.is_verified)}
 className="text-primary text-xs hover:underline">
 {t.is_verified ? "Unverify" : "Verify"}
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 );
}
