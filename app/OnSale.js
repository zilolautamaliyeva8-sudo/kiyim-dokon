// Hozir sotuvda bor kiyimlar.
// Yangi kiyim qo'shish uchun: rasmni public/images ga yuklang va shu ro'yxatga bitta qator qo'shing:
//   { img: "/images/rasm-nomi.jpg", name: "Kiyim nomi", price: "270 000 сўм", sizes: "48, 50, 52, 54" },
const ON_SALE = [];

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
    <div className="products">
      {ON_SALE.map((p) => (
        <div className="product" key={p.img}>
          <div className="product-img">
            <img src={p.img} alt={p.name} loading="lazy" />
          </div>
          <div className="product-body">
            <h3>{p.name}</h3>
            {p.sizes && <p className="product-desc">Размер: {p.sizes}</p>}
            <div className="product-foot">
              <span className="price">{p.price}</span>
              <a className="btn btn-small" href="#order">Буюртма бериш</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
