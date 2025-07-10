import './globals.css'
import { Providers } from './providers'
import React from 'react'
import NavBar from '../components/NavBar'

export const metadata = {
  title: 'LocalBox',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Providers>
          <NavBar />
          <main className="p-4 max-w-screen-sm mx-auto">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
