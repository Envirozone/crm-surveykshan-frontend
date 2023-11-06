import axios from "axios";
import { useState, useEffect } from "react";

function AdminDashboard() {
  const data = localStorage.getItem("data");
  const objData = JSON.parse(data);
  const [statusData, setStatusData] = useState({});

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `${window.apiURL}/admin/getTicketCountOfAllStatus/tickets`,
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
    <div className="flex gap-10 justify-center">
      <div className="mt-16 flex flex-wrap justify-center items-center gap-16">
        <div className="h-48 w-48 bg-red-600 rounded-lg shadow-md shadow-black hover:shadow-lg hover:shadow-black cursor-pointer flex justify-center items-center flex-col">
          <span className="material-symbols-outlined text-5xl">
            pending_actions
          </span>
          <h1 className="p-3 text-center font-bold bg-white m-3 rounded-lg">
            Pending Ticket
          </h1>
          <h2 className="text-5xl text-center font-bold">
            {statusData.pendingTicketsCounts}
          </h2>
        </div>
        <div className="h-48 w-48 bg-green-600 rounded-lg shadow-md shadow-black hover:shadow-lg hover:shadow-black cursor-pointer flex justify-center items-center flex-col">
          <span className="material-symbols-outlined text-5xl">task</span>

          <h1 className="p-3 text-center font-bold bg-white m-3 rounded-lg">
            Completed Ticket
          </h1>
          <h2 className="text-5xl text-center font-bold">
            {statusData.resolvedTicketsCounts}
          </h2>
        </div>
        <div className="h-48 w-48 bg-yellow-400 rounded-lg shadow-md shadow-black hover:shadow-lg hover:shadow-black cursor-pointer flex justify-center items-center flex-col">
          <span className="material-symbols-outlined text-5xl">
            event_repeat
          </span>

          <h1 className="p-3 text-center font-bold bg-white m-3 rounded-lg">
            In Progress Ticket
          </h1>
          <h2 className="text-5xl text-center font-bold">
            {statusData.inProgressTicketsCounts}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
