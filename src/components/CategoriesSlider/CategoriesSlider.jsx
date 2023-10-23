import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Slider from "react-slick";



function CategoriesSlider(){

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true
    }
 function getCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
 }
let {data} = useQuery("allCategories", getCategories)

  return(
    <>
     <div className="container">
     <Slider {...settings}>
           {data?.data?.data.map((ele)=> <>
           <img height={250} className='w-100' src={ele.image} alt=""  />
           <h4>{ele.name}</h4>
           </>)}    
        </Slider>
     </div>
    </>
  )
};



export default CategoriesSlider;
