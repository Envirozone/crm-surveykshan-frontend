import axios from "axios";
import { useEffect, useState } from "react";

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
    <div className="flex flex-col justify-center items-center lg:flex-row gap-10">
      <div className="mt-16 flex flex-wrap justify-center items-center gap-16 w-1/2">
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

      <div className="w-auto lg:w-1/2 lg:mr-10 shadow-lg mt-11 p-7 flex justify-center items-center border border-blue-300 rounded-lg">
        <div
          className="flex flex-col w-80 lg:w-auto overflow-auto"
          // style={{ wordWrap: "break-word" }}
        >
          <div>
            <div className="flex gap-5 p-1">
              <div>
                <p className="font-medium text-black-600 text-2xl">
                  UserName:{" "}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">
                  {objData.username}
                </p>
              </div>
            </div>
            <div className="my-2 bg-blue-300" style={{ height: "1px" }}></div>
          </div>

          <div>
            <div className="flex gap-5 p-1">
              <div>
                <p className="font-medium text-black-600 text-2xl">
                  Industry Name:{" "}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">
                  {objData.industry}
                </p>
              </div>
            </div>
            <div className="my-2 bg-blue-300" style={{ height: "1px" }}></div>
          </div>

          <div>
            <div className="flex gap-5 p-1 w-full">
              <div>
                <p className="font-medium text-black-600 text-2xl">Email: </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">
                  {objData.email}
                </p>
              </div>
            </div>
            <div className="my-2 bg-blue-300" style={{ height: "1px" }}></div>
          </div>

          <div>
            <div className="flex gap-5 p-1">
              <div>
                <p className="font-medium text-black-600 text-2xl">
                  Phone No.:{" "}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">
                  {objData.phone}
                </p>
              </div>
            </div>
            <div className="my-2 bg-blue-300" style={{ height: "1px" }}></div>
          </div>

          <div>
            <div className="flex gap-5 p-1">
              <div>
                <p className="font-medium text-black-600 text-2xl">State: </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">
                  {objData.state}
                </p>
              </div>
            </div>
            <div className="my-2 bg-blue-300" style={{ height: "1px" }}></div>
          </div>

          <div>
            <div className="flex gap-5 p-1">
              <div>
                <p className="font-medium text-black-600 text-2xl ">City: </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">
                  {objData.city}
                </p>
              </div>
            </div>
            <div className="my-2 bg-blue-300" style={{ height: "1px" }}></div>
          </div>

          <div>
            <div className="flex gap-5 p-1">
              <div>
                <p className="font-medium text-black-600 text-2xl">Address: </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">
                  {objData.address}
                </p>
              </div>
            </div>
            <div className="my-2 bg-blue-300" style={{ height: "1px" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashBoard;
