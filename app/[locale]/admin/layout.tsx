"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
 const router = useRouter();
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 supabase.auth.getSession().then(async ({ data }) => {
 if (!data.session) { router.replace("/auth/login"); return; }
 const { data: u } = await supabase.from("users").select("role").eq("id", data.session.user.id).single();
 if (u?.role !== "admin") { router.replace("/"); return; }
 setLoading(false);
 });
 }, [router]);

 if (loading) return <div className="min-h-screen flex items-center justify-center"><span>Loading...</span></div>;

 return (
 <div className="min-h-screen bg-background">
 <nav className="bg-card border-b px-6 py-4 flex items-center gap-6">
 <span className="font-bold text-lg">TAALEM Admin</span>
 <a href="/admin" className="text-sm hover:text-primary">Dashboard</a>
 <a href="/admin/teachers" className="text-sm hover:text-primary">Teachers</a>
 <a href="/admin/bookings" className="text-sm hover:text-primary">Bookings</a>
 <a href="/admin/users" className="text-sm hover:text-primary">Users</a>
 </nav>
 <main className="p-6">{children}</main>
 </div>
 );
}
