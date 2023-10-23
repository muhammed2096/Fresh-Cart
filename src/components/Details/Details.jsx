import axios from "axios";
import React, { useContext } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import {Helmet} from "react-helmet";
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';



function Details(){
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };


let {id} = useParams()

function getProductDetails(id){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}

let {data, isError, isLoading} = useQuery("details",()=> getProductDetails(id.id))

const {addToCart, setNumOfCartItems} = useContext(cartContext)
 async function addProductToCart(id){
 let { data } = await addToCart(id);
  if(data.status === "success"){
    toast(data.message);
    setNumOfCartItems(data.numOfCartItems)
  }
}


    return(
        <>
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{data?.data?.data.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <meta name="keywords" content={data?.data?.data.slug} />
            </Helmet>
            ...
        </div>


        <div className="container w-75 py-5 vh-100">
        {isLoading ? <BallTriangle height={100}  width={100} radius={5} color="#1060bc" ariaLabel="ball-triangle-loading" wrapperClass={"justify-content-center align-items-center vh-100"}  wrapperStyle="" visable="true" /> :
            <div className="row align-items-center">
                <div className="col-md-3">
                <Slider {...settings}>
                      {data?.data?.data.images.map((img, index)=> <img key={index} src={img} alt="" className="img-fluid" />)}
               </Slider>
                    
                </div>
                <div className="col-md-9">
                    <h2 className="fw-bold">{data?.data?.data.title}</h2>
                    <p>{data?.data?.data.description}</p>
                    <p className="text-main fw-bold">{data?.data?.data.category.name}</p>
                    <div className="d-flex justify-content-between">
                    <h5 className='fw-bold'>{data?.data?.data.price} EGP</h5>
                        <h5><i className="fa fa-star rating-color"></i> {data?.data?.data.ratingsAverage}</h5>
                    </div>
                    <button onClick={()=> addProductToCart(id)} className='btn bg-main text-white w-100'>Add to Cart</button>
                </div>
            </div> }
        </div>
       
        </>
    )
}



export default Details;