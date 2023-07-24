'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'

import { BsGoogle} from 'react-icons/bs'

import { useTheme } from 'next-themes'
import { toast } from 'react-toastify'

import { MoonLoader} from 'react-spinners'

//REDUX
import { UseSelector,useDispatch } from 'react-redux'
import { storeUser } from '@/redux/userSlice'

import { useRouter } from 'next/navigation'
export default function page() {
  const router = useRouter()

  const dispatch  = useDispatch()

  const {theme ,setTheme} = useTheme()


  const [data,setData] = useState({
    email:"",
    password:""
  })

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
        const {email,password} = data
        if(loading === false){
          if(email && password){
          
            try {
              setLoading(true)
              const response = await axios.put("/api/login", data);
              dispatch(storeUser(response.data.data))
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
                router.push("/")
              }, 500);
                
            } catch (error) {
              setLoading(false)
              if(error.response.status===401){
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
              theme: "light",
              });
          }
        }
  }
  
  return (
    <section className='flex overflow-hidden min-h-[95vh]'>
      <div className='w-full md:w-7/12 flex justify-center items-center'>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Log in to your account
                </h1>
                <form className="space-y-4 md:space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Your email</label>
                        <input value={data.email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-md rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Password</label>
                        <input value={data.password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 md:text-md rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 cursor-pointer mt-2"/>
                            </div>
                            <div className="ml-3 text-md">
                              <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-md font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
                    </div>
                    <button type="submit" onClick={handleSubmit} className="w-full text-white bg-blue-600 hover:bg-blue-700  focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <div className='w-full h-full flex justify-center'><MoonLoader color='white' size={20}/></div>:<span>Log In</span>}</button>

                    {/* GOOGLE */}
                    <button  className="w-full text-black bg-slate-400 bg-opacity-5 border-2 border-slate-300 hover:bg-slate-200  focus:ring-2 focus:outline-none focus:ring-blue-300 font-semibold text-opacity-80 rounded-lg text-md px-5 py-2.5 text-center
                     dark:bg-slate-900 dark:bg-opacity-5 dark:hover:bg-slate-900 dark:focus:ring-blue-800 dark:text-white flex justify-center gap-2"><BsGoogle className='mt-1' color='red'/>Log in with Google</button>

                    
                    <div>
                        <p className="text-md font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link href="/signup" className="font-semibold text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
                        </p>
                        <p className="text-md font-light text-gray-500 dark:text-gray-400">
                            Don’t want to Login? <Link href="/" className="font-semibold text-red-600 hover:underline dark:text-red-500">Return Home</Link>
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
