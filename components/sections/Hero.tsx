"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-bg flex items-center pt-16"
    >
      <Container className="py-20 md:py-32">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-widest text-accent font-sans mb-6"
          >
            Продюсерский центр
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Heading level={1} className="text-text mb-6">
              Личный бренд,{" "}
              <em className="font-display not-italic text-accent">
                который замечают
              </em>
            </Heading>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-text-muted leading-relaxed mb-10 max-w-xl"
          >
            Помогаем экспертам, предпринимателям и медийным личностям становиться
            узнаваемыми. PR, продакшн, преображение — комплексно и без размытых
            результатов.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button href="#contact" size="lg">
              Оставить заявку
            </Button>
            <Button href="#marathon" variant="secondary" size="lg">
              Узнать о марафоне
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Декоративная линия */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  );
}
