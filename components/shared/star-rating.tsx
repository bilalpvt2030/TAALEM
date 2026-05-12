export function StarRating({ value }: { value: number }) {
 const clamped = Math.max(0, Math.min(5, value));
 const full = Math.round(clamped);
 return (
 <div className="flex items-center gap-1 text-xs text-amber-500">
 {Array.from({ length: 5 }).map((_, i) => (
 <span key={i}>{i < full ? "★" : "☆"}</span>
 ))}
 <span className="ms-1 text-text-muted">{clamped.toFixed(1)}</span>
 </div>
 );
}
