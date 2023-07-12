'use client'

import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

//Tailwind Flowbite
import "flowbite/dist/flowbite.min.js"
//COMPONENTS
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Quiz App',
  description: 'Simple quiz app created with next js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
