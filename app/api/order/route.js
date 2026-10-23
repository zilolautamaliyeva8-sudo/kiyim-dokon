import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendMetaLead, clientInfo } from "../../metaCapi";
import { encryptLead } from "../../leadToken";

const escapeHtml = (s) =>
  String(s ?? "")
    .slice(0, 500)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const siteUrl = (request) => {
  const fromEnv = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  return `https://${host}`;
};

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

  const eventId = String(body.eventId || "").slice(0, 100) || `lead-${Date.now()}`;
  const leadId = "L-" + crypto.randomBytes(5).toString("hex").toUpperCase().slice(0, 8);
  const c = clientInfo(request);
  const date = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" });

  // Sotuv sahifasi uchun shifrlangan havola (mijoz ma'lumotlari ochiq ko'rinmaydi)
  const leadToken = encryptLead({
    i: eventId,
    l: leadId,
    n: name.slice(0, 80),
    p: phone.slice(0, 30),
    a: address.slice(0, 120),
    ip: c.ip,
    ua: c.ua,
    fbp: c.fbp,
    fbc: c.fbc,
    u: c.url.slice(0, 200),
    t: Date.now(),
  });
  const sotuvUrl = `${siteUrl(request)}/sotuv?d=${leadToken}`;

  const text =
    `🛍 <b>Янги буюртма!</b>  <code>${leadId}</code>\n\n` +
    `👤 <b>Исм:</b> ${escapeHtml(name)}\n` +
    `📞 <b>Телефон:</b> ${escapeHtml(phone)}\n` +
    `📍 <b>Манзил:</b> ${escapeHtml(address)}\n\n` +
    `🕒 ${date}\n\n` +
    `Мижоз сотиб олса — пастдаги тугмани босинг 👇`;

  const send = (payload) =>
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", ...payload }),
    }).then((r) => r.json());

  try {
    let data = await send({
      reply_markup: {
        inline_keyboard: [[{ text: "✅ Сотиб олди → Метага юбориш", url: sotuvUrl }]],
      },
    });
    // Tugma qabul qilinmasa ham buyurtma yo'qolmasin — tugmasiz qayta yuboramiz
    if (!data.ok) {
      console.error("Telegram (tugma bilan) xatosi:", data);
      data = await send({});
    }
    if (!data.ok) {
      console.error("Telegram error:", data);
      return NextResponse.json({ ok: false, error: "Telegram xatosi" }, { status: 502 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Tarmoq xatosi" }, { status: 502 });
  }

  // Meta Conversions API — Lead hodisasi (xato bo'lsa ham mijoz rahmat sahifasiga o'tadi)
  await sendMetaLead({ eventId, name, phone, request });

  return NextResponse.json({ ok: true });
}
