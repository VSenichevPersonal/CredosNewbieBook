import type React from "react"
import type { Metadata } from "next"
import { PT_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const ptSans = PT_Sans({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-pt-sans",
})

export const metadata: Metadata = {
  title: "Книга новичка | КРЕДО-С",
  description: "Добро пожаловать в команду КРЕДО-С! Все, что нужно знать новому сотруднику.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${ptSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
