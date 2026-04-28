"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

const projects = [
  {
    num: "01",
    name: "Разговор на ОК",
    category: "Шоу · Продюсирование",
    result: "Авторское интервью-шоу: от идеи до выхода в эфир. 500 000 просмотров в первый месяц",
    image: "/images/olesya_okupgrade.jpg",
    gradient: "to top right",
  },
  {
    num: "02",
    name: "Личный бренд под ключ",
    category: "Личный бренд · PR",
    result: "Стратегия, медиа, визуал — выход в топовые издания за 3 месяца",
    image: "/images/olesya_okupgrade.jpg",
    gradient: "to top left",
  },
  {
    num: "03",
    name: "ОК Апгрейд",
    category: "Beauty · Трансформация · Продакшн",
    result: "Флагманский проект полного преображения: образ, позиционирование, съёмка. Продано 1 200 мест, средний чек ×3",
    image: "/images/olesya_okupgrade.jpg",
    gradient: "to top right",
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

        {/* Сетка: 2 сверху + 1 большой снизу на десктопе */}
        <div className="flex flex-col gap-4">
          {/* Верхние два */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.slice(0, 2).map((p, i) => (
              <ProjectCard key={p.num} project={p} index={i} />
            ))}
          </div>

          {/* Нижний большой */}
          <ProjectCard project={projects[2]} index={2} large />
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  large = false,
}: {
  project: (typeof projects)[0];
  index: number;
  large?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 group ${large ? "h-[420px] md:h-[500px]" : "h-[340px] md:h-[380px]"}`}
    >
      {/* Фото */}
      <Image
        src={project.image}
        alt={project.name}
        fill
        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
      />

      {/* Стеклянный слой поверх всего фото */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] group-hover:bg-black/10 transition-colors duration-500" />

      {/* Градиент из угла — снизу слева 100% → верхний правый 0% */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${project.gradient}, transparent 45%, rgba(0,0,0,0.92) 100%)`,
        }}
      />

      {/* Контент — прижат к низу */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
        {/* Стеклянная плашка */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-5 md:p-6">
          <p className="text-xs uppercase tracking-widest text-white/50 mb-2">
            <span className="text-accent mr-2">{project.num}</span>
            {project.category}
          </p>
          <h3 className={`font-display font-semibold text-white leading-tight mb-3 ${large ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"}`}>
            {project.name}
          </h3>
          <p className="text-white/65 text-sm leading-relaxed">
            {project.result}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
