import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.scss";
import ClientBackground from "@/components/ClientBackground";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "500", "700", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Vadym Orlov",
  description: "Vadym Orlov | Official web site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${outfit.variable} antialiased`}>
        <ClientBackground />
        {children}
      </body>
    </html>
  );
}
