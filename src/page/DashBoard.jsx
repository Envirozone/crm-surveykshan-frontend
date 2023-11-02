import React from "react";
import Navbar from "../component/Navbar";

function DashBoard() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="mt-16 flex justify-center items-center gap-16">
          <div className="h-48 w-48 bg-blue-400 rounded-lg shadow-lg shadow-black">
            <h1></h1>
          </div>
          <div className="h-60 w-48 bg-blue-400 rounded-lg shadow-lg shadow-black"></div>
          <div className="h-48 w-48 bg-blue-400 rounded-lg shadow-lg shadow-black"></div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default DashBoard;
