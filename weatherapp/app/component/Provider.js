'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
//THEMES
import { ThemeProvider } from 'next-themes'
import { useTheme } from 'next-themes'; 

import "react-toastify/dist/ReactToastify.css"

//REACT REDUX
import { store } from '../../redux/store'
import { Provider as ProviderRedux} from 'react-redux'

import {MoonLoader} from 'react-spinners'


export default function Provider({children}) {
    const [mounted,setMounted] = useState(false);
    const {theme,setTheme} = useTheme()
    useEffect(()=>{  
      require('flowbite/dist/flowbite.min.js')
      setMounted(true);
      /* 
      (
        async()=>{
          const options = {
            method: 'GET',
            url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/minutely',
            params: {
              lat: '35.5',
              lon: '-78.5'
            },
            headers: {
              'X-RapidAPI-Key': '255c233b7bmsh57f646830e62342p196947jsna52efd43ed47',
              'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
            }
          };
  
          try {
            const response = await axios.request(options);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        }
      )() */
    },[])
  if(!mounted){
      return (<div className={'min-h-[100vh] flex justify-center items-center my-bg1'}>
                <MoonLoader/>
              </div>)
  }
  return (
    <ProviderRedux store={store}>
      <ThemeProvider enableSystem={"true"} attribute='class'>
        {children}
      </ThemeProvider>
    </ProviderRedux>
    
  )
}
