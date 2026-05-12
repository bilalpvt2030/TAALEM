"use client";
import { useTheme } from "next-themes";
export function ThemeToggle() {
 const { theme, setTheme } = useTheme();
 return (
 <button
 type="button"
 onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
 className="rounded-full border border-border p-1.5 text-xs text-text-secondary hover:text-primary"
 aria-label="Toggle theme"
 >
 {theme === "dark" ? "☀" : "☽"}
 </button>
 );
}
