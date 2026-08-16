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
  metadataBase: new URL("https://iamorlov.com"),
  title: "Vadym Orlov",
  description: "Vadym Orlov. Software Engineer and Game Developer.",
  openGraph: {
    title: "Vadym Orlov",
    description: "Software Engineer and Game Developer.",
    url: "https://iamorlov.com",
    siteName: "Vadym Orlov",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vadym Orlov",
    description: "Software Engineer and Game Developer.",
  },
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
