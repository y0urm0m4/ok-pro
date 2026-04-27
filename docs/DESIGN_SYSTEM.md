# Дизайн-система OK Pro

## Философия

- **Нейтрально-эстетичная** база с одним выраженным акцентным цветом
- Премиальное ощущение **без** золота, кричащих градиентов и инфобиз-стилистики
- Воздуха много. Контент дышит. Не перегружено.
- На первом экране — эффект «вау, это сделано иначе»

## Цвета

Используются как CSS-переменные через Tailwind. Палитра — **рабочая стартовая**, корректируется на этапе утверждения брендового направления.

```css
/* app/globals.css */
:root {
  /* Базовая палитра */
  --color-bg: #F7F4EE;          /* Тёплый off-white фон */
  --color-surface: #FFFFFF;      /* Белый — карточки, формы */
  --color-text: #1A1A1A;         /* Основной текст, почти чёрный */
  --color-text-muted: #6B6B6B;   /* Вторичный текст */
  --color-border: #E5E0D6;       /* Границы, разделители */

  /* Акцент */
  
  --color-accent-hover: #6F2330;

}
```

## Типографика

```ts
// app/layout.tsx
import { Manrope, Cormorant_Garamond } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
```

| Роль | Шрифт | Вариант |
|------|-------|---------|
| Display (h1, hero, акценты) | Cormorant Garamond | 500–600, италик для акцентов |
| Body, h2-h6, UI | Manrope | 400–700 |

**Альтернативы** (если Cormorant не зайдёт): Playfair Display, Fraunces, EB Garamond.

## Шкала размеров (mobile → desktop)

```
hero h1:    44/52  →  72/80   (text-5xl → text-7xl)
section h2: 32/40  →  48/56   (text-3xl → text-5xl)
h3:         24/32  →  28/36
body lg:    18/28  →  20/30
body:       16/24
small:      14/20
caption:    12/16
```

## Отступы и сетка

- **Контейнер:** `max-w-[1280px]`, padding `px-5 md:px-8 lg:px-12`
- **Вертикальные отступы секций:** `py-16 md:py-24 lg:py-32`
- **Скругления:** `rounded-2xl` (16px) — карточки. `rounded-full` — кнопки/чипы. `rounded-lg` (8px) — поля ввода.
- **Тени:** минимально. `shadow-sm` для подъёма карточек на hover.

## Tailwind config (фрагмент)

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        text: { DEFAULT: "var(--color-text)", muted: "var(--color-text-muted)" },
        border: "var(--color-border)",
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          soft: "var(--color-accent-soft)",
          foreground: "var(--color-on-accent)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
```

## Базовые UI-компоненты

### Button

```tsx
<Button variant="primary" size="md" href="#contact">Оставить заявку</Button>
```

Варианты: `primary` (акцентный фон), `secondary` (контурный), `ghost` (без фона).
Размеры: `sm`, `md`, `lg`.
Кнопка-ссылка через `href` рендерит `<Link>`, иначе `<button>`.

### Container

```tsx
<Container>...</Container>
// = <div className="mx-auto max-w-container px-5 md:px-8 lg:px-12">
```

### Heading

```tsx
<Heading level={2}>Услуги</Heading>
```
Принимает `level` 1–6, отдаёт правильный тег + предустановленные классы.

### Input / Textarea / Select / Checkbox

Минималистичные, со скруглением `rounded-lg`, бордером `border-border`, фокус-кольцо акцентного цвета.

## Анимации

- **Появление при скролле** — Framer Motion, `whileInView`. Сдержанно: `opacity 0→1`, `y: 20→0`, длительность 0.5–0.7s
- **Hover на карточках** — лёгкий подъём (`-translate-y-1`) + `shadow-sm`
- **Кнопки** — `transition-colors duration-200`
- **Без**: бесконечных лупов, агрессивных параллаксов, лоадеров с танцующими точками

## Иконки

`lucide-react`. Размер по умолчанию — `w-5 h-5` (20px). В кнопках — `w-4 h-4`. В крупных карточках услуг — `w-8 h-8`.

## Адаптивность

- **Брейкпоинты Tailwind:** `sm:640`, `md:768`, `lg:1024`, `xl:1280`, `2xl:1536`
- **Mobile-first.** Все стили без префикса = mobile. Префиксы добавляются для больших экранов.
- **Контрольные ширины проверки:** 360px, 480px, 768px, 1024px, 1440px

## Доступность (минимум)

- Контраст текста к фону ≥ 4.5:1
- Все интерактивные элементы — фокусируемы, видимое фокус-кольцо
- `aria-label` на иконочных кнопках
- `prefers-reduced-motion` — отключать анимации

## Что НЕ делаем

- Градиенты на фонах (если только не утверждённый брендовый эффект)
- Glassmorphism, неоморфизм, тренды 2020-х
- Тёмные оверлеи поверх фотографий «потому что красиво» — только если оправдано читаемостью
- Параллакс на мобильных
- Слайдеры с автопрокруткой меньше 5 секунд
