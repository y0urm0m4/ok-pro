"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

const steps = [
  {
    number: "01",
    title: "Заявка",
    description: "Вы оставляете контакт, мы связываемся в течение дня",
  },
  {
    number: "02",
    title: "Знакомство",
    description: "Бесплатная консультация: разбираем вашу задачу и цели",
  },
  {
    number: "03",
    title: "План",
    description: "Подбираем направление, формат и состав команды под вас",
  },
  {
    number: "04",
    title: "Результат",
    description: "Работаем по плану, ведём от старта до результата",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-32 bg-surface">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-accent font-sans mb-4">
            Процесс
          </p>
          <Heading level={2} className="text-text max-w-md">
            Как мы работаем
          </Heading>
          <p className="mt-4 text-text-muted text-lg max-w-md">
            Четыре шага от заявки до результата
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Линия-коннектор между шагами (только на lg) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border -translate-x-4 z-0" />
              )}

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full border-2 border-accent flex items-center justify-center mb-6 bg-surface">
                  <span className="font-display text-lg font-semibold text-accent">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-sans text-xl font-semibold text-text mb-2">
                  {step.title}
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
