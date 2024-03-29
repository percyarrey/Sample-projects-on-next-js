'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'

import { BsGoogle} from 'react-icons/bs'
import { toast } from 'react-toastify'

import {MoonLoader} from 'react-spinners'

import { useRouter } from 'next/navigation'

import { useTheme } from 'next-themes'

//NEXT AUTH
import GoogleButton from 'react-google-button'

import { signIn } from 'next-auth/react'
export default function page() {
  const {theme ,setTheme} = useTheme()
  const [data,setData] = useState({
    email:"",
    password:"",
    country:"",
  })

  const router = useRouter()
  const [loading,setLoading] = useState(false)
  //HANDLE CHANGE
  function handleChange(e){
    const {name,value} = e.target
    setData((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  //HANDLE SUBMINT
  async function handleSubmit(e){
        e.preventDefault();
        const {email,password,country} = data
        if(loading === false){
          if(email && password && country){
            
            try {
              setLoading(true)
              const response = await axios.post("/api/login", data);
  
              toast.success(response.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: theme,
                });
                setLoading(false)
                setTimeout(() => {
                  router.push('/login')
                }, 1500);
                
            } catch (error) {
              if(error.response.status===409){
                toast.warn(error.response.data.message, {
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
              else{
                toast.error('Something went wrong', {
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
              setLoading(false)
              
            }
          }else{
            toast.warn('Please fill required Information', {
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
  }
  
  return (
    <section className='flex overflow-hidden min-h-[95vh]'>
      <div className='w-full md:w-7/12 flex justify-center items-center'>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                    Create an account
                </h1>
                <form className="space-y-4 md:space-y-6">
                    
                    <div>
                        <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Your email</label>
                        <input value={data.email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-md rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required autoComplete="off"/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Password</label>
                        <input value={data.password} autoComplete="off" onChange={handleChange}  type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 md:text-md rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                    </div>
                    <div>
                        <label  htmlFor="country" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Country</label>
                        <input value={data.country} onChange={handleChange}  type="text" name="country" id="country" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-md rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Country"/>
                    </div>
                    <button type="submit" onClick={handleSubmit} className="w-full text-white bg-blue-600 hover:bg-blue-700  focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <div className='w-full h-full flex justify-center'><MoonLoader color='white' size={20}/></div>:<span>Sign in</span>}</button>

                    {/* GOOGLE */}
                    {/* <button className="w-full text-black bg-slate-400 bg-opacity-5 border-2 border-slate-300 hover:bg-slate-200  focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold text-opacity-80 rounded-lg text-md px-5 py-2.5 text-center
                     dark:bg-slate-900 dark:bg-opacity-5 dark:hover:bg-slate-900 dark:focus:ring-blue-800 dark:text-white flex justify-center gap-2"><BsGoogle className='mt-1' color='red'/>Sign in with Google</button> */}
                    <GoogleButton onClick={()=>signIn('google')} style={{width:"100%"}}  className=' mx-auto ' />

                    <div>
                      <p className="text-md font-light text-gray-500 dark:text-gray-400">
                          Already have an Account? <Link href="/login" className="font-semibold text-blue-600 hover:underline dark:text-blue-500">Log In</Link>
                      </p>
                      <p className="text-md font-light text-gray-500 dark:text-gray-400">
                            Don’t want to Sign up? <Link href="/" className="font-semibold text-red-600 hover:underline dark:text-red-500">Return Home</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
      </div>
      <div className='md:flex-1 hidden md:flex justify-center items-center'>
        <div>
            <img src='./illustration.svg' />
        </div>
      </div>
    </section>
  )
}
