"use server";
export async function syncUserRoleFromEnv() {
 try {
 const { createSupabaseServerClient } = await import("@/lib/supabase/server");
 const supabase = createSupabaseServerClient();
 const { data } = await supabase.auth.getUser();
 const user = data?.user;
 if (!user) return;
 const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(e=>e.trim().toLowerCase());
 const email = user.email?.toLowerCase();
 if (!email || !adminEmails.includes(email)) return;
 await supabase.from("users").upsert({ id: user.id, email: user.email, role: "admin" }, { onConflict: "id" });
 } catch {}
}
