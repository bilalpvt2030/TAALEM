import type { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
export const metadata = { title: "TAALEM - تعلّم", description: "Find trusted tutors for your children" };
export default function RootLayout({ children }: { children: ReactNode }) {
 return (
 <html lang="en" suppressHydrationWarning>
 <body className="bg-background text-text-primary">
 <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
 {children}
 </ThemeProvider>
 </body>
 </html>
 );
}
