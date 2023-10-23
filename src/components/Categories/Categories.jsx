import React from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner'
import { Helmet } from 'react-helmet';

function Categories(){

  function getCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
 }
let {data, isLoading} = useQuery("allCategories", getCategories)


return(
  <>
  <Helmet>
        <meta name="description" content="" />
        <title>Categories</title>
      </Helmet>
  <section className='text-center text-main my-5'>
  <div className="container"> 
  {isLoading ? <BallTriangle height={100}  width={100} radius={5} color="#1060bc" ariaLabel="ball-triangle-loading" wrapperClass={"justify-content-center align-items-center vh-100"}  wrapperStyle="" visable="true" /> :
  <div className="row">
      {data?.data?.data.map((ele)=>
      <div className="col-md-4 my-3">
      <img height={300} className='w-100' src={ele.image} alt=""  />
      <div className='rounded-bottom bg-white shadow p-3'>
      <h3 className='fw-bold'>{ele.name}</h3>
      </div>
    </div>
      )}
    </div>}
  </div>
  </section>
  </>
)
  
};


export default Categories;
