import './globals.css'
import { Providers } from './providers'
import React from 'react'

export const metadata = {
  title: 'LocalBox',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Providers>
        <div className="p-4 bg-white shadow">LocalBox</div>
                        <main className="p-4">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
