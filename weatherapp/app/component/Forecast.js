import React from 'react'

export default function 
() {
  return (
    <div className='w-4/12 flex justify-center'>
        <div className=' bg-slate-100 bg-opacity-20 dark:bg-zinc-900 dark:bg-opacity-40  shadow-md rounded-md w-full max-w-[8rem] py-4' >
            <div className='my text-center text-black dark:text-white dark:text-opacity-70 text-opacity-60'>6:00 AM</div>
            <div className='mt-2 flex justify-center'>
                <img src='./weather/sunny.png' className='h-[4rem] shadow-sm rounded-full'/>
            </div>
            <div className='font-semibold text-black dark:text-white dark:text-opacity-70 text-opacity-70 text-2xl text-center'>
                    25<span className=' text-xs absolute'>0</span>
                </div>
        </div>
    </div>
  )
}
