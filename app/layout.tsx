import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/lib/components/providers/theme-provider'
import { dark } from '@clerk/themes';
import ModalProvider from "@/lib/components/providers/ModalProvider";
import UserProvider from "@/lib/components/providers/UserProvider";
import React from "react";

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
    <html lang="en">
      <body className={font.className}>
        <ClerkProvider
            appearance={{
              baseTheme: dark
            }}
        >
          <UserProvider>
            <ModalProvider />
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              storageKey='groove-theme'
            >
              {children}
            </ThemeProvider>
          </UserProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
