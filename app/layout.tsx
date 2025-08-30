import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://showrunner.example.com'),
  title: {
    default: 'ShowRunner — AI Event Operator',
    template: '%s • ShowRunner'
  },
  description: 'Plan the show. Run the night. ShowRunner automates announcements, playlists, and timing so your event feels effortless.',
  openGraph: {
    type: 'website',
    title: 'ShowRunner — AI Event Operator',
    description: 'Plan the show. Run the night.',
    images: ['/og.png'],
    url: 'https://showrunner.example.com'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShowRunner — AI Event Operator',
    description: 'Plan the show. Run the night.',
    images: ['/og.png']
  },
  icons: { icon: '/sr-monogram.svg' }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
