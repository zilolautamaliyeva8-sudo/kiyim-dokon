"use client";

import { useState } from "react";

// Hozir sotuvda bor kiyimlar.
// Yangi kiyim qo'shish: rasmlarni public/images ga yuklang va ON_SALE ro'yxatiga yangi blok qo'shing.
// photos: har bir rasm; "color" yozilsa, rasm tagida rang nomi chiqadi.
const ON_SALE = [
  {
    name: "Велюр уй кўйлак (халат)",
    badge: "Янгилик",
    price: "250 000 сўм",
    details: [
      ["Матоси", "Х/б (пахта)"],
      ["Размер", "46, 48, 50, 52"],
      ["Ранги", "7 хил"],
    ],
    photos: [
      { img: "/images/sotuv-velyur-sariq.jpg", color: "Хантал сариқ", hex: "#c8861f" },
      { img: "/images/sotuv-velyur-sariq-2.jpg", color: "Хантал сариқ", hex: "#c8861f" },
      { img: "/images/sotuv-velyur-sariq-3.jpg", color: "Хантал сариқ", hex: "#c8861f" },
      { img: "/images/sotuv-velyur-bordo.jpg", color: "Бордо", hex: "#7a1020" },
      { img: "/images/sotuv-velyur-bordo-2.jpg", color: "Бордо", hex: "#7a1020" },
      { img: "/images/sotuv-velyur-qizil.jpg", color: "Қизил (ёқали)", hex: "#b3191b" },
      { img: "/images/sotuv-velyur-qizil-2.jpg", color: "Қизил (ёқали)", hex: "#b3191b" },
      { img: "/images/sotuv-velyur-qizil-3.jpg", color: "Қизил (ёқали)", hex: "#b3191b" },
      { img: "/images/sotuv-velyur-jigarrang.jpg", color: "Жигарранг", hex: "#9a6224" },
      { img: "/images/sotuv-velyur-jigarrang-2.jpg", color: "Жигарранг", hex: "#9a6224" },
      { img: "/images/sotuv-velyur-kulrang.jpg", color: "Кулранг", hex: "#5d6577" },
      { img: "/images/sotuv-velyur-kulrang-2.jpg", color: "Кулранг", hex: "#5d6577" },
      { img: "/images/sotuv-velyur-kulrang-3.jpg", color: "Кулранг", hex: "#5d6577" },
      { img: "/images/sotuv-velyur-binafsha.jpg", color: "Бинафша", hex: "#7a2f6e" },
      { img: "/images/sotuv-velyur-binafsha-2.jpg", color: "Бинафша", hex: "#7a2f6e" },
      { img: "/images/sotuv-velyur-binafsha-3.jpg", color: "Бинафша", hex: "#7a2f6e" },
      { img: "/images/sotuv-velyur-qora.jpg", color: "Қора", hex: "#141414" },
    ],
  },
  {
    name: "Трикотаж тройка 🍂",
    badge: "Янгилик",
    price: "450 000 сўм",
    details: [
      ["Матоси", "Трикотаж"],
      ["Размер", "54, 56, 58, 60"],
      ["Ранги", "Қора, яшил, жигарранг"],
    ],
    photos: [
      { img: "/images/sotuv-trikotaj-qora.jpg", color: "Қора", hex: "#141414" },
      { img: "/images/sotuv-trikotaj-yashil.jpg", color: "Яшил", hex: "#0f4d33" },
      { img: "/images/sotuv-trikotaj-yashil-2.jpg", color: "Яшил", hex: "#0f4d33" },
      { img: "/images/sotuv-trikotaj-jigarrang.jpg", color: "Жигарранг", hex: "#4a1f1c" },
      { img: "/images/sotuv-trikotaj-jigarrang-2.jpg", color: "Жигарранг", hex: "#4a1f1c" },
      { img: "/images/sotuv-trikotaj-video.jpg", video: "/images/sotuv-trikotaj-video.mp4" },
    ],
  },
  {
    name: "Бешкек кўйлак 🍂",
    badge: "Янгилик",
    price: "320 000 сўм",
    details: [
      ["Размер", "50, 52, 54, 56"],
      ["Ранги", "Қора, жигарранг"],
      ["Кимга", "Катта размерлилар учун 💫"],
    ],
    photos: [
      { img: "/images/sotuv-kuylak-qora.jpg", color: "Қора", hex: "#141414" },
      { img: "/images/sotuv-kuylak-jigarrang.jpg", color: "Жигарранг", hex: "#4a2516" },
      { img: "/images/sotuv-kuylak-qora-2.jpg", color: "Қора", hex: "#141414" },
      { img: "/images/sotuv-kuylak-video.jpg", video: "/images/sotuv-kuylak-video.mp4" },
    ],
  },
  {
    name: "Қишки двойка",
    price: "350 000 сўм",
    details: [
      ["Матоси", "Начёс, қишки"],
      ["Размер", "44 дан 54 гача"],
      ["Ранги", "9 хил"],
      ["Кофта узунлиги", "77 см"],
      ["Шим узунлиги", "102 см"],
      ["Сифати", "Премиум 😍"],
    ],
    photos: [
      { img: "/images/sotuv-dvoyka-bordo.jpg", color: "Бордо", hex: "#7d1626" },
      { img: "/images/sotuv-dvoyka-shokolad.jpg", color: "Шоколад", hex: "#3d2418" },
      { img: "/images/sotuv-dvoyka-vishnya.jpg", color: "Тўқ вишня", hex: "#3b1517" },
      { img: "/images/sotuv-dvoyka-jigarrang.jpg", color: "Жигарранг", hex: "#6e3d22" },
      { img: "/images/sotuv-dvoyka-pushti.jpg", color: "Пушти", hex: "#ef9fb4" },
      { img: "/images/sotuv-dvoyka-grafit.jpg", color: "Тўқ кулранг", hex: "#45474d" },
      { img: "/images/sotuv-dvoyka-kok.jpg", color: "Кўк", hex: "#1f4fc9" },
      { img: "/images/sotuv-dvoyka-yashil.jpg", color: "Яшил", hex: "#0f5c3f" },
      { img: "/images/sotuv-dvoyka-kulrang.jpg", color: "Кулранг", hex: "#9a9ca3" },
    ],
  },
  {
    name: "Бешкек тройка 🍂",
    price: "460 000 сўм",
    details: [
      ["Матоси", "Плотный трикотажный джинса"],
      ["Размер", "48, 50, 52"],
    ],
    photos: [
      { img: "/images/sotuv-troyka-1.jpg" },
      { img: "/images/sotuv-troyka-2.jpg" },
      { img: "/images/sotuv-troyka-3.jpg" },
    ],
  },
];

function SaleItem({ p }) {
  const [i, setI] = useState(0);
  const cur = p.photos[i];
  // Har bir rang bir marta: rang doirachasi o'sha rangdagi birinchi rasmni ochadi.
  const colors = p.photos
    .map((ph, k) => ({ ...ph, k }))
    .filter((ph, idx, arr) => ph.color && arr.findIndex((x) => x.color === ph.color) === idx);

  return (
    <div className="product sale-item">
      <div className="product-img">
        {cur.video ? (
          <video key={cur.video} src={cur.video} poster={cur.img} controls autoPlay muted playsInline loop />
        ) : (
          <img src={cur.img} alt={cur.color ? `${p.name} — ${cur.color}` : p.name} loading="lazy" />
        )}
        {p.badge && <span className="sale-badge">{p.badge}</span>}
        {p.photos.length > 1 && (
          <span className="sale-count">{i + 1} / {p.photos.length}</span>
        )}
      </div>

      {p.photos.length > 1 && (
        <div className="sale-thumbs">
          {p.photos.map((ph, k) => (
            <button
              key={ph.img}
              type="button"
              className={`${k === i ? "active" : ""}${ph.video ? " is-video" : ""}`}
              onClick={() => setI(k)}
              aria-label={ph.video ? "Видео" : ph.color || `Расм ${k + 1}`}
            >
              <img src={ph.img} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      <div className="product-body">
        <h3>{p.name}</h3>

        {colors.length > 1 && (
          <div className="swatches">
            {colors.map((c) => (
              <button
                key={c.color}
                type="button"
                className={`swatch${cur.color === c.color ? " active" : ""}`}
                style={{ background: c.hex }}
                onClick={() => setI(c.k)}
                aria-label={c.color}
              />
            ))}
            <span className="swatch-name">{cur.video ? "Видео" : cur.color}</span>
          </div>
        )}

        <ul className="sale-details">
          {p.details.map(([k, v]) => (
            <li key={k}><span>{k}:</span> {v}</li>
          ))}
        </ul>

        <div className="product-foot">
          <span className="price">{p.price}</span>
          <a className="btn btn-small" href="#order">Буюртма бериш</a>
        </div>
      </div>
    </div>
  );
}

export default function OnSale() {
  if (ON_SALE.length === 0) {
    return (
      <p className="onsale-empty">
        Янги кийимлар тез орада шу ерда пайдо бўлади. Ҳозир бор кийимлар ҳақида сўраш учун
        буюртма қолдиринг ёки қўнғироқ қилинг: <a href="tel:+998998813089">+998 99 881 30 89</a>
      </p>
    );
  }

  return (
    <div className="products sale-grid">
      {ON_SALE.map((p) => (
        <SaleItem key={p.name} p={p} />
      ))}
    </div>
  );
}
