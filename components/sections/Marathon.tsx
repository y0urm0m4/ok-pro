"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

const included = [
  "Индивидуальная программа питания",
  "Программа тренировок под ваше тело и цели",
  "Стилист — гардероб, образ, личный шопинг",
  "Косметолог — план процедур",
  "Психолог — ежедневные сессии поддержки",
  "Процедуры в партнёрских клиниках (при необходимости)",
  "Финальная фотосессия",
  "Возможность участия в реалити-шоу OK.Upgrade на MusicBox Russia",
];

export function Marathon() {
  return (
    <section id="marathon" className="py-24 md:py-32 bg-text text-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Левая колонка — текст */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-widest text-accent font-sans mb-4">
              Флагманский продукт
            </p>
            <Heading level={2} className="text-surface mb-6">
              Beauty-марафон
            </Heading>
            <p className="text-surface/60 text-lg leading-relaxed mb-4">
              2 месяца. Команда специалистов. Полное преображение.
            </p>
            <p className="text-surface/60 leading-relaxed mb-10">
              Программа для тех, кто готов изменить себя глубоко — не ради
              тренда, а навсегда. Каждый день вы работаете по плану, в команде
              с экспертами, которые ведут вас к результату.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="#contact" size="lg">
                Узнать условия марафона
              </Button>
            </div>

            {/* Параметры */}
            <div className="grid grid-cols-2 gap-6 mt-12 pt-10 border-t border-surface/10">
              <div>
                <p className="font-display text-3xl font-semibold text-accent mb-1">
                  2 месяца
                </p>
                <p className="text-sm text-surface/50">Длительность</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-accent mb-1">
                  7 экспертов
                </p>
                <p className="text-sm text-surface/50">В вашей команде</p>
              </div>
            </div>
          </motion.div>

          {/* Правая колонка — что входит */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-surface/5 rounded-2xl p-8 border border-surface/10"
          >
            <p className="text-sm uppercase tracking-widest text-accent font-sans mb-6">
              Что входит
            </p>
            <ul className="space-y-4">
              {included.map((item, i) => {
                const isSpecial = i === included.length - 1;
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                    className={`flex items-start gap-3 ${isSpecial ? "mt-6 pt-6 border-t border-accent/20" : ""}`}
                  >
                    <span className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${isSpecial ? "border-accent bg-accent/20" : "border-accent"}`}>
                      <span className="w-2 h-2 rounded-full bg-accent" />
                    </span>
                    <span className={`leading-snug ${isSpecial ? "text-accent font-medium" : "text-surface/80"}`}>
                      {item}
                      {isSpecial && (
                        <span className="ml-2 text-xs uppercase tracking-widest text-accent/60 font-sans">★ эксклюзив</span>
                      )}
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-8 pt-6 border-t border-surface/10">
              <p className="text-sm text-surface/40">
                Формат — индивидуальный, рядом с вами в течение всего марафона
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
