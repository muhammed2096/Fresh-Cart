// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function Orders({userToken}) {
//   const [allOrders, setAllOrders] = useState(null);

//   async function getAllOrders() {
//     const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${userToken}`);
//     setAllOrders(data);
//   }

//   useEffect(() => {
//     getAllOrders();
//   }, []);

//   return <>
//   {allOrders ?     <section className='py-5'>
//       <div className="container">
//           <h2>Your Orders</h2>
//           <div className="row">
//               {allOrders && allOrders.data.map((order, i) => (
//                 <div key={i} className="col-md-12">
//                     <div className="order p-4 bg-white rounded shadow-sm mb-5">
//                       <div className="order-info bg-light p-2 d-flex justify-content-between">
//                         <div>
//                           <span className='text-black-50'>createdAt</span>
//                           <p className='fw-bold'>{order.createdAt}</p>
//                         </div>
//                         <div>
//                           <span className='text-black-50'>isDelivered</span>
//                           <p className='fw-bold'>{order.isDelivered ? "yes" : "no"}</p>
//                         </div>
//                         <div>
//                           <span className='text-black-50'>isPaid</span>
//                           <p className='fw-bold'>{order.isPaid?"yes":"no"}</p>
//                         </div>
//                         <div>
//                           <span className='text-black-50'>paymentMethodType</span>
//                           <p className='fw-bold'>{order.paymentMethodType}</p>
//                         </div>
//                       </div>
//                       <div className="order-items">
//                         {order.cartItems.map((item)=> (
//                           <div className="item-info d-flex">
//                             <img className='' width={150} src={item.product.imageCover} alt="" /> 
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                ))}

//           </div>
//         </div>
//     </section> : <div className='text-center'><h2 className='fw-bold'>OPS... There's no orders for you :D</h2></div>}
//     </>
// }
 


import React, { useEffect, useState } from "react";

import { Helmet } from "react-helmet";

import axios from "axios";
import jwtDecode from "jwt-decode";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  async function getUserOrders(orders) {
    let { data } = await axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${orders}`)
      .then((response) => response)
      .catch((error) => error);
    setOrders(data);
  }

  useEffect(() => {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    getUserOrders(decodedToken.id);
  }, []);

  return (
    <>
      <Helmet>
        <meta name="description" content="" />
        <title>All Orders</title>
      </Helmet>
      <h3 className="text-center mt-3 fw-bolder">
        Welcome {orders[0]?.user.name} To All Orders
      </h3>

      {orders.length !== 0 ? (
        orders?.map((order) => {
          return (
            <>
              <div className="my-3">
                <div key={order._id} className="row my-3 g-3 p-3  border-main">
                  {order.cartItems.map((element) => {
                    return (
                      <>
                        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-2 ">
                          <div className="shadow-sm border rounded-2 p-2">
                            <img
                              height={200}
                              src={element.product.imageCover}
                              className="w-100"
                              alt={element.product.title}
                            />
                            <h2 className="h5 text-center fw-semibold text-main mt-3">
                              {element.product.brand.name}
                            </h2>
                            <h2 className="h5 text-center fw-semibold text-main my-2">
                              {element.product.title
                                .split(" ")
                                .slice(0, 1)
                                .join(" ")}
                            </h2>
                            <h2 className="h5 text-center fw-semibold my-2">
                              Count :{" "}
                              <span className="text-main">{element.count}</span>
                            </h2>
                            <h2 className="h5 text-center fw-semibold my-3">
                              Price :{" "}
                              <span className="text-main">
                                {element.price} EGP
                              </span>
                            </h2>
                          </div>
                        </div>
                      </>
                    );
                  })}
                  <div className="col-md-12 px-3 py-2 bg-main-light rounded-4">
                    <h2 className="h5  fw-semibold my-3">
                      Total Price :{" "}
                      <span className="text-main">
                        {order.totalOrderPrice} EGP
                      </span>
                    </h2>
                    <h2 className="h5  fw-semibold my-3">
                      Taxies Price :{" "}
                      <span className="text-main">{order.taxPrice} EGP</span>
                    </h2>
                    <h2 className="h5  fw-semibold my-3">
                      Payment Method :{" "}
                      <span className="text-main">
                        {order.paymentMethodType}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
         
            </>
          );
        })
      ) : (
        <h5 className="text-center text-main my-3">this page is empty yet</h5>
      )}
    </>
  );
}