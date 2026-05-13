
'use client';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

export default function LandingHero({ subjectPlaceholder, gradePlaceholder, searchCta }: { subjectPlaceholder: string; gradePlaceholder: string; searchCta: string }) {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');

  function handleSearch() {
    const q = new URLSearchParams();
    if (subject) q.set('subject', subject);
    if (grade) q.set('grade', grade);
    router.push(`/${locale}/teachers?${q.toString()}`);
  }

  return (
    <div className="surface flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
      <input type="text" value={subject} onChange={e => setSubject(e.target.value)}
        className="text-field w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary"
        placeholder={subjectPlaceholder} />
      <input type="text" value={grade} onChange={e => setGrade(e.target.value)}
        className="text-field w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary"
        placeholder={gradePlaceholder} />
      <button onClick={handleSearch} className="btn-primary w-full sm:w-auto whitespace-nowrap">{searchCta}</button>
    </div>
  );
}
