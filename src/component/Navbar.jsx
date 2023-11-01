import React from "react";
import logo from "../assets/logo.png";
import query from "../assets/query.png";
import { Link } from "react-router-dom";

function Navbar() {
  async function logout() {
    console.log("LOGO OUT");
  }
  return (
    <div
      className="flex items-center justify-between pl-10 pr-10"
      style={{ height: "10vh", backgroundColor: "#04093D" }}
    >
      <div className="flex items-center justify-evenly">
        <div className="w-40">
          <Link to={"/"}>
            <img src={logo} alt="surveykshan" />
          </Link>
        </div>
        <div className="w-10">
          <img src={query} />
        </div>
      </div>
      <div>
        <ul className="flex items-center justify-center text-white gap-5 pl-5 font-bold text-xl">
          <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
            <Link to="/dashboard">DashBoard</Link>
          </li>
          <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
            <Link to="/queries">Queries</Link>
          </li>
          <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
            <Link to="/addQuery">Add Query</Link>
          </li>
          <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
            <Link onClick={logout}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
