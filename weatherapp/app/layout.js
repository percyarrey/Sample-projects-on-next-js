
import './globals.css'


//COMPONENT
import Navbar from '@/app/component/Navbar'
import Provider from '@/app/component/Provider'
import { Suspense } from 'react'


//TOASTER JS
import { ToastContainer } from 'react-toastify'
import Loading from './loading'
export const metadata = {
  title: 'Weather App',
  description: 'Weather App Created Next js',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
      <Provider>
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
        <div className='flex'>
          <Navbar/>
          <div className='flex-1 py-3'>
              
              <Suspense fallback={<Loading/>}>
              {children}
              </Suspense>
          </div>
        </div>
      </Provider>
    </body>
    </html>
  )
}
