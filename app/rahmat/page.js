"use client";

import { useEffect, useState } from "react";

const SECONDS = 10;
const CHANNEL_URL = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL || "https://t.me/";

export default function ThankYou() {
  const [left, setLeft] = useState(SECONDS);

  useEffect(() => {
    const timer = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    const redirect = setTimeout(() => {
      window.location.href = CHANNEL_URL;
    }, SECONDS * 1000);
    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, []);

  return (
    <main className="thanks">
      <div className="thanks-card">
        <div className="check">
          <svg viewBox="0 0 52 52" aria-hidden="true">
            <circle className="check-circle" cx="26" cy="26" r="24" fill="none" />
            <path className="check-mark" fill="none" d="M14 27l8 8 16-16" />
          </svg>
        </div>

        <h1>Раҳмат!</h1>
        <p className="lead-dark">
          Буюртмангиз қабул қилинди. Менежеримиз тез орада сиз билан боғланади.
        </p>

        <div className="countdown">
          <svg viewBox="0 0 120 120" className="ring">
            <circle cx="60" cy="60" r="52" className="ring-bg" />
            <circle
              cx="60"
              cy="60"
              r="52"
              className="ring-fg"
              style={{ animationDuration: `${SECONDS}s` }}
            />
          </svg>
          <span className="count">{left}</span>
        </div>

        <p className="muted">
          {left} сониядан сўнг Telegram каналимизга ўтасиз — у ерда янги моделлар ва чегирмалар!
        </p>

        <a href={CHANNEL_URL} className="btn btn-tg">
          Ҳозироқ каналга ўтиш
        </a>
      </div>
    </main>
  );
}
