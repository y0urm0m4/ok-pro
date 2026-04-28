"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/cn";

const testimonials = [
  {
    name: "Анна М.",
    role: "Эксперт по питанию",
    text: "За три месяца работы с командой Ок Про я получила публикации в трёх федеральных изданиях, выстроенную контент-стратегию и узнаваемый визуальный стиль. Результат превзошёл все ожидания.",
  },
  {
    name: "Дмитрий К.",
    role: "Предприниматель, основатель IT-стартапа",
    text: "Олеся и её команда помогли мне выйти из тени как эксперту. Теперь меня приглашают спикером на конференции, а входящих запросов стало в разы больше. Профессиональный подход на каждом этапе.",
  },
  {
    name: "Марина Л.",
    role: "Коуч и психолог",
    text: "Марафон преображения изменил не только мой внешний облик — он изменил то, как я себя презентую. Клиенты стали замечать разницу сразу. Спасибо за внимание к деталям и искреннюю поддержку.",
  },
  {
    name: "Светлана Р.",
    role: "Владелица салона красоты",
    text: "Обратилась за видеопродакшном — получила полноценный медиа-образ. Ролики набирают просмотры, подписчики растут, а главное — стали приходить клиенты именно по рекомендациям из соцсетей.",
  },
  {
    name: "Алексей В.",
    role: "Юрист, партнёр юридической фирмы",
    text: "Скептически относился к личному бренду, но результаты говорят сами за себя. За полгода стал узнаваемым в профессиональном сообществе, появились колонки в деловых изданиях.",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const prev = () => go(current === 0 ? testimonials.length - 1 : current - 1);
  const next = () => go(current === testimonials.length - 1 ? 0 : current + 1);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) next(); else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-surface overflow-hidden">
      <Container>
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-widest text-accent font-sans mb-4">
            Отзывы
          </p>
          <Heading level={2} className="text-text">
            Что говорят клиенты
          </Heading>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div
            className="relative min-h-[260px] flex items-center cursor-grab active:cursor-grabbing"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full bg-bg rounded-2xl p-8 md:p-10 border border-border"
              >
                <span className="font-display text-6xl text-accent/20 leading-none select-none">&ldquo;</span>
                <p className="text-text leading-relaxed text-lg md:text-xl -mt-4 mb-8">
                  {testimonials[current].text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center text-accent font-semibold text-sm">
                    {testimonials[current].name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-text text-sm">{testimonials[current].name}</p>
                    <p className="text-text-muted text-xs">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              aria-label="Предыдущий отзыв"
              className="w-11 h-11 rounded-full border border-border hover:border-accent hover:text-accent transition-colors duration-200 flex items-center justify-center text-text-muted"
            >
              ←
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Отзыв ${i + 1}`}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === current
                      ? "w-6 h-2 bg-accent"
                      : "w-2 h-2 bg-border hover:bg-text-muted"
                  )}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Следующий отзыв"
              className="w-11 h-11 rounded-full border border-border hover:border-accent hover:text-accent transition-colors duration-200 flex items-center justify-center text-text-muted"
            >
              →
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
