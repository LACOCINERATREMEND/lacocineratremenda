export const CONSENT_KEY = "lct-consent";
export const CONSENT_EVENT = "lct-consent-changed";
export const OPEN_CONSENT_EVENT = "lct-open-consent";

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export type ConsentPrefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export function readConsent(): ConsentPrefs | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(CONSENT_KEY);
  if (!raw) return null;
  if (raw === "accepted") {
    return { necessary: true, analytics: true, marketing: true };
  }
  if (raw === "rejected") {
    return { necessary: true, analytics: false, marketing: false };
  }
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentPrefs>;
    return {
      necessary: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
    };
  } catch {
    return null;
  }
}

export function writeConsent(prefs: ConsentPrefs) {
  const value = { ...prefs, necessary: true as const };
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function hasConsent(category: ConsentCategory) {
  if (category === "necessary") return true;
  return readConsent()?.[category] === true;
}
