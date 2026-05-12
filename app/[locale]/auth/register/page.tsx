"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase/client";
import { TaalemLogo } from "@/components/layout/taalem-logo";
import Link from "next/link";

export default function RegisterPage() {
 const t = useTranslations("auth");
 const router = useRouter();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [fullName, setFullName] = useState("");
 const [role, setRole] = useState<"parent"|"teacher">("parent");
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 async function handleRegister(e: React.FormEvent) {
 e.preventDefault();
 setLoading(true); setError("");
 const { error } = await supabase.auth.signUp({
 email, password,
 options: { data: { full_name: fullName, role } }
 });
 if (error) { setError(error.message); setLoading(false); return; }
 router.push("/auth/verify-email");
 }

 return (
 <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
 <TaalemLogo className="mb-8" />
 <div className="w-full max-w-sm bg-card rounded-2xl shadow p-8">
 <h1 className="text-2xl font-bold mb-6 text-center">{t("register")}</h1>
 <form onSubmit={handleRegister} className="space-y-4">
 <div>
 <label className="block text-sm font-medium mb-1">{t("fullName")}</label>
 <input type="text" value={fullName} onChange={e=>setFullName(e.target.value)}
 className="w-full border rounded-lg px-3 py-2 bg-background" required />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">{t("email")}</label>
 <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
 className="w-full border rounded-lg px-3 py-2 bg-background" required />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">{t("password")}</label>
 <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
 className="w-full border rounded-lg px-3 py-2 bg-background" required minLength={6} />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">{t("role")}</label>
 <select value={role} onChange={e=>setRole(e.target.value as "parent"|"teacher")}
 className="w-full border rounded-lg px-3 py-2 bg-background">
 <option value="parent">{t("parent")}</option>
 <option value="teacher">{t("teacher")}</option>
 </select>
 </div>
 {error && <p className="text-red-500 text-sm">{error}</p>}
 <button type="submit" disabled={loading}
 className="w-full bg-primary text-primary-foreground rounded-lg py-2 font-semibold hover:opacity-90 disabled:opacity-50">
 {loading ? t("loading") : t("register")}
 </button>
 </form>
 <p className="mt-4 text-center text-sm">
 {t("haveAccount")} <Link href="/auth/login" className="text-primary hover:underline">{t("login")}</Link>
 </p>
 </div>
 </div>
 );
}
