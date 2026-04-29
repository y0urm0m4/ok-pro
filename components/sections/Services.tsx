"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

const services = [
  {
    number: "01",
    title: "Личный бренд",
    short: "Упаковка, позиционирование, контент, продвижение",
    description:
      "Превращаем экспертизу и личность в бренд, который привлекает аудиторию и клиентов. Стратегия, визуальный код, ведение соцсетей, продвижение.",
  },
  {
    number: "02",
    title: "PR и медиа",
    short: "Размещения в СМИ, интервью, медиа-образ",
    description:
      "Работаем с журналистами, редакциями, шоу. Выстраиваем медиа-присутствие, которое усиливает экспертный статус.",
  },
  {
    number: "03",
    title: "Beauty-преображение",
    short: "2-месячный марафон полного перерождения",
    description:
      "Диета, тренировки, стиль, косметология, психолог. Комплексная работа над внешностью и состоянием.",
    accent: true,
  },
  {
    number: "04",
    title: "Видеопродакшн",
    short: "Reels, имиджевые ролики, контент для соцсетей",
    description:
      "Снимаем и монтируем контент, который работает на бренд: от коротких форматов до полноценных имиджевых видео.",
  },
  {
    number: "05",
    title: "Продюсирование под ключ",
    short: "Комплексное сопровождение медийной личности, разработка и пиар вашего личного бренда и бренда компании",
    description:
      "Берём на себя всё: стратегию, команду, медиа, съёмки, PR. Вы занимаетесь делом — мы делаем так, чтобы о вас говорили.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-bg">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-accent font-sans mb-4">
            Услуги
          </p>
          <Heading level={2} className="text-text max-w-xl">
            Что мы делаем
          </Heading>
          <p className="mt-4 text-text-muted text-lg max-w-xl">
            Пять направлений, которые работают вместе или отдельно — под вашу задачу
          </p>
        </motion.div>

        <div className="divide-y divide-border">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-4 md:gap-8 py-8 group ${
                service.accent ? "relative" : ""
              }`}
            >
              {service.accent && (
                <div className="absolute inset-0 -mx-5 md:-mx-8 lg:-mx-12 bg-accent-soft rounded-2xl pointer-events-none" />
              )}

              <span className="relative font-display text-3xl text-accent/40 font-semibold">
                {service.number}
              </span>

              <div className="relative">
                <h3 className="font-sans text-xl font-semibold text-text mb-1 group-hover:text-accent transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-sm text-text-muted">{service.short}</p>
              </div>

              <p className="relative text-text-muted leading-relaxed text-sm md:text-base">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
