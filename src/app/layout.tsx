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
  title: "MURTAZA.EXE — A Universe Made of Little Things",
  description: "An extraordinary, luxury interactive birthday experience celebrating Murtaza.",
  icons: {
    icon: "/favicon.ico",
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
