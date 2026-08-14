import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Links | Mozilla Campus Club of SLIIT",
  description: "Mozilla Campus Club of SLIIT Links Portal",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
