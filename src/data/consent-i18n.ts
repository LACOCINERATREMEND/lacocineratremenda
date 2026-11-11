import type { Lang } from "@/data/carta-i18n";

export type ConsentCopy = {
  title: string;
  text: string;
  accept: string;
  reject: string;
  configure: string;
  save: string;
  necessary: string;
  necessaryHelp: string;
  stats: string;
  statsHelp: string;
};

export const consentCopy: Record<Lang, ConsentCopy> = {
  es: {
    title: "Privacidad",
    text: "Esta web no instala cookies de publicidad ni de analítica. Las visitas se cuentan de forma anónima, sin identificarte y sin guardar tu IP.",
    accept: "Aceptar",
    reject: "Rechazar",
    configure: "Configurar",
    save: "Guardar",
    necessary: "Necesarias",
    necessaryHelp: "Siempre activas. Recuerdan el idioma en este navegador. La cookie de sesión solo se crea si entras al panel de administración.",
    stats: "Estadísticas",
    statsHelp: "No hay cookie de analítica que activar. El recuento de páginas es anónimo y no usa identificadores. Rechazar no instala ninguna cookie.",
  },
  it: {
    title: "Privacy",
    text: "Questo sito non installa cookie pubblicitari né di analisi. Le visite si contano in modo anonimo, senza identificarti e senza salvare il tuo IP.",
    accept: "Accetta",
    reject: "Rifiuta",
    configure: "Impostazioni",
    save: "Salva",
    necessary: "Necessari",
    necessaryHelp: "Sempre attivi. Ricordano la lingua in questo browser. Il cookie di sessione esiste solo se entri nel pannello.",
    stats: "Statistiche",
    statsHelp: "Non c’è un cookie di analisi da attivare. Il conteggio delle pagine è anonimo e non usa identificatori. Rifiutare non installa alcun cookie.",
  },
  en: {
    title: "Privacy",
    text: "This site does not set advertising or analytics cookies. Visits are counted anonymously, without identifying you and without storing your IP address.",
    accept: "Accept",
    reject: "Reject",
    configure: "Settings",
    save: "Save",
    necessary: "Necessary",
    necessaryHelp: "Always on. They remember the language in this browser. A session cookie is created only if you open the admin panel.",
    stats: "Statistics",
    statsHelp: "There is no analytics cookie to switch on. Page counts are anonymous and use no identifiers. Rejecting does not set any cookie.",
  },
  fr: {
    title: "Confidentialité",
    text: "Ce site n’installe pas de cookies publicitaires ni d’analyse. Les visites sont comptées de façon anonyme, sans vous identifier et sans enregistrer votre IP.",
    accept: "Accepter",
    reject: "Refuser",
    configure: "Régler",
    save: "Enregistrer",
    necessary: "Nécessaires",
    necessaryHelp: "Toujours actifs. Ils mémorisent la langue dans ce navigateur. Le cookie de session n’existe que si vous ouvrez le panneau.",
    stats: "Statistiques",
    statsHelp: "Il n’y a pas de cookie d’analyse à activer. Le comptage des pages est anonyme et n’utilise pas d’identifiant. Refuser n’installe aucun cookie.",
  },
  de: {
    title: "Datenschutz",
    text: "Diese Website setzt keine Werbe- oder Analyse-Cookies. Besuche werden anonym gezählt, ohne dich zu identifizieren und ohne deine IP zu speichern.",
    accept: "Akzeptieren",
    reject: "Ablehnen",
    configure: "Einstellungen",
    save: "Speichern",
    necessary: "Notwendig",
    necessaryHelp: "Immer aktiv. Sie merken sich die Sprache in diesem Browser. Ein Sitzungs-Cookie gibt es nur, wenn du das Admin-Panel öffnest.",
    stats: "Statistik",
    statsHelp: "Es gibt kein Analyse-Cookie zum Einschalten. Seitenzählungen sind anonym und ohne Kennung. Ablehnen setzt kein Cookie.",
  },
  pt: {
    title: "Privacidade",
    text: "Este site não instala cookies de publicidade nem de análise. As visitas são contadas de forma anónima, sem te identificar e sem guardar o teu IP.",
    accept: "Aceitar",
    reject: "Recusar",
    configure: "Configurar",
    save: "Guardar",
    necessary: "Necessários",
    necessaryHelp: "Sempre ativos. Lembram o idioma neste navegador. O cookie de sessão só existe se entrares no painel.",
    stats: "Estatísticas",
    statsHelp: "Não há cookie de análise para ativar. A contagem de páginas é anónima e não usa identificadores. Recusar não instala nenhum cookie.",
  },
  ja: {
    title: "プライバシー",
    text: "このサイトは広告や分析のクッキーを置きません。訪問数は匿名で数え、本人を特定せず、IPアドレスも保存しません。",
    accept: "同意する",
    reject: "拒否する",
    configure: "設定",
    save: "保存",
    necessary: "必須",
    necessaryHelp: "常に有効です。このブラウザの言語を覚えます。セッションクッキーは管理画面に入ったときだけ作られます。",
    stats: "統計",
    statsHelp: "オンにする分析クッキーはありません。ページ数は匿名で、識別子を使いません。拒否してもクッキーは追加されません。",
  },
};
