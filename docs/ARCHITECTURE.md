# Архитектура проекта

## Структура папок

```
okpro/
├── app/
│   ├── layout.tsx              # Root layout, шрифты, метаданные
│   ├── page.tsx                # Главная (лендинг, собирается из секций)
│   ├── privacy/
│   │   └── page.tsx            # Политика конфиденциальности
│   ├── api/
│   │   └── lead/
│   │       └── route.ts        # POST: приём заявок, отправка email
│   ├── globals.css             # Tailwind directives + CSS-переменные
│   ├── sitemap.ts              # Динамический sitemap.xml
│   ├── robots.ts               # robots.txt
│   ├── opengraph-image.tsx     # OG-картинка (если потом одобрят)
│   └── not-found.tsx           # 404
│
├── components/
│   ├── sections/               # Секции лендинга (1 файл = 1 секция)
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Marathon.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Testimonials.tsx    # Этап 2
│   │   ├── Media.tsx           # Этап 2 (СМИ, награды)
│   │   ├── Faq.tsx             # Этап 2
│   │   └── ContactCta.tsx
│   ├── ui/                     # Переиспользуемые примитивы
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── Heading.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Checkbox.tsx
│   │   └── Accordion.tsx
│   ├── forms/
│   │   └── LeadForm.tsx        # Форма заявки
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── popup/
│       └── DiscountPopup.tsx   # Этап 2
│
├── content/                    # Статичный контент (тексты, данные)
│   ├── services.ts             # Массив услуг
│   ├── faq.ts                  # FAQ-вопросы
│   ├── steps.ts                # 4 шага «Как мы работаем»
│   ├── testimonials.ts         # Этап 2
│   └── media.ts                # Этап 2
│
├── lib/
│   ├── cn.ts                   # Утилита для классов (clsx + twMerge)
│   ├── validations.ts          # Zod-схемы
│   ├── email.ts                # Отправка email через Resend
│   └── constants.ts            # Константы: соцсети, контакты
│
├── public/
│   ├── images/                 # Оптимизированные изображения
│   ├── fonts/                  # Локальные шрифты (если нужны)
│   └── favicon.ico
│
├── docs/                       # Документация (этот пакет файлов)
│   ├── README.md
│   ├── AGENT_RULES.md
│   ├── PROJECT.md
│   ├── STACK.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN_SYSTEM.md
│   ├── CONTENT.md
│   ├── ROADMAP.md
│   └── DEPLOYMENT.md
│
├── .env.example
├── .env.local                  # Не коммитить
├── .gitignore
├── .nvmrc
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── next.config.mjs
├── package.json
└── README.md
```

## Конвенции именования

- **Файлы компонентов:** `PascalCase.tsx` (`Hero.tsx`, `LeadForm.tsx`)
- **Файлы утилит, контента:** `camelCase.ts` (`cn.ts`, `services.ts`)
- **Папки:** `lowercase` (`components/`, `lib/`)
- **Routes (Next.js):** `lowercase-with-dashes/` (`/privacy`, `/case-studies`)

## Шаблон секции

Каждая секция лендинга — Server Component по умолчанию, кроме случаев с интерактивом.

```tsx
// components/sections/Hero.tsx
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-bg flex items-center"
    >
      <Container>
        <Heading level={1} className="mb-6">
          Заголовок
        </Heading>
        <p className="text-lg text-text-muted mb-8">
          Подзаголовок
        </p>
        <Button href="#contact" size="lg">
          Оставить заявку
        </Button>
      </Container>
    </section>
  );
}
```

## Сборка главной страницы

```tsx
// app/page.tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Marathon } from "@/components/sections/Marathon";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ContactCta } from "@/components/sections/ContactCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Marathon />
      <HowItWorks />
      <ContactCta />
    </>
  );
}
```

## Импорты

Используем алиас `@/*` (настроить в `tsconfig.json`):

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Пример: `import { cn } from "@/lib/cn";`

## API-роут заявок

```
POST /api/lead

Body (JSON):
{
  "name": string,
  "phone": string,
  "messenger": "telegram" | "whatsapp" | "call",
  "service": string,
  "comment"?: string,
  "consent": true
}

Response:
{ "ok": true }  | { "ok": false, "error": string }
```

Защита: honeypot-поле + rate-limit (3 запроса/IP за 5 минут через простой in-memory или Vercel KV на этапе 2).

## Path к layout

```
app/layout.tsx
├─ <html lang="ru">
├─ <body className="bg-bg text-text font-sans">
│   ├─ <Header />        ← фиксированная навигация
│   ├─ {children}
│   └─ <Footer />
```

## Где хранить контент

**На MVP** — все тексты и данные в `content/*.ts` как типизированные объекты. Пример:

```ts
// content/services.ts
export interface Service {
  id: string;
  title: string;
  description: string;
  highlights: string[];
}

export const services: Service[] = [
  { id: "personal-brand", title: "...", description: "...", highlights: [...] },
  // ...
];
```

**На этапе 2** — миграция на Sanity CMS, файлы `content/*.ts` становятся fallback или удаляются.
