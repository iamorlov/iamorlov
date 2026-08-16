import type { Metadata, Viewport } from "next";
import { Gabarito } from "next/font/google";
import "./globals.scss";
import ClientBackground from "@/components/ClientBackground";

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
  themeColor: "#403D88",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gabarito.variable} antialiased`}>
        <ClientBackground />
        {children}
      </body>
    </html>
  );
}
