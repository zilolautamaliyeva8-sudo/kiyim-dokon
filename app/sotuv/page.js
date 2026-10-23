import { decryptLead } from "../leadToken";
import SotuvForm from "./SotuvForm";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Сотувни тасдиқлаш",
  robots: { index: false, follow: false },
};

const maskPhone = (p) => {
  const d = String(p || "").replace(/\D/g, "");
  if (d.length < 7) return p;
  return `+${d.slice(0, 5)} *** ** ${d.slice(-2)}`;
};

export default async function SotuvPage({ searchParams }) {
  const params = await searchParams;
  const d = typeof params?.d === "string" ? params.d : "";
  const lead = decryptLead(d);

  if (!lead) {
    return (
      <main className="sotuv">
        <div className="card">
          <h2>Ҳавола нотўғри</h2>
          <p className="muted">
            Бу ҳавола бузилган ёки эскирган. Telegram'даги буюртма хабаридаги тугмани қайта босинг.
          </p>
        </div>
      </main>
    );
  }

  const date = lead.t
    ? new Date(lead.t).toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" })
    : "";

  return (
    <main className="sotuv">
      <div className="card">
        <p className="sotuv-tag">🧾 Ариза</p>
        <h2 className="sotuv-id">{lead.l || "Лид"}</h2>
        <p className="muted">
          {lead.n} · {maskPhone(lead.p)}
          {date ? ` · ${date}` : ""}
        </p>

        <div className="sotuv-info">
          <b>Метага кетадиган маълумотлар (шифрланган ҳолда):</b>
          <ul>
            <li>✓ Телефон рақам</li>
            <li>✓ Исм</li>
            <li>✓ Давлат (UZ)</li>
            <li>{lead.fbp ? "✓" : "–"} _fbp cookie</li>
            <li>{lead.fbc ? "✓" : "–"} _fbc (рекламадан келган)</li>
            <li>{lead.ip ? "✓" : "–"} IP ва браузер</li>
          </ul>
        </div>

        <SotuvForm d={d} />
      </div>
    </main>
  );
}
