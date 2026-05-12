import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function getSupabase() {
 const cookieStore = await cookies();
 return createServerClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
 {
 cookies: {
 getAll() { return cookieStore.getAll(); },
 setAll(cookiesToSet) {
 cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
 },
 },
 }
 );
}

export async function GET() {
 const supabase = await getSupabase();
 const { data: { user } } = await supabase.auth.getUser();
 if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 const { data, error } = await supabase.from("bookings").select("*, teachers(full_name, subject), students(full_name)").order("scheduled_at", { ascending: false });
 if (error) return NextResponse.json({ error: error.message }, { status: 500 });
 return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
 const supabase = await getSupabase();
 const { data: { user } } = await supabase.auth.getUser();
 if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 const body = await request.json();
 const { data, error } = await supabase.from("bookings").insert({ ...body, parent_id: user.id }).select().single();
 if (error) return NextResponse.json({ error: error.message }, { status: 500 });
 return NextResponse.json({ data });
}
