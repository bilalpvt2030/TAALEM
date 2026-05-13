
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { get: (n) => cookieStore.get(n)?.value, set: () => {}, remove: () => {} } }
  );

  const teachers = [
    { name: 'Ahmed Al-Rashidi', subjects: '{Math,Physics}', grades: '{7,8,9,10}', curricula: '{saudi,british}', languages: '{ar,en}', exp: 8, rate: 120, mode: 'online', bioar: 'معلم رياضيات وفيزياء بخبرة 8 سنوات', bioen: 'Experienced Math & Physics tutor with 8 years experience', rating: 4.8, reviews: 34, verified: true, city: 'Riyadh' },
    { name: 'Sara Al-Mansouri', subjects: '{English,Literature}', grades: '{5,6,7,8}', curricula: '{british,american}', languages: '{en,ar}', exp: 5, rate: 100, mode: 'both', bioar: 'معلمة لغة انجليزية متخصصة', bioen: 'Specialized English Language tutor', rating: 4.9, reviews: 52, verified: true, city: 'Jeddah' },
    { name: 'Khalid Al-Otaibi', subjects: '{Chemistry,Biology}', grades: '{9,10}', curricula: '{saudi,igcse}', languages: '{ar}', exp: 6, rate: 110, mode: 'offline', bioar: 'معلم كيمياء وأحياء للثانوي', bioen: 'High school Chemistry and Biology teacher', rating: 4.6, reviews: 18, verified: true, city: 'Dammam' },
    { name: 'Fatima Al-Zahrani', subjects: '{Math,Science}', grades: '{1,2,3,4,5}', curricula: '{saudi}', languages: '{ar}', exp: 4, rate: 80, mode: 'online', bioar: 'معلمة ابتدائي متخصصة في الرياضيات والعلوم', bioen: 'Primary school Math and Science specialist', rating: 4.7, reviews: 28, verified: false, city: 'Riyadh' },
    { name: 'Omar Al-Harbi', subjects: '{Arabic,Islamic}', grades: '{6,7,8,9,10}', curricula: '{saudi}', languages: '{ar}', exp: 10, rate: 90, mode: 'both', bioar: 'معلم لغة عربية وتربية اسلامية بخبرة عشر سنوات', bioen: 'Arabic Language and Islamic Studies with 10 years experience', rating: 4.5, reviews: 41, verified: true, city: 'Medina' },
    { name: 'Nora Al-Qahtani', subjects: '{Math,Physics,Chemistry}', grades: '{9,10}', curricula: '{saudi,ib}', languages: '{ar,en}', exp: 7, rate: 130, mode: 'online', bioar: 'معلمة علوم متقدمة للمرحلة الثانوية', bioen: 'Advanced Sciences tutor for high school IB and Saudi curriculum', rating: 4.9, reviews: 63, verified: true, city: 'Jeddah' },
    { name: 'Yusuf Al-Shehri', subjects: '{English,French}', grades: '{7,8,9,10}', curricula: '{igcse,ib,british}', languages: '{en}', exp: 9, rate: 150, mode: 'online', bioar: 'معلم لغات متعددة بشهادات دولية', bioen: 'Multi-language tutor with international certifications', rating: 4.8, reviews: 29, verified: true, city: 'Riyadh' },
    { name: 'Amira Al-Dosari', subjects: '{Math,Statistics}', grades: '{8,9,10}', curricula: '{cbse,ib}', languages: '{en,ar}', exp: 3, rate: 95, mode: 'online', bioar: 'معلمة رياضيات وإحصاء حديثة', bioen: 'Math and Statistics tutor focused on CBSE and IB', rating: 4.4, reviews: 11, verified: false, city: 'Khobar' },
  ];

  let inserted = 0;
  for (const t of teachers) {
    const { data: authUser } = await supabase.auth.admin.createUser({
      email: `${t.name.toLowerCase().replace(/ /g, '.')}@taalem-demo.com`,
      password: 'Taalem@2025', email_confirm: true,
    });
    if (!authUser.user) continue;
    await supabase.from('users').upsert({ id: authUser.user.id, email: authUser.user.email, fullname: t.name, role: 'teacher', language: 'ar' });
    await supabase.from('teachers').insert({
      userid: authUser.user.id, subjects: t.subjects, grades: t.grades,
      curricula: t.curricula, languages: t.languages, experienceyears: t.exp,
      hourlyrate: t.rate, mode: t.mode, bioar: t.bioar, bioen: t.bioen,
      ratingavg: t.rating, totalreviews: t.reviews, isverified: t.verified,
      verificationstatus: t.verified ? 'approved' : 'pending', city: t.city,
    });
    inserted++;
  }

  return NextResponse.json({ success: true, inserted });
}
