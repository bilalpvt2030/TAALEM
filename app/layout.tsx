import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "TAALEM", description: "Connect with expert tutors" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
 return children;
}
