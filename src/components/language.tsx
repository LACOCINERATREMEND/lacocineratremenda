"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { languages, type Lang } from "@/data/carta-i18n";
import { uiCopy, type UiCopy } from "@/data/ui-i18n";

const STORAGE_KEY = "lct-lang";

type LanguageValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  ui: UiCopy;
};

const LanguageContext = createContext<LanguageValue | null>(null);

function isLang(value: string | null): value is Lang {
  return languages.some((language) => language.code === value);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) setLang(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, ui: uiCopy[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return value;
}

function Bands({
  colors,
  label,
  direction = "col",
}: {
  colors: string[];
  label: string;
  direction?: "col" | "row";
}) {
  return (
    <span
      className={`flex h-6 w-9 overflow-hidden rounded-[2px] ring-1 ring-black/30 ${direction === "row" ? "flex-col" : ""}`}
      role="img"
      aria-label={label}
    >
      {colors.map((color) => (
        <span key={`${label}-${color}`} className="flex-1" style={{ background: color }} />
      ))}
    </span>
  );
}

function UnionJack() {
  return (
    <span className="relative block h-6 w-9 overflow-hidden rounded-[2px] bg-[#012169] ring-1 ring-black/30" role="img" aria-label="English">
      <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 bg-white" />
      <span className="absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 bg-white" />
      <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-[#c8102e]" />
      <span className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-[#c8102e]" />
    </span>
  );
}

function Japan() {
  return (
    <span className="flex h-6 w-9 items-center justify-center rounded-[2px] bg-white ring-1 ring-black/20" role="img" aria-label="日本語">
      <span className="size-3 rounded-full bg-[#bc002d]" />
    </span>
  );
}

const flags: Record<Lang, ReactNode> = {
  es: <Bands colors={["#c60b1e", "#ffc400", "#c60b1e"]} label="Español" direction="row" />,
  it: <Bands colors={["#009246", "#ffffff", "#ce2b37"]} label="Italiano" />,
  en: <UnionJack />,
  fr: <Bands colors={["#0055a4", "#ffffff", "#ef4135"]} label="Français" />,
  de: <Bands colors={["#000000", "#dd0000", "#ffce00"]} label="Deutsch" direction="row" />,
  pt: <Bands colors={["#006600", "#ff0000"]} label="Português" />,
  ja: <Japan />,
};

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`} role="group" aria-label="Language">
      {languages.map((language) => {
        const active = language.code === lang;
        return (
          <button
            key={language.code}
            type="button"
            aria-pressed={active}
            onClick={() => setLang(language.code)}
            className={`flex min-h-12 min-w-16 items-center gap-2 rounded-sm border px-2 py-1 ${
              active ? "border-[#fffb00] bg-white/10" : "border-white/25"
            }`}
          >
            {flags[language.code]}
            <span className="font-hand text-lg leading-none text-white">{language.short}</span>
            <span className="sr-only">{language.label}</span>
          </button>
        );
      })}
    </div>
  );
}
