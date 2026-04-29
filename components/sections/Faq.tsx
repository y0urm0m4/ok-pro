"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

const faqs = [
  {
    q: "Как проходит Beauty-марафон?",
    a: "Это 2-месячная индивидуальная программа: с первого дня вы работаете в команде с нутрициологом, тренером, стилистом, косметологом и психологом. Каждую неделю — план, задачи и личная поддержка. В финале — фотосессия и возможность попасть в реалити-шоу OK.Upgrade на MusicBox Russia.",
  },
  {
    q: "Работаете ли вы с людьми без медийного опыта?",
    a: "Да, большинство наших клиентов приходят именно без публичного опыта. Мы выстраиваем всё с нуля: от позиционирования и визуального кода до первых публикаций в федеральных СМИ. Ваша задача — быть собой и следовать плану.",
  },
  {
    q: "Сколько стоит продюсирование под ключ?",
    a: "Стоимость зависит от задачи, объёма команды и сроков. Мы не работаем по прайс-листу — каждый проект уникален. Оставьте заявку, и мы разберём вашу ситуацию на бесплатной консультации.",
  },
  {
    q: "Как попасть на реалити-шоу OK.Upgrade?",
    a: "Путь на шоу — через Beauty-марафон. Лучшие участницы программы получают приглашение в полномасштабный TV-проект на канале MusicBox Russia с аудиторией 10 млн телезрителей.",
  },
  {
    q: "Сколько времени занимает работа над личным брендом?",
    a: "Первые результаты — публикации и медиа-присутствие — появляются уже через 4–6 недель. Полноценный бренд с узнаваемостью и стабильным потоком аудитории строится за 3–6 месяцев системной работы.",
  },
  {
    q: "Есть ли реальные результаты у ваших клиентов?",
    a: "За 10 лет — более 100 запущенных брендов, 5000+ публикаций в СМИ. Среди проектов: авторское шоу «Разговор на ОК» на Первом Национальном и реалити OK.Upgrade на MusicBox Russia. Конкретные истории — в разделе «Отзывы».",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 bg-bg">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-sm uppercase tracking-widest text-accent font-sans mb-4">
            Вопросы
          </p>
          <Heading level={2} className="text-text max-w-xl">
            Часто спрашивают
          </Heading>
        </motion.div>

        <div className="divide-y divide-border">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-base md:text-lg font-medium text-text group-hover:text-accent transition-colors duration-200">
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 mt-1 w-6 h-6 rounded-full border border-accent flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 1v10M1 6h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="text-accent"
                      />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-text-muted leading-relaxed text-sm md:text-base">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
