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
            <p className="font-display text-xl font-semibold mb-2">OK Pro</p>
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
            {CONTACTS.telegram && (
              <a
                href={CONTACTS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-surface/60 hover:text-surface transition-colors duration-200"
              >
                Telegram
              </a>
            )}
            {CONTACTS.whatsapp && (
              <a
                href={CONTACTS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-surface/60 hover:text-surface transition-colors duration-200"
              >
                WhatsApp
              </a>
            )}
            {CONTACTS.instagram && (
              <a
                href={CONTACTS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-surface/60 hover:text-surface transition-colors duration-200"
              >
                Instagram
              </a>
            )}
          </div>
        </div>

        <div className="border-t border-surface/10 pt-6 text-sm text-surface/40">
          <p>© 2026 ИП Константинова О.О. Все права защищены.</p>
          {/* TODO: добавить реквизиты ИП */}
        </div>
      </Container>
    </footer>
  );
}
