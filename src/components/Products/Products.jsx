import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';

import iconNoProducts from '../images/Icon-no-products.png'
import { BallTriangle } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

export default function Products() {
  let {addToCart, setnumbOfCartItems} = useContext(cartContext);

  async function addProdut(productId){
    let response = await addToCart(productId);

    if(response?.data?.status === "success"){
      setnumbOfCartItems(response?.data?.numOfCartItems);
      toast.success(response.data.message, {duration:2000, position:"bottom-right", className:"border-success border"})
    }
    else{
      toast.error("Error", {duration:2000});
    }
  }

  const [allProducts, setallProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const {id, filterId} = useParams();

  async function getBrandProducts(){
    console.log(filterId)
    setisLoading(true);
    const {data} = await axios.get("https://route-ecommerce.onrender.com/api/v1/products",{
      params: {[filterId]: id}
    });
    setallProducts(data.data)
    setisLoading(false);
  }

  useEffect(() => {
    getBrandProducts();
  }, [])
  
  return <>
  <Helmet>
        <meta name="description" content="" />
        <title>Products</title>
      </Helmet>
  {isLoading ? <BallTriangle height={100}  width={100} radius={5} color="#1060bc" ariaLabel="ball-triangle-loading" wrapperClass={"justify-content-center align-items-center vh-100"}  wrapperStyle="" visable="true" /> :
        <div className="container py-5">
          <div className="row">
            {allProducts.length == 0? <img src={iconNoProducts} alt="No Products Available right Now..." /> :
            allProducts.map((product,i)=>{return <div  key={product._id} className="col-md-2">
            <div className='product-item'>
              
              <Link to={`/ProductDetails/${product._id}`}> 
                <img className='w-100'  src={product.imageCover} alt={product.title} />
                <span className='text-main fw-bold'>{product.category.name}</span>
                <h3 className='h6 fw-bold py-3'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
                <div className='d-flex justify-content-between'>
                  <span className='text-muted'>{product.price}EGP</span>
                  <span>
                    <i className='fas fa-star rating-color'></i>{product.ratingsAverage}
                  </span>
                 
                </div> 
              </Link>
              <i className="fa-solid fa-heart"></i>
              <button onClick={()=>addProdut(product._id)} className='btn btn-add main-bg text-white w-100'>+ Add</button>
            </div>
          </div>})}
          
          </div>
        </div>
    
}
  </>
}
