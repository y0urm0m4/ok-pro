# Стек технологий

## Жёстко зафиксировано

- **Next.js 14+** (App Router, не Pages Router)
- **React 18+**
- **TypeScript 5+** (strict mode)
- **Tailwind CSS 3.4+**
- **Node.js 20 LTS** (для совместимости с Vercel)

## Основные зависимости

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0",
    "react-hook-form": "^7.53.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.9.0",
    "framer-motion": "^11.5.0",
    "lucide-react": "^0.445.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4.0",
    "postcss": "^8",
    "autoprefixer": "^10",
    "eslint": "^8",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.3.0",
    "prettier-plugin-tailwindcss": "^0.6.0"
  }
}
```

## Что и для чего

| Пакет | Назначение |
|-------|------------|
| `clsx` + `tailwind-merge` | Утилита `cn()` для условных классов |
| `react-hook-form` | Форма заявки (производительная, маленькая) |
| `zod` | Валидация (форма + API-роут) |
| `@hookform/resolvers` | Связка react-hook-form + zod |
| `framer-motion` | Анимации появления, hover-эффекты |
| `lucide-react` | Иконки (легковесные SVG) |

## Email-отправка

Для формы заявки используется **Resend** (или Yandex SMTP / SendGrid — финально решит разработчик).

```
RESEND_API_KEY=...
EMAIL_TO=...
EMAIL_FROM=...
```

## Что НЕ ставим без согласования

- UI-киты: MUI, Ant Design, Chakra, shadcn/ui (без явной просьбы)
- CSS-in-JS: styled-components, emotion
- Альтернативы Tailwind: UnoCSS, Panda и т.д.
- Стейт-менеджеры: Redux, Zustand (на лендинге не нужны)
- Аналитика: GA, Метрика, пиксели
- CMS: Sanity, Strapi и т.д. (это этап 2)

## Что точно НЕ используем

- `pages/` router — только App Router
- jQuery, Bootstrap, любые legacy-зависимости
- CDN-скрипты в `<head>` без обоснования

## Версии Node и менеджер пакетов

- Node 20 LTS
- **pnpm** (предпочтительно) или npm
- Зафиксировать `.nvmrc` с версией `20`
