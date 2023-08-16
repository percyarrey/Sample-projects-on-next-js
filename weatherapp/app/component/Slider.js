// Import Swiper React components
import React, { useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import { Navigation,Scrollbar,Virtual } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

//COMPONENT
import Forecast from './Forecast';

//React Redux
import { useSelector } from 'react-redux';


const Slider = (props)=>{
  const sliderRef = useRef(null)
  //HANDLE SLIDE
  function handleSlide(direction) {
    if(sliderRef!=undefined && sliderRef.current!=undefined && sliderRef.current!=null){
      if(direction>0){
        sliderRef.current.slideNext()
      }else{
        sliderRef.current.slidePrev()
      }
    }
  }

  return (
    <div style={{maxWidth:"90rem"}}>
      <Swiper
        slidesPerView={3}
      >
      <SwiperSlide>
        <Forecast />
      </SwiperSlide>
      <SwiperSlide>
        <Forecast />
      </SwiperSlide>
      <SwiperSlide>
        <Forecast />
      </SwiperSlide>
    </Swiper>
    </div>
  );
};

export default Slider
