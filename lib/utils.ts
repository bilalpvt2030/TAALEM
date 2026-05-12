export function cn(...classes: Array<string | undefined | null | false>): string {
 return classes.filter(Boolean).join(" ");
}
export const SUBJECTS = ["Math", "Physics", "Chemistry", "English", "Arabic", "Biology", "History", "Geography"] as const;
export const CURRICULA = ["saudi", "british", "american", "cbse", "igcse", "ib"] as const;
