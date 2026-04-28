"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, type LeadFormData } from "@/lib/schemas";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/cn";

const services = [
  "Личный бренд",
  "PR и медиа",
  "Beauty-марафон",
  "Видеопродакшн",
  "Продюсирование под ключ",
  "Не определился(ась)",
];

const messengers = [
  { value: "telegram", label: "Telegram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "call", label: "Звонок" },
];

type Status = "idle" | "loading" | "success" | "error";

export function LeadForm({ dark = false }: { dark?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={cn("rounded-2xl p-8 text-center", dark ? "bg-white/10 border border-white/20" : "bg-accent-soft border border-accent/20")}>
        <p className={cn("font-display text-2xl font-semibold mb-2", dark ? "text-white" : "text-text")}>
          Спасибо!
        </p>
        <p className={dark ? "text-white/70" : "text-text-muted"}>
          Мы получили вашу заявку и свяжемся в течение дня.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Honeypot — скрытое поле для ботов */}
      <input
        type="text"
        {...register("honeypot")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <Input
        label="Как к вам обращаться"
        placeholder="Анна"
        error={errors.name?.message}
        dark={dark}
        {...register("name")}
      />

      <Input
        label="Телефон"
        placeholder="+7 (___) ___-__-__"
        type="tel"
        error={errors.phone?.message}
        dark={dark}
        {...register("phone")}
      />

      {/* Мессенджер */}
      <div className="flex flex-col gap-1.5">
        <p className={cn("text-sm font-medium", dark ? "text-white/90" : "text-text")}>Куда написать</p>
        <div className="flex gap-3">
          {messengers.map((m) => (
            <label
              key={m.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                value={m.value}
                {...register("messenger")}
                className="accent-accent"
              />
              <span className={cn("text-sm", dark ? "text-white/70" : "text-text-muted")}>{m.label}</span>
            </label>
          ))}
        </div>
        {errors.messenger && (
          <p className="text-xs text-red-400">{errors.messenger.message}</p>
        )}
      </div>

      {/* Услуга */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="service" className={cn("text-sm font-medium", dark ? "text-white/90" : "text-text")}>
          Что вас интересует
        </label>
        <select
          id="service"
          {...register("service")}
          className={cn(
            "w-full rounded-xl border px-4 py-3 text-sm transition-colors duration-200",
            "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent",
            dark
              ? "border-white/20 bg-white/10 text-white placeholder:text-white/40 [&>option]:bg-[#1a1412] [&>option]:text-white"
              : "border-border bg-surface text-text",
            errors.service && "border-red-400"
          )}
          defaultValue=""
        >
          <option value="" disabled>
            Выберите услугу
          </option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="text-xs text-red-400">{errors.service.message}</p>
        )}
      </div>

      <Textarea
        label="Расскажите о вашей задаче (необязательно)"
        placeholder="Несколько слов о вашей ситуации и цели..."
        error={errors.comment?.message}
        dark={dark}
        {...register("comment")}
      />

      {/* Согласие */}
      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-0.5 accent-accent"
          />
          <span className={cn("text-sm leading-snug", dark ? "text-white/60" : "text-text-muted")}>
            Я согласен(а) на обработку{" "}
            <Link href="/privacy" className={cn("underline underline-offset-2 hover:no-underline", dark ? "text-white/80" : "text-accent")}>
              персональных данных
            </Link>
          </span>
        </label>
        {errors.consent && (
          <p className="text-xs text-red-400">{errors.consent.message}</p>
        )}
      </div>

      {status === "error" && (
        <p className={cn("text-sm", dark ? "text-red-400" : "text-red-500")}>
          Что-то пошло не так. Попробуйте ещё раз или напишите нам в Telegram.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="w-full"
      >
        {status === "loading" ? "Отправляем..." : "Отправить заявку"}
      </Button>
    </form>
  );
}
