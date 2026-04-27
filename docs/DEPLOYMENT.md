# Деплой и инфраструктура

## Стек хостинга

- **Vercel** — основной хостинг (бесплатный tier на старте)
- **Reg.ru** — только домен (DNS-провайдер)

## Зачем Vercel

Next.js делает Vercel. SSR/ISR/API-роуты работают из коробки, есть автодеплой, превью-сборки на PR, image optimization, CDN, SSL — всё бесплатно для проекта такого размера.

## Шаги первичной настройки

### 1. Создание проекта на Vercel

1. Зайти на [vercel.com](https://vercel.com), залогиниться через GitHub
2. **Import Project** → выбрать репозиторий `okpro`
3. Framework: автоматически определится Next.js
4. Build Command: `pnpm build` (или `npm run build`)
5. Output Directory: `.next` (по умолчанию)
6. Root Directory: оставить пустым (если репо однопроектный)
7. Install Command: `pnpm install` (или `npm install`)

### 2. Переменные окружения

В разделе **Settings → Environment Variables** добавить:

```
RESEND_API_KEY=re_xxxxxxxxxx
EMAIL_TO=info@okpro.ru
EMAIL_FROM=noreply@okpro.ru
```

Применить ко всем средам: Production, Preview, Development.

### 3. Деплой

- `main` ветка → автоматический деплой в production
- любая другая ветка / PR → preview-деплой с уникальным URL

## Привязка домена с Reg.ru

После того как заказчик купит домен (например, `okpro.ru`):

### Вариант A — оставить DNS на Reg.ru (рекомендуется)

1. В Vercel: **Settings → Domains → Add Domain** → `okpro.ru`
2. Vercel покажет нужные DNS-записи. Обычно:
   ```
   Type: A      Name: @       Value: 76.76.21.21
   Type: CNAME  Name: www     Value: cname.vercel-dns.com
   ```
3. Зайти в личный кабинет Reg.ru → DNS-серверы и зона домена → редактирование зоны
4. Добавить записи, как показал Vercel
5. Подождать 15 минут — 24 часа (обычно 30 минут)
6. SSL подцепится автоматически через Let's Encrypt

### Вариант B — делегировать DNS на Vercel

1. В Vercel взять `ns1.vercel-dns.com` и `ns2.vercel-dns.com`
2. В Reg.ru сменить DNS-серверы домена на эти
3. В Vercel настроить DNS-записи через интерфейс

**Рекомендуем вариант A** — заказчик сохраняет контроль над DNS на привычной площадке.

## Корпоративный email

E-mail `info@okpro.ru` создаётся **отдельно от Vercel**. Варианты:

- **Yandex 360 для бизнеса** — бесплатно для одного домена, удобно для России
- **Reg.ru почта** — есть в тарифах самого регистратора
- **Google Workspace** — платно, но удобно

Создаётся через MX-записи в DNS Reg.ru. Это **не конфликтует** с привязкой к Vercel — Vercel использует только A/CNAME, MX остаётся для почты.

Пример MX-записей для Yandex 360:
```
Type: MX  Name: @  Value: mx.yandex.net  Priority: 10
Type: TXT Name: @  Value: v=spf1 redirect=_spf.yandex.net
```

## Локальная разработка

```bash
# Установка
pnpm install

# .env.local (не коммитить!)
cp .env.example .env.local
# заполнить ключи

# Запуск
pnpm dev    # http://localhost:3000

# Билд и проверка
pnpm build
pnpm start

# Линтинг
pnpm lint
```

## CI/CD

На MVP отдельный CI не нужен — Vercel сам:
- Запускает билд на каждый push
- Проваливает деплой, если билд упал
- Делает превью на каждый PR с уникальным URL

Для полноты можно добавить GitHub Actions с `pnpm lint && pnpm typecheck` на этапе 2.

## Аналитика трафика

На MVP — **не подключаем** (по решению заказчика).

Архитектурный задел (на этапе 2):
```
NEXT_PUBLIC_YANDEX_METRIKA_ID=XXXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXX
```

Если переменные пустые — скрипты не подключаются, ничего не ломается.

## Мониторинг ошибок (этап 2 опционально)

- **Sentry** — бесплатный tier, легко интегрируется с Next.js
- Логи запросов API-роута в Vercel Logs (есть из коробки)

## Бэкапы

- Код: GitHub
- Контент MVP: в репозитории (`content/*.ts`)
- Контент после CMS: ответственность Sanity (есть встроенные снапшоты)

## Лимиты Vercel Free

| Ресурс | Лимит | Хватит ли? |
|--------|-------|-----------|
| Bandwidth | 100 GB/мес | Да, многократный запас |
| Serverless invocations | 100k/мес | Форма заявки точно поместится |
| Edge requests | 1M/мес | Да |
| Build time | 6000 мин/мес | Да |

При росте трафика — апгрейд на Pro ($20/мес).

## Чек-лист перед запуском в продакшен

- [ ] Домен куплен и привязан
- [ ] SSL активен (зелёный замочек)
- [ ] `.env` переменные заполнены в production
- [ ] Тестовая отправка формы → письмо реально приходит
- [ ] Все ссылки и контакты — рабочие, не плейсхолдеры
- [ ] Реквизиты ИП в футере и `/privacy` — настоящие
- [ ] Lighthouse на проде ≥ заявленных порогов
- [ ] `robots.txt` разрешает индексацию (в production!), `sitemap.xml` доступен
- [ ] 404-страница работает
- [ ] Форма проверена с реального телефона

## Если что-то пошло не так

- Билд упал на Vercel → смотреть логи в **Deployments → [ваш билд] → Logs**
- Письмо не пришло → проверить **Functions Logs** API-роута `/api/lead`
- Домен не подцепился за сутки → проверить DNS через `dig okpro.ru` или [dnschecker.org](https://dnschecker.org)
- 500 ошибка на проде → откатить деплой через Vercel UI («Promote to Production» предыдущего билда)
