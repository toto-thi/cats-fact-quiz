import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cat Fact Quiz App',
  description: 'For Cat Lover:: You can learn more about fun fact about cats!!!',
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
