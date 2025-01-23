import { R3fScrollRig } from "@/components/r3f-scroll-rig"
import { StyleVariables } from "@/lib/style-variables"
import { Providers } from "@/providers"
import { colors, themes } from "@/styles/config.mjs"
import "@/styles/globals.css"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StyleVariables colors={colors} themes={themes} />
      </head>
      <body className={`${alexandria.variable} antialiased`}>
        <Providers>{children}</Providers>
        {/* <SmoothScroll root={true} /> */}
        <R3fScrollRig />
      </body>
    </html>
  )
}
