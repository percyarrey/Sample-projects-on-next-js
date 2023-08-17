import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'


//COMPONENT
import Header  from './component/Header'
import Footer from './component/Footer'

//MUI
import { Box } from '@mui/material'

//FONTS
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Product App',
  description: 'An ecommerce website created with mui and tailwind and TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='flex justify-between flex-col min-h-[100vh]'>
        <Box>
          <Header/>
          {children}
        </Box>
        <Footer/>
      </body>
    </html>
  )
}
