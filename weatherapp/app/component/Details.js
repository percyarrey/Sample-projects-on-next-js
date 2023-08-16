import React from 'react'
//COMPONENT
import Forecast from './Forecast'

import { useSelector } from 'react-redux';
import Slider from './Slider';

export default function Details() {
    const detailData = useSelector((state)=>state.detail.detail[0])
    const imgloc=()=> {
        if(detailData.temp<20){
            return './weather/rainy.png';
        }
        else if(detailData.temp<30) {
            return './weather/cloudy.png';
        }
        else{
            return './weather/sunny.png'
        }
    }
  return (
    <div>
        <div className='flex justify-between h-[7.8rem] mt-3'>
            <div className='flex justify-between flex-col'>
                <div>
                    <div className=' font-bold text-3xl'>{detailData.city}</div>
                    <div className='my-text'>chance of sun 1%</div>
                </div>
                <div className='font-semibold text-black dark:text-white dark:text-opacity-70 text-opacity-70 text-5xl'>
                    {detailData.temp}<span className=' text-xs absolute'>0</span>
                </div>
            </div>
            <div className='flex items-center'>
                <img src={imgloc()} className='h-[4.6rem]'/>
            </div>
        </div>
        <div className='mt-2 mb-2 my-text '>TODAY'S FORECAST</div>
        <div className='flex'>
            <Forecast />
            <Forecast />
            <Forecast />
        </div>
    </div>
  )
}
