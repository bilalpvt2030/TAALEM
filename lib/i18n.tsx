"use client";
import React, { createContext, useContext } from "react";
import enMessages from "../locales/en.json";
import arMessages from "../locales/ar.json";

const messages: Record<string, Record<string, string>> = { en: enMessages as any, ar: arMessages as any };

const I18nContext = createContext({ locale: "en", t: (key: string) => key });

export function I18nProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
 const t = (key: string) => {
 const parts = key.split(".");
 let obj: any = messages[locale] || messages["en"];
 for (const p of parts) obj = obj?.[p];
 return typeof obj === "string" ? obj : key;
 };
 return <I18nContext.Provider value={{ locale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() { return useContext(I18nContext); }
