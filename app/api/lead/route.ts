import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { leadSchema } from "@/lib/schemas";

// Простой in-memory rate-limit: не более 5 заявок в час с одного IP
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

  const toEmail = process.env.LEAD_EMAIL;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? 465);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!toEmail || !smtpHost || !smtpUser || !smtpPass) {
    // В dev без env — просто логируем
    console.log("New lead:", { name, phone, messenger, service, comment });
    return NextResponse.json({ ok: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"OK Pro" <${smtpUser}>`,
      to: toEmail,
      subject: `Новая заявка от ${name}`,
      html: `
        <h2>Новая заявка с сайта OK Pro</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Мессенджер:</strong> ${messenger}</p>
        <p><strong>Услуга:</strong> ${service}</p>
        ${comment ? `<p><strong>Комментарий:</strong> ${comment}</p>` : ""}
      `,
    });
  } catch (err) {
    console.error("Mail send error:", err);
    return NextResponse.json({ error: "Mail error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
