import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowRole }) {
  let isUserLoggedIn = localStorage.getItem("isLoggedIn");
  let userRole = localStorage.getItem("role");
  return (
    <div>
      {isUserLoggedIn && allowRole?.find((myrole) => myrole === userRole) ? (
        <Outlet />
      ) : isUserLoggedIn ? (
        <Navigate to="/denied" />
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}

export default RequireAuth;
