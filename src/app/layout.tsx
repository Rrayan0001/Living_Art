import type { Metadata } from "next";
import { DM_Serif_Display, Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-condensed",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LA Architects — Architecture, Interiors & Turnkey Construction, Bangalore",
  description: "28 years of considered architecture in Bangalore. 550+ projects delivering quality of life through design.",
  authors: [{ name: "LA Architects" }],
  icons: {
    icon: "/assets/branding/favicon.png",
    shortcut: "/assets/branding/favicon.png",
    apple: "/assets/branding/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSerifDisplay.variable} ${barlowCondensed.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
