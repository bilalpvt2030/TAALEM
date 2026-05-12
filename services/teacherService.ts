import { createSupabaseServerClient } from "../lib/supabase/server";
import type { TeacherProfile } from "../types";
export async function getTeachers(limit = 20): Promise<TeacherProfile[]> {
 const supabase = createSupabaseServerClient();
 const { data } = await supabase.from("teacher_profiles").select("*").limit(limit);
 return (data as TeacherProfile[]) ?? [];
}
export async function getTeacherById(id: string): Promise<TeacherProfile | null> {
 const supabase = createSupabaseServerClient();
 const { data } = await supabase.from("teacher_profiles").select("*").eq("id", id).single();
 return (data as TeacherProfile) ?? null;
}
