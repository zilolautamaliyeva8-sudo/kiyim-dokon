import crypto from "crypto";

const sha256 = (v) => crypto.createHash("sha256").update(v).digest("hex");

const normPhone = (phone) => {
  let d = String(phone || "").replace(/\D/g, "");
  if (d.length === 9) d = "998" + d; // O'zbekiston kodi
  return d;
};

const normName = (s) => String(s || "").trim().toLowerCase();

// So'rovdan mijozning brauzer ma'lumotlarini olish (Lead paytida saqlanadi)
export function clientInfo(request) {
  const headers = request.headers;
  const cookies = request.cookies;
  const ip =
    (headers.get("x-forwarded-for") || "").split(",")[0].trim() || headers.get("x-real-ip") || "";
  return {
    ip,
    ua: (headers.get("user-agent") || "").slice(0, 300),
    fbp: cookies.get("_fbp")?.value || "",
    fbc: cookies.get("_fbc")?.value || "",
    url: headers.get("referer") || "",
  };
}

function buildUserData({ name, phone, ip, ua, fbp, fbc }) {
  const firstName = normName(name).split(/\s+/)[0];
  const user_data = {
    ph: [sha256(normPhone(phone))],
    country: [sha256("uz")],
    client_user_agent: ua || undefined,
    client_ip_address: ip || undefined,
    fbp: fbp || undefined,
    fbc: fbc || undefined,
  };
  if (firstName) user_data.fn = [sha256(firstName)];
  return user_data;
}

async function sendEvent(event) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return { skipped: true, error: "Meta sozlanmagan" };

  const payload = { data: [event] };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    if (!res.ok) console.error("Meta CAPI error:", data);
    return { ok: res.ok, ...data };
  } catch (err) {
    console.error("Meta CAPI network error:", err);
    return { error: true };
  }
}

/**
 * "Lead" hodisasi. eventId pixel bilan bir xil — Meta ikkalasini dublikat sifatida birlashtiradi.
 */
export async function sendMetaLead({ eventId, name, phone, request }) {
  const c = clientInfo(request);
  return sendEvent({
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: "website",
    event_source_url: c.url || undefined,
    user_data: buildUserData({ name, phone, ...c }),
  });
}

/**
 * "Purchase" hodisasi — sotuvchi Telegram'dagi tugma orqali sotuvni tasdiqlaganda.
 * event_id lid ID'siga bog'langan: bitta lid uchun takroriy bosish Meta'da dublikat bo'lmaydi.
 */
export async function sendMetaPurchase({ lead, value, currency }) {
  return sendEvent({
    event_name: "Purchase",
    event_time: Math.floor(Date.now() / 1000),
    event_id: `purchase-${lead.i}`,
    action_source: "website",
    event_source_url: lead.u || undefined,
    user_data: buildUserData({
      name: lead.n,
      phone: lead.p,
      ip: lead.ip,
      ua: lead.ua,
      fbp: lead.fbp,
      fbc: lead.fbc,
    }),
    custom_data: { value: Number(value), currency },
  });
}
