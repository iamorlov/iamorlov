import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.scss";
import Atmosphere from "@/components/Atmosphere";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "Vadym Orlov",
  description: "Vadym Orlov. Software Engineer and Game Developer.",
};

export const viewport: Viewport = {
  themeColor: "#171310",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} antialiased`}>
        <Atmosphere />
        {children}
      </body>
    </html>
  );
}
