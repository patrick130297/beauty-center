import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { I18nProvider } from "@/i18n/I18nProvider";
import { LanguageSelector } from "@/components/LanguageSelector";
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
  title: "Booking System - Beauty Centers",
  description: "Multi-tenant booking system for beauty centers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <div className="absolute top-4 right-4 z-10">
            <LanguageSelector />
          </div>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
