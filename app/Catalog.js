// Sotilgan kiyimlar galereyasi — faqat rasmlar.
// crop: Instagram skrinshotidagi ortiqcha joylarni (yurakcha, yozuvlar) yashiradi.
const SOLD = [
  { img: "/images/8f33e621-image.jpg", crop: { w: 115.38, l: 0, t: -24.15 } },
  { img: "/images/057f4c45-image.jpg", crop: { w: 123.15, l: -5.36, t: -17.78 } },
  { img: "/images/d0395e1c-image.jpg", crop: { w: 126.46, l: -8.2, t: -18.27 } },
  { img: "/images/1337923b-image.jpg", crop: { w: 115.38, l: 0, t: -25 } },
  { img: "/images/f3f021ab-image.jpg", crop: { w: 126.46, l: -8.2, t: -19.2 } },
  { img: "/images/0b46472e-image.jpg", crop: { w: 118.42, l: -1.32, t: -25.64 } },
  { img: "/images/9730c96c-image.jpg", crop: { w: 131.87, l: -14.29, t: -20.03 } },
  { img: "/images/61b3238e-image.jpg", crop: { w: 135.68, l: -17.59, t: -29.4 } },
  { img: "/images/3400966a-image.jpg" },
  { img: "/images/864c9059-image.jpg" },
  { img: "/images/22009ff6-image.jpg" },
  { img: "/images/ba9d77fc-image.jpg" },
  { img: "/images/c287e815-image.jpg" },
];

export default function Catalog() {
  return (
    <div className="gallery">
      {SOLD.map((p) => (
        <div className="gallery-item" key={p.img}>
          <img
            src={p.img}
            alt="Сотилган кийим"
            loading="lazy"
            className={p.crop ? "cropped" : undefined}
            style={p.crop ? { width: `${p.crop.w}%`, left: `${p.crop.l}%`, top: `${p.crop.t}%` } : undefined}
          />
        </div>
      ))}
    </div>
  );
}
