import OrderForm from "./OrderForm";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-inner">
          <span className="badge">🔥 Фақат шу ҳафта</span>
          <h1>
            Янги мавсум коллекцияси
            <br />
            <span className="accent">-50% чегирма</span> билан!
          </h1>
          <p className="lead">
            Сифатли матолар, замонавий дизайн ва қулай нархлар. Бутун Ўзбекистон бўйлаб
            етказиб бериш. Буюртма қолдиринг — менежеримиз 15 дақиқада қўнғироқ қилади.
          </p>
          <ul className="perks">
            <li>✅ Бепул етказиб бериш</li>
            <li>✅ Кийиб кўриб тўлов</li>
            <li>✅ 14 кун ичида алмаштириш</li>
          </ul>
          <a href="#order" className="btn btn-light">
            Буюртма бериш ↓
          </a>
        </div>
      </section>

      <section id="order" className="order">
        <div className="container">
          <div className="card">
            <h2>Буюртма қолдиринг</h2>
            <p className="muted">Маълумотларингизни киритинг, биз сиз билан боғланамиз.</p>
            <OrderForm />
          </div>
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} Кийим дўкони</footer>
    </main>
  );
}
