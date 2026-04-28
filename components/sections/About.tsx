"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

const stats = [
  { value: "100+", label: "запущенных брендов" },
  { value: "10 лет", label: "на рынке" },
  { value: "5000+", label: "публикаций в СМИ" },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Фото-заглушка */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="/images/olesya.jpg"
              alt="Олеся Константинова — основатель OK Pro"
              width={480}
              height={640}
              className="w-full h-auto object-cover object-top"
              sizes="(max-width: 1024px) 90vw, 480px"
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              <p className="font-display text-lg font-semibold text-white">Олеся Константинова</p>
              <p className="text-sm text-white/70">Основатель Ок Про Продакшн</p>
            </div>
          </motion.div>

          {/* Текст */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-sm uppercase tracking-widest text-accent font-sans mb-4">
              О бренде
            </p>
            <Heading level={2} className="text-text mb-6">
              Олеся Константинова
            </Heading>
            <div className="space-y-4 text-text-muted leading-relaxed mb-10">
              <p>
                10 лет в продюсировании. За это время — сотни запущенных брендов,
                тысячи публикаций в СМИ и один главный вывод: люди не замечают
                не потому что вы недостаточно хороши, а потому что вас не видно.
              </p>
              <p>
                Ок Про Продакшн — это команда, которая выводит экспертов,
                предпринимателей и медийных личностей на новый уровень узнаваемости.
                Стратегия, PR, видео, beauty-трансформация — всё под одной крышей.
              </p>
              <p>
                Каждый проект собирается индивидуально: под вашу задачу, аудиторию
                и темп. Без шаблонов — только то, что работает именно для вас.
              </p>
            </div>

            {/* Цифры */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl md:text-4xl font-semibold text-accent mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
