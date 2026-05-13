
'use client';
import { useState } from 'react';
import { createSupabaseBrowserClient } from '../../../../lib/supabase/client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError(err.message); setLoading(false); return; }
    router.push(`/${locale}/dashboard/parent`);
  }

  return (
    <div className="container-taalem py-12 max-w-md mx-auto">
      <div className="surface p-7">
        <h1 className="text-xl font-bold text-text-primary mb-1">Welcome back</h1>
        <p className="text-sm text-text-secondary mb-6">Login to manage your sessions.</p>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input required type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary" />
          <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
            className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary" />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 font-semibold">{loading ? 'Logging in...' : 'Login'}</button>
        </form>
        <p className="mt-4 text-center text-xs text-text-secondary">No account? <Link href={`/${locale}/signup`} className="text-primary underline">Sign up</Link></p>
      </div>
    </div>
  );
}
