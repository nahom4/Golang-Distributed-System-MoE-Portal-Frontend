import React from "react";
import { useLocation } from "react-router";
import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectRoutes() {
  let auth = true;

  let token = localStorage.getItem("token");
  token = 'token'
  // if (token){

  //   let decodedToken = jwtDecode(token);
  //   let currentDate = new Date();
  
  //   console.log(currentDate.getTime(), decodedToken.exp);
  //   // JWT exp is in seconds
  //   if (decodedToken.exp * 1000 < currentDate.getTime()) {
  //     console.log("Token expired.");
  //     auth = false;
  //   } else {
  //     console.log("Valid token");
  //     auth = true;
  //   }
  //   auth = true;
  // }

  // const location = useLocation();
  return auth ? <Outlet /> : <Navigate to="/login" replace />;
}
