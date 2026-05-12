import { SectionWrapper } from "../../../components/layout/section-wrapper";
import { getTranslations } from "next-intl/server";
export default async function LandingPage() {
 const t = await getTranslations("landing");
 return (
 <>
 <SectionWrapper>
 <div className="grid gap-8 md:grid-cols-2">
 <div className="flex flex-col justify-center gap-6">
 <p className="text-xs font-semibold tracking-wide text-accent">{t("tagline")}</p>
 <h1 className="text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
 {t("heroTitleAr")}<br />
 <span className="text-primary">{t("heroTitleEn")}</span>
 </h1>
 <p className="max-w-xl text-sm text-text-secondary">{t("heroSubtitle")}</p>
 <div className="surface flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
 <input type="text" className="text-field w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary" placeholder={t("subjectPlaceholder")} />
 <input type="text" className="text-field w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-primary" placeholder={t("gradePlaceholder")} />
 <button className="btn-primary w-full sm:w-auto">{t("searchCta")}</button>
 </div>
 </div>
 <div className="surface flex min-h-[260px] flex-col justify-center gap-4 p-4">
 <p className="text-sm font-semibold text-text-primary">{t("heroHighlightTitle")}</p>
 <p className="text-xs text-text-secondary">{t("heroHighlightText")}</p>
 </div>
 </div>
 </SectionWrapper>
 <SectionWrapper id="how-it-works">
 <h2 className="text-xl font-semibold text-text-primary">{t("howItWorksTitle")}</h2>
 <div className="mt-6 grid gap-4 md:grid-cols-3">
 {[1, 2, 3].map((step) => (
 <div key={step} className="surface p-4">
 <p className="text-xs font-semibold text-accent">{t(`howItWorksStep${step}Title` as any)}</p>
 <p className="mt-2 text-sm text-text-secondary">{t(`howItWorksStep${step}Text` as any)}</p>
 </div>
 ))}
 </div>
 </SectionWrapper>
 </>
 );
}
