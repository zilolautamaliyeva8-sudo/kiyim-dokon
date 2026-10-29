"use client";

import { useState } from "react";

// Hozir sotuvda bor kiyimlar.
// Yangi kiyim qo'shish: rasmlarni public/images ga yuklang va ON_SALE ro'yxatiga yangi blok qo'shing.
// photos: har bir rasm; "color" yozilsa, rasm tagida rang nomi chiqadi.
const ON_SALE = [
  {
    name: "Қишки спорт костюм (кофта + шим)",
    price: "320 000 сўм",
    details: [
      ["Матоси", "Начёс, қишки"],
      ["Размер", "44 дан 54 гача"],
      ["Ранги", "4 хил"],
      ["Кофта узунлиги", "77 см"],
      ["Шим узунлиги", "102 см"],
      ["Сифати", "Премиум 😍"],
    ],
    photos: [
      { img: "/images/sotuv-kostyum-yashil.jpg", color: "Яшил", hex: "#0f5c3f" },
      { img: "/images/sotuv-kostyum-kulrang.jpg", color: "Кулранг", hex: "#45474d" },
      { img: "/images/sotuv-kostyum-jigarrang.jpg", color: "Жигарранг", hex: "#5a2e1c" },
      { img: "/images/sotuv-kostyum-qizil.jpg", color: "Тўқ қизил", hex: "#9b1b2a" },
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
  const hasColors = p.photos.some((ph) => ph.color);

  return (
    <div className="product sale-item">
      <div className="product-img">
        <img src={cur.img} alt={cur.color ? `${p.name} — ${cur.color}` : p.name} loading="lazy" />
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
              className={k === i ? "active" : undefined}
              onClick={() => setI(k)}
              aria-label={ph.color || `Расм ${k + 1}`}
            >
              <img src={ph.img} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      <div className="product-body">
        <h3>{p.name}</h3>

        {hasColors && (
          <div className="swatches">
            {p.photos.map((ph, k) => (
              <button
                key={ph.img}
                type="button"
                className={`swatch${k === i ? " active" : ""}`}
                style={{ background: ph.hex }}
                onClick={() => setI(k)}
                aria-label={ph.color}
              />
            ))}
            <span className="swatch-name">{cur.color}</span>
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
