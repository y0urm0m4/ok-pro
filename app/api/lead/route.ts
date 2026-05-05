import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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
    const ok = await sendViaTelegram(botToken, chatId, text);
    if (!ok) {
      return NextResponse.json({ error: "Telegram error" }, { status: 500 });
    }
  } catch (err) {
    console.error("Telegram send error:", err);
    return NextResponse.json({ error: "Network error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

async function sendViaTelegram(
  botToken: string,
  chatId: string,
  text: string
): Promise<boolean> {
  const payload = JSON.stringify({
    chat_id: chatId,
    text,
    parse_mode: "Markdown",
  });
  const proxyUrl = process.env.HTTPS_PROXY;
  const path = `/bot${botToken}/sendMessage`;

  if (!proxyUrl) {
    const res = await fetch(`https://api.telegram.org${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });
    return res.ok;
  }

  return new Promise<boolean>((resolve, reject) => {
    (async () => {
      try {
        const http = await import("http");
        const tls = await import("tls");
        const proxy = new URL(proxyUrl);
        const auth = Buffer.from(
          `${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`
        ).toString("base64");

        const connectReq = http.request({
          host: proxy.hostname,
          port: parseInt(proxy.port || "8080", 10),
          method: "CONNECT",
          path: "api.telegram.org:443",
          headers: { "Proxy-Authorization": `Basic ${auth}` },
        });

        connectReq.on("connect", (res, socket) => {
          if (res.statusCode !== 200) {
            socket.destroy();
            return resolve(false);
          }
          const tlsSocket = tls.connect({
            socket,
            servername: "api.telegram.org",
          });
          tlsSocket.once("secureConnect", () => {
            const req =
              `POST ${path} HTTP/1.1\r\n` +
              `Host: api.telegram.org\r\n` +
              `Content-Type: application/json\r\n` +
              `Content-Length: ${Buffer.byteLength(payload)}\r\n` +
              `Connection: close\r\n\r\n` +
              payload;
            tlsSocket.write(req);
          });
          let raw = "";
          tlsSocket.on("data", (chunk) => {
            raw += chunk.toString();
          });
          tlsSocket.on("end", () => {
            const ok = /^HTTP\/1\.1 200/.test(raw);
            resolve(ok);
          });
          tlsSocket.on("error", reject);
        });

        connectReq.on("error", reject);
        connectReq.end();
      } catch (err) {
        reject(err);
      }
    })();
  });
}
