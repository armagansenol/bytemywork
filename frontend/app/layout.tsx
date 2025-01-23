import { SmoothScroll } from "@/components/smooth-scroll"
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
        <SmoothScroll root={true} />
      </body>
    </html>
  )
}
