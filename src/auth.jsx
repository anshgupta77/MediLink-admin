import  {Outlet, Navigate, useLocation}  from "react-router-dom";
import React from "react";
export const AdminAuth = () => {
    const atoken = localStorage.getItem("aToken")
    const location = useLocation();
    return ( 
        atoken ? <Outlet /> : <Navigate to="/" state={{from : location.pathname}} replace></Navigate>
     );
}

export const DoctorAuth = () => {
    const dtoken = localStorage.getItem("dToken")
    const location = useLocation();
    return ( 
        dtoken ? <Outlet /> : <Navigate to="/" state={{from : location.pathname}} replace></Navigate>
     );
}

