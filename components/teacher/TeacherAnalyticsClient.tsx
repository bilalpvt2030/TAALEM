"use client";
import { useMemo } from "react";
import { TrendingUp, Star, BookOpen, DollarSign } from "lucide-react";

export default function TeacherAnalyticsClient({ sessions, reviews }: { sessions: any[]; reviews: any[] }) {
  const stats = useMemo(() => {
    const completed = sessions.filter(s => s.status === "completed");
    const totalEarnings = completed.reduce((sum: number, s: any) => sum + (s.payment_transactions?.amount ?? 0), 0);
    const avgRating = reviews.length
      ? (reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "—";

    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      return {
        label: d.toLocaleDateString("en-SA", { month: "short" }),
        sessions: 0,
        earnings: 0,
      };
    });

    completed.forEach((s: any) => {
      const d = new Date(s.scheduled_at);
      const monthsAgo = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
      if (monthsAgo >= 0 && monthsAgo < 6) {
        const idx = 5 - monthsAgo;
        months[idx].sessions += 1;
        months[idx].earnings += s.payment_transactions?.amount ?? 0;
      }
    });

    return { completed: completed.length, totalEarnings, avgRating, months };
  }, [sessions, reviews]);

  const maxSessions = Math.max(...stats.months.map(m => m.sessions), 1);
  const maxEarnings = Math.max(...stats.months.map(m => m.earnings), 1);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Analytics</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Completed Sessions", value: stats.completed, icon: BookOpen },
          { label: "Total Earnings (SAR)", value: stats.totalEarnings.toLocaleString(), icon: DollarSign },
          { label: "Avg. Rating", value: stats.avgRating, icon: Star },
          { label: "Total Reviews", value: reviews.length, icon: TrendingUp },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mb-3">
              <Icon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white tabular-nums">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Sessions — Last 6 Months</h2>
        <div className="flex items-end gap-3 h-40">
          {stats.months.map((m, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-gray-500 tabular-nums">{m.sessions}</span>
              <div
                className="w-full rounded-t-md bg-teal-500 dark:bg-teal-600 transition-all"
                style={{ height: `${(m.sessions / maxSessions) * 100}%`, minHeight: m.sessions > 0 ? "4px" : "0" }}
              />
              <span className="text-xs text-gray-400">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Earnings — Last 6 Months (SAR)</h2>
        <div className="flex items-end gap-3 h-40">
          {stats.months.map((m, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-gray-500 tabular-nums">
                {m.earnings > 0 ? m.earnings.toLocaleString() : "—"}
              </span>
              <div
                className="w-full rounded-t-md bg-green-500 dark:bg-green-600 transition-all"
                style={{ height: `${(m.earnings / maxEarnings) * 100}%`, minHeight: m.earnings > 0 ? "4px" : "0" }}
              />
              <span className="text-xs text-gray-400">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Rating Distribution</h2>
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No reviews yet</p>
        ) : (
          <div className="space-y-2">
            {[5,4,3,2,1].map(star => {
              const count = reviews.filter((r: any) => r.rating === star).length;
              const pct = reviews.length ? (count / reviews.length) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-4 tabular-nums">{star}&#9733;</span>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 w-6 tabular-nums">{count}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
