// Centralise la logique WhatsApp : toute commande, quel que soit le pays
// du client, se termine par un message pré-rempli envoyé sur ce numéro.
// -> Remplacer par le vrai numéro de la boutique (format international, sans + ni espaces).
export const WHATSAPP_NUMBER = "22383853578"; // TODO: numéro réel de Chic House

export type WhatsAppItem = {
  name: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
};

function formatFcfa(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

export function buildWhatsAppMessage(items: WhatsAppItem[]) {
  const lines = items.map((item) => {
    const details = [item.size && `Taille ${item.size}`, item.color && item.color]
      .filter(Boolean)
      .join(", ");
    return `• ${item.name}${details ? ` (${details})` : ""} — Qté ${item.quantity} — ${formatFcfa(
      item.price * item.quantity
    )}`;
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const message = [
    "Bonjour Chic House, je souhaite commander :",
    "",
    ...lines,
    "",
    `Total : ${formatFcfa(total)}`,
    "",
    "Merci de me confirmer la disponibilité et les modalités de livraison.",
  ].join("\n");

  return message;
}

export function buildWhatsAppLink(items: WhatsAppItem[]) {
  const message = buildWhatsAppMessage(items);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
