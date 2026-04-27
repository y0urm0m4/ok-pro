import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/schemas";

// In-memory rate-limit: не более 5 заявок в час с одного IP
const rateMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }

  if (entry.count >= 5) return false;

  entry.count++;
  return true;
}

const messengerLabel: Record<string, string> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  call: "Звонок",
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Слишком много заявок. Попробуйте позже." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation error" }, { status: 422 });
  }

  const { name, phone, messenger, service, comment, honeypot } = parsed.data;

  // Honeypot: если заполнен — бот
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log("New lead:", { name, phone, messenger, service, comment });
    return NextResponse.json({ ok: true });
  }

  const text = [
    `🔔 *Новая заявка с сайта OK Pro*`,
    ``,
    `👤 *Имя:* ${name}`,
    `📞 *Телефон:* ${phone}`,
    `💬 *Мессенджер:* ${messengerLabel[messenger] ?? messenger}`,
    `🎯 *Услуга:* ${service}`,
    comment ? `📝 *Комментарий:* ${comment}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram error:", err);
      return NextResponse.json({ error: "Telegram error" }, { status: 500 });
    }
  } catch (err) {
    console.error("Telegram fetch error:", err);
    return NextResponse.json({ error: "Network error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
