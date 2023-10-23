import React, { useContext, useState } from 'react';

import styles from './Login.module.css';
import { useFormik } from "formik";
import axios from 'axios'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { tokenContext } from '../../Context/tokenContext';
import { Helmet } from 'react-helmet';

function Login(){
  const [isLoading, setIsLoading] = useState(false)
const [apiError, setApiError] = useState("")
let {setToken} = useContext(tokenContext)
let navigate = useNavigate()

 async function login(values){
  setApiError("")
  setIsLoading(true)
     
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err)=>{
      console.log(err);
      setIsLoading(false)
      setApiError(err.response.data.message)
    });
    console.log(data);
    if(data.message == 'success'){
      setIsLoading(false);
      localStorage.setItem("userToken", data.token)
      setToken(data.token)
      navigate("/")
    }
  }

// function validate(values){
//   let errors = {};
//   if(!values.name){
//     errors.name = "Name is required"
//   }else if(values.name.length < 3){
//     errors.name = "Name min length is 3"
//   }else if(values.name.length > 15){
//     errors.name = "Name max length is 15"
//   }

//   if(!values.email){
//     errors.email = "email is required"
//   }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( values.email)){
//     errors.email = "Email is not valid"
//   }

// if(!values.password){
//     errors.password = "Password is required"
//   }else if(!/^[A-Z][a-z0-9]{5,8}$/i.test( values.password)){
//     errors.password = "Password should start with capital letter and min 6"
//   }
  
//   if(!values.rePassword){
//     errors.rePassword = "rePassword is required"
//   }else if(values.rePassword != values.password){
//     errors.rePasswordpassword = "Password and rePassword should match"
//   }
//   if(!values.phone){
//     errors.phone = "phone is required"
//   }else if(!/^01[0125][0-9]{8}$/i.test( values.phone)){
//     errors.phone = "Phone is not valid"
//   }
// return errors
// }

let validationSchema = Yup.object({
  
      email: Yup.string().email("Email is not valid").required("Email is required"),
      password: Yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/, "Password must start with cap letter and not less than 5").required("Password is required"),
     
})

  let formik = useFormik({
    initialValues: {
      
      email: "",
      password: "",

    }, validationSchema:validationSchema,
    onSubmit:(values)=> login(values)
  })
  return(
  <>
  <Helmet>
        <meta name="description" content="" />
        <title>Login</title>
      </Helmet>
    <div className="container vh-100 my-5">
      <h2 className='mb-4'>Login: </h2>
      {apiError ? <div className='alert alert-danger'>{apiError}</div> : ""}
    <form className="w-75 mx-auto" onSubmit={formik.handleSubmit}>
      
        <div className="form-group mb-3">
        <label htmlFor="email">Email:</label>
        <input type="Email"  id='email' className='form-control' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.email && formik.touched.email ?  <p className="text-danger">{formik.errors.email}</p> : ""}
        </div>
        <div className="form-group mb-3">
        <label htmlFor="password">Password:</label>
        <input type="password"  id='password' className='form-control' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.password && formik.touched.password ?  <p className="text-danger">{formik.errors.password}</p> : ""}
        </div>
        <p>Did you <Link className='text-main' to="/forgotPassword">forget your Password ?</Link></p>
        {isLoading ?  <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white ms-auto d-block'><i className='fa fa-spin fa-spinner'></i></button> :
       <button className='btn bg-main text-white ms-auto d-block'>Login</button>  }
     
     
    </form>
  </div>
  </>
  )
}



export default Login;
