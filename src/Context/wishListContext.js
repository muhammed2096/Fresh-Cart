import axios from "axios";
import { createContext, useEffect, useState } from "react";




export let wishListContext = createContext();


export default function WishListContextProvider({children}){
    const userToken = localStorage.getItem('userToken')

    const baseUrl = 'https://ecommerce.routemisr.com'
    
      const headers =  {
      token: userToken
    }

    async function addToWishList(productId){
  
      return await axios.post(`${baseUrl}/api/v1/wishlist`,{productId},{headers}
        ).then(res => res).catch(err => err)
      }

      async function getLoggedUserWishList(){

        return await axios.get(`${baseUrl}/api/v1/wishlist`,{headers}
        ).then(res => res).catch(err => err)
      }

      async function removeItemFromWishList(id){

        return await axios.delete(`${baseUrl}/api/v1/wishlist/${id}`,{headers}
        ).then(res => res).catch(err => err)
      }
      
      
      
      return <wishListContext.Provider value={{addToWishList, getLoggedUserWishList, removeItemFromWishList}}>
        {children}
    </wishListContext.Provider>
}




