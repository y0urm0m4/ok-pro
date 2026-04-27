"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "#about", label: "О бренде" },
  { href: "#services", label: "Услуги" },
  { href: "#marathon", label: "Марафон" },
  { href: "#how", label: "Как работаем" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent border-b border-white/10"
          : "bg-bg/95 backdrop-blur-sm border-b border-border shadow-sm"
      )}
    >
      <Container className="flex items-center justify-between h-16">
        <Link
          href="/"
          className={cn(
            "font-display text-xl font-semibold tracking-wide transition-colors duration-300",
            isTransparent ? "text-white" : "text-text"
          )}
        >
          OK Pro
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors duration-200 hover:text-accent",
                isTransparent ? "text-white/80" : "text-text-muted"
              )}
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
          className={cn(
            "md:hidden p-2 transition-colors duration-300",
            isTransparent ? "text-white" : "text-text"
          )}
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
