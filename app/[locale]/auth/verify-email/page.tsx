import { useTranslations } from "next-intl";
import { TaalemLogo } from "@/components/layout/taalem-logo";

export default function VerifyEmailPage() {
 return (
 <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
 <TaalemLogo className="mb-8" />
 <div className="w-full max-w-sm bg-card rounded-2xl shadow p-8 text-center">
 <h1 className="text-2xl font-bold mb-4">Check your email</h1>
 <p className="text-muted-foreground">We sent you a verification link. Please check your inbox and click the link to activate your account.</p>
 </div>
 </div>
 );
}
