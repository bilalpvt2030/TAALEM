
'use client';
import { useState } from 'react';
import { createSupabaseBrowserClient } from '../../lib/supabase/client';

export default function BookingForm({ teacherId, teacherName, locale, hourlyRate }: { teacherId: string; teacherName: string; locale: string; hourlyRate?: number }) {
  const supabase = createSupabaseBrowserClient();
  const [form, setForm] = useState({ parentName: '', phone: '', email: '', childName: '', grade: '', subject: '', date: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { error: err } = await supabase.from('booking_requests').insert({
        teacher_id: teacherId,
        parent_name: form.parentName,
        phone: form.phone,
        email: form.email,
        child_name: form.childName,
        grade: form.grade,
        subject: form.subject,
        preferred_date: form.date || null,
        notes: form.notes,
        status: 'pending'
      });
      if (err) throw err;
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (success) return (
    <div className="surface p-6 flex flex-col items-center gap-4 text-center">
      <div className="text-5xl">&#10003;</div>
      <h2 className="text-lg font-semibold text-text-primary">Request Sent!</h2>
      <p className="text-sm text-text-secondary">{teacherName} will review your request and contact you directly on your phone.</p>
      <button onClick={() => setSuccess(false)} className="btn-primary mt-2">Send Another Request</button>
    </div>
  );

  return (
    <div className="surface p-5">
      <h2 className="text-base font-semibold text-text-primary mb-1">Book a Session</h2>
      <p className="text-xs text-text-secondary mb-4">with {teacherName}{hourlyRate ? ` — ${hourlyRate} SAR/hr` : ''}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input required placeholder="Your full name *" value={form.parentName} onChange={e => set('parentName', e.target.value)}
          className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary" />
        <input required type="tel" placeholder="Phone number (WhatsApp) *" value={form.phone} onChange={e => set('phone', e.target.value)}
          className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary" />
        <input type="email" placeholder="Email address" value={form.email} onChange={e => set('email', e.target.value)}
          className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary" />
        <input required placeholder="Child's name *" value={form.childName} onChange={e => set('childName', e.target.value)}
          className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary" />
        <div className="grid grid-cols-2 gap-2">
          <input required placeholder="Grade (e.g. 8) *" value={form.grade} onChange={e => set('grade', e.target.value)}
            className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary" />
          <input required placeholder="Subject *" value={form.subject} onChange={e => set('subject', e.target.value)}
            className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary" />
        </div>
        <input type="date" placeholder="Preferred date" value={form.date} onChange={e => set('date', e.target.value)}
          className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary" />
        <textarea placeholder="Any notes or special requirements" value={form.notes} onChange={e => set('notes', e.target.value)}
          className="h-20 w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary resize-none" />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm font-semibold">
          {loading ? 'Sending...' : 'Request Session'}
        </button>
        <p className="text-xs text-text-muted text-center">The tutor will contact you directly to confirm.</p>
      </form>
    </div>
  );
}
