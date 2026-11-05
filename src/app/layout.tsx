import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
});

export const metadata: Metadata = {
  title: {
    default: "La Cocinera Tremenda",
    template: "%s · La Cocinera Tremenda",
  },
  description:
    "Gastrobar italiano de especialidad en Sevilla. Pasta fresca artesanal, focaccias, piadinas y menús.",
  icons: { icon: "/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${bodoni.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <div className="flex h-0.5 w-full" aria-hidden="true">
          <span className="flex-1 bg-italy-green" />
          <span className="flex-1 bg-[#f4efe6]" />
          <span className="flex-1 bg-italy-red" />
        </div>
        {children}
      </body>
    </html>
  );
}
