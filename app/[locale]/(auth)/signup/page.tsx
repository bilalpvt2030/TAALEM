
'use client';
import { useState } from 'react';
import { createSupabaseBrowserClient } from '../../../../lib/supabase/client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function SignupPage() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'parent' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    const { data, error: err } = await supabase.auth.signUp({ email: form.email, password: form.password,
      options: { data: { full_name: form.name, phone: form.phone, role: form.role } }
    });
    if (err) { setError(err.message); setLoading(false); return; }
    if (data.user) {
      await supabase.from('users').upsert({ id: data.user.id, email: form.email, fullname: form.name, phone: form.phone, role: form.role });
    }
    router.push(`/${locale}/dashboard/parent`);
  }

  return (
    <div className="container-taalem py-12 max-w-md mx-auto">
      <div className="surface p-7">
        <h1 className="text-xl font-bold text-text-primary mb-1">Create your account</h1>
        <p className="text-sm text-text-secondary mb-6">Find the best tutors for your children.</p>
        <form onSubmit={handleSignup} className="flex flex-col gap-3">
          <input required placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)}
            className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary" />
          <input required type="email" placeholder="Email address" value={form.email} onChange={e => set('email', e.target.value)}
            className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary" />
          <input required type="tel" placeholder="Phone number" value={form.phone} onChange={e => set('phone', e.target.value)}
            className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary" />
          <input required type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={e => set('password', e.target.value)}
            className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary" />
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => set('role', 'parent')} className={`py-2 rounded-md text-sm font-medium border ${form.role === 'parent' ? 'bg-primary text-white border-primary' : 'border-border text-text-secondary'}`}>I am a Parent</button>
            <button type="button" onClick={() => set('role', 'teacher')} className={`py-2 rounded-md text-sm font-medium border ${form.role === 'teacher' ? 'bg-primary text-white border-primary' : 'border-border text-text-secondary'}`}>I am a Teacher</button>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 font-semibold">{loading ? 'Creating account...' : 'Sign Up'}</button>
        </form>
        <p className="mt-4 text-center text-xs text-text-secondary">Have an account? <Link href={`/${locale}/login`} className="text-primary underline">Login</Link></p>
      </div>
    </div>
  );
}
