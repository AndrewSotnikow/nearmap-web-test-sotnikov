import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ground Truth',
  description: 'A CMS-driven blog page renderer'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
