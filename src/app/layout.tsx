import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#080810",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "MURTAZA.EXE 🤍 Happy Birthday",
  description: "A little universe made of the things that make you, you. Happy Birthday, Mr. Kazmi! ✨",
  applicationName: "MURTAZA.EXE",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "MURTAZA.EXE 🤍 Happy Birthday",
    description: "A little universe made of the things that make you, you. Happy Birthday, Mr. Kazmi! ✨",
    type: "website",
    siteName: "MURTAZA.EXE",
  },
  twitter: {
    card: "summary_large_image",
    title: "MURTAZA.EXE 🤍 Happy Birthday",
    description: "A little universe made of the things that make you, you. Happy Birthday, Mr. Kazmi! ✨",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} bg-[#080810] text-[#F7F2EA]`}>
      <body className="min-h-screen bg-[#080810] text-[#F7F2EA] antialiased overflow-x-hidden selection:bg-[#8B5CF6]/30 selection:text-[#E8C88A]">
        {children}
      </body>
    </html>
  );
}
