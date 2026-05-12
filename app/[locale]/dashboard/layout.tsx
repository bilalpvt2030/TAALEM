"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { ReactNode } from "react";
import { BottomNav } from "@/components/layout/bottom-nav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
 const router = useRouter();
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 supabase.auth.getSession().then(({ data }) => {
 if (!data.session) router.replace("/auth/login");
 else setLoading(false);
 });
 }, [router]);

 if (loading) return <div className="min-h-screen flex items-center justify-center"><span>Loading...</span></div>;

 return (
 <div className="min-h-screen bg-background flex flex-col">
 <main className="flex-1 pb-20">{children}</main>
 <BottomNav />
 </div>
 );
}
