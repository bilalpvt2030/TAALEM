export function EmptyState({ message }: { message: string }) {
 return (
 <div className="flex flex-col items-center justify-center py-16 text-center">
 <span className="text-5xl">📭</span>
 <p className="mt-4 text-sm text-text-secondary">{message}</p>
 </div>
 );
}
