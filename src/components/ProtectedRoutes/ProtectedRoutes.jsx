import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';


function ProtectedRoutes(props){
    let navigate = useNavigate()
    if(localStorage.getItem("userToken")){
           return props.children
    }else{
        // navigate("/login")
        return <Navigate to={"/login"}/>
    }
    
};



export default  ProtectedRoutes;