import axios from "axios";
import React, { useEffect, useState } from "react";

function UserDashBoard() {
  const data = localStorage.getItem("data");
  const objData = JSON.parse(data);
  const [statusData, setStatusData] = useState({});

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `${window.apiURL}/ticket/getTicketCountOfAllStatus/tickets`,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        }
      );
      setStatusData(res.data);
    })();
  }, []);

  return (
    <div>
      <div>
        <div className="mt-16 flex justify-center items-center gap-16">
          <div className="h-48 w-48 bg-blue-400 rounded-lg shadow-md shadow-black hover:shadow-lg hover:shadow-black">
            <h1>Pending Ticket</h1>
            <h2>{statusData.pendingTicketsCounts}</h2>
          </div>
          <div className="h-60 w-48 bg-blue-400 rounded-lg shadow-md shadow-black hover:shadow-lg hover:shadow-black">
            <h1>Completed Ticket</h1>
            <h2>{statusData.resolvedTicketsCounts}</h2>
          </div>
          <div className="h-48 w-48 bg-blue-400 rounded-lg shadow-md shadow-black hover:shadow-lg hover:shadow-black">
            <h1>In Progress Ticket</h1>
            <h2>{statusData.inProgressTicketsCounts}</h2>
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            <h1>UserName: {objData.username}</h1>
            <h1>Industry: {objData.industry}</h1>
            <h1>Email: {objData.email}</h1>
            <h1>Phone: {objData.phone}</h1>
            <h1>State: {objData.state}</h1>
            <h1>City: {objData.city}</h1>
            <h1>Address: {objData.address}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashBoard;
