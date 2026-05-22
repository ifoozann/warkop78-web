import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'

/* ─── Font ──────────────────────────────────────────────────────────────
   Manrope: variable-weight humanist sans — warm, confident, premium.
   Used as the substitute for the proprietary SoDoSans per design system.
─────────────────────────────────────────────────────────────────────── */
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  preload: true,
})

/* ─── Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: 'Warkop 78s — Modern Kopi & Community Hub',
    template: '%s | Warkop 78s',
  },
  description:
    'Tempat ketiga kamu — di jantung Cikampek, Karawang. Kopi premium, live music (Beat Corner), nobar, dan pop market. Warkop 78s: komunitas hangat, kopi yang bagus.',
  keywords: [
    'kopi', 'coffee shop', 'warkop', 'komunitas', 'nobar', 'live music',
    'pop market', 'Cikampek', 'Karawang', 'Jawa Barat', 'kopi Cikampek', 'Warkop 78s',
  ],
  authors: [{ name: 'Warkop 78s', url: 'https://warkop78s.id' }],
  creator: 'Warkop 78s',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://warkop78s.id',
    siteName: 'Warkop 78s',
    title: 'Warkop 78s — Modern Kopi & Community Hub',
    description: 'Tempat ketiga kamu. Kopi yang bagus, komunitas yang hangat.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Warkop 78s — Modern Kopi & Community Hub',
    description: 'Tempat ketiga kamu. Kopi yang bagus, komunitas yang hangat.',
    creator: '@warkop78s',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#1E3932',
  width: 'device-width',
  initialScale: 1,
}

/* ─── Root Layout ───────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${manrope.variable}`}>
      <body
        className="antialiased"
        /**
         * Design system rule: Page background MUST be Neutral Warm (#f2f0eb).
         * Never pure white. Applied as inline style to guarantee override.
         */
        style={{
          backgroundColor: '#f2f0eb',
          color: 'rgba(0, 0, 0, 0.87)',
          fontFamily: 'var(--font-manrope), Manrope, sans-serif',
          letterSpacing: '-0.01em',
        }}
      >
        {children}
      </body>
    </html>
  )
}