import React from 'react';
import styles from './Brands.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

function Brands(){
  function getBrands(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
 }
let {data, isLoading} = useQuery("allBrands", getBrands)

return(
  <>
  <Helmet>
        <meta name="description" content="" />
        <title>Brands</title>
      </Helmet>
  <section className='text-center text-main my-5'>
  <div className="container"> 
  {isLoading ? <BallTriangle height={100}  width={100} radius={5} color="#1060bc" ariaLabel="ball-triangle-loading" wrapperClass={"justify-content-center align-items-center vh-100"}  wrapperStyle="" visable="true" /> :
  <div className="row">
      {data?.data?.data.map((ele)=>
      <div className="col-md-3 my-3">
      <img  className='w-100' src={ele.image} alt=""  />
      <div className='rounded-bottom bg-white shadow p-3'>
      <p>{ele.name}</p>
      </div>
    </div>
      )}
    </div>}
  </div>
  </section>
  </>
)

};


export default Brands;
