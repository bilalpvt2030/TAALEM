"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AdminDashboard() {
 const [stats, setStats] = useState({ teachers: 0, parents: 0, bookings: 0, pending: 0 });

 useEffect(() => {
 async function load() {
 const [{ count: teachers }, { count: parents }, { count: bookings }, { count: pending }] = await Promise.all([
 supabase.from("teachers").select("*", { count: "exact", head: true }),
 supabase.from("users").select("*", { count: "exact", head: true }).eq("role", "parent"),
 supabase.from("bookings").select("*", { count: "exact", head: true }),
 supabase.from("teachers").select("*", { count: "exact", head: true }).eq("is_verified", false),
 ]);
 setStats({ teachers: teachers||0, parents: parents||0, bookings: bookings||0, pending: pending||0 });
 }
 load();
 }, []);

 const cards = [
 { label: "Total Teachers", value: stats.teachers, color: "text-blue-600" },
 { label: "Total Parents", value: stats.parents, color: "text-green-600" },
 { label: "Total Bookings", value: stats.bookings, color: "text-purple-600" },
 { label: "Pending Verification", value: stats.pending, color: "text-yellow-600" },
 ];

 return (
 <div>
 <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {cards.map(c => (
 <div key={c.label} className="bg-card rounded-xl p-6 shadow-sm">
 <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
 <p className="text-sm text-muted-foreground mt-1">{c.label}</p>
 </div>
 ))}
 </div>
 </div>
 );
}
