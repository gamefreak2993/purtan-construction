import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LocalBusinessJsonLd } from "@/components/shared/json-ld";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Purtan Construction",
    default: "Purtan Construction — Quality Building Services",
  },
  description:
    "Professional construction services by Daniel Ovidiu Purtan. Renovations, new builds, and remodeling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <LocalBusinessJsonLd />
        {children}
      </body>
    </html>
  );
}
