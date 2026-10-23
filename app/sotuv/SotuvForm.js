"use client";

import { useState } from "react";

const fmt = (v) => {
  const d = String(v).replace(/\D/g, "").slice(0, 12);
  return d.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export default function SotuvForm({ d }) {
  const [value, setValue] = useState("");
  const [seller, setSeller] = useState("");
  const [note, setNote] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | done | error
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const amount = Number(value.replace(/\D/g, ""));
    if (!amount) return setError("Тўланган суммани киритинг");

    setState("loading");
    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ d, value: amount, seller, note }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Хатолик");
      setState("done");
    } catch (err) {
      setError(err.message || "Хатолик юз берди, қайта уриниб кўринг");
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="sotuv-done">
        <div className="sotuv-done-icon">✅</div>
        <h3>Сотув тасдиқланди</h3>
        <p className="muted">
          Purchase ({value} сўм) Метага юборилди. Telegram'га ҳам тасдиқ хабари кетди.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <label>
        Тўланган сумма (сўм)
        <input
          inputMode="numeric"
          placeholder="Масалан: 250 000"
          value={value}
          onChange={(e) => setValue(fmt(e.target.value))}
          required
        />
      </label>
      <label>
        Сотувчи исми
        <input
          type="text"
          placeholder="Масалан: Зилола"
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
        />
      </label>
      <label>
        Изоҳ (ихтиёрий)
        <input
          type="text"
          placeholder="Нақд / карта, қўшимча маҳсулот..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </label>

      {error && <p className="error">{error}</p>}

      <button type="submit" className="btn btn-dark" disabled={state === "loading"}>
        {state === "loading" ? "Юборилмоқда..." : "🔒 Тўловни тасдиқлаш ва Метага юбориш"}
      </button>
      <p className="muted small">
        Бир лид учун фақат бир марта тасдиқланг. Қайта босилса, Мета уни дубликат деб ҳисоблайди.
      </p>
    </form>
  );
}
