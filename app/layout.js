import "./globals.css";
import MetaPixel from "./MetaPixel";

export const metadata = {
  title: "Кийим дўкони — махсус таклиф",
  description: "Янги мавсум коллекцияси. Буюртма беринг — биз сизга қўнғироқ қиламиз.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
