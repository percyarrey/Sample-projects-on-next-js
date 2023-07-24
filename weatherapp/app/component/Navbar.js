'use client'
import React from 'react'
//LINK
import Link from 'next/link'
import {useRouter,usePathname} from 'next/navigation'

//REACT ICONS
import { FaCloudRain, FaCity,FaMap,FaCog} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { storeUser } from '@/redux/userSlice'
import { toast } from 'react-toastify'
import { useTheme } from 'next-themes'

function Navbar() {
  const userData = useSelector((state)=>state.user.user)
  const {theme ,setTheme} = useTheme()
  const dispatch = useDispatch()
  const routers = useRouter()
  function handleAuth(e) {
    if(userData.email === undefined){
      routers.push("/signup")
    }else{
      dispatch(storeUser({}))
      toast.warn("You have Succesfully Log Out", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        });
    }
  }

  const router =usePathname()
  const isActive = (pathname) =>{
    return router === pathname;
  }
  return (
    <div className={isActive('/login') || isActive('/signup') ? 'hidden': 'w-[5rem] sm:w-[7rem] md:w-[8rem]'}>
      <div className=' flex justify-center py-3 min-h-screen'>
        <div className='bg-slate-200 fixed  min-h-screen dark:bg-slate-950 dark:bg-opacity-70 shadow-lg pt-2 justify-center  rounded-2xl flex  bg-opacity-40 sm:min-w-[6rem] min-w-[4rem]'>
          <div className='flex gap-[3.6rem] flex-col'>
            <div className='flex justify-center'>
              <button onClick={handleAuth}><img src={userData.email===undefined ?'./login-animation.gif':'./logout-animation.gif'} className=' rounded-full h-[3.6rem]' /></button>
            </div>
            {/* NAVBARS */}
            <div  className='flex gap-9 flex-col  text-opacity-60 text-center text-gray-600 dark:text-white dark:text-opacity-70'>
              <Link href={"/"} className={isActive('/') && ' text-sky-500 font-semibold'}>
                <div className=' flex justify-center'><FaCloudRain size={23}/></div>
                <div>Weather</div>
              </Link>
              <Link href={"/cities"} className={isActive('/cities') && ' text-sky-500 font-semibold'}>
                <div className=' flex justify-center'><FaCity si/></div>
                <div>Cities</div>
              </Link>
              <Link href={"/map"} className={isActive('/map') && ' text-sky-500 font-semibold'}>
                <div className=' flex justify-center'><FaMap si/></div>
                <div>Map</div>
              </Link>
              <Link href={"/setting"} className={isActive('/setting') && ' text-sky-500 font-semibold'}>
                <div className=' flex justify-center'><FaCog si/></div>
                <div>Setting</div>
              </Link>
            </div>
          </div>
        </div>
      </div>   
    </div>
    
  )
}

export default Navbar
