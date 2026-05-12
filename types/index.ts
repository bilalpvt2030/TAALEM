export type Role = "parent" | "teacher" | "admin";
export type Language = "ar" | "en";
export type Curriculum = "saudi" | "british" | "american" | "cbse" | "igcse" | "ib";
export type Mode = "online" | "offline" | "both";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export interface User {
 id: string; role: Role; phone: string | null; email: string | null;
 full_name: string | null; avatar_url: string | null;
 language: Language; created_at: string;
}
export interface Student {
 id: string; parent_id: string; full_name: string; grade: number;
 curriculum: Curriculum; subjects: string; weak_areas: string;
 preferred_language: "ar" | "en" | "both"; gender_preference: "male" | "female" | "any";
 city: string | null; created_at: string;
}
export interface TeacherProfile {
 id: string; user_id: string; teacher_name: string | null;
 gender: "male" | "female" | null; subjects: string;
 grades: number[]; curricula: Curriculum[]; languages: Language[];
 experience_years: number; hourly_rate: number | null; mode: Mode;
 bio_ar: string | null; bio_en: string | null; intro_video_url: string | null;
 rating_avg: number; total_reviews: number; is_verified: boolean;
 verification_status: "pending" | "approved" | "rejected";
 whatsapp_number: string | null; city: string | null; area: string | null;
 plan: string | null; plan_expires_at: string | null; created_at: string;
}
