export const CONSENT_KEY = "lct-consent";
export const CONSENT_EVENT = "lct-consent-changed";
export const OPEN_CONSENT_EVENT = "lct-open-consent";

export type ConsentPrefs = {
  necessary: true;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

export function readConsent(): ConsentPrefs | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(CONSENT_KEY);
  if (!raw) return null;
  if (raw === "accepted") {
    return { necessary: true, preferences: true, analytics: true, marketing: true };
  }
  if (raw === "rejected") {
    return { necessary: true, preferences: false, analytics: false, marketing: false };
  }
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentPrefs>;
    return {
      necessary: true,
      preferences: parsed.preferences === true,
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

export function analyticsAllowed() {
  return readConsent()?.analytics === true;
}
