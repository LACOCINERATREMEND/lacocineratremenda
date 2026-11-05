import type { Lang } from "@/data/carta-i18n";

export type UiCopy = {
  headline: string;
  seeMenu: string;
  courses: string;
  contact: string;
  home: string;
  coursesSoon: string;
  coursesError: string;
  contactLede: string;
  contactBody: string;
  access: string;
  accessHelp: string;
  password: string;
  cancel: string;
  enter: string;
  entering: string;
  badPassword: string;
  loginFail: string;
};

export const uiCopy: Record<Lang, UiCopy> = {
  es: {
    headline: "Gastrobar de especialidad italiana",
    seeMenu: "Ver carta",
    courses: "Nuestros cursos",
    contact: "Contáctanos",
    home: "Inicio",
    coursesSoon: "El contenido llegará pronto.",
    coursesError: "No se han podido mostrar los cursos ahora mismo.",
    contactLede: "Gastrobar de especialidad italiana en Sevilla.",
    contactBody:
      "Estamos en Sevilla. El teléfono y el correo se publicarán aquí en cuanto estén listos.",
    access: "Acceso",
    accessHelp: "Introduce la contraseña para gestionar los cursos.",
    password: "Contraseña",
    cancel: "Cancelar",
    enter: "Entrar",
    entering: "Entrando…",
    badPassword: "Contraseña incorrecta.",
    loginFail: "No se ha podido entrar. Prueba de nuevo.",
  },
  it: {
    headline: "Gastrobar di specialità italiana",
    seeMenu: "Vedi il menu",
    courses: "I nostri corsi",
    contact: "Contattaci",
    home: "Inizio",
    coursesSoon: "I contenuti arriveranno presto.",
    coursesError: "Non è stato possibile mostrare i corsi.",
    contactLede: "Gastrobar di specialità italiana a Siviglia.",
    contactBody:
      "Siamo a Siviglia. Pubblicheremo qui telefono e email appena saranno pronti.",
    access: "Accesso",
    accessHelp: "Inserisci la password per gestire i corsi.",
    password: "Password",
    cancel: "Annulla",
    enter: "Entra",
    entering: "Accesso…",
    badPassword: "Password errata.",
    loginFail: "Accesso non riuscito. Riprova.",
  },
  en: {
    headline: "Italian specialty gastrobar",
    seeMenu: "See the menu",
    courses: "Our courses",
    contact: "Contact us",
    home: "Home",
    coursesSoon: "Content is coming soon.",
    coursesError: "The courses could not be shown right now.",
    contactLede: "Italian specialty gastrobar in Seville.",
    contactBody:
      "We are in Seville. Phone and email will be published here when they are ready.",
    access: "Access",
    accessHelp: "Enter the password to manage courses.",
    password: "Password",
    cancel: "Cancel",
    enter: "Enter",
    entering: "Entering…",
    badPassword: "Incorrect password.",
    loginFail: "Could not sign in. Try again.",
  },
  fr: {
    headline: "Gastrobar de spécialité italienne",
    seeMenu: "Voir la carte",
    courses: "Nos cours",
    contact: "Contactez-nous",
    home: "Accueil",
    coursesSoon: "Le contenu arrive bientôt.",
    coursesError: "Les cours n’ont pas pu être affichés.",
    contactLede: "Gastrobar de spécialité italienne à Séville.",
    contactBody:
      "Nous sommes à Séville. Le téléphone et l’e-mail seront publiés ici dès qu’ils seront prêts.",
    access: "Accès",
    accessHelp: "Saisissez le mot de passe pour gérer les cours.",
    password: "Mot de passe",
    cancel: "Annuler",
    enter: "Entrer",
    entering: "Entrée…",
    badPassword: "Mot de passe incorrect.",
    loginFail: "Connexion impossible. Réessayez.",
  },
  de: {
    headline: "Italienische Spezialitäten-Gastrobar",
    seeMenu: "Speisekarte",
    courses: "Unsere Kurse",
    contact: "Kontakt",
    home: "Start",
    coursesSoon: "Die Inhalte folgen in Kürze.",
    coursesError: "Die Kurse konnten gerade nicht angezeigt werden.",
    contactLede: "Italienische Spezialitäten-Gastrobar in Sevilla.",
    contactBody:
      "Wir sind in Sevilla. Telefon und E-Mail veröffentlichen wir hier, sobald sie feststehen.",
    access: "Zugang",
    accessHelp: "Passwort eingeben, um die Kurse zu verwalten.",
    password: "Passwort",
    cancel: "Abbrechen",
    enter: "Weiter",
    entering: "Zugang…",
    badPassword: "Falsches Passwort.",
    loginFail: "Anmeldung fehlgeschlagen. Bitte erneut versuchen.",
  },
  pt: {
    headline: "Gastrobar de especialidade italiana",
    seeMenu: "Ver o menu",
    courses: "Os nossos cursos",
    contact: "Contacte-nos",
    home: "Início",
    coursesSoon: "O conteúdo chegará em breve.",
    coursesError: "Não foi possível mostrar os cursos agora.",
    contactLede: "Gastrobar de especialidade italiana em Sevilha.",
    contactBody:
      "Estamos em Sevilha. O telefone e o e-mail serão publicados aqui assim que estiverem prontos.",
    access: "Acesso",
    accessHelp: "Introduza a palavra-passe para gerir os cursos.",
    password: "Palavra-passe",
    cancel: "Cancelar",
    enter: "Entrar",
    entering: "A entrar…",
    badPassword: "Palavra-passe incorreta.",
    loginFail: "Não foi possível entrar. Tente novamente.",
  },
  ja: {
    headline: "イタリア料理のガストロバー",
    seeMenu: "メニューを見る",
    courses: "コース",
    contact: "お問い合わせ",
    home: "ホーム",
    coursesSoon: "コンテンツは近日公開です。",
    coursesError: "コースを表示できませんでした。",
    contactLede: "セビリアのイタリア料理ガストロバー。",
    contactBody:
      "セビリアにあります。電話番号とメールは決まり次第ここに掲載します。",
    access: "管理",
    accessHelp: "コースを管理するパスワードを入力してください。",
    password: "パスワード",
    cancel: "キャンセル",
    enter: "入る",
    entering: "確認中…",
    badPassword: "パスワードが違います。",
    loginFail: "入れませんでした。もう一度お試しください。",
  },
};
