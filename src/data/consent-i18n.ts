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
  analytics: string;
  analyticsHelp: string;
  marketing: string;
  marketingHelp: string;
};

export const consentCopy: Record<Lang, ConsentCopy> = {
  es: {
    title: "Cookies",
    text: "Usamos cookies técnicas necesarias para que el sitio funcione. Las de analítica y las de marketing solo se instalan si las aceptas.",
    accept: "Aceptar",
    reject: "Rechazar",
    configure: "Configurar",
    save: "Guardar",
    necessary: "Necesarias",
    necessaryHelp: "Siempre activas. Guardan tu elección sobre cookies y, si entras al panel, la sesión de administración.",
    analytics: "Analítica",
    analyticsHelp: "Solo si las aceptas. Sirven para medir las visitas, por ejemplo con herramientas como Google Analytics.",
    marketing: "Marketing",
    marketingHelp: "Solo si las aceptas. Sirven para redes sociales y publicidad, por ejemplo Meta Pixel.",
  },
  it: {
    title: "Cookie",
    text: "Usiamo cookie tecnici necessari al funzionamento del sito. Quelli di analisi e di marketing si installano solo se li accetti.",
    accept: "Accetta",
    reject: "Rifiuta",
    configure: "Impostazioni",
    save: "Salva",
    necessary: "Necessari",
    necessaryHelp: "Sempre attivi. Salvano la tua scelta sui cookie e, se entri nel pannello, la sessione di amministrazione.",
    analytics: "Analisi",
    analyticsHelp: "Solo se li accetti. Servono a misurare le visite, per esempio con strumenti come Google Analytics.",
    marketing: "Marketing",
    marketingHelp: "Solo se li accetti. Servono a social e pubblicità, per esempio Meta Pixel.",
  },
  en: {
    title: "Cookies",
    text: "We use necessary technical cookies so the site can work. Analytics and marketing cookies are installed only if you accept them.",
    accept: "Accept",
    reject: "Reject",
    configure: "Settings",
    save: "Save",
    necessary: "Necessary",
    necessaryHelp: "Always on. They store your cookie choice and, if you open the panel, the admin session.",
    analytics: "Analytics",
    analyticsHelp: "Only if you accept them. They measure visits, for example with tools such as Google Analytics.",
    marketing: "Marketing",
    marketingHelp: "Only if you accept them. They are used for social media and advertising, for example Meta Pixel.",
  },
  fr: {
    title: "Cookies",
    text: "Nous utilisons des cookies techniques nécessaires au fonctionnement du site. Ceux d’analyse et de marketing ne sont installés que si vous les acceptez.",
    accept: "Accepter",
    reject: "Refuser",
    configure: "Régler",
    save: "Enregistrer",
    necessary: "Nécessaires",
    necessaryHelp: "Toujours actifs. Ils gardent votre choix sur les cookies et, si vous ouvrez le panneau, la session d’administration.",
    analytics: "Analyse",
    analyticsHelp: "Uniquement si vous les acceptez. Ils mesurent les visites, par exemple avec des outils comme Google Analytics.",
    marketing: "Marketing",
    marketingHelp: "Uniquement si vous les acceptez. Ils servent aux réseaux sociaux et à la publicité, par exemple Meta Pixel.",
  },
  de: {
    title: "Cookies",
    text: "Wir verwenden notwendige technische Cookies, damit die Website funktioniert. Analyse- und Marketing-Cookies werden nur gesetzt, wenn du sie akzeptierst.",
    accept: "Akzeptieren",
    reject: "Ablehnen",
    configure: "Einstellungen",
    save: "Speichern",
    necessary: "Notwendig",
    necessaryHelp: "Immer aktiv. Sie speichern deine Cookie-Wahl und, wenn du das Panel öffnest, die Admin-Sitzung.",
    analytics: "Analyse",
    analyticsHelp: "Nur wenn du sie akzeptierst. Sie messen Besuche, zum Beispiel mit Tools wie Google Analytics.",
    marketing: "Marketing",
    marketingHelp: "Nur wenn du sie akzeptierst. Sie dienen sozialen Netzwerken und Werbung, zum Beispiel Meta Pixel.",
  },
  pt: {
    title: "Cookies",
    text: "Usamos cookies técnicos necessários para o site funcionar. Os de análise e os de marketing só são instalados se os aceitares.",
    accept: "Aceitar",
    reject: "Recusar",
    configure: "Configurar",
    save: "Guardar",
    necessary: "Necessários",
    necessaryHelp: "Sempre ativos. Guardam a tua escolha sobre cookies e, se entrares no painel, a sessão de administração.",
    analytics: "Análise",
    analyticsHelp: "Só se os aceitares. Servem para medir as visitas, por exemplo com ferramentas como o Google Analytics.",
    marketing: "Marketing",
    marketingHelp: "Só se os aceitares. Servem para redes sociais e publicidade, por exemplo o Meta Pixel.",
  },
  ja: {
    title: "クッキー",
    text: "サイトの動作に必要な技術クッキーを使います。分析とマーケティングのクッキーは、同意した場合にだけ設置します。",
    accept: "同意する",
    reject: "拒否する",
    configure: "設定",
    save: "保存",
    necessary: "必須",
    necessaryHelp: "常に有効です。クッキーの選択と、管理画面に入ったときのセッションを保存します。",
    analytics: "分析",
    analyticsHelp: "同意した場合だけです。訪問数の測定に使い、たとえば Google アナリティクスのようなツールです。",
    marketing: "マーケティング",
    marketingHelp: "同意した場合だけです。ソーシャルや広告に使い、たとえば Meta ピクセルです。",
  },
};
