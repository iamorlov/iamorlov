import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ClientBackground from "@/components/ClientBackground";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "iamorlov",
  description: "Vadym Orlov | Official web site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <ClientBackground />
        {children}
      </body>
    </html>
  );
}
