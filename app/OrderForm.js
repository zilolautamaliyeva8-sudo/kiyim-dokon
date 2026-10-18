"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// +998 90 123 45 67 ko'rinishida formatlash
const formatPhone = (value) => {
  let d = value.replace(/\D/g, "");
  if (d.startsWith("998")) d = d.slice(3);
  d = d.slice(0, 9);
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
  return "+998 " + parts.join(" ");
};

export default function OrderForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "+998 ", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "phone" ? formatPhone(value) : value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const digits = form.phone.replace(/\D/g, "");
    if (form.name.trim().length < 2) return setError("Исмингизни киритинг");
    if (digits.length !== 12) return setError("Телефон рақамни тўлиқ киритинг: +998 90 123 45 67");
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
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("Order error:", data);
        throw new Error(data.error || "send failed");
      }
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
          inputMode="tel"
          maxLength={17}
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
