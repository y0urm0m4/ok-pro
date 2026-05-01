import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CONTACTS } from "@/lib/constants";

const footerLinks = [
  { href: "#services", label: "Услуги" },
  { href: "#marathon", label: "Марафон" },
  { href: "#contact", label: "Контакты" },
  { href: "/privacy", label: "Политика конфиденциальности" },
];

export function Footer() {
  return (
    <footer className="bg-text text-surface py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-display text-xl font-semibold mb-2">
              Ок Про <span className="font-sans text-xs font-normal tracking-widest uppercase opacity-50">Продакшн</span>
            </p>
            <p className="text-sm text-surface/60">
              Продюсерский центр Олеси Константиновой
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-surface/60 hover:text-surface transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-surface/60 hover:text-surface transition-colors duration-200"
            >
              Telegram
            </a>
            <a
              href={CONTACTS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-surface/60 hover:text-surface transition-colors duration-200"
            >
              WhatsApp*
            </a>
            <a
              href={CONTACTS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-surface/60 hover:text-surface transition-colors duration-200"
            >
              Instagram*
            </a>
            <a
              href={`mailto:${CONTACTS.email}`}
              className="text-sm text-surface/60 hover:text-surface transition-colors duration-200"
            >
              {CONTACTS.email}
            </a>
          </div>
        </div>

        <div className="border-t border-surface/10 pt-6 flex flex-col gap-3">
          <p className="text-sm text-surface/40">© 2026 ИП Константинова Олеся Олеговна. Все права защищены.</p>
          <p className="text-xs text-surface/30">ОГРНИП: 000000000000000 · ИНН: 000000000000</p>
          <p className="text-xs text-surface/30 leading-relaxed">
            * Instagram и WhatsApp — сервисы компании Meta Platforms Inc., признанной экстремистской организацией и запрещённой на территории Российской Федерации. Ссылки размещены исключительно в информационных целях.
          </p>
        </div>
      </Container>
    </footer>
  );
}
