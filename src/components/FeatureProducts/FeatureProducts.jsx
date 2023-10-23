
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { wishListContext } from '../../Context/wishListContext';
import { Helmet } from 'react-helmet';


function FeatureProducts(){

function getProducts(){
  return  axios.get("https://ecommerce.routemisr.com/api/v1/products")
}

let {data, isLoading, isRed, isFetching, refetch} = useQuery("featureProducts", getProducts)


const {addToCart, setNumOfCartItems} = useContext(cartContext)
 async function addProductToCart(id){
 let { data } = await addToCart(id);
  if(data.status === "success"){
    toast(data.message);
    setNumOfCartItems(data.numOfCartItems)
  }
}
const {addToWishList, setNumOfWishListItems, removeItemFromWishList, setWishListDetails} = useContext(wishListContext);
let [wishlistDetails] = useState([])
async function addProductToWishList(productId){
  let response = await addToWishList(productId);
  if(response?.data?.status === "success"){
    toast.success(response.data.message, {duration:2000, position:"bottom-right", className:"border-success border"})
    setNumOfWishListItems(data.numOfWishListItems)
  }

}
async function removeProductFromWishList(id){
  let {data} = await removeItemFromWishList(id)
  if(data.status === "success"){
    setWishListDetails(data);
    setNumOfWishListItems(data.numOfWishListItems)
 }
 }

// let[products, setProducts] = useState([])
// let[isLoading, setIsLoading] = useState(true)
// async function getProduct(){
//  let {data} =  await  axios.get('https://ecommerce.routemisr.com/api/v1/products')
//  console.log(data);
//  setProducts(data.data)
//  setIsLoading(false)
// }
// useEffect(()=> {
//     getProduct()
// },[])


    return(
        <>
        <Helmet>
        <meta name="description" content="" />
        <title>Home</title>
      </Helmet>
        <div className="container py-5">
             {isLoading ? <BallTriangle height={100}  width={100} radius={5} color="#1060bc" ariaLabel="ball-triangle-loading" wrapperClass={"justify-content-center align-items-center vh-100"}  wrapperStyle="" visable="true" /> :
              <div className="row">
                {/* <button onClick={refetch} className='btn bg-main w-100 text-white mb-3'>Refetch</button> */}
                {data?.data?.data.map((product)=> <div key={product.id} className="col-md-2">
                   <div className="product px-2 py-3">
                   <Link to={"details/" + product.id}>
                   <img src= { product.imageCover } alt= { product.title } className='w-100'/>
                    <p className='text-main fw-bold'>{product.category.name}</p>
                    <h3 className='fw-bold h5'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
                    <div className="d-flex justify-content-between">
                        <p className='fw-bold'>{product.price} EGP</p>
                        <p className='text-dark'>
                            <i className='fa fa-star rating-color'></i>
                            {product.ratingsAverage}
                        </p>
                   </div>
                   </Link>
                  <div className="d-flex ">
                  
                  <button onClick={()=> addProductToCart(product.id)} className='btn bg-main text-white w-100 '>Add to Cart</button>
               {/* <i className={`fa-solid fa-heart fa-2x btn`} onClick={()=> addProductToWishList(product.id)}></i>  */}
               <i
                      className={`fa-${wishlistDetails?.includes(product.id) ? "solid" : "regular"
                    } fa-heart text-danger cursor-pointer ps-2 fs-3`}
                      onClick={() => {
                        if (!wishlistDetails?.includes(product.id)) {
                          addProductToWishList(product.id);
                        } else {
                          removeProductFromWishList(product.id);
                        }
                      }}
                    ></i>
                    {/* {wishlistDetails?.includes(product.id) ? <i onClick={()=> addProductToWishList(product.id)} className='fa-solid fa-heart  cursor-pointer ps-2 fs-3'></i> : <i onClick={()=> addProductToWishList(product.id)} className='fa-solid fa-heart text-danger cursor-pointer ps-2 fs-3'></i>} */}
                  </div>
                    </div> 
                </div>)}
                
                
            </div>}
            
        </div>
        </>
    )
};

export default FeatureProducts;