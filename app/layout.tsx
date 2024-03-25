import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/lib/components/providers/theme-provider'
import ModalProvider from "@/lib/components/providers/ModalProvider";
import React from "react";
import {Toaster} from "react-hot-toast";
import {Player} from '@/lib/components/player/Player';
import {isProfiled} from '@/lib/isProfiled';

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Groove',
  description: 'Listen to music!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const hideLikeButton = !(await isProfiled());

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
        <Player hideLikeButton={hideLikeButton} />
      </body>
    </html>
  )
}
