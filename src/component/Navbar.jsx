import React from "react";
import logo from "../assets/logo.png";
import query from "../assets/query.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let isUserLoggedIn = localStorage.getItem("isLoggedIn");
  let userRole = localStorage.getItem("role");
  // console.log(isUserLoggedIn, userRole);

  async function logout() {
    await dispatch({ type: "LOGOUT" });
    toast.success("User SuccessFully Logout");
    navigate("/");
  }
  return (
    <div
      className="flex items-center justify-between pl-10 pr-10"
      style={{ height: "10vh", backgroundColor: "#04093D" }}
    >
      <div className="flex items-center justify-evenly">
        <div className="w-40">
          <Link to={"/dashboard"}>
            <img src={logo} alt="surveykshan" />
          </Link>
        </div>
        <div className="w-10">
          <img src={query} />
        </div>
      </div>
      <div>
        <ul className="flex items-center justify-center text-white gap-5 pl-5 font-bold text-xl">
          {isUserLoggedIn == "true" && userRole == "client" ? (
            <>
              <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
                <Link to="/user/dashboard">DashBoard</Link>
              </li>
              <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
                <Link to="/queries">Queries</Link>
              </li>
              <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
                <Link to="/addQuery">Add Query</Link>
              </li>
            </>
          ) : (
            <></>
          )}
          {isUserLoggedIn == "true" && userRole == "admin" ? (
            <>
              <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
                <Link to="/admin/dashboard">Admin DashBoard</Link>
              </li>
              <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
                <Link to="/all-queries">All Queries</Link>
              </li>
            </>
          ) : (
            <></>
          )}
          {(isUserLoggedIn == "true" && userRole == "admin") ||
          userRole == "client" ? (
            <>
              <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
                <Link onClick={logout}>Logout</Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
