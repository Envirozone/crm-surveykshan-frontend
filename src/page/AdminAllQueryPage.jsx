import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function AdminAllQueryPage() {
  const [allQuery, setAllQuery] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [totalQuery, setTotalQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [tokenValue, setTokenValue] = useState("");
  const [tokenFilter, setTokenFilter] = useState("");

  async function getAllQueriesData() {
    // setLoading(true);
    try {
      let res;
      if (statusFilter && searchFilter) {
        res = await axios(
          `${window.apiURL}/admin/getTicketOnSearchStatusFilter/${searchFilter}/${statusFilter}`
        );
      } else if (statusFilter) {
        res = await axios(
          `${window.apiURL}/admin/getTicketByStatus/${statusFilter}`
        );
      } else if (searchFilter) {
        res = await axios(
          `${window.apiURL}/admin/getTicketOnSearchFilter/${searchFilter}`
        );
      } else if (tokenFilter) {
        res = await axios(
          `${window.apiURL}/admin/getTicketByTicketId/${tokenFilter}`
        );
      } else {
        res = await axios(`${window.apiURL}/admin/getAllTicket`);
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
  }, [statusFilter, searchFilter, tokenFilter]);
  const handleChange = (e) => {
    setStatusFilter(e.target.value);
  };
  const handleSearch = (e) => {
    setSearchFilter(e.target.value);
  };
  const handleTokenSearch = (e) => {
    e.preventDefault();
    setTokenFilter(tokenValue);
  };
  const handleDeleteTicket = async (id) => {
    Swal.fire({
      title: "Delete Confirmation",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(
            `${window.apiURL}/admin/deleteTicketById/${id}`
          );
          if (res.status === 200) {
            Swal.fire("Deleted!", "The ticket has been deleted.", "success");
            getAllQueriesData();
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire("Something went wrong");
        } else {
          Swal.fire("Something went wrong");
        }
      });
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4 flex items-center justify-between p-2 border border-blue-300">
        <h2 className="text-3xl font-extrabold">
          All Tickets {`(${totalQuery})`}
        </h2>
        <div className="flex justify-center items-center">
          <button
            onClick={() => window.location.reload()}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
          >
            Refresh
          </button>
          {/* <span className="material-symbols-outlined">refresh</span> */}
          <div className=" rounded-lg mr-2 border border-grey-300 p-1">
            <form className="flex items-center" onSubmit={handleTokenSearch}>
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  onChange={(e) => setTokenValue(e.target.value)}
                  value={tokenValue}
                  className="bg-grey-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Search By Token"
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>

          <input
            onChange={handleSearch}
            type="search"
            id="first_name"
            className="bg-gray-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 mr-2 "
            placeholder="Search By user or industry"
          />
          <select
            onChange={handleChange}
            id="countries"
            className="bg-gray-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2 mr-2"
            defaultValue={""}
          >
            <option value="">Choose a Status</option>
            <option value="pending">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <Link to="/adminaddquery">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
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
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
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

                    <td className="px-6 py-4 text-left">
                      <Link
                        to={`/all-queries/${query._id}`}
                        className="font-medium text-blue-600  hover:underline"
                      >
                        More Info
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-left ">
                      <button onClick={() => handleDeleteTicket(query._id)}>
                        <span className="material-symbols-outlined text-red-500 font-bold-100">
                          delete
                        </span>
                      </button>
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

export default AdminAllQueryPage;
