"use client";

import { useState } from "react";

// Mahsulotlar ro'yxati. Narx qo'shish uchun: price: "160 000 сўм"
export const PRODUCTS = [
  {
    id: "kofta-pushti",
    name: "Кофта «Капалак»",
    desc: "Нозик гулли нақш, енгил мато. Узунлиги 70 см. Ўлчамлар: 48–54.",
    price: "180 000 сўм",
    colors: [{ name: "Пушти", hex: "#e11d74", img: "/images/8f33e621-image.jpg", crop: { w: 115.38, l: 0, t: -24.15 } }],
  },
  {
    id: "bishkek-kostyum",
    name: "Бишкек костюм (катта ўлчам)",
    desc: "Кенг шим + узун кофта. Ўлчамлар: 50 дан 60 гача.",
    price: null,
    colors: [{ name: "Нақшли", hex: "#7c3aed", img: "/images/057f4c45-image.jpg", crop: { w: 123.15, l: -5.36, t: -17.78 } }],
  },
  {
    id: "gulli-koylak",
    name: "Гулли кўйлак",
    desc: "ХБ матоси, қора фонда гуллар. Янгисидан келди.",
    price: "350 000 сўм",
    colors: [{ name: "Қора", hex: "#111827", img: "/images/d0395e1c-image.jpg", crop: { w: 126.46, l: -8.2, t: -18.27 } }],
  },
  {
    id: "shoyi-kofta",
    name: "Шойи кофта",
    desc: "Юмшоқ ва енгил шойи мато. Ўлчамлар: M дан 5XL гача.",
    price: "180 000 сўм",
    colors: [{ name: "Ҳаво ранг", hex: "#93c5fd", img: "/images/1337923b-image.jpg", crop: { w: 115.38, l: 0, t: -25 } }],
  },
  {
    id: "kashtali-kostyum",
    name: "Каштали костюм",
    desc: "Хитой матоси, юмшоқ. Тўлароқ аёлларга ҳам мос.",
    price: null,
    colors: [{ name: "Кулранг", hex: "#9ca3af", img: "/images/f3f021ab-image.jpg", crop: { w: 126.46, l: -8.2, t: -19.2 } }],
  },
  {
    id: "kofta-muslim",
    name: "Кофта «Зарифлик»",
    desc: "Муслим матоси, кашта тикилган. Узунлиги 80 см. Ўлчамлар: 48–54.",
    price: null,
    colors: [{ name: "Оқ", hex: "#f5f0e6", img: "/images/0b46472e-image.jpg", crop: { w: 118.42, l: -1.32, t: -25.64 } }],
  },
  {
    id: "nuqtali-kostyum",
    name: "Юлдузча костюм",
    desc: "Кенг шим + кўйлак-кофта. Ўлчамлар: 46, 48, 50, 52, ҳатто 54.",
    price: null,
    colors: [{ name: "Қора", hex: "#111827", img: "/images/9730c96c-image.jpg", crop: { w: 131.87, l: -14.29, t: -20.03 } }],
  },
  {
    id: "katta-koylak",
    name: "Катта ўлчамли кўйлак",
    desc: "Енгил ва нафис мато. Кундалик ва байрамга. Ўлчамлар: 62–68.",
    price: "280 000 сўм",
    colors: [{ name: "Қора", hex: "#111827", img: "/images/3c30e550-image.jpg", crop: { w: 119.47, l: 0, t: -24.98 } }],
  },
  {
    id: "shtapel-koylak",
    name: "Бишкек штапел кўйлак",
    desc: "Табиий штапел мато, ёрқин гуллар. Катта ўлчамлар ҳам бор.",
    price: "240 000 сўм",
    colors: [{ name: "Гулли", hex: "#1f2937", img: "/images/61b3238e-image.jpg", crop: { w: 135.68, l: -17.59, t: -29.4 } }],
  },
  {
    id: "baxmal",
    name: "Бахмал костюм «Қулупнай»",
    desc: "Юмшоқ бахмал, ёқасига кашта тикилган. Иссиқ ва чиройли.",
    price: null,
    colors: [
      { name: "Қизил", hex: "#c8102e", img: "/images/3400966a-image.jpg" },
      { name: "Тўқ қизил", hex: "#6d1a2b", img: "/images/3400966a-image.jpg" },
      { name: "Қора", hex: "#1f2937", img: "/images/3400966a-image.jpg" },
      { name: "Ғишт ранг", hex: "#c2410c", img: "/images/3400966a-image.jpg" },
      { name: "Феруза", hex: "#0f5e66", img: "/images/3400966a-image.jpg" },
    ],
  },
  {
    id: "bomber",
    name: "Бомбер костюм",
    desc: "Кенг шим + бомбер + футболка. Катта ўлчамларга ҳам бор.",
    price: null,
    colors: [
      { name: "Тўқ кўк", hex: "#1e2a4a", img: "/images/864c9059-image.jpg" },
      { name: "Яшил", hex: "#14532d", img: "/images/22009ff6-image.jpg" },
    ],
  },
  {
    id: "sport",
    name: "Спорт костюм",
    desc: "Белидан тортиладиган, кенг шимли. Қулай ва замонавий.",
    price: null,
    colors: [
      { name: "Қизил", hex: "#dc2626", img: "/images/ba9d77fc-image.jpg" },
      { name: "Зайтун", hex: "#7c8a2b", img: "/images/c287e815-image.jpg" },
    ],
  },
];

function pick(product, color) {
  const label = color && product.colors.length > 1 ? `${product.name} — ${color.name}` : product.name;
  window.dispatchEvent(new CustomEvent("pick-product", { detail: label }));
  document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ProductCard({ product }) {
  const [ci, setCi] = useState(0);
  const color = product.colors[ci];
  return (
    <article className="product">
      <div className="product-img">
        <img
          src={color.img}
          alt={`${product.name} — ${color.name}`}
          loading="lazy"
          className={color.crop ? "cropped" : undefined}
          style={
            color.crop
              ? { width: `${color.crop.w}%`, left: `${color.crop.l}%`, top: `${color.crop.t}%` }
              : undefined
          }
        />
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="product-desc">{product.desc}</p>
        {product.colors.length > 1 && (
          <div className="swatches" aria-label="Ранглар">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                type="button"
                className={"swatch" + (i === ci ? " active" : "")}
                style={{ background: c.hex }}
                title={c.name}
                aria-label={c.name}
                onClick={() => setCi(i)}
              />
            ))}
            <span className="swatch-name">{color.name}</span>
          </div>
        )}
        <div className="product-foot">
          <span className="price">{product.price || "Нархини сўранг"}</span>
          <button type="button" className="btn btn-small" onClick={() => pick(product, color)}>
            Буюртма бериш
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Catalog() {
  return (
    <div className="products">
      {PRODUCTS.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
