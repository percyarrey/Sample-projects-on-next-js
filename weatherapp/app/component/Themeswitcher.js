'use client'

//REACT HOOK
import React,{useState,useEffect} from 'react'
import { useTheme } from 'next-themes'
//REACT ICONS
import {BsSunFill,BsMoonFill} from 'react-icons/bs'

export default function Themeswitcher() {
    const [mounted,setMounted] = useState(false);
    const {theme,setTheme} = useTheme();

    useEffect(()=>{
        setMounted(true);
    },[])
    if(!mounted){
        return null
    }
    return (
        <div className='w-full h-full flex justify-end'>
            {
                theme == 'dark'?
                <button className='w-full rounded-md border-2 border-sky-200 bg-sky-300 bg-opacity-10 hover:border-sky-400 h-full items-center flex justify-center hover:bg-opacity-30  max-w-[4.7rem]' onClick={()=>setTheme("light")}>
                    <BsSunFill/>
                </button>:
                <button className='w-full rounded-md border-2 border-gray-400 bg-gray-900 bg-opacity-10 hover:border-sky-400 h-full items-center flex justify-center hover:bg-opacity-30 max-w-[4.7rem]'  onClick={()=>setTheme("dark")}><BsMoonFill/></button>
            }
        </div>
    )
}
