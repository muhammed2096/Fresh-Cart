// import { useFormik } from "formik";
// import React, { useContext } from "react";
// import { cartContext } from "../../Context/CartContext";


// function CheckOut(){
//     let {onlinePayment} = useContext(cartContext)
//  async   function payment(values){
//      let {data} = await   onlinePayment(values)
//     window.location.href = data.session.url
//     }
//     let formik = useFormik({
//         initialValues : {
//             "details" : "",
//             "phone" : "",
//             "city" : ""
//         }, onSubmit: payment
//     })
//     return(
//         <>
//         <div className="container vh-100 py-5">
//             <div className="mx-auto bg-main-light p-5">
//                <h2 className="fw-bold pb-3 border-bottom">Shipping Address</h2> 
//                <form className="w-100 mx-auto" onSubmit={formik.handleSubmit}>
//       <div className="form-group mb-3">
//         <label htmlFor="details">Details:</label>
//         <input type="text"  id='details' className='form-control' name='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
//        {formik.errors.details && formik.touched.details ?  <p className="text-danger">{formik.errors.details}</p> : ""}
//         </div>
//         <div className="form-group mb-3">
//         <label htmlFor="phone">Phone:</label>
//         <input type="tel"  id='phone' className='form-control' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
//         {formik.errors.phone && formik.touched.phone ?  <p className="text-danger">{formik.errors.phone}</p> : ""}
//         </div>
//         <div className="form-group mb-3">
//         <label htmlFor="city">City:</label>
//         <input type="text"  id='city' className='form-control' name='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
//         {formik.errors.city && formik.touched.city ?  <p className="text-danger">{formik.errors.city}</p> : ""}
//         </div>
        
//         {/* {isLoading ?  <button disabled= {!(formik.isValid && formik.dirty)} className='btn bg-main text-white ms-auto d-block'><i className='fa fa-spin fa-spinner'></i></button> :
//       } */}
     
//        <button className='btn bg-main text-white w-100'>Pay Now :D</button> 
//     </form>
//             </div>
//         </div>
//         </>
//     )
// }


// export default CheckOut;


import React, { useContext, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
import { BallTriangle } from "react-loader-spinner";

export default function CheckOut() {
  let { onlinePayment, cartId } = useContext(cartContext);
let {isLoading} = useState()
  async function handleAddressSubmit(values) {
    let response = await onlinePayment(cartId, "http://localhost:3000", values)
      .then((response) => response)
      .catch((error) => error);

    window.location.href = response?.data.session.url;
  }
  let phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  let validationSchema = Yup.object({
    details: Yup.string()
      .min(3, "details minLength is 3")
      .max(100, "details maxLength is 100")
      .required("details is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("phone is required"),
    city: Yup.string()
      .min(3, "city minLength is 3")
      .max(30, "city maxLength is 100")
      .required("city is required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: handleAddressSubmit,
  });
  return (
    <>
      <Helmet>
        <meta name="description" content="" />
        <title>User Address</title>
      </Helmet>
      <div className="container py-5">
      {isLoading ? <BallTriangle height={100}  width={100} radius={5} color="#1060bc" ariaLabel="ball-triangle-loading" wrapperClass={"justify-content-center align-items-center vh-100"}  wrapperStyle="" visable="true" /> :
      <div className="row userPay g-5 align-items-center">
        <div className="col-md-6">
          <div className="border border-2 rounded-3 p-5">
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="details">Detailed Address :</label>
              <input
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="form-control mb-2"
                name="details"
                id="details"
              />
              {formik.errors.details && formik.touched.details ? (
                <div className="alert alert-danger p-2 mt-2">
                  {formik.errors.details}
                </div>
              ) : (
                ""
              )}

              <label htmlFor="phone">Phone : </label>
              <input
                type="tel"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                className="form-control mb-2"
                id="phone"
                name="phone"
              />
              {formik.errors.phone && formik.touched.phone ? (
                <div className="alert alert-danger p-2 mt-2">
                  {formik.errors.phone}
                </div>
              ) : (
                ""
              )}

              <label htmlFor="city">City : </label>
              <input
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
                className="form-control mb-2"
                id="city"
                name="city"
              />
              {formik.errors.city && formik.touched.city ? (
                <div className="alert alert-danger p-2 mt-2">
                  {formik.errors.city}
                </div>
              ) : (
                ""
              )}

              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn w-100 bg-main text-white mt-2 "
              >
                Pay Now
              </button>
            </form>
          </div>
        </div>
        
      </div>}
      </div>
    </>
  );
}