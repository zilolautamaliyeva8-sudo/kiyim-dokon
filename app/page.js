import OrderForm from "./OrderForm";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-inner">
          <span className="badge">🔥 Фақат шу ҳафта</span>
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

      <footer className="footer">
        © {new Date().getFullYear()} Кийим дўкони · Сотувчи: Зилола
      </footer>
    </main>
  );
}
