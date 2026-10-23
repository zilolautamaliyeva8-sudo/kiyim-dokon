import { NextResponse } from "next/server";
import { decryptLead } from "../../leadToken";
import { sendMetaPurchase } from "../../metaCapi";

const escapeHtml = (s) =>
  String(s ?? "")
    .slice(0, 300)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // Meta veb-hodisalarni 7 kungacha qabul qiladi

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  const lead = decryptLead(body.d);
  if (!lead || !lead.i) {
    return NextResponse.json({ ok: false, error: "Havola noto'g'ri yoki buzilgan" }, { status: 400 });
  }
  if (lead.t && Date.now() - lead.t > MAX_AGE_MS) {
    return NextResponse.json(
      { ok: false, error: "Бу лидга 7 кундан кўп вақт ўтган — Meta уни қабул қилмайди" },
      { status: 400 }
    );
  }

  const value = Math.round(Number(String(body.value || "").replace(/[^\d.]/g, "")));
  if (!value || value <= 0) {
    return NextResponse.json({ ok: false, error: "Суммани киритинг" }, { status: 400 });
  }

  const seller = String(body.seller || "").trim().slice(0, 60);
  const note = String(body.note || "").trim().slice(0, 300);
  const currency = (process.env.META_CURRENCY || "UZS").toUpperCase();

  const meta = await sendMetaPurchase({ lead, value, currency });
  const metaOk = !!meta.ok && !meta.skipped;

  // Telegram'ga tasdiq xabari
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (token && chatId) {
    const text =
      `💰 <b>Сотилди!</b>  <code>${escapeHtml(lead.l || "")}</code>\n\n` +
      `👤 ${escapeHtml(lead.n)} · ${escapeHtml(lead.p)}\n` +
      `💵 <b>Сумма:</b> ${value.toLocaleString("ru-RU")} ${currency}\n` +
      (seller ? `🧑‍💼 <b>Сотувчи:</b> ${escapeHtml(seller)}\n` : "") +
      (note ? `📝 ${escapeHtml(note)}\n` : "") +
      `\n${metaOk ? "✅ Метага юборилди (Purchase)" : "⚠️ Метага юборилмади — созламаларни текширинг"}`;
    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      });
    } catch (err) {
      console.error("Telegram error:", err);
    }
  }

  if (!metaOk) {
    return NextResponse.json(
      { ok: false, error: "Meta qabul qilmadi", meta: meta.error?.message || meta.error || null },
      { status: 502 }
    );
  }
  return NextResponse.json({ ok: true, received: meta.events_received ?? null });
}
