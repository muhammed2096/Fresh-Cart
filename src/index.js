import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TokenContextProvider from './Context/tokenContext';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import  CartContextProvider  from './Context/CartContext';
import WishListContextProvider from './Context/wishListContext';





const root = ReactDOM.createRoot(document.getElementById('root'));
let query = new QueryClient()
root.render(
    <>
    <QueryClientProvider client={query}>
        <TokenContextProvider>
             <WishListContextProvider>
               <CartContextProvider>
                  <App /> 
               </CartContextProvider>
            </WishListContextProvider>
        </TokenContextProvider>
        <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
   
    </>
    
    
);

