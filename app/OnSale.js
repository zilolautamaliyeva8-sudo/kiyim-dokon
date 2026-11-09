"use client";

import { useState } from "react";

// Hozir sotuvda bor kiyimlar.
// Yangi kiyim qo'shish: rasmlarni public/images ga yuklang va ON_SALE ro'yxatiga yangi blok qo'shing.
// photos: har bir rasm; "color" yozilsa, rasm tagida rang nomi chiqadi.
const ON_SALE = [
  {
    name: "Пўхор ёқали куртка ❄️",
    badge: "Қишки",
    details: [
      ["Капюшони", "Катта пўхор ёқали"],
      ["Мавсум", "Қиш, иссиқ"],
    ],
    photos: [
      { img: "/images/sotuv-kurtka-01_kurtka_jigarrang.jpg", color: "Жигарранг", hex: "#4a2e1e" },
    ],
  },
  {
    name: "Узун пальто — пўхор ёқали ❄️",
    badge: "Қишки",
    details: [
      ["Размер", "L дан 4XL гача"],
      ["Хусусияти", "Енги ечиладиган, белбоғли"],
      ["Ранги", "5 хил"],
    ],
    photos: [
      { img: "/images/sotuv-kurtka-04_palto_6673_1.jpg", color: "Кофе", hex: "#8a6f5c" },
      { img: "/images/sotuv-kurtka-05_palto_6673_2.jpg", color: "Крем", hex: "#e9e2d6" },
      { img: "/images/sotuv-kurtka-06_palto_6673_3.jpg", color: "Тўқ жигарранг", hex: "#5a4630" },
      { img: "/images/sotuv-kurtka-07_palto_6673_4.jpg", color: "Хаки", hex: "#cdbfb4" },
      { img: "/images/sotuv-kurtka-08_palto_6673_5.jpg", color: "Қора", hex: "#1c1c1c" },
    ],
  },
  {
    name: "Пўхор капюшонли пальто ❄️",
    badge: "Қишки",
    details: [
      ["Размер", "XL дан 5XL гача"],
      ["Хусусияти", "Енги ечиладиган"],
      ["Ранги", "5 хил"],
    ],
    photos: [
      { img: "/images/sotuv-kurtka-09_palto_7521_1.jpg", color: "Кофе", hex: "#6e4e3a" },
      { img: "/images/sotuv-kurtka-10_palto_7521_2.jpg", color: "Оқ", hex: "#ece8e0" },
      { img: "/images/sotuv-kurtka-11_palto_7521_3.jpg", color: "Хаки", hex: "#cdb89c" },
      { img: "/images/sotuv-kurtka-12_palto_7521_4.jpg", color: "Тўқ хаки", hex: "#8a6c55" },
      { img: "/images/sotuv-kurtka-13_palto_7521_5.jpg", color: "Қора", hex: "#1a1a22" },
      { img: "/images/sotuv-kurtka-14_palto_7521_6.jpg" },
    ],
  },
  {
    name: "Калта куртка — пўхор капюшонли ❄️",
    badge: "Қишки",
    details: [
      ["Хусусияти", "Енги ва капюшони ечилади"],
      ["Бели", "Ип билан тортилади"],
      ["Ранги", "5 хил"],
    ],
    photos: [
      { img: "/images/sotuv-kurtka-15_kurtka_2836_1.jpg", color: "Хантал", hex: "#9a7448" },
      { img: "/images/sotuv-kurtka-16_kurtka_2836_2.jpg", color: "Оқ", hex: "#ece9e4" },
      { img: "/images/sotuv-kurtka-17_kurtka_2836_3.jpg", color: "Хаки", hex: "#7d7a52" },
      { img: "/images/sotuv-kurtka-18_kurtka_2836_4.jpg", color: "Қора", hex: "#161616" },
      { img: "/images/sotuv-kurtka-19_kurtka_2836_5.jpg", color: "Беж", hex: "#d8c3ad" },
      { img: "/images/sotuv-kurtka-20_kurtka_2836_6.jpg" },
    ],
  },
  {
    name: "Абая — тўй ва байрамлар учун ✨",
    badge: "Янгилик",
    price: "950 000 сўм",
    details: [
      ["Ишлаб чиқарилган", "Хитой, фабрика маҳсулоти"],
      ["Безаги", "Сваровски услубидаги тошлар"],
      ["Размер", "48 дан 60 гача (стандарт)"],
      ["Бичими", "Кенг, ҳар қандай қоматга мос"],
      ["Моделлар", "8 хил"],
    ],
    photos: [
      { img: "/images/sotuv-abaya-oq-model.jpg", color: "Оқ (пат енгли)", hex: "#ece8e0" },
      { img: "/images/sotuv-abaya-oq.jpg", color: "Оқ (пат енгли)", hex: "#ece8e0" },
      { img: "/images/sotuv-abaya-oq-video.jpg", video: "/images/sotuv-abaya-oq-video.mp4", color: "Оқ (пат енгли)", hex: "#ece8e0" },
      { img: "/images/sotuv-abaya-qora.jpg", color: "Қора (гулли, пат енгли)", hex: "#141414" },
      { img: "/images/sotuv-abaya-qora-video.jpg", video: "/images/sotuv-abaya-qora-video.mp4", color: "Қора (гулли, пат енгли)", hex: "#141414" },
      { img: "/images/sotuv-abaya-bej.jpg", color: "Беж (жигарранг пат енгли)", hex: "#d9c3a0" },
      { img: "/images/sotuv-abaya-bej-video.jpg", video: "/images/sotuv-abaya-bej-video.mp4", color: "Беж (жигарранг пат енгли)", hex: "#d9c3a0" },
      { img: "/images/sotuv-abaya-havorang.jpg", color: "Ҳаворанг", hex: "#9fb0b0" },
      { img: "/images/sotuv-abaya-havorang-video.jpg", video: "/images/sotuv-abaya-havorang-video.mp4", color: "Ҳаворанг", hex: "#9fb0b0" },
      { img: "/images/sotuv-abaya-qoratilla.jpg", color: "Қора-тилла", hex: "#b8913a" },
      { img: "/images/sotuv-abaya-qoratilla-video.jpg", video: "/images/sotuv-abaya-qoratilla-video.mp4", color: "Қора-тилла", hex: "#b8913a" },
      { img: "/images/sotuv-abaya-oqtilla.jpg", color: "Оқ (қора-тилла гулли)", hex: "#f2ece0" },
      { img: "/images/sotuv-abaya-oqtilla-video.jpg", video: "/images/sotuv-abaya-oqtilla-video.mp4", color: "Оқ (қора-тилла гулли)", hex: "#f2ece0" },
      { img: "/images/sotuv-abaya-tilla.jpg", color: "Тилла (ялтироқ)", hex: "#cfae6b" },
      { img: "/images/sotuv-abaya-tilla-video.jpg", video: "/images/sotuv-abaya-tilla-video.mp4", color: "Тилла (ялтироқ)", hex: "#cfae6b" },
      { img: "/images/sotuv-abaya-krem.jpg", color: "Крем (жигарранг гулли)", hex: "#e8dcc4" },
      { img: "/images/sotuv-abaya-krem-video.jpg", video: "/images/sotuv-abaya-krem-video.mp4", color: "Крем (жигарранг гулли)", hex: "#e8dcc4" },
    ],
  },
  {
    name: "Флис двойка — капюшонли ❄️",
    badge: "Янги коллекция",
    price: "Нархини сўранг",
    details: [
      ["Матоси", "Флис, иссиқ ва юмшоқ"],
      ["Размер", "Стандарт (46 дан 54 гача)"],
      ["Ранги", "7 хил + аралаш"],
      ["Шими", "Кенг, ёнида ипли"],
    ],
    photos: [
      { img: "/images/sotuv-flis-kap-qizil.jpg", color: "Қизил", hex: "#c8141e" },
      { img: "/images/sotuv-flis-kap-oq.jpg", color: "Оқ", hex: "#ece8de" },
      { img: "/images/sotuv-flis-kap-pushti.jpg", color: "Пушти", hex: "#ec6fa3" },
      { img: "/images/sotuv-flis-kap-qora.jpg", color: "Қора", hex: "#1a1a1a" },
      { img: "/images/sotuv-flis-kap-bordo.jpg", color: "Бордо", hex: "#7a1328" },
      { img: "/images/sotuv-flis-kap-xaki.jpg", color: "Хаки", hex: "#7a6e5e" },
      { img: "/images/sotuv-flis-kap-kulrang.jpg", color: "Кулранг", hex: "#5b6063" },
      { img: "/images/sotuv-flis-kap-qizil-kulrang.jpg", color: "Қизил + кулранг шим", hex: "#a8323a" },
      { img: "/images/sotuv-flis-kap-pushti-kulrang.jpg", color: "Пушти + кулранг шим", hex: "#d98fae" },
      { img: "/images/sotuv-flis-video.jpg", video: "/images/sotuv-flis-video.mp4" },
    ],
  },
  {
    name: "Флис двойка — замокли ❄️",
    badge: "Янги коллекция",
    price: "Нархини сўранг",
    details: [
      ["Матоси", "Флис, иссиқ ва юмшоқ"],
      ["Размер", "Стандарт (46 дан 54 гача)"],
      ["Ранги", "8 хил"],
      ["Бичими", "Замокли, енги ва шимида йўл"],
    ],
    photos: [
      { img: "/images/sotuv-flis-zam-binafsha.jpg", color: "Бинафша", hex: "#8b62c9" },
      { img: "/images/sotuv-flis-zam-yashil.jpg", color: "Яшил", hex: "#1f5e3f" },
      { img: "/images/sotuv-flis-zam-xaki.jpg", color: "Хаки", hex: "#3d3b33" },
      { img: "/images/sotuv-flis-zam-pushti.jpg", color: "Пушти", hex: "#ec6f9c" },
      { img: "/images/sotuv-flis-zam-qora.jpg", color: "Қора", hex: "#141414" },
      { img: "/images/sotuv-flis-zam-bordo.jpg", color: "Бордо", hex: "#701626" },
      { img: "/images/sotuv-flis-zam-tuqkok.jpg", color: "Тўқ кўк", hex: "#1c2c5c" },
      { img: "/images/sotuv-flis-zam-jigarrang.jpg", color: "Жигарранг", hex: "#a2692a" },
      { img: "/images/sotuv-flis-video.jpg", video: "/images/sotuv-flis-video.mp4" },
    ],
  },
  {
    name: "Тренч палто — кузги-қишки 🍂",
    badge: "Янгилик",
    price: "Нархини сўранг",
    details: [
      ["Узунлиги", "110 см"],
      ["Размер", "44 дан 54 гача"],
      ["Ранги", "8 хил"],
      ["Бичими", "Икки қатор тугмали, белбоғли"],
    ],
    photos: [
      { img: "/images/sotuv-trench-ranglar.jpg" },
      { img: "/images/sotuv-trench-shokolad.jpg", color: "Шоколад", hex: "#4a2a1c" },
      { img: "/images/sotuv-trench-tuqkok.jpg", color: "Тўқ кўк", hex: "#1f2a44" },
      { img: "/images/sotuv-trench-bej.jpg", color: "Беж", hex: "#e3d6c4" },
      { img: "/images/sotuv-trench-bordo.jpg", color: "Бордо", hex: "#7a1a20" },
      { img: "/images/sotuv-trench-jigarrang.jpg", color: "Жигарранг", hex: "#8a5028" },
      { img: "/images/sotuv-trench-video3.jpg", video: "/images/sotuv-trench-video3.mp4" },
      { img: "/images/sotuv-trench-video4.jpg", video: "/images/sotuv-trench-video4.mp4" },
    ],
  },
  {
    name: "Палто — чарм ёқали 🍂",
    badge: "Янгилик",
    price: "Нархини сўранг",
    details: [
      ["Безаги", "Ёқаси, чўнтаги ва енги чарм"],
      ["Ранги", "7 хил"],
      ["Бичими", "Узун, икки қатор тугмали"],
    ],
    photos: [
      { img: "/images/sotuv-charm-palto-ranglar.jpg" },
      { img: "/images/sotuv-charm-palto-video1.jpg", video: "/images/sotuv-charm-palto-video1.mp4" },
      { img: "/images/sotuv-charm-palto-video2.jpg", video: "/images/sotuv-charm-palto-video2.mp4" },
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
    name: "Қишки двойка — ярим замокли",
    badge: "Янгилик",
    price: "350 000 сўм",
    details: [
      ["Матоси", "Начёс, қишки"],
      ["Размер", "44 дан 54 гача"],
      ["Ранги", "6 хил"],
      ["Кофта узунлиги", "77 см"],
      ["Шим узунлиги", "102 см"],
      ["Сифати", "Премиум 😍"],
    ],
    photos: [
      { img: "/images/sotuv-zamok-grafit.jpg", color: "Тўқ кулранг", hex: "#4a4b4f" },
      { img: "/images/sotuv-zamok-kulrang.jpg", color: "Кулранг", hex: "#9a9ca3" },
      { img: "/images/sotuv-zamok-kok.jpg", color: "Кўк", hex: "#2f5fc4" },
      { img: "/images/sotuv-zamok-bordo.jpg", color: "Бордо", hex: "#8a1a2b" },
      { img: "/images/sotuv-zamok-jigarrang.jpg", color: "Жигарранг", hex: "#a8692e" },
      { img: "/images/sotuv-zamok-yashil.jpg", color: "Яшил", hex: "#0f5c3f" },
    ],
  },
  {
    name: "Қишки двойка — капюшонли",
    badge: "Янгилик",
    price: "350 000 сўм",
    details: [
      ["Матоси", "Начёс, қишки"],
      ["Размер", "44 дан 54 гача"],
      ["Ранги", "8 хил"],
      ["Кофта узунлиги", "77 см"],
      ["Шим узунлиги", "102 см"],
      ["Сифати", "Премиум 😍"],
    ],
    photos: [
      { img: "/images/sotuv-kapyushon-qora.jpg", color: "Қора", hex: "#141414" },
      { img: "/images/sotuv-kapyushon-grafit.jpg", color: "Тўқ кулранг", hex: "#3a3b3f" },
      { img: "/images/sotuv-kapyushon-grafit-2.jpg", color: "Тўқ кулранг", hex: "#3a3b3f" },
      { img: "/images/sotuv-kapyushon-tuqkok.jpg", color: "Тўқ кўк", hex: "#1f2f5c" },
      { img: "/images/sotuv-kapyushon-jigarrang.jpg", color: "Жигарранг", hex: "#5a3220" },
      { img: "/images/sotuv-kapyushon-jigarrang-2.jpg", color: "Жигарранг", hex: "#5a3220" },
      { img: "/images/sotuv-kapyushon-bordo.jpg", color: "Бордо", hex: "#7a1626" },
      { img: "/images/sotuv-kapyushon-bordo-2.jpg", color: "Бордо", hex: "#7a1626" },
      { img: "/images/sotuv-kapyushon-kulrang.jpg", color: "Кулранг", hex: "#5d6170" },
      { img: "/images/sotuv-kapyushon-kulrang-2.jpg", color: "Кулранг", hex: "#5d6170" },
      { img: "/images/sotuv-kapyushon-ochkulrang.jpg", color: "Оч кулранг", hex: "#a3a5aa" },
      { img: "/images/sotuv-kapyushon-ochkulrang-2.jpg", color: "Оч кулранг", hex: "#a3a5aa" },
      { img: "/images/sotuv-kapyushon-kok.jpg", color: "Кўк", hex: "#3550b5" },
      { img: "/images/sotuv-kapyushon-kok-2.jpg", color: "Кўк", hex: "#3550b5" },
    ],
  },
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
          {p.price ? <span className="price">{p.price}</span> : <span />}
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
