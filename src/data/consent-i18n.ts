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
    text: "Guardamos en el navegador la elección de este aviso y el idioma del sitio. Si aceptas la analítica, medimos las visitas.",
    accept: "Aceptar",
    reject: "Rechazar",
    configure: "Configurar",
    save: "Guardar",
    necessary: "Necesarias",
    necessaryHelp: "Siempre activas. Guardan la elección de este aviso, el idioma y la sesión de gestión del sitio.",
    analytics: "Analítica",
    analyticsHelp: "Si las aceptas, registramos la página, el idioma y si entras desde el móvil o el escritorio.",
    marketing: "Marketing",
    marketingHelp: "Si las aceptas, esa elección se aplica a contenidos de redes sociales y publicidad.",
  },
  it: {
    title: "Cookie",
    text: "Nel browser salviamo la scelta di questo avviso e la lingua del sito. Se accetti l’analisi, misuriamo le visite.",
    accept: "Accetta",
    reject: "Rifiuta",
    configure: "Impostazioni",
    save: "Salva",
    necessary: "Necessari",
    necessaryHelp: "Sempre attivi. Salvano la scelta di questo avviso, la lingua e la sessione di gestione del sito.",
    analytics: "Analisi",
    analyticsHelp: "Se li accetti, registriamo la pagina, la lingua e se entri da telefono o da computer.",
    marketing: "Marketing",
    marketingHelp: "Se li accetti, quella scelta vale per i contenuti dei social e della pubblicità.",
  },
  en: {
    title: "Cookies",
    text: "We store this notice’s choice and the site language in your browser. If you accept analytics, we measure visits.",
    accept: "Accept",
    reject: "Reject",
    configure: "Settings",
    save: "Save",
    necessary: "Necessary",
    necessaryHelp: "Always on. They store this notice’s choice, the language, and the session used to manage the site.",
    analytics: "Analytics",
    analyticsHelp: "If you accept them, we record the page, the language, and whether you visit on a phone or a computer.",
    marketing: "Marketing",
    marketingHelp: "If you accept them, that choice applies to social and advertising content.",
  },
  fr: {
    title: "Cookies",
    text: "Nous gardons dans le navigateur le choix de cet avis et la langue du site. Si vous acceptez l’analyse, nous mesurons les visites.",
    accept: "Accepter",
    reject: "Refuser",
    configure: "Régler",
    save: "Enregistrer",
    necessary: "Nécessaires",
    necessaryHelp: "Toujours actifs. Ils gardent le choix de cet avis, la langue et la session de gestion du site.",
    analytics: "Analyse",
    analyticsHelp: "Si vous les acceptez, nous enregistrons la page, la langue et si vous venez du téléphone ou de l’ordinateur.",
    marketing: "Marketing",
    marketingHelp: "Si vous les acceptez, ce choix s’applique aux contenus des réseaux sociaux et de la publicité.",
  },
  de: {
    title: "Cookies",
    text: "Im Browser speichern wir die Wahl zu diesem Hinweis und die Sprache der Website. Wenn du Analyse akzeptierst, messen wir die Besuche.",
    accept: "Akzeptieren",
    reject: "Ablehnen",
    configure: "Einstellungen",
    save: "Speichern",
    necessary: "Notwendig",
    necessaryHelp: "Immer aktiv. Sie speichern die Wahl zu diesem Hinweis, die Sprache und die Sitzung zur Pflege der Website.",
    analytics: "Analyse",
    analyticsHelp: "Wenn du sie akzeptierst, erfassen wir die Seite, die Sprache und ob du mit dem Handy oder dem Computer kommst.",
    marketing: "Marketing",
    marketingHelp: "Wenn du sie akzeptierst, gilt diese Wahl für Inhalte sozialer Netzwerke und Werbung.",
  },
  pt: {
    title: "Cookies",
    text: "Guardamos no navegador a escolha deste aviso e o idioma do site. Se aceitares a análise, medimos as visitas.",
    accept: "Aceitar",
    reject: "Recusar",
    configure: "Configurar",
    save: "Guardar",
    necessary: "Necessários",
    necessaryHelp: "Sempre ativos. Guardam a escolha deste aviso, o idioma e a sessão de gestão do site.",
    analytics: "Análise",
    analyticsHelp: "Se os aceitares, registamos a página, o idioma e se entras pelo telemóvel ou pelo computador.",
    marketing: "Marketing",
    marketingHelp: "Se os aceitares, essa escolha aplica-se a conteúdos de redes sociais e publicidade.",
  },
  ja: {
    title: "クッキー",
    text: "この案内の選択とサイトの言語をブラウザに保存します。分析に同意すると、訪問を計測します。",
    accept: "同意する",
    reject: "拒否する",
    configure: "設定",
    save: "保存",
    necessary: "必須",
    necessaryHelp: "常に有効です。この案内の選択、言語、サイトを管理するセッションを保存します。",
    analytics: "分析",
    analyticsHelp: "同意すると、ページ、言語、携帯かパソコンからの訪問かを記録します。",
    marketing: "マーケティング",
    marketingHelp: "同意すると、その選択はソーシャルや広告の内容に適用されます。",
  },
};
