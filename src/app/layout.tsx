import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.scss";
import Atmosphere from "@/components/Atmosphere";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vadym Orlov",
  description: "Vadym Orlov. Software Engineer and Game Developer.",
};

export const viewport: Viewport = {
  themeColor: "#121419",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} antialiased`}>
        <Atmosphere />
        {children}
      </body>
    </html>
  );
}
