"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

const projects = [
  {
    num: "01",
    name: "Анна Соколова",
    category: "Личный бренд · PR",
    result: "С нуля до колонки в Forbes и 80 000 подписчиков за 8 месяцев",
    accent: "#6F2330",
    size: "large",
  },
  {
    num: "02",
    name: "Марафон «Новая Я»",
    category: "Beauty · Продюсирование",
    result: "Продано 1 200 мест. Средний чек вырос в 3 раза после визуального rebrand",
    accent: "#2C3E50",
    size: "small",
  },
  {
    num: "03",
    name: "Виктор Нестеров",
    category: "Видеопродакшн",
    result: "Серия из 12 роликов набрала 4 млн просмотров. Рост продаж на 40%",
    accent: "#1a1412",
    size: "small",
  },
  {
    num: "04",
    name: "Студия Forma",
    category: "Полное продюсирование",
    result: "Выход в 5 федеральных СМИ, партнёрство с крупным beauty-брендом",
    accent: "#3D2B1F",
    size: "large",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 bg-text overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-sm uppercase tracking-widest text-accent font-sans mb-4">
            Проекты
          </p>
          <Heading level={2} className="text-white max-w-xl">
            Результаты,{" "}
            <em className="font-display not-italic text-accent">
              которые говорят сами
            </em>
          </Heading>
        </motion.div>

        {/* Сетка проектов */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {projects.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-text p-8 md:p-10 cursor-default overflow-hidden"
            >
              {/* Hover-фон */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `${p.accent}` }}
              />

              {/* Номер */}
              <span className="relative z-10 font-display text-7xl font-semibold text-white/5 group-hover:text-white/10 transition-colors duration-500 absolute top-4 right-6 select-none leading-none">
                {p.num}
              </span>

              <div className="relative z-10">
                <p className="text-xs uppercase tracking-widest text-white/30 group-hover:text-white/50 transition-colors duration-300 mb-3">
                  {p.category}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-4 leading-tight">
                  {p.name}
                </h3>
                <p className="text-white/50 group-hover:text-white/80 transition-colors duration-300 text-sm leading-relaxed max-w-xs">
                  {p.result}
                </p>

                {/* Линия-акцент */}
                <div className="mt-8 h-px w-0 group-hover:w-12 bg-accent transition-all duration-500 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Нижняя строка */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-white/25 text-sm mt-10 tracking-wide"
        >
          * Данные — заглушки. Будут заменены на реальные кейсы клиентов.
        </motion.p>
      </Container>
    </section>
  );
}
