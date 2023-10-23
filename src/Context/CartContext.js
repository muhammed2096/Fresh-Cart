import axios from "axios";
import { createContext, useEffect, useState } from "react";





export let cartContext = createContext(0)
export default function CartContextProvider({children}){
const userToken = localStorage.getItem('userToken')

const baseUrl = 'https://ecommerce.routemisr.com'

  const headers =  {
  token: userToken
}

async function addToCart(productId){
  
  return await axios.post(`${baseUrl}/api/v1/cart`,{
    productId
  },{
    headers
  }).then(res => res).catch(err => err)
}
async function getLoggedUserCart(){

  return await axios.get(`${baseUrl}/api/v1/cart`,{headers}
  ).then(res => res).catch(err => err)
}
async function removeItemFromCart(id){

  return await axios.delete(`${baseUrl}/api/v1/cart/${id }`,{headers}
  ).then(res => res).catch(err => err)
}
async function updateCartProduct(id, count){

  return await axios.put(`${baseUrl}/api/v1/cart/${id }`,{count},{headers}
  ).then(res => res).catch(err => err)
}


async function onlinePayment(shippingAdress){
  return await axios.post(`${baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{shippingAdress},{headers}
  ).then(res => res).catch(err => err)
}
 const [cartId, setCartId] = useState(null)
 const [numOfCartItems, setNumOfCartItems] = useState(null)

async function getInitialCart(){
  let {data} = await getLoggedUserCart();
  setNumOfCartItems(data.numOfCartItems)
  setCartId(data.data._id)
}



useEffect(()=> {
  getInitialCart()
},[])
    return <cartContext.Provider value={{addToCart, getLoggedUserCart, removeItemFromCart, updateCartProduct, onlinePayment, numOfCartItems, setNumOfCartItems}}>
        {children}
    </cartContext.Provider>
}
