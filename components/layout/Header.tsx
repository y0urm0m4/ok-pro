"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "#about", label: "О бренде" },
  { href: "#services", label: "Услуги" },
  { href: "#marathon", label: "Марафон" },
  { href: "#how", label: "Как работаем" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-border">
      <Container className="flex items-center justify-between h-16">
        <Link href="/" className="font-display text-xl font-semibold tracking-wide text-text">
          OK Pro
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-accent transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="#contact" size="sm">
            Оставить заявку
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-text"
          aria-label="Открыть меню"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </Container>

      {open && (
        <div className="md:hidden bg-bg border-t border-border">
          <Container className="py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base text-text-muted hover:text-accent transition-colors duration-200"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href="#contact" size="sm" className="self-start mt-2">
              Оставить заявку
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
