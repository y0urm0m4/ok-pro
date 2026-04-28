"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { LeadForm } from "@/components/forms/LeadForm";
import { CONTACTS } from "@/lib/constants";

export function ContactCta() {
  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Фоновое фото */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/moscow-russia-3840x2160-10809.jpg"
          alt=""
          fill
          className="object-cover object-center blur-sm scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Левая колонка */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-widest text-white/60 font-sans mb-4">
              Контакт
            </p>
            <Heading level={2} className="text-white mb-6">
              Готовы начать?
            </Heading>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              Оставьте заявку — мы свяжемся в течение дня и подберём решение
              под вашу задачу.
            </p>

            <div className="flex flex-col gap-4">
              {CONTACTS.telegram && (
                <a
                  href={CONTACTS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-200 group"
                >
                  <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors duration-200 text-sm font-medium">
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
                  className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-200 group"
                >
                  <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors duration-200 text-sm font-medium">
                    WA
                  </span>
                  <span className="text-sm">Написать в WhatsApp</span>
                </a>
              )}
              {CONTACTS.email && (
                <a
                  href={`mailto:${CONTACTS.email}`}
                  className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-200 group"
                >
                  <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors duration-200 text-sm font-medium">
                    @
                  </span>
                  <span className="text-sm">{CONTACTS.email}</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Правая колонка — стеклянная форма */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl"
          >
            <LeadForm dark />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
