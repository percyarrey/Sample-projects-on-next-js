import React from 'react'

export default function Searchcard() {
  return (
    <div className='my-bg mt-2 flex items-center w-full px-4 rounded-xl h-[6.7rem] cursor-pointer shadow-md'>
        <div className='w-full flex justify-between'>
            <div className='flex gap-3'>
                <div><img src='./weather/sunny.png' className='h-11'/></div>
                <div>
                    <span className='font-bold'>Madrid</span><br/>
                    <span className='my-text'>10:23</span>
                </div>
            </div>
            <div className='font-semibold text-black dark:text-white dark:text-opacity-70 text-opacity-60 text-3xl'>
                31<span className=' text-xs absolute'>0</span>
            </div>
        </div>
    </div>
  )
}
