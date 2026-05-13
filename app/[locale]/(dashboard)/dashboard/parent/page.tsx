
import { createSupabaseServerClient } from '../../../../../lib/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ParentDashboard({ params }: { params: { locale: string } }) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${params.locale}/login`);

  const { data: requests } = await supabase
    .from('booking_requests')
    .select('*, teacherprofiles(teachername, subjects)')
    .eq('email', user.email ?? '')
    .order('created_at', { ascending: false })
    .limit(20);

  return (
    <div className="container-taalem py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-text-primary">Parent Dashboard</h1>
          <p className="text-xs text-text-secondary mt-1">{user.email}</p>
        </div>
        <Link href={`/${params.locale}/teachers`} className="btn-primary text-sm">Find a Tutor</Link>
      </div>
      <h2 className="text-base font-semibold text-text-primary mb-3">My Booking Requests</h2>
      {(!requests || requests.length === 0) ? (
        <div className="surface p-8 text-center">
          <p className="text-text-muted text-sm mb-3">No booking requests yet.</p>
          <Link href={`/${params.locale}/teachers`} className="btn-primary text-sm">Browse Tutors</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((r: any) => (
            <div key={r.id} className="surface p-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-sm text-text-primary">{(r.teacherprofiles as any)?.teachername || 'Tutor'}</p>
                <p className="text-xs text-text-secondary mt-0.5">{r.subject} · Grade {r.grade} · {r.child_name}</p>
                <p className="text-xs text-text-muted mt-0.5">{new Date(r.created_at).toLocaleDateString()}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                r.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                r.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                'bg-amber-100 text-amber-700'
              }`}>{r.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
