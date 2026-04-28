"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

const projects = [
  {
    num: "01",
    name: "Разговор на ОК",
    category: "Авторское шоу · Первый Национальный",
    result: "Проект о реальных историях успеха и пути к себе. Продюсер и ведущая — Олеся Константинова. Каждый герой раскрывается по-настоящему и делится бесценным опытом.",
    image: "/images/olesya_talkonok.jpg",
  },
  {
    num: "02",
    name: "Личный бренд под ключ",
    category: "Личный бренд · PR · Медиа",
    result: "Стратегия, медиа-присутствие, визуальный код — полный цикл от упаковки до публикаций в федеральных изданиях. Под каждую задачу — своя команда.",
    image: "/images/olesya_talkonok.jpg",
  },
  {
    num: "03",
    name: "OK.Upgrade",
    category: "Реалити-шоу · MusicBox Russia · Beauty",
    result: "Полномасштабный TV-проект о преображении на канале MusicBox Russia. 10 млн телезрителей, лучшие эксперты страны, реальные истории женщин, которые изменили свою судьбу. Участие открыто через Beauty-марафон.",
    image: "/images/olesya_okupgrade.jpg",
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
      className={`relative overflow-hidden rounded-2xl border border-white/10 group ${
        large ? "h-[420px] md:h-[560px]" : "h-[340px] md:h-[420px]"
      }`}
    >
      {/* Фото — на весь блок */}
      <Image
        src={project.image}
        alt={project.name}
        fill
        className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
          large ? "object-center md:object-[center_20%]" : "object-top"
        }`}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 1280px"
      />

      {/* Градиент: из нижнего левого угла → правый верх */}
      <div
        className="absolute inset-0"
        style={{
          background: large
            ? "linear-gradient(to top right, rgba(15,10,9,0.97) 0%, rgba(15,10,9,0.8) 25%, rgba(15,10,9,0.2) 55%, transparent 75%)"
            : "linear-gradient(to top right, rgba(15,10,9,1) 0%, rgba(15,10,9,0.85) 30%, rgba(15,10,9,0.3) 60%, transparent 100%)",
        }}
      />

      {/* Текст — нижний левый угол */}
      <div className={`absolute bottom-0 left-0 p-6 md:p-10 z-10 ${large ? "max-w-[55%] md:max-w-[50%]" : "max-w-[75%]"}`}>
        <p className="text-xs uppercase tracking-widest text-white/45 mb-2">
          <span className="text-accent mr-2">{project.num}</span>
          {project.category}
        </p>
        <h3
          className={`font-display font-semibold text-white leading-tight mb-3 ${
            large ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
          }`}
        >
          {project.name}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed">
          {project.result}
        </p>
      </div>
    </motion.div>
  );
}
