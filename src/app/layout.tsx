import type { Metadata, Viewport } from "next";
import { Gabarito } from "next/font/google";
import "./globals.scss";
import Atmosphere from "@/components/Atmosphere";

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vadym Orlov",
  description: "Vadym Orlov. Software Engineer and Game Developer.",
};

export const viewport: Viewport = {
  themeColor: "#0f1013",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gabarito.variable} antialiased`}>
        <Atmosphere />
        {children}
      </body>
    </html>
  );
}
