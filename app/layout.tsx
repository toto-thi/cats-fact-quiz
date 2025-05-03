import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cat Fact Quiz App',
  description: 'Fun fact about cats!!!',
  generator: 'Thinakone',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
