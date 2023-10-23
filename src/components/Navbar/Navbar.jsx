import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../images/freshcart-logo.svg'
import { tokenContext } from '../../Context/tokenContext';
import { cartContext } from '../../Context/CartContext';
import { wishListContext } from '../../Context/wishListContext';

export default function Navbar(){
  let {token, setToken} = useContext(tokenContext)
  let {numOfCartItems} = useContext(cartContext)
   let navigate = useNavigate()
  function logOut(){
    localStorage.removeItem("userToken")
    setToken(null)
    navigate("/login")
  }

   return(
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to="#">
      <img src={logo} alt="" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to="/product">Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/orders">My Orders</Link>
        </li>
      </ul> 
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
      <li className="nav-item">
          <i className='fab fa-instagram mx-2'></i>
          <i className='fab fa-facebook mx-2'></i>
          <i className='fab fa-tiktok mx-2'></i>
          <i className='fab fa-twitter mx-2'></i>
          <i className='fab fa-linkedin mx-2'></i>
          <i className='fab fa-youtube mx-2'></i>
        </li>

{token ? <><li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/login" onClick={logOut}>Log Out</Link>
        </li> 
         <li className="nav-item position-relative">
         <Link className="nav-link" to="/cart"><i className='fa-solid fa-shopping-cart fs-5'></i><span className='bg-main text-white px-2 rounded-5 position-absolute top-0 end-1'>{numOfCartItems}</span></Link>
       </li> 
        <li className="nav-item ms-3 position-relative">
          <Link className="nav-link" to="/wishlist"><i className='fa-solid fa-heart text-danger fs-4'></i></Link>
        </li>
       </>
       : <>
        
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
        </li>
        
        </> }
        
      
       
      </ul>
    </div>
  </div>
</nav>
  </>
  )
};
  

