"use client";

const PHOTOS = Array.from({ length: 17 }, (_, i) => `/images/rahmat-${String(i + 1).padStart(2, "0")}.jpg`);
const CHANNEL_URL = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL || "https://t.me/";

export default function ThankYou() {
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

        <p className="muted">
          Telegram группамизда янги моделлар ва чегирмалар бор!
        </p>

        <a href={CHANNEL_URL} className="btn btn-tg">
          Telegram группага ўтиш
        </a>
      </div>

      <section className="thanks-gallery">
        <h2>Янги моделлар</h2>
        <div className="thanks-grid">
          {PHOTOS.map((src, i) => (
            <img key={src} src={src} alt={`Флис тўплам ${i + 1}`} loading="lazy" />
          ))}
        </div>
      </section>
    </main>
  );
}
