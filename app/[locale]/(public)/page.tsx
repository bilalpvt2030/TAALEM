import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function LandingPage() {
  const t = await getTranslations("landing");

  return (
    <>
      <section className="min-h-[70vh] flex items-center bg-gradient-to-br from-teal-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold tracking-widest text-teal-600 uppercase">{t("tagline")}</p>
            <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white">
              {t("heroTitleAr")}<br />
              <span className="text-teal-600">{t("heroTitleEn")}</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{t("heroSubtitle")}</p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/en/teachers"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
                {t("searchCta")}
              </Link>
              <Link href="/en/auth/register"
                className="border border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
                Sign Up Free
              </Link>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-4">
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{t("heroHighlightTitle")}</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">{t("heroHighlightText")}</p>
            <div className="space-y-3">
              {[1,2,3].map(step => (
                <div key={step} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-teal-700 dark:text-teal-400">{step}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{t(`howItWorksStep${step}Title` as any)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t(`howItWorksStep${step}Text` as any)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
