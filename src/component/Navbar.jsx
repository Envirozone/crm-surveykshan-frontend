import React from "react";
import logo from "../assets/logo.png";
import query from "../assets/query.png";

function Navbar() {
  return (
    <div
      className="flex items-center justify-between pl-10 pr-10"
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
      <div>
        <ul className="flex items-center justify-center text-white gap-5 pl-5 font-bold text-xl">
          <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
            DashBoard
          </li>
          <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
            Queries
          </li>
          <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
            Add Query
          </li>
          <li className="hover:bg-white hover:text-blue-600 cursor-pointer p-2 rounded">
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
