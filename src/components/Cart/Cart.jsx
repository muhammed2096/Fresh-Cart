import React, { useContext, useState } from 'react';
import styles from './Cart.module.css';
import { cartContext } from '../../Context/CartContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

function Cart(){
let {getLoggedUserCart, removeItemFromCart, updateCartProduct,  setNumOfCartItems} = useContext(cartContext)
let[cartDetails , setCartDetails] = useState(null)
let {isLoading} = useQuery()


async function getCartDetails(){
 let {data} = await getLoggedUserCart()
 if(data.status === "success"){
  setNumOfCartItems(data.numOfCartItems)
  setCartDetails(data)
}
}

async function removeProductFromCart(id){
  let {data} = await removeItemFromCart(id)
  if(data.status === "success"){
    setNumOfCartItems(data.numOfCartItems)
   setCartDetails(data);
 }
 }
 async function updateCartProductQuantity(id, count){
  let {data} = await updateCartProduct(id, count)
  if(data.status === "success"){
 
   setCartDetails(data);
 }
 }

useEffect(()=> {
getCartDetails()
}, [])
return(
  <>
  <Helmet>
        <meta name="description" content="" />
        <title>My Cart</title>
      </Helmet>
  <section className='py-5 bg-light-grey'>
<div className="container">
{isLoading ? <BallTriangle height={100}  width={100} radius={5} color="#1060bc" ariaLabel="ball-triangle-loading" wrapperClass={"justify-content-center align-items-center vh-100"}  wrapperStyle="" visable="true" /> :
<>
<h1 className='pb-3 fw-bolder'>Cart Shop</h1>
  {cartDetails && <>
    <div className="d-flex justify-content-between">
        
          <h3>Total Price: <span className='text-main'>{cartDetails.data.totalCartPrice}</span></h3>
          <h3>Total Numbers: <span className='text-main'>{cartDetails.numOfCartItems}</span></h3>
        
    </div>

    {cartDetails.data.products.map((product) => 
      <div className="row border-bottom py-3 my-3 align-items-center">
        <div className="col-md-1">
          <img src={product.product.imageCover} alt={product.product.title} className='img-fluid'/>
        </div>
       <div className="col-md-11">
        <div className="d-flex justify-content-between align-items-center">
        <div>
        <h4 className='fw-bold'>{product.product.title}</h4>
        <h4 className='text-main'>{product.price}</h4>
        <button onClick={()=> removeProductFromCart(product.product.id)} className='btn text-danger'><i className='fa-solid fa-trash me-2'></i> Remove</button>
        </div>
          <div>
          <button onClick={()=> updateCartProductQuantity(product.product.id, product.count + 1 )} className='btn btn-outline-success'>+</button>
          <span className='mx-3'>{product.count}</span>
          <button onClick={()=> updateCartProductQuantity(product.product.id, product.count - 1 )} className='btn btn-outline-warning'>-</button>
          </div>
        </div>
       
      </div>
      
      </div>
      )}
      <Link to={"/checkOut"}  className='btn bg-main text-white w-100'>Proceed to Check Out</Link>
    </>
  }
</>

}
  
</div>

  </section>
  
  
  
  
  
  
  </>
)
  };




export default Cart;
