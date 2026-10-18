import { NextResponse } from "next/server";
import { sendMetaLead } from "../../metaCapi";

const escapeHtml = (s) =>
  String(s ?? "")
    .slice(0, 500)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export async function POST(request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { ok: false, error: "TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID sozlanmagan" },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  const address = (body.address || "").trim();

  if (!name || phone.replace(/\D/g, "").length < 9 || !address) {
    return NextResponse.json({ ok: false, error: "Maydonlar to'ldirilmagan" }, { status: 400 });
  }

  const date = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" });

  const text =
    `🛍 <b>Янги буюртма!</b>\n\n` +
    `👤 <b>Исм:</b> ${escapeHtml(name)}\n` +
    `📞 <b>Телефон:</b> ${escapeHtml(phone)}\n` +
    `📍 <b>Манзил:</b> ${escapeHtml(address)}\n\n` +
    `🕒 ${date}`;

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
    const data = await tg.json();
    if (!data.ok) {
      console.error("Telegram error:", data);
      return NextResponse.json({ ok: false, error: "Telegram xatosi" }, { status: 502 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Tarmoq xatosi" }, { status: 502 });
  }

  // Meta Conversions API — Lead hodisasi (xato bo'lsa ham mijoz rahmat sahifasiga o'tadi)
  const eventId = String(body.eventId || "").slice(0, 100) || `lead-${Date.now()}`;
  await sendMetaLead({ eventId, name, phone, request });

  return NextResponse.json({ ok: true });
}
