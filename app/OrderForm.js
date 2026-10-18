"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "+998 ", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const digits = form.phone.replace(/\D/g, "");
    if (form.name.trim().length < 2) return setError("Исмингизни киритинг");
    if (digits.length < 9) return setError("Телефон рақамни тўлиқ киритинг");
    if (form.address.trim().length < 3) return setError("Манзилни киритинг");

    setLoading(true);
    const eventId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, eventId }),
      });
      if (!res.ok) throw new Error("send failed");
      // Meta Pixel: Lead (CAPI bilan bir xil eventID — dublikat bo'lmaydi)
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {}, { eventID: eventId });
      }
      router.push("/rahmat");
    } catch {
      setError("Хатолик юз берди. Илтимос, қайта уриниб кўринг.");
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <label>
        Исмингиз
        <input
          name="name"
          type="text"
          placeholder="Масалан: Зилола"
          value={form.name}
          onChange={onChange}
          autoComplete="name"
          required
        />
      </label>

      <label>
        Телефон рақамингиз
        <input
          name="phone"
          type="tel"
          placeholder="+998 90 123 45 67"
          value={form.phone}
          onChange={onChange}
          autoComplete="tel"
          required
        />
      </label>

      <label>
        Манзилингиз
        <input
          name="address"
          type="text"
          placeholder="Шаҳар, туман, кўча, уй"
          value={form.address}
          onChange={onChange}
          autoComplete="street-address"
          required
        />
      </label>

      {error && <p className="error">{error}</p>}

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Юборилмоқда..." : "Юбориш"}
      </button>
    </form>
  );
}
