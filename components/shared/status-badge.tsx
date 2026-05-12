export function VerifiedBadge({ status }: { status: boolean }) {
 if (!status) return null;
 return (
 <span className="badge bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">
 <span className="me-1 text-xs">✓</span>Verified
 </span>
 );
}
