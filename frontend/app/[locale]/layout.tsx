import { R3fScrollRig } from "@/components/r3f-scroll-rig"
import { StyleVariables } from "@/lib/style-variables"
import { Providers } from "@/providers"
import { colors, themes } from "@/styles/config.mjs"
import "@/styles/globals.css"

import { Analytics } from "@vercel/analytics/react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { ViewTransitions } from "next-view-transitions"

import type { Metadata } from "next"
import { Alexandria } from "next/font/google"

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Byte My Work",
  description:
    "WE COMBINE STRATEGY AND CREATIVITY WITH THE POWER OF TECHNOLOGY TO OFFER SOLUTIONS THAT ADAPT TO EVERY PLATFORM IN THE DIGITAL SPACE.",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = await getMessages()

  return (
    <ViewTransitions>
      <html lang={locale}>
        <head>
          <StyleVariables colors={colors} themes={themes} />
        </head>
        <body className={`${alexandria.variable} with-bg`}>
          <Providers>
            <NextIntlClientProvider messages={messages}>
              <R3fScrollRig>{children}</R3fScrollRig>
            </NextIntlClientProvider>
          </Providers>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  )
}
