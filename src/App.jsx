 
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Notfound from './components/Notfound/Notfound';
import Brands from './components/Brands/Brands';
import { useContext, useEffect } from 'react';
import { tokenContext } from './Context/tokenContext';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Details from './components/Details/Details';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOut from './components/CheckOut/CheckOut';
import WishList from './components/WishList/WishList';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Orders from './components/Orders/Orders';
import ResetPassword from './components/ResetPassword/ResetPassword';





let router = createBrowserRouter([
  {
    path:'', element: <Layout/>, children: [
    {index:true, element:<ProtectedRoutes><Home/></ProtectedRoutes>},
    {path:'product', element:<ProtectedRoutes><Products/></ProtectedRoutes>},
    {path:'cart', element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
    {path:'categories', element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
    {path:'brands', element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
    {path:'details/:id', element:<ProtectedRoutes><Details/></ProtectedRoutes>},
    {path:'checkOut', element:<ProtectedRoutes><CheckOut/></ProtectedRoutes>},
    {path:'wishlist', element:<ProtectedRoutes><WishList/></ProtectedRoutes>},
    {path:'orders', element:<ProtectedRoutes><Orders/></ProtectedRoutes>},
    {path:'register', element:<Register/>},
    {path:'login', element:<Login/>},
    {path:'forgotPassword', element:<ForgotPassword/>},
    {path:'resetPassword', element:<ResetPassword/>},
    {path:'*', element:<Notfound/>}
  ]}
])

function App() {

  let {setToken} = useContext(tokenContext)

useEffect(()=> {
  if(localStorage.getItem("userToken")){
        setToken(localStorage.getItem("userToken"))
  }
},[])

  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer />
    </>
  );
}

export default App;
 // {path:'forgotPassword', element:<ForgotPassword/>},