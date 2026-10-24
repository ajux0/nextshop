import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";

export const metadata = {
  title: {
    default: "NextShop | Product catalog built with Next.js",
    template: "%s | NextShop",
  },
  description:
    "NextShop is a fast, SEO-friendly product catalog built with the Next.js App Router, server components, dynamic routes, and a cart.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main className="container main">{children}</main>
          <footer className="footer">
            <div className="container">
              Built by Muhammed Ajmal M with Next.js, React, and the DummyJSON API.
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
