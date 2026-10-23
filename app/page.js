import OrderForm from "./OrderForm";
import Catalog from "./Catalog";

const REVIEWS = [
  { img: "/images/a6046322-image.jpg", t: -17.1, ar: "1080 / 1439" },
  { img: "/images/d5ee6658-image.jpg", t: -15.56, ar: "1080 / 1620" },
  { img: "/images/4deb6d4e-image.jpg", t: -20.62, ar: "1080 / 1591" },
  { img: "/images/8bce06f7-image.jpg", t: -46.4, ar: "1080 / 959" },
  { img: "/images/78d1cd6f-image.jpg", t: -19.06, ar: "1080 / 1474" },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-inner">
          <h1>
            Янги мавсум <span className="accent">коллекцияси</span>
          </h1>
          <p className="lead">
            Сифатли матолар, замонавий дизайн ва қулай нархлар. Бутун Ўзбекистон бўйлаб
            етказиб бериш. Буюртма қолдиринг — менежеримиз 15 дақиқада қўнғироқ қилади.
          </p>
          <ul className="perks">
            <li>✅ EMU ва BTS почта орқали етказилади</li>
            <li>✅ Етиб боришига 100% кафолат берамиз</li>
          </ul>
          <a className="btn btn-light" href="#order">Буюртма бериш</a>
        </div>
      </section>

      <section className="section about" id="men-haqimda">
        <div className="container about-inner">
          <div className="about-photos">
            <img className="about-main" src="/images/85983a04-image.jpg" alt="Зилола" loading="lazy" />
            <img src="/images/dc902df3-image.jpg" alt="Зилола яшил костюмда" loading="lazy" />
            <img src="/images/cabfde62-image.jpg" alt="Зилола дўконда" loading="lazy" />
          </div>
          <div className="about-text">
            <p className="about-hi">Ассалому алайкум!</p>
            <h2>Мен — Зилола 🌸</h2>
            <p>
              Тошкент вилоятида яшайман ва бир йилдан бери аёллар кийими билан шуғулланаман.
              Бу иш — менинг севимли машғулотим.
            </p>
            <p>
              Ҳар бир мижозим ўзига ёқадиган, қулай ва чиройли кийим топиши учун ҳаракат
              қиламан. Сиз билан ўзим гаплашаман, ўлчам ва рангни бирга танлаймиз.
            </p>
            <ul className="about-stats">
              <li><b>1 йил</b><span>тажриба</span></li>
              <li><b>Бутун</b><span>Ўзбекистон бўйлаб етказиш</span></li>
            </ul>
            <a className="btn btn-primary btn-inline" href="#order">Буюртма бериш</a>
          </div>
        </div>
      </section>

      <section className="section" id="kiyimlar">
        <div className="container">
          <h2 className="section-title">Сотилган кийимлар</h2>
          <p className="section-sub">Мижозларимиз олиб кетган кийимлардан</p>
          <Catalog />
        </div>
      </section>

      <section className="section reviews" id="fikrlar">
        <div className="container">
          <h2 className="section-title">Мижозларимиз фикри 💬</h2>
          <div className="shots">
            {REVIEWS.map((r) => (
              <div className="shot" key={r.img} style={{ aspectRatio: r.ar }}>
                <img src={r.img} alt="Мижоз фикри" loading="lazy" style={{ top: `${r.t}%` }} />
              </div>
            ))}
          </div>
          <div className="cta-bottom">
            <a className="btn btn-primary btn-inline" href="#order">Мен ҳам буюртма бераман</a>
          </div>
        </div>
      </section>

      <section id="order" className="order order-bottom">
        <div className="container">
          <div className="card">
            <h2>Буюртма қолдиринг</h2>
            <OrderForm />
            <div className="seller">
              <span>Сотувчи: <b>Зилола</b></span>
              <a href="tel:+998998813089">📞 +998 99 881 30 89</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Zilola · Аёллар кийими · Сотувчи: Зилола
      </footer>
    </main>
  );
}
