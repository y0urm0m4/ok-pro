"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { LeadForm } from "@/components/forms/LeadForm";
import { CONTACTS } from "@/lib/constants";

export function ContactCta() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-bg">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Левая колонка */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-widest text-accent font-sans mb-4">
              Контакт
            </p>
            <Heading level={2} className="text-text mb-6">
              Готовы начать?
            </Heading>
            <p className="text-text-muted text-lg leading-relaxed mb-10">
              Оставьте заявку — мы свяжемся в течение дня и подберём решение
              под вашу задачу.
            </p>

            <div className="flex flex-col gap-4">
              {CONTACTS.telegram && (
                <a
                  href={CONTACTS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-text-muted hover:text-accent transition-colors duration-200 group"
                >
                  <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent transition-colors duration-200 text-sm font-medium">
                    TG
                  </span>
                  <span className="text-sm">Написать в Telegram</span>
                </a>
              )}
              {CONTACTS.whatsapp && (
                <a
                  href={CONTACTS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-text-muted hover:text-accent transition-colors duration-200 group"
                >
                  <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent transition-colors duration-200 text-sm font-medium">
                    WA
                  </span>
                  <span className="text-sm">Написать в WhatsApp</span>
                </a>
              )}
              {CONTACTS.email && (
                <a
                  href={`mailto:${CONTACTS.email}`}
                  className="inline-flex items-center gap-3 text-text-muted hover:text-accent transition-colors duration-200 group"
                >
                  <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent transition-colors duration-200 text-sm font-medium">
                    @
                  </span>
                  <span className="text-sm">{CONTACTS.email}</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Правая колонка — форма */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-surface rounded-2xl p-8 shadow-sm border border-border"
          >
            <LeadForm />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
