import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Queries() {
  const [allQuery, setAllQuery] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [totalQuery, setTotalQuery] = useState("");

  async function getAllQueriesData() {
    // setLoading(true);
    try {
      let res;
      if (statusFilter) {
        res = await axios(`${window.apiURL}/ticket/getTicket/${statusFilter}`, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json", // You can set other headers as needed
          },
        });
      } else {
        res = await axios(`${window.apiURL}/ticket`, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json", // You can set other headers as needed
          },
        });
      }
      if (res.status === 200) {
        setAllQuery(res.data.ticketDataByStatus);
        setTotalQuery(res.data.length);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  }
  useEffect(() => {
    getAllQueriesData();
  }, [statusFilter]);
  const handleChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md rounded-lg m-4 flex flex-col lg:flex-row items-center justify-between p-2 border border-blue-300">
        <h2 className="text-3xl font-extrabold">
          All Tickets {`(${totalQuery})`}
        </h2>
        <div className="">
          {/* <input
            type="text"
            id="first_name"
            className="bg-gray-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 mr-2 "
            placeholder="Search By title "
          /> */}
          <select
            onChange={handleChange}
            id="countries"
            className="bg-gray-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 mr-2"
            defaultValue={""}
          >
            <option value="">Choose By Status</option>
            <option value="pending">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <Link to="/addQuery">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none mt-4 lg:mt-0"
            >
              Add Query
            </button>
          </Link>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Token
              </th>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Industry Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Query Title
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {allQuery &&
              allQuery.map((query) => {
                return (
                  <tr
                    key={query._id}
                    className="bg-white border-b   hover:bg-gray-50 "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {query._id}
                    </th>
                    <td className="px-6 py-4">{query.user_name}</td>
                    <td className="px-6 py-4">{query.industry_name}</td>
                    <td className="px-6 py-4">{query.phone}</td>
                    <td className="px-6 py-4">{query.query_title}</td>
                    <td
                      style={
                        query.status === "pending"
                          ? {
                              textDecoration: "underline",
                              textDecorationColor: "red",
                              textDecorationThickness: "0.3em",
                            }
                          : query.status === "inProgress"
                          ? {
                              textDecoration: "underline",
                              textDecorationColor: "yellow",
                              textDecorationThickness: "0.3em",
                            }
                          : {
                              textDecoration: "underline",
                              textDecorationColor: "green",
                              textDecorationThickness: "0.3em",
                            }
                      }
                      className="px-6 py-4"
                    >
                      {query.status === "inProgress"
                        ? "In Progress"
                        : query.status === "pending"
                        ? "Pending"
                        : query.status === "resolved"
                        ? "Resolved"
                        : ""}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/queries/${query._id}`}
                        className="font-medium text-blue-600  hover:underline"
                      >
                        More Info
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Queries;
