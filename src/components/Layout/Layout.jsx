import React from 'react';


import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';
import { Detector } from "react-detect-offline";


export default function Layout(){
  return(
    <>
    <Navbar/>

    <Detector
  render={({ online }) => (
    // <div className={online ? "normal" : "warning"}>
    //   You are currently {online ? "online" : "offline"}
    // </div> 
      <div className={`${online ? "alert-success" : "alert-warring"} alert  alert-dismissible fade show`} role='alert'>
        <strong><i className='fa-solid fa-wifi'></i></strong>You are currently {online ? "online" : "offline"}
        <button type='button' className='btn-close' data-bs-dismiss='alert' aria-label='close' ></button>
      </div>
    
  )}
/>

    <Outlet/>




    <Footer/>
  </>
  )
    
};



 
