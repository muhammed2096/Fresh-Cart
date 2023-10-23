import React, { useContext,  useState } from "react";
import { wishListContext } from '../../Context/wishListContext';
import { useQuery } from "react-query";
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { cartContext } from "../../Context/CartContext";
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from "react-helmet";



function WishList(){
  let {getLoggedUserWishList, removeItemFromWishList} = useContext(wishListContext)
  let [wishlistDetails , setWishListDetails] = useState(null)
let {isLoading} = useQuery()



const {addToCart, setNumOfCartItems} = useContext(cartContext)
 async function addProductToCart(id){
 let { data } = await addToCart(id);
  if(data.status === "success"){
    toast(data.message);
    setNumOfCartItems(data.numOfCartItems)
  }
}

async function getWishListDetails(){

  let {data} = await getLoggedUserWishList()
  if(data.status === "success"){
   setWishListDetails(data)
 }
 }

 async function removeProductFromWishList(id){
  let {data} = await removeItemFromWishList(id)
  if(data.status === "success"){
    setWishListDetails(data);

 }
 }
useEffect(()=>{
  getWishListDetails()
}, [])
  return(
    <>
    <Helmet>
        <meta name="description" content="" />
        <title>Wish List</title>
      </Helmet>
    <section className='py-5 bg-light-grey'>
  <div className="container">
  {isLoading ? <BallTriangle height={100}  width={100} radius={5} color="#1060bc" ariaLabel="ball-triangle-loading" wrapperClass={"justify-content-center align-items-center vh-100"}  wrapperStyle="" visable="true" /> :
  <>
  <h1 className='pb-3 fw-bolder'>My Wish List</h1>
    {wishlistDetails &&  wishlistDetails.data.map((product) => 
        <div className="row border-bottom py-3 my-3 align-items-center">
          <div className="col-md-1">
            <img src={product.imageCover} alt={product.title} className='img-fluid'/>
          </div>
         <div className="col-md-11">
          <div className="d-flex justify-content-between align-items-center">
          <div>
          <h3 className='fw-bold'>{product.title}</h3>
          <h4 className='text-main'>{product.price}</h4>
          <button onClick={()=> removeProductFromWishList(product.id)} className='btn text-danger'><i className='fa-solid fa-trash me-2'></i> Remove</button>
          </div>
            <div>
           <button onClick={()=> addProductToCart(product.id)} className="btn bg-main text-white">Add to Cart</button>
            </div>
          </div>
         
        </div>
        
        </div>
        )
      
    }
  </>
  
   }
    
  </div>
  
    </section>
    
    
    
    
    
    
    </>
    
  )
}


export default WishList;


// import React, { useContext, useEffect, useState } from 'react'
// import { toast } from 'react-hot-toast';
// import { Link } from 'react-router-dom';
// import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';
// import { wishListContext } from '../../Context/wishListContext.js';

// export default function WishList() {
//   const [wishlistDetails, setwishlistDetails] = useState(null);
//   const [isLoading, setisLoading] = useState(false);

//   const {getloggedUserWishlist, removeItemFromWishList} = useContext(wishListContext);

//   async function getwishList(){
//     setisLoading(true)
//     let response = await getloggedUserWishlist();
//     if(response.data.status === "success"){
//       setwishlistDetails(response.data.data);
//       setisLoading(false)
//       console.log(response)
//     }
//   }
//   async function removeProductFromWishList(id){
//       let{data} = await removeItemFromWishList(id)
//       if(data.status === "success"){
//         setwishlistDetails(data)
//       }
//     }
//   useEffect(()=>{
//     getwishList();
//   },[])

//   return <>
//   {isLoading? <LoadingScreen /> : <section>
//     <div className="container">
//     <h3>Wishlist :</h3>
//     {wishlistDetails?.map((product)=> <div key={product.product._id} className="row align-items-center border-bottom py-2">
//           <div className="col-md-1">
//             <img src={product.product.imageCover} className='w-100' alt="" />
//           </div>
//           <div className="col-md-11 d-flex justify-content-between">
//             <div>
//             <h6>{product.product.title}</h6>
//             <h6 className='main-text'>{product.price} EGP</h6>
//             <button onClick={()=>removeProductFromWishList(product.product._id)} className='btn m-0 btn-sm p-1 text-bg-danger'><i className='fa-regular fa-trash-can'></i> Remove</button>
//             </div>
//             {/* <div>
//               <button onClick={()=>updateProductQuantity(product.product._id, product.count+1)} className='btn border-main btn-sm'>+</button>
//               <span className='mx-2'>{product.count}</span>
//               <button onClick={()=>updateProductQuantity(product.product._id, product.count-1)} className='btn border-main btn-sm'>-</button>
//             </div> */}
//           </div>
//         </div>
//       )}

//     </div>
//   </section>}

//   </>
// }