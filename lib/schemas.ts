import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Введите имя (минимум 2 символа)"),
  phone: z
    .string()
    .min(10, "Введите корректный номер телефона")
    .regex(/^[\d\s\+\-\(\)]+$/, "Только цифры и символы +, -, (, )"),
  messenger: z.enum(["telegram", "whatsapp", "call"], {
    error: "Выберите способ связи",
  }),
  service: z.string().min(1, "Выберите услугу"),
  comment: z.string().optional(),
  consent: z.literal(true, {
    error: "Необходимо согласие на обработку данных",
  }),
  honeypot: z.string().max(0).optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;
