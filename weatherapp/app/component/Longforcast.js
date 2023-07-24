import React from 'react'

export default function Longforcast() {
  return (
    <div className='mt-2 px-1 rounded-lg shadow-md flex justify-between h-[4rem]'>
        <div className=' flex items-center text-black dark:text-white dark:text-opacity-70 font-semibold text-opacity-50'>Today</div>
        <div className='flex gap-2'>
            <div className=' flex items-center'><img src='./weather/sunny.png' className='h-[3.6rem]'/></div>
            <div className='flex items-center'>Sunny</div>
        </div>
        <div className=' font-semibold flex items-center'> 37/<span className=' text-black dark:text-white dark:text-opacity-70 font-semibold text-opacity-50'>22</span></div>
    </div>
  )
}
