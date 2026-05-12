"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase/client";
import { TaalemLogo } from "@/components/layout/taalem-logo";
import Link from "next/link";

export default function LoginPage() {
 const t = useTranslations("auth");
 const router = useRouter();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 async function handleLogin(e: React.FormEvent) {
 e.preventDefault();
 setLoading(true); setError("");
 const { error } = await supabase.auth.signInWithPassword({ email, password });
 if (error) { setError(error.message); setLoading(false); return; }
 router.push("/");
 }

 return (
 <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
 <TaalemLogo className="mb-8" />
 <div className="w-full max-w-sm bg-card rounded-2xl shadow p-8">
 <h1 className="text-2xl font-bold mb-6 text-center">{t("login")}</h1>
 <form onSubmit={handleLogin} className="space-y-4">
 <div>
 <label className="block text-sm font-medium mb-1">{t("email")}</label>
 <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
 className="w-full border rounded-lg px-3 py-2 bg-background" required />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">{t("password")}</label>
 <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
 className="w-full border rounded-lg px-3 py-2 bg-background" required />
 </div>
 {error && <p className="text-red-500 text-sm">{error}</p>}
 <button type="submit" disabled={loading}
 className="w-full bg-primary text-primary-foreground rounded-lg py-2 font-semibold hover:opacity-90 disabled:opacity-50">
 {loading ? t("loading") : t("login")}
 </button>
 </form>
 <p className="mt-4 text-center text-sm">
 {t("noAccount")} <Link href="/auth/register" className="text-primary hover:underline">{t("register")}</Link>
 </p>
 </div>
 </div>
 );
}
