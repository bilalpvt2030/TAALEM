"use client";
import { useState } from "react";
import { Calendar } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
  pending:   "bg-yellow-50 text-yellow-700 border-yellow-200",
};

export default function TeacherSessionsClient({ sessions, userId }: { sessions: any[]; userId: string }) {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");

  const filtered = sessions.filter(s => {
    if (filter === "all") return true;
    if (filter === "upcoming") return s.status === "confirmed" && new Date(s.scheduled_at) >= new Date();
    return s.status === filter;
  });

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Sessions</h1>
        <div className="flex gap-2">
          {(["all","upcoming","completed","cancelled"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-teal-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-teal-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
          <Calendar className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No sessions found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(s => (
            <div key={s.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/30 flex flex-col items-center justify-center shrink-0">
                <span className="text-xs font-bold text-teal-700 dark:text-teal-400 leading-none">
                  {new Date(s.scheduled_at).toLocaleDateString("en-SA",{month:"short"})}
                </span>
                <span className="text-lg font-bold text-teal-700 dark:text-teal-400 leading-none">
                  {new Date(s.scheduled_at).getDate()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white">{s.students?.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {s.students?.grade} &bull;{" "}
                  {new Date(s.scheduled_at).toLocaleTimeString("en-SA",{hour:"2-digit",minute:"2-digit"})} &bull;{" "}
                  {s.duration_minutes}min
                </p>
              </div>
              <div className="text-right shrink-0 space-y-1">
                <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${STATUS_STYLES[s.status] ?? ""}`}>
                  {s.status}
                </span>
                {s.payment_transactions?.amount && (
                  <p className="text-xs text-gray-500">{s.payment_transactions.amount} SAR</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
