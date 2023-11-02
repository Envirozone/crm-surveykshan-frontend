import React, { useEffect, useState } from "react";

function DashBoard() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [inprogress, setInprogress] = useState(0);

  useEffect(async () => {
    const pending = await axios.get(`${window.apiURL}/getTicket/pending`, data);
    const completed = await axios.get(
      `${window.apiURL}/getTicket/resolved`,
      data
    );
    const inprogress = await axios.get(
      `${window.apiURL}/getTicket/workingon`,
      data
    );
  }, []);
  return (
    <div>
      <div>
        <div className="mt-16 flex justify-center items-center gap-16">
          <div className="h-48 w-48 bg-blue-400 rounded-lg shadow-lg shadow-black hover:shadow-md hover:shadow-black">
            <h1>Pending Ticket</h1>
          </div>
          <div className="h-60 w-48 bg-blue-400 rounded-lg shadow-lg shadow-black hover:shadow-md hover:shadow-black">
            <h1>Completed Ticket</h1>
          </div>
          <div className="h-48 w-48 bg-blue-400 rounded-lg shadow-lg shadow-black hover:shadow-md hover:shadow-black">
            <h1>In Progress Ticket</h1>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default DashBoard;
