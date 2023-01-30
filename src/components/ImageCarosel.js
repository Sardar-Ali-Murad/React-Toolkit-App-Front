import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper';
import { useSelector } from "react-redux";
// Import Swiper styles
import "swiper/css";
export default function App() {
    let {Properties}=useSelector((state)=>state.counter)
  return (
    <>
      <Swiper className="mySwiper"
             modules={[Navigation, Pagination, Autoplay]}
             slidesPerView={1}
            //  slide
             navigation
             autoplay={{ delay: 2000 }}
             pagination={{ clickable: true }}
            //  spaceBetween={300}
      >
        {
            Properties.slice(2).map((product)=>{
                return <SwiperSlide key={product?._id}>
                     <img src={product?.image} style={{height:"80vh",objectFit:"cover"}} alt="Image"/>
                </SwiperSlide>
            })
        }
      </Swiper>
    </>
  );
}
