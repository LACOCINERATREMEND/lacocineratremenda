import type { Lang } from "@/data/carta-i18n";

export type SignupCopy = {
  open: string;
  title: string;
  name: string;
  phone: string;
  email: string;
  note: string;
  send: string;
  sending: string;
  okLocal: string;
  okPaid: string;
  payCancel: string;
  full: string;
  invalid: string;
  seats: (count: number) => string;
};

export const signupCopy: Record<Lang, SignupCopy> = {
  es: {
    open: "Inscribirme",
    title: "Inscripción",
    name: "Nombre",
    phone: "Teléfono",
    email: "Email",
    note: "Nota (opcional)",
    send: "Enviar inscripción",
    sending: "Enviando…",
    okLocal: "Inscripción guardada. El pago queda pendiente en el local.",
    okPaid: "Pago recibido. La plaza está confirmada.",
    payCancel: "El pago no se ha completado. La inscripción sigue pendiente.",
    full: "No quedan plazas.",
    invalid: "Revisa los datos e inténtalo de nuevo.",
    seats: (count) => (count === 1 ? "Queda 1 plaza" : count === 0 ? "Completo" : `Quedan ${count} plazas`),
  },
  it: {
    open: "Iscriviti",
    title: "Iscrizione",
    name: "Nome",
    phone: "Telefono",
    email: "Email",
    note: "Nota (facoltativa)",
    send: "Invia iscrizione",
    sending: "Invio…",
    okLocal: "Iscrizione salvata. Il pagamento resta da fare in loco.",
    okPaid: "Pagamento ricevuto. Il posto è confermato.",
    payCancel: "Il pagamento non è stato completato. L’iscrizione resta in attesa.",
    full: "Non ci sono più posti.",
    invalid: "Controlla i dati e riprova.",
    seats: (count) => (count === 1 ? "Resta 1 posto" : count === 0 ? "Completo" : `Restano ${count} posti`),
  },
  en: {
    open: "Sign up",
    title: "Signup",
    name: "Name",
    phone: "Phone",
    email: "Email",
    note: "Note (optional)",
    send: "Send signup",
    sending: "Sending…",
    okLocal: "Signup saved. Payment is pending at the venue.",
    okPaid: "Payment received. Your place is confirmed.",
    payCancel: "The payment was not completed. The signup is still pending.",
    full: "There are no places left.",
    invalid: "Check the details and try again.",
    seats: (count) => (count === 1 ? "1 place left" : count === 0 ? "Full" : `${count} places left`),
  },
  fr: {
    open: "S’inscrire",
    title: "Inscription",
    name: "Nom",
    phone: "Téléphone",
    email: "Email",
    note: "Note (facultatif)",
    send: "Envoyer l’inscription",
    sending: "Envoi…",
    okLocal: "Inscription enregistrée. Le paiement reste à faire sur place.",
    okPaid: "Paiement reçu. La place est confirmée.",
    payCancel: "Le paiement n’a pas abouti. L’inscription reste en attente.",
    full: "Il n’y a plus de places.",
    invalid: "Vérifiez les informations et réessayez.",
    seats: (count) => (count === 1 ? "1 place restante" : count === 0 ? "Complet" : `${count} places restantes`),
  },
  de: {
    open: "Anmelden",
    title: "Anmeldung",
    name: "Name",
    phone: "Telefon",
    email: "E-Mail",
    note: "Notiz (optional)",
    send: "Anmeldung senden",
    sending: "Senden…",
    okLocal: "Anmeldung gespeichert. Die Zahlung erfolgt vor Ort.",
    okPaid: "Zahlung erhalten. Der Platz ist bestätigt.",
    payCancel: "Die Zahlung wurde nicht abgeschlossen. Die Anmeldung bleibt offen.",
    full: "Keine Plätze mehr frei.",
    invalid: "Prüfe die Angaben und versuche es erneut.",
    seats: (count) => (count === 1 ? "1 Platz frei" : count === 0 ? "Ausgebucht" : `${count} Plätze frei`),
  },
  pt: {
    open: "Inscrever-me",
    title: "Inscrição",
    name: "Nome",
    phone: "Telefone",
    email: "Email",
    note: "Nota (opcional)",
    send: "Enviar inscrição",
    sending: "A enviar…",
    okLocal: "Inscrição guardada. O pagamento fica pendente no local.",
    okPaid: "Pagamento recebido. O lugar está confirmado.",
    payCancel: "O pagamento não foi concluído. A inscrição continua pendente.",
    full: "Não há lugares.",
    invalid: "Revê os dados e tenta de novo.",
    seats: (count) => (count === 1 ? "Resta 1 lugar" : count === 0 ? "Esgotado" : `Restam ${count} lugares`),
  },
  ja: {
    open: "申し込む",
    title: "申し込み",
    name: "名前",
    phone: "電話",
    email: "メール",
    note: "メモ（任意）",
    send: "申し込みを送る",
    sending: "送信中…",
    okLocal: "申し込みを保存しました。支払いは店頭でお願いします。",
    okPaid: "支払いを確認しました。席は確定です。",
    payCancel: "支払いは完了していません。申し込みは保留のままです。",
    full: "空席はありません。",
    invalid: "内容を確認してもう一度お試しください。",
    seats: (count) => (count === 1 ? "残り1席" : count === 0 ? "満席" : `残り${count}席`),
  },
};
