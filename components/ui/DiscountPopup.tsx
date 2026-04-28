"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const STORAGE_KEY = "okpro_popup_dismissed";
// Показываем снова не раньше чем через 7 дней
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

const schema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(7, "Введите телефон"),
  consent: z.literal(true, "Необходимо согласие"),
});
type FormData = z.infer<typeof schema>;

type Status = "idle" | "loading" | "success" | "error";

export function DiscountPopup() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const dismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  }, []);

  const shouldShow = useCallback(() => {
    try {
      const ts = localStorage.getItem(STORAGE_KEY);
      if (!ts) return true;
      return Date.now() - Number(ts) > COOLDOWN_MS;
    } catch {
      return true;
    }
  }, []);

  useEffect(() => {
    if (!shouldShow()) return;

    // Exit-intent: курсор уходит за верхний край
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        setVisible(true);
        document.removeEventListener("mouseleave", onMouseLeave);
      }
    };
    document.addEventListener("mouseleave", onMouseLeave);

    // Таймер-фолбэк: 40 секунд
    const timer = setTimeout(() => {
      if (!visible) {
        setVisible(true);
        document.removeEventListener("mouseleave", onMouseLeave);
      }
    }, 40_000);

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShow]);

  // Закрытие по Escape
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, dismiss]);

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          messenger: "telegram",
          service: "Скидка 10% (popup)",
          comment: "Заявка через popup со скидкой",
          honeypot: "",
          consent: true,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Оверлей */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={dismiss}
            aria-hidden="true"
          />

          {/* Попап */}
          <motion.div
            key="popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md bg-bg rounded-2xl shadow-2xl border border-border pointer-events-auto overflow-hidden">
              {/* Акцентная полоска сверху */}
              <div className="h-1 w-full bg-accent" />

              <div className="p-8">
                <button
                  onClick={dismiss}
                  className="absolute top-5 right-5 text-text-muted hover:text-text transition-colors"
                  aria-label="Закрыть"
                >
                  <X className="w-5 h-5" />
                </button>

                {status === "success" ? (
                  <div className="text-center py-6">
                    <p className="font-display text-3xl font-semibold text-text mb-3">
                      Готово!
                    </p>
                    <p className="text-text-muted leading-relaxed">
                      Мы получили вашу заявку. Скидка <span className="text-accent font-semibold">10%</span> будет применена при первом обращении — свяжемся в течение дня.
                    </p>
                    <button
                      onClick={dismiss}
                      className="mt-6 text-sm text-text-muted underline underline-offset-2 hover:no-underline"
                    >
                      Закрыть
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm uppercase tracking-widest text-accent font-sans mb-3">
                      Специальное предложение
                    </p>
                    <h2
                      id="popup-title"
                      className="font-display text-2xl md:text-3xl font-semibold text-text mb-2 leading-tight"
                    >
                      Скидка{" "}
                      <em className="not-italic text-accent">10%</em>{" "}
                      на первый проект
                    </h2>
                    <p className="text-text-muted text-sm leading-relaxed mb-6">
                      Оставьте контакт — и мы применим скидку к любой услуге при первом обращении.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                      <Input
                        label="Как к вам обращаться"
                        placeholder="Анна"
                        error={errors.name?.message}
                        {...register("name")}
                      />
                      <Input
                        label="Телефон"
                        placeholder="+7 (___) ___-__-__"
                        type="tel"
                        error={errors.phone?.message}
                        {...register("phone")}
                      />

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register("consent")}
                          className="mt-0.5 accent-accent"
                        />
                        <span className="text-sm text-text-muted leading-snug">
                          Согласен(а) на обработку{" "}
                          <Link href="/privacy" className="text-accent underline underline-offset-2 hover:no-underline">
                            персональных данных
                          </Link>
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="text-xs text-red-500">{errors.consent.message}</p>
                      )}

                      {status === "error" && (
                        <p className="text-sm text-red-500">Что-то пошло не так. Попробуйте ещё раз.</p>
                      )}

                      <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                        {status === "loading" ? "Отправляем..." : "Получить скидку 10%"}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
