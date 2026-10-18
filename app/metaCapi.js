import crypto from "crypto";

const sha256 = (v) => crypto.createHash("sha256").update(v).digest("hex");

const normPhone = (phone) => {
  let d = String(phone || "").replace(/\D/g, "");
  if (d.length === 9) d = "998" + d; // O'zbekiston kodi
  return d;
};

const normName = (s) => String(s || "").trim().toLowerCase();

/**
 * Meta Conversions API orqali "Lead" hodisasini yuborish.
 * eventId pixel bilan bir xil bo'lishi kerak — Meta ikkalasini dublikat sifatida birlashtiradi.
 */
export async function sendMetaLead({ eventId, name, phone, request }) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return { skipped: true };

  const headers = request.headers;
  const cookies = request.cookies;
  const ip = (headers.get("x-forwarded-for") || "").split(",")[0].trim() || headers.get("x-real-ip");
  const firstName = normName(name).split(/\s+/)[0];

  const user_data = {
    ph: [sha256(normPhone(phone))],
    country: [sha256("uz")],
    client_user_agent: headers.get("user-agent") || undefined,
    client_ip_address: ip || undefined,
    fbp: cookies.get("_fbp")?.value,
    fbc: cookies.get("_fbc")?.value,
  };
  if (firstName) user_data.fn = [sha256(firstName)];

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: headers.get("referer") || undefined,
        user_data,
      },
    ],
  };
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
    return data;
  } catch (err) {
    console.error("Meta CAPI network error:", err);
    return { error: true };
  }
}
