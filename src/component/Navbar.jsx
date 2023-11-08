import React, { useState } from "react";
import logo from "../assets/logo.png";
import query from "../assets/query.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function Navbar() {
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let isUserLoggedIn = localStorage.getItem("isLoggedIn");
  let userRole = localStorage.getItem("role");

  async function logout() {
    await dispatch({ type: "LOGOUT" });
    window.location.reload(true);
    toast.success("User SuccessFully Logout");
    navigate("/");
  }

  // Handle Navbar in Small Screen
  function handleMenuBar() {
    if (nav === false) {
      setNav(true);
    }
    if (nav === true) {
      setNav(false);
    }
  }
  return (
    <div
      className="flex items-center justify-between pl-10 pr-10 relative w-full"
      style={{ height: "10vh", backgroundColor: "#04093D" }}
    >
      <div className="flex items-center justify-evenly">
        <div className="w-40">
          <img src={logo} alt="surveykshan" />
        </div>
        <div className="w-10">
          <img src={query} />
        </div>
      </div>

      {/* Menu Bar For Small Screen  */}
      {(isUserLoggedIn == "true" && userRole == "admin") ||
      userRole == "client" ? (
        <div
          className="md:hidden text-white cursor-pointer"
          onClick={handleMenuBar}
        >
          <span className="material-symbols-outlined text-5xl">menu</span>
        </div>
      ) : (
        <></>
      )}

      {/* SideBar for small screen */}
      {nav === true ? (
        <div className="z-50 w-auto h-auto bg-blue-600 top-14 absolute right-4 lg:right-8 p-2 m-2 rounded-md shadow">
          <div className="relative p-6">
            {/* <div>
              <span class="cursor-pointer material-symbols-outlined absolute right-2 top-2 text-black text-4xl font-bold ml-5">
                cancel
              </span>
            </div> */}
            <div>
              <ul className="flex flex-col items-center justify-center text-white gap-5 font-bold text-xl">
                {(isUserLoggedIn == "true" && userRole == "admin") ||
                userRole == "client" ? (
                  <>
                    <li
                      onClick={() => setNav(false)}
                      className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded"
                    >
                      <Link to="/">DashBoard</Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
                {isUserLoggedIn == "true" && userRole == "client" ? (
                  <>
                    <li
                      onClick={() => setNav(false)}
                      className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded"
                    >
                      <Link to="/queries">All Queries</Link>
                    </li>
                    <li
                      onClick={() => setNav(false)}
                      className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded"
                    >
                      <Link to="/addQuery">Add Query</Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
                {isUserLoggedIn == "true" && userRole == "admin" ? (
                  <>
                    <li
                      onClick={() => setNav(false)}
                      className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded"
                    >
                      <Link to="/all-queries">All Queries</Link>
                    </li>
                    <li
                      onClick={() => setNav(false)}
                      className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded"
                    >
                      <Link to="/adminaddquery">Add Query</Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
                {(isUserLoggedIn == "true" && userRole == "admin") ||
                userRole == "client" ? (
                  <>
                    <li
                      onClick={() => setNav(false)}
                      className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded"
                    >
                      <Link onClick={logout}>Logout</Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* Menu Bar For Big Screen  */}
      <div className="hidden md:block text-white">
        <ul className="flex items-center justify-center text-white gap-5 pl-5 font-bold text-xl">
          {(isUserLoggedIn == "true" && userRole == "admin") ||
          userRole == "client" ? (
            <>
              <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
                <Link to="/">DashBoard</Link>
              </li>
            </>
          ) : (
            <></>
          )}
          {isUserLoggedIn == "true" && userRole == "client" ? (
            <>
              <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
                <Link to="/queries">All Queries</Link>
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
                <Link to="/all-queries">All Queries</Link>
              </li>
              <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
                <Link to="/adminaddquery">Add Query</Link>
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
