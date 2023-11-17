import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/lib/components/theme-provider'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Groove',
  description: 'Listen to music!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey='groove-theme'
        >
          {children}
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
