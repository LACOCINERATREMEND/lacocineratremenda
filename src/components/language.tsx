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
    if (!isLang(saved)) return;
    const frame = window.requestAnimationFrame(() => setLang(saved));
    return () => window.cancelAnimationFrame(frame);
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
  compact = false,
}: {
  colors: string[];
  label: string;
  direction?: "col" | "row";
  compact?: boolean;
}) {
  return (
    <span
      className={`flex overflow-hidden rounded-[2px] ring-1 ring-black/30 ${compact ? "h-3.5 w-5" : "h-6 w-9"} ${direction === "row" ? "flex-col" : ""}`}
      role="img"
      aria-label={label}
    >
      {colors.map((color) => (
        <span key={`${label}-${color}`} className="flex-1" style={{ background: color }} />
      ))}
    </span>
  );
}

function UnionJack({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`relative block overflow-hidden rounded-[2px] bg-[#012169] ring-1 ring-black/30 ${compact ? "h-3.5 w-5" : "h-6 w-9"}`} role="img" aria-label="English">
      <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 bg-white" />
      <span className="absolute inset-y-0 left-1/2 w-1.5 -translate-x-1/2 bg-white" />
      <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-[#c8102e]" />
      <span className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-[#c8102e]" />
    </span>
  );
}

function Japan({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`flex items-center justify-center rounded-[2px] bg-white ring-1 ring-black/20 ${compact ? "h-3.5 w-5" : "h-6 w-9"}`} role="img" aria-label="日本語">
      <span className={`rounded-full bg-[#bc002d] ${compact ? "size-2" : "size-3"}`} />
    </span>
  );
}

function flagFor(code: Lang, compact: boolean): ReactNode {
  if (code === "es") return <Bands colors={["#c60b1e", "#ffc400", "#c60b1e"]} label="Español" direction="row" compact={compact} />;
  if (code === "it") return <Bands colors={["#009246", "#ffffff", "#ce2b37"]} label="Italiano" compact={compact} />;
  if (code === "en") return <UnionJack compact={compact} />;
  if (code === "fr") return <Bands colors={["#0055a4", "#ffffff", "#ef4135"]} label="Français" compact={compact} />;
  if (code === "de") return <Bands colors={["#000000", "#dd0000", "#ffce00"]} label="Deutsch" direction="row" compact={compact} />;
  if (code === "pt") return <Bands colors={["#006600", "#ff0000"]} label="Português" compact={compact} />;
  return <Japan compact={compact} />;
}

export function LanguageSwitcher({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`flex items-stretch justify-center ${compact ? "w-full flex-nowrap gap-1" : "flex-wrap gap-2"} ${className}`}
      role="group"
      aria-label="Language"
    >
      {languages.map((language) => {
        const active = language.code === lang;
        return (
          <button
            key={language.code}
            type="button"
            aria-pressed={active}
            onClick={() => setLang(language.code)}
            className={`flex items-center justify-center rounded-sm border ${
              compact
                ? "min-h-10 min-w-0 flex-1 flex-col gap-0.5 px-0 py-1"
                : "min-h-12 min-w-16 gap-2 px-2 py-1"
            } ${active ? "border-[#fffb00] bg-white/10" : "border-white/25"}`}
          >
            {flagFor(language.code, compact)}
            <span className={`leading-none text-white ${compact ? "text-[10px] font-sans font-semibold" : "font-hand text-lg"}`}>
              {language.short}
            </span>
            <span className="sr-only">{language.label}</span>
          </button>
        );
      })}
    </div>
  );
}
