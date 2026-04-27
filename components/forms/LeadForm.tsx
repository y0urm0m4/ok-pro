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

export function LeadForm() {
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
      <div className="rounded-2xl bg-accent-soft border border-accent/20 p-8 text-center">
        <p className="font-display text-2xl font-semibold text-text mb-2">
          Спасибо!
        </p>
        <p className="text-text-muted">
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
        {...register("name")}
      />

      <Input
        label="Телефон"
        placeholder="+7 (___) ___-__-__"
        type="tel"
        error={errors.phone?.message}
        {...register("phone")}
      />

      {/* Мессенджер */}
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-text">Куда написать</p>
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
              <span className="text-sm text-text-muted">{m.label}</span>
            </label>
          ))}
        </div>
        {errors.messenger && (
          <p className="text-xs text-red-500">{errors.messenger.message}</p>
        )}
      </div>

      {/* Услуга */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text">
          Что вас интересует
        </label>
        <select
          {...register("service")}
          className={cn(
            "w-full rounded-xl border border-border bg-surface px-4 py-3 text-text text-sm transition-colors duration-200",
            "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent",
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
          <p className="text-xs text-red-500">{errors.service.message}</p>
        )}
      </div>

      <Textarea
        label="Расскажите о вашей задаче (необязательно)"
        placeholder="Несколько слов о вашей ситуации и цели..."
        error={errors.comment?.message}
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
          <span className="text-sm text-text-muted leading-snug">
            Я согласен(а) на обработку{" "}
            <Link href="/privacy" className="text-accent underline underline-offset-2 hover:no-underline">
              персональных данных
            </Link>
          </span>
        </label>
        {errors.consent && (
          <p className="text-xs text-red-500">{errors.consent.message}</p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500">
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
