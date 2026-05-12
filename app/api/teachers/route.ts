import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
 const { searchParams } = new URL(request.url);
 const subject = searchParams.get("subject");
 const minRate = searchParams.get("minRate");
 const maxRate = searchParams.get("maxRate");

 let query = supabase.from("teachers").select("*").eq("is_verified", true).eq("is_active", true);
 if (subject) query = query.ilike("subject", `%${subject}%`);
 if (minRate) query = query.gte("hourly_rate", Number(minRate));
 if (maxRate) query = query.lte("hourly_rate", Number(maxRate));

 const { data, error } = await query.order("rating_average", { ascending: false });
 if (error) return NextResponse.json({ error: error.message }, { status: 500 });
 return NextResponse.json({ data });
}
