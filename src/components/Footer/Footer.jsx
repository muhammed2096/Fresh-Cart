import React from 'react';
import amazon from "../images/Amazon_Pay_logo.svg.png"
import americanExpress from "../images/02.png"
import mastercardicon from "../images/05.png"
import viza from "../images/06.png"

import appStore from "../images/app-store.svg"

import playStore from "../images/google-play.svg"


export default function Footer(){
  return(
    <>
    <section className='py-5 bg-light'>
    <div className="container">
      <h2>Get the FreshCart app</h2>
      <p>We will send you a link, open it on your phone to download the app</p>
      <div className="row">
      <div className="col-md-9 pb-4">
      <input type="Email"  id='email' className='form-control' name='email' placeholder='Email...'/>
      </div>
      <div className="col-md-3"><button  className='btn bg-main text-white '>Share App Link</button></div>
      </div>
      <div className="col-md-12 d-flex justify-content-between border-bottom border-top mt-4 py-4">
      <div className="d-flex align-items-center">
      <h3 className='fs-6'>Payment Partners</h3>
              <div>
              <img className='px-2' width={100} src={americanExpress} alt="" />
              <img className='px-2' width={100} src={viza} alt="" />
              <img className='px-2' width={100} src={mastercardicon} alt="" />
              </div>
      </div>
      <div className='d-flex justify-content-between align-items-center '>
              <h3 className='fs-6'>Get deliveries with FreshCart</h3>
              <div className='d-flex justify-content-between'>
              <div className='footer-app mx-2'>
              <img className='px-2' src={appStore}  width={150} alt="" />
              </div>
              <div className='footer-app ms-2'>
              <img className='px-2' src={playStore}  width={150} alt="" />
              </div>
              </div>
            </div>
          
      </div>
    </div>
    </section>
    
    </>
  )
}
 
;




