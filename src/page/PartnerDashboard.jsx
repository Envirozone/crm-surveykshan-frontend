import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";

function PartnerDashboard() {
  const selectedIndustry = useRef(null);
  const [allIndustries, setAllIndustries] = useState([]);
  const [indus, setIndus] = useState("all");
  const [industryCounts, setIndustryCounts] = useState();
  const [ticket, setTicket] = useState({});
  const userData = JSON.parse(localStorage.getItem("data"));

  // Fetching All Industry of Particular Partner
  useEffect(() => {
    (async () => {
      try {
        let res = await axios(
          `${window.apiURL}/partner/getAllIndustryOfPartner/${userData.username}`
        );
        if (res.status === 200) {
          setAllIndustries(res.data.data);
          setIndustryCounts(res.data.length);
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  // Presenting Total Ticket
  useEffect(() => {
    async function getTicketData() {
      try {
        const res = await axios.get(
          `${window.apiURL}/partner/getPartnerIndustryTicketStatus/${userData?.username}/${indus}`
        );
        const ticketData = res.data;
        setTicket({ ...ticketData });
      } catch (error) {
        toast(response.error.message);
        toast(error.message);
      }
    }
    getTicketData();
  }, [indus]);

  return (
    <div className="mb-6">
      {/* // Presenting Total Number of Industry Count of Particular Partner  */}
      <div className="mt-4 mx-8 bg-slate-200 border rounded-lg p-4 relative">
        <h1 className="text-left md:text-center font-bold text-2xl">
          Total Industry : {industryCounts}
        </h1>
        <button
          onClick={() => window.location.reload()}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none absolute top-3 right-5"
        >
          Refresh
        </button>
      </div>
      {/* // Presenting All Industry Of Particular Partner  */}
      <div className="mt-4 px-8">
        {allIndustries ? (
          <Select
            ref={selectedIndustry}
            options={allIndustries.map(({ industry_name, _id }) => {
              return {
                value: `${_id}`,
                label: industry_name,
              };
            })}
            required
            placeholder={`Get Ticket Status By Industry (${industryCounts})`}
            onChange={(e) => {
              selectedIndustry.current.value = e.value;
              setIndus(selectedIndustry.current.value);
            }}
            defaultValue=""
            className="text-blue-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <select
            className="form-select"
            disabled
            defaultValue={""}
            aria-label="Default select example"
          >
            <option value="">Loading...</option>
          </select>
        )}
      </div>

      {/* // Presenting Number of Generated Ticket by Industry */}
      <div className="mt-8 flex flex-wrap justify-center items-center gap-16">
        <div className="h-48 w-48 bg-red-600 rounded-lg shadow-md shadow-black hover:shadow-lg hover:shadow-black cursor-pointer flex justify-center items-center flex-col">
          <span className="material-symbols-outlined text-5xl">
            pending_actions
          </span>
          <h1 className="p-3 text-center font-bold bg-white m-3 rounded-lg">
            Pending Ticket
          </h1>
          <h2 className="text-5xl text-center font-bold">
            {ticket?.pendingTicketsCounts}
          </h2>
        </div>
        <div className="h-48 w-48 bg-green-600 rounded-lg shadow-md shadow-black hover:shadow-lg hover:shadow-black cursor-pointer flex justify-center items-center flex-col">
          <span className="material-symbols-outlined text-5xl">task</span>

          <h1 className="p-3 text-center font-bold bg-white m-3 rounded-lg">
            Completed Ticket
          </h1>
          <h2 className="text-5xl text-center font-bold">
            {ticket?.resolvedTicketsCounts}
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
            {ticket?.inProgressTicketsCounts}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default PartnerDashboard;
