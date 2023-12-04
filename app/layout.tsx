import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/lib/components/providers/theme-provider'
import { dark } from '@clerk/themes';
import ModalProvider from "@/lib/components/providers/ModalProvider";

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
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html lang="en">
        <body className={font.className}>
          <ModalProvider />
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
