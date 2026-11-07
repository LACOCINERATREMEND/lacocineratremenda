import type { Metadata, Viewport } from "next";
import {
  Alex_Brush,
  Archivo_Black,
  Bodoni_Moda,
  Noto_Sans_JP,
  Outfit,
} from "next/font/google";
import { LanguageProvider } from "@/components/language";
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

const heavy = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heavy-face",
});

const brush = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-brush-face",
});

const japanese = Noto_Sans_JP({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-jp",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "La Cocinera Tremenda",
    template: "%s · La Cocinera Tremenda",
  },
  description:
    "Gastrobar italiano de especialidad en Sevilla. Pasta fresca artesanal, focaccias, piadinas y menús.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
      className={`${outfit.variable} ${bodoni.variable} ${heavy.variable} ${brush.variable} ${japanese.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <div className="flex h-0.5 w-full" aria-hidden="true">
          <span className="flex-1 bg-italy-green" />
          <span className="flex-1 bg-[#f4efe6]" />
          <span className="flex-1 bg-italy-red" />
        </div>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
