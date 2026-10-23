import crypto from "crypto";

// Lid ma'lumotlarini shifrlangan havolaga joylash (bazasiz).
// Kalit TELEGRAM_BOT_TOKEN dan olinadi — yangi sozlama kerak emas.
// Havolada shaxsiy ma'lumot ochiq ko'rinmaydi (AES-256-GCM).

const getKey = () => {
  const secret = process.env.LEAD_SECRET || process.env.TELEGRAM_BOT_TOKEN || "";
  if (!secret) throw new Error("LEAD_SECRET/TELEGRAM_BOT_TOKEN sozlanmagan");
  return crypto.createHash("sha256").update("lead-token:" + secret).digest();
};

export function encryptLead(obj) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(), iv);
  const enc = Buffer.concat([cipher.update(JSON.stringify(obj), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]).toString("base64url");
}

export function decryptLead(token) {
  try {
    const buf = Buffer.from(String(token || ""), "base64url");
    if (buf.length < 29) return null;
    const iv = buf.subarray(0, 12);
    const tag = buf.subarray(12, 28);
    const enc = buf.subarray(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", getKey(), iv);
    decipher.setAuthTag(tag);
    const out = Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
    return JSON.parse(out);
  } catch {
    return null;
  }
}
