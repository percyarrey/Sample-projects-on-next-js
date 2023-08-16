import {Suspense} from 'react'

import "./globals.css";
import type { Metadata } from "next";

//component
import ThemeRegistry from "@/theme/ThemeRegistry/ThemeRegistry";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Loading from './loading'
import { Box } from '@mui/material';
import Filter from '@/app/component/Filter'

//TOASTER JS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "Product App",
  description: "Material UI nextjs example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <ThemeRegistry>
        
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
          <div style={{display:'flex',minHeight:'100vh',justifyContent:'space-between',flexDirection:'column'}}>
          <div>
          
            <Header />
            <Box  marginTop={1}>
            <Filter/>
            <Suspense fallback={<Loading/>}>
            {children}
            </Suspense>
            </Box>
          </div>
          <Footer/>
          </div>
        
        </ThemeRegistry>
      </body>
    </html>
  );
}