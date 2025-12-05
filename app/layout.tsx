import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { inter, rubik } from "@/styles/fonts"
import { LanguageProvider } from "@/contexts/LanguageContext"

export const metadata: Metadata = {
  title: "Dream Rent - Аренда квартир, машин, мопедов и прочего в Казахстане",
  description:
    "Платформа для аренды квартир, машин, мопедов, электробайков, эндуро и снегоходов по всему Казахстану. Простое бронирование и надежные партнеры.",
  generator: "Dream Rent",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/tr-favicon.svg", type: "image/svg+xml" },
      { url: "/tr-favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/tr-favicon.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${rubik.variable}`}>
      <body className="font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
