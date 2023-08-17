import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Suspense} from 'react'

//COMPONENT
import Header  from './component/Header'
import Footer from './component/Footer'
import Loading from './loading'


//TOASTER JS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <body className='flex justify-between w-[100vw] overflow-x-hidden flex-col min-h-[100vh]'>
        <Box>
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
          <Header/>
          <div>
            <Suspense fallback={<Loading/>}>
              {children}
            </Suspense>
          </div>
        </Box>
        <Footer/>
      </body>
    </html>
  )
}
