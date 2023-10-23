import React from 'react';
import styles from './MainSlider.module.css';
import Slider from "react-slick";
import mainimg1 from '../images/slider-image-1.jpeg'
import mainimg2 from '../images/slider-image-2.jpeg'
import mainimg3 from '../images/slider-image-3.jpeg'

import blog1 from '../images/slider-2.jpeg'
import blog2 from '../images/grocery-banner-2.jpeg'

function MainSlider(){
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay: true
  };
  return(
    <>
    <div className="container my-5">
      <div className="row gx-0">
        <div className="col-md-9">
        <Slider {...settings}>
                <div><img height={400} src={mainimg1} className='w-100' alt="mainimg1" /></div>     
                <div><img height={400} src={mainimg2} className='w-100' alt="mainimg2" /></div> 
                <div><img height={400} src={mainimg3} className='w-100' alt="mainimg3" /></div> 
        </Slider>
        </div>
        <div className="col-md-3">
          <img height={200} src={blog1} className='w-100' alt="blog1" />
          <img height={200} src={blog2} className='w-100' alt="blog2" />
        </div>
      </div>
    </div>
    </>
  )
};



export default MainSlider;
