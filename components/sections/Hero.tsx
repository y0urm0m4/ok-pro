"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Фоновое фото с zoom-out эффектом */}
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/moscow-russia-3840x2160-10809.jpg"
          alt="OK Pro — фон"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Затемнение — градиент снизу тяжелее, сверху легче */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

      {/* Контент */}
      <Container className="relative z-20 py-20 md:py-32">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm uppercase tracking-widest text-accent font-sans mb-6"
          >
            Продюсерский центр
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Heading level={1} className="text-white mb-6 drop-shadow-lg">
              Личный бренд,{" "}
              <em className="font-display not-italic text-accent">
                который замечают
              </em>
            </Heading>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl drop-shadow"
          >
            Помогаем экспертам, предпринимателям и медийным личностям становиться
            узнаваемыми. PR, продакшн, преображение — комплексно и без размытых
            результатов.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button href="#contact" size="lg">
              Оставить заявку
            </Button>
            <Button
              href="#marathon"
              variant="secondary"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10 hover:border-white"
            >
              Узнать о марафоне
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Декоративная линия */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-20" />
    </section>
  );
}
