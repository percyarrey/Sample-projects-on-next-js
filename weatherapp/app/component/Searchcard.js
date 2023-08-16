
import React from 'react'

/* import Dayforcastdata from '@/data/Dayforcast.json' */
import { useDispatch, useSelector } from 'react-redux'
import { changeDetails } from '@/redux/detailSlice'

export default function Searchcard(props) {
    const detailData = useSelector((state)=>state.detail.detail[0])
    const dispatch = useDispatch()
    console.log(detailData)
    /* var data = Dayforcastdata.data
    var time =new Date().getDay()
    data = data.map((e,index)=>{
        var dataTime = e.datetime
        dataTime = dataTime.slice(-5,-3)
        if(dataTime===time){
            return e
        }
    }) */

    const imgloc=()=> {
        if(props.temp<20){
            return './weather/rainy.png';
        }
        else if(props.temp<30) {
            return './weather/cloudy.png';
        }
        else{
            return './weather/sunny.png'
        }
    }
    function isActive(){
        if(props.city===detailData.city){
            return ' border border-sky-600 shadow-sky-400';
        }
    }

    //HANDLE CLICK
    function handleClick(e) {
        dispatch(changeDetails({
            city:props.city,
            time:props.time,
            temp:props.temp
          }))
    }
    /* console.log(data) */
  return (
    <div className={'my-bg mt-2 flex items-center w-full px-4 rounded-xl h-[6.7rem] cursor-pointer shadow-md' + isActive()} onClick={handleClick}>
        <div className='w-full flex justify-between'>
            <div className='flex gap-3'>
                <div><img src={imgloc()} className='h-11'/></div>
                <div>
                    <span className='font-bold'>{props.city}</span><br/>
                    <span className='my-text'>{props.time}</span>
                </div>
            </div>
            <div className='font-semibold text-black dark:text-white dark:text-opacity-70 text-opacity-60 text-3xl'>
                {props.temp}<span className=' text-xs absolute'>0</span>
            </div>
        </div>
    </div>
  )
}
