"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Plus, BookOpen, Send, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function TeacherHomeworkClient({ students, homework, teacherId }: any) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !title) return;
    setSubmitting(true);
    await supabase.from("homework").insert({
      teacher_id: teacherId,
      student_id: studentId,
      title,
      description,
      due_date: dueDate || null,
      status: "assigned",
    });
    setTitle(""); setDescription(""); setDueDate(""); setStudentId(""); setShowForm(false);
    setSubmitting(false);
    router.refresh();
  };

  const deleteHomework = async (id: string) => {
    await supabase.from("homework").delete().eq("id", id);
    router.refresh();
  };

  const STATUS_BADGE: Record<string, string> = {
    assigned: "bg-blue-50 text-blue-700",
    submitted: "bg-yellow-50 text-yellow-700",
    reviewed: "bg-green-50 text-green-700",
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Homework & Notes</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> Assign Homework
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl border border-teal-200 dark:border-teal-700 p-5 space-y-4">
          <h2 className="font-semibold text-gray-900 dark:text-white">New Assignment</h2>
          <select value={studentId} onChange={e => setStudentId(e.target.value)} required
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option value="">Select student...</option>
            {students.map((s: any) => (
              <option key={s.id} value={s.id}>{s.name} ({s.grade})</option>
            ))}
          </select>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Assignment title" required
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="Description / instructions..."
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none" />
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Due Date (optional)</label>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={submitting} className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Assign
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
              Cancel
            </button>
          </div>
        </form>
      )}

      {homework.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
          <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No homework assigned yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {homework.map((hw: any) => (
            <div key={hw.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-gray-900 dark:text-white">{hw.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_BADGE[hw.status] ?? ""}`}>
                      {hw.status}
                    </span>
                  </div>
                  {hw.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{hw.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span>{timeAgo(hw.created_at)}</span>
                    {hw.due_date && <span>Due: {new Date(hw.due_date).toLocaleDateString("en-SA")}</span>}
                  </div>
                </div>
                <button onClick={() => deleteHomework(hw.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
