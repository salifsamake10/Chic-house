import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function WhatsAppFloatingButton() {
  const message = encodeURIComponent(
    "Bonjour Chic House, j'ai une question sur vos articles."
  );

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter Chic House sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6 fill-current">
        <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.386.693 4.61 1.888 6.487L4 29l7.716-1.85A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75c-1.94 0-3.75-.55-5.29-1.5l-.38-.226-4.58 1.1 1.13-4.46-.25-.4A9.7 9.7 0 0 1 5.25 15c0-5.93 4.82-10.75 10.75-10.75S26.75 9.07 26.75 15 21.93 24.75 16.004 24.75Zm5.94-8.06c-.326-.163-1.93-.953-2.23-1.062-.3-.11-.52-.163-.74.163-.217.326-.85 1.062-1.043 1.28-.192.217-.385.244-.71.082-.326-.163-1.376-.507-2.62-1.615-.968-.863-1.622-1.93-1.812-2.256-.19-.326-.02-.502.143-.664.146-.146.326-.38.49-.57.163-.19.217-.326.326-.543.108-.217.054-.407-.027-.57-.082-.163-.74-1.78-1.014-2.44-.267-.64-.54-.553-.74-.563l-.63-.012c-.217 0-.57.082-.868.407-.298.326-1.137 1.11-1.137 2.71 0 1.6 1.164 3.145 1.327 3.362.163.217 2.29 3.497 5.55 4.9.775.334 1.38.534 1.852.684.778.247 1.486.212 2.046.129.624-.093 1.93-.79 2.2-1.552.27-.762.27-1.415.19-1.552-.082-.136-.3-.217-.626-.38Z" />
      </svg>
    </a>
  );
}
