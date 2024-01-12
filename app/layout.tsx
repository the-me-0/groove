import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/lib/components/providers/theme-provider'
import ModalProvider from "@/lib/components/providers/ModalProvider";
import React from "react";
import {Toaster} from "react-hot-toast";

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
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ModalProvider />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey='groove-theme'
        >
            <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
