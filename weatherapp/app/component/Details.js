import React from 'react'
//COMPONENT
import Forecast from './Forecast'

export default function Details() {
  return (
    <div>
        <div className='flex justify-between h-[7.8rem] mt-3'>
            <div className='flex justify-between flex-col'>
                <div>
                    <div className=' font-bold text-3xl'>Malaga</div>
                    <div className='my-text'>chance of sun 0%</div>
                </div>
                <div className='font-semibold text-black dark:text-white dark:text-opacity-70 text-opacity-70 text-5xl'>
                    33<span className=' text-xs absolute'>0</span>
                </div>
            </div>
            <div className='flex items-center'>
                <img src='./weather/sunny.png' className='h-[4.6rem]'/>
            </div>
        </div>
        <div className='mt-2 mb-2 my-text '>TODAY'S FORECAST</div>
        <div className='flex gap-2'>
           <Forecast/>
           <Forecast/>
           <Forecast/>
        </div>
    </div>
  )
}
