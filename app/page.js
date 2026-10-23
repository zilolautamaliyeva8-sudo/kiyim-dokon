import OrderForm from "./OrderForm";
import Catalog from "./Catalog";

const REVIEWS = [
  {
    text: "Ассалому алайкум, хайрли кун! Заказларимни олдим, раҳмат, жуда ёқди, зўр экан. Доставка учун алоҳида раҳмат. Соғ бўлинг, ишингизга омад, барака берсин!",
    who: "Мижоз",
  },
  {
    text: "Спасибо за халат. Олдим. Катта раҳмат, зўр экан!",
    who: "Мижоз, Нукус",
  },
  {
    text: "Апа, бунча чиройли кўйлакларингиз бор! Бугунги халатнинг ранги ҳам, ўзи ҳам жуда ёқди.",
    who: "Доимий мижоз",
  },
  {
    text: "Сизга подписка қилдим. Зўр экан нарсаларингиз, баракасини берсин илоҳим!",
    who: "Мижоз",
  },
  {
    text: "Олдим, асалим! Жуда чиройли, ёқди. Аллоҳ ишларингизга барака берсин 🤲",
    who: "Мижоз",
  },
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
        </div>
      </section>

      <section id="order" className="order">
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

      <section className="section" id="kiyimlar">
        <div className="container">
          <h2 className="section-title">Бизнинг кийимлар</h2>
          <p className="section-sub">Ёққанини танланг — «Буюртма бериш»ни босинг, биз қўнғироқ қиламиз</p>
          <Catalog />

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
              <li><b>2 800+</b><span>Instagram обуначилар</span></li>
              <li><b>Бутун</b><span>Ўзбекистон бўйлаб етказиш</span></li>
            </ul>
            <a className="btn btn-primary btn-inline" href="#order">Буюртма бериш</a>
          </div>
        </div>
      </section>

      <section className="section reviews" id="fikrlar">
        <div className="container">
          <h2 className="section-title">Мижозларимиз фикри 💬</h2>
          <div className="review-list">
            {REVIEWS.map((r, i) => (
              <blockquote className="review" key={i}>
                <div className="stars">★★★★★</div>
                <p>«{r.text}»</p>
                <cite>— {r.who}</cite>
              </blockquote>
            ))}
          </div>
          <div className="cta-bottom">
            <a className="btn btn-primary btn-inline" href="#order">Мен ҳам буюртма бераман</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Zilola · Аёллар кийими · Сотувчи: Зилола
      </footer>
    </main>
  );
}
