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
  preferences: string;
  preferencesHelp: string;
  analytics: string;
  analyticsHelp: string;
  marketing: string;
  marketingHelp: string;
};

export const consentCopy: Record<Lang, ConsentCopy> = {
  es: {
    title: "Usamos cookies",
    text: "Usamos cookies técnicas, de preferencias, de analítica y de marketing para el funcionamiento del sitio, recordar opciones, medir las visitas y mostrar contenidos de redes sociales o publicidad.",
    accept: "Aceptar",
    reject: "Rechazar",
    configure: "Configurar",
    save: "Guardar",
    necessary: "Necesarias",
    necessaryHelp: "Siempre activas. Permiten la navegación, la seguridad y la sesión del panel de administración.",
    preferences: "Preferencias",
    preferencesHelp: "Recuerdan el idioma y otras opciones de visualización.",
    analytics: "Analítica",
    analyticsHelp: "Herramientas de analítica para medir las visitas y el uso de las páginas.",
    marketing: "Marketing",
    marketingHelp: "Cookies de redes sociales y de publicidad para mostrar anuncios y contenidos relacionados.",
  },
  it: {
    title: "Usiamo i cookie",
    text: "Usiamo cookie tecnici, di preferenza, di analisi e di marketing per il funzionamento del sito, ricordare le scelte, misurare le visite e mostrare contenuti social o pubblicità.",
    accept: "Accetta",
    reject: "Rifiuta",
    configure: "Impostazioni",
    save: "Salva",
    necessary: "Necessari",
    necessaryHelp: "Sempre attivi. Permettono la navigazione, la sicurezza e la sessione del pannello.",
    preferences: "Preferenze",
    preferencesHelp: "Ricordano la lingua e altre opzioni di visualizzazione.",
    analytics: "Analisi",
    analyticsHelp: "Strumenti di analisi per misurare le visite e l’uso delle pagine.",
    marketing: "Marketing",
    marketingHelp: "Cookie di social network e pubblicità per mostrare annunci e contenuti correlati.",
  },
  en: {
    title: "We use cookies",
    text: "We use necessary, preference, analytics and marketing cookies to run the site, remember choices, measure visits and show social or advertising content.",
    accept: "Accept",
    reject: "Reject",
    configure: "Settings",
    save: "Save",
    necessary: "Necessary",
    necessaryHelp: "Always on. They allow browsing, security and the admin panel session.",
    preferences: "Preferences",
    preferencesHelp: "They remember the language and other display choices.",
    analytics: "Analytics",
    analyticsHelp: "Analytics tools to measure visits and how the pages are used.",
    marketing: "Marketing",
    marketingHelp: "Social media and advertising cookies to show ads and related content.",
  },
  fr: {
    title: "Nous utilisons des cookies",
    text: "Nous utilisons des cookies techniques, de préférences, d’analyse et de marketing pour le fonctionnement du site, mémoriser les choix, mesurer les visites et afficher des contenus sociaux ou publicitaires.",
    accept: "Accepter",
    reject: "Refuser",
    configure: "Régler",
    save: "Enregistrer",
    necessary: "Nécessaires",
    necessaryHelp: "Toujours actifs. Ils permettent la navigation, la sécurité et la session du panneau.",
    preferences: "Préférences",
    preferencesHelp: "Ils mémorisent la langue et d’autres options d’affichage.",
    analytics: "Analyse",
    analyticsHelp: "Outils d’analyse pour mesurer les visites et l’usage des pages.",
    marketing: "Marketing",
    marketingHelp: "Cookies de réseaux sociaux et de publicité pour afficher des annonces et des contenus liés.",
  },
  de: {
    title: "Wir verwenden Cookies",
    text: "Wir verwenden notwendige, Präferenz-, Analyse- und Marketing-Cookies, damit die Website funktioniert, Auswahl gespeichert wird, Besuche gemessen werden und Social- oder Werbeinhalte erscheinen.",
    accept: "Akzeptieren",
    reject: "Ablehnen",
    configure: "Einstellungen",
    save: "Speichern",
    necessary: "Notwendig",
    necessaryHelp: "Immer aktiv. Sie ermöglichen Navigation, Sicherheit und die Sitzung im Admin-Panel.",
    preferences: "Präferenzen",
    preferencesHelp: "Sie merken sich die Sprache und andere Anzeigeoptionen.",
    analytics: "Analyse",
    analyticsHelp: "Analyse-Tools, um Besuche und die Nutzung der Seiten zu messen.",
    marketing: "Marketing",
    marketingHelp: "Cookies sozialer Netzwerke und von Werbung, um Anzeigen und verwandte Inhalte zu zeigen.",
  },
  pt: {
    title: "Usamos cookies",
    text: "Usamos cookies técnicos, de preferências, de análise e de marketing para o funcionamento do site, lembrar escolhas, medir visitas e mostrar conteúdos de redes sociais ou publicidade.",
    accept: "Aceitar",
    reject: "Recusar",
    configure: "Configurar",
    save: "Guardar",
    necessary: "Necessários",
    necessaryHelp: "Sempre ativos. Permitem a navegação, a segurança e a sessão do painel.",
    preferences: "Preferências",
    preferencesHelp: "Lembram o idioma e outras opções de visualização.",
    analytics: "Análise",
    analyticsHelp: "Ferramentas de análise para medir as visitas e o uso das páginas.",
    marketing: "Marketing",
    marketingHelp: "Cookies de redes sociais e de publicidade para mostrar anúncios e conteúdos relacionados.",
  },
  ja: {
    title: "クッキーを使用します",
    text: "サイトの動作、設定の保存、訪問の測定、ソーシャルや広告の表示のために、必須・設定・分析・マーケティングのクッキーを使います。",
    accept: "同意する",
    reject: "拒否する",
    configure: "設定",
    save: "保存",
    necessary: "必須",
    necessaryHelp: "常に有効です。閲覧、安全性、管理画面のセッションに使います。",
    preferences: "設定",
    preferencesHelp: "言語や表示の選択を覚えます。",
    analytics: "分析",
    analyticsHelp: "訪問数とページの利用状況を測る分析ツールです。",
    marketing: "マーケティング",
    marketingHelp: "広告や関連コンテンツを表示するソーシャル・広告クッキーです。",
  },
};
