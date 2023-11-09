import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";

function AdminDashboard() {
  const data = localStorage.getItem("data");
  const objData = JSON.parse(data);
  const [statusData, setStatusData] = useState({});
  const [industryCounts, setIndustryCounts] = useState();
  const selectedIndustry = useRef(null);
  const [allIndustries, setAllIndustries] = useState([]);
  const [indus, setIndus] = useState("all");

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `${window.apiURL}/admin/getIndustryTicketStatus/${indus}`
      );
      setStatusData(res.data);
    })();
  }, [indus]);

  useEffect(() => {
    (async () => {
      try {
        let res = await axios(
          `${window.apiURL}/industry/getAllIndustriesIdsAndNames`
        );
        if (res.status === 200) {
          setAllIndustries(res?.data?.data);
          setIndustryCounts(res?.data?.data?.length);
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col gap-10 justify-center">
      {/* // Header Total Industry Show  */}
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

      {/* // Industry Selection Option  */}
      <div className="px-8">
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

      {/* // Showing Ticket Box  */}
      <div className="mt-8 flex flex-wrap justify-center items-center gap-16">
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
