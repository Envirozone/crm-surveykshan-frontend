import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function AddQuery() {
  const [other, setOther] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function formHandle(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${window.apiURL}/ticket/addTicket`,
        { payload: { query_title: title, query_description: description } },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 201) {
        toast.success(res.data.message);
        setTitle("");
        setDescription("");
        setOther(false);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  }

  // handle Radio Form
  const handleRadioForm = async (e) => {
    e.preventDefault();
    setOther(true);
  };

  const handleBackButton = async () => {
    setOther(false);
    setTitle("");
  };

  return (
    <div>
      {/* Add Query Header Section  */}
      <div className="relative border border-blue-400 overflow-x-auto shadow-md rounded-lg m-4 flex justify-between p-2">
        <h2 className="text-4xl font-extrabold">Add Query</h2>
        <Link to="/queries">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 mr-2 focus:outline-none"
          >
            All Query
          </button>
        </Link>
      </div>

      {/* Add Query Below Section  */}
      {other === true ? (
        <div className="shadow-lg m-5 p-8 relative">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none absolute top-3 right-6"
            onClick={handleBackButton}
          >
            Back
          </button>
          <form onSubmit={formHandle}>
            <label
              htmlFor="title"
              className="block mb-2 text-lg font-bold text-gray-900"
            >
              Query Title
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5"
              placeholder="Enter Your Query Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label
              htmlFor="message"
              className="block mb-2 text-lg font-bold text-gray-900"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-4"
              placeholder="Write your problem here..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none w-full"
            >
              Make Query
            </button>
          </form>
        </div>
      ) : (
        <div className="shadow-lg m-5 p-8">
          <form className="flex flex-col gap-3" onSubmit={handleRadioForm}>
            <div className="flex items-center pl-4 border border-gray-200 rounded">
              <input
                id="bordered-radio-1"
                type="radio"
                name="bordered-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                value={"Error In Data Logger"}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label
                htmlFor="bordered-radio-1"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
              >
                Error In Data Logger
              </label>
            </div>
            <div className="flex items-center pl-4 border border-gray-200 rounded">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                value={"Error In PCB"}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label
                htmlFor="bordered-radio-2"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
              >
                Error In PCB
              </label>
            </div>
            <div className="flex items-center pl-4 border border-gray-200 rounded">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                value={"Error In CPCB"}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label
                htmlFor="bordered-radio-2"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
              >
                Error In CPCB
              </label>
            </div>
            <div className="flex items-center pl-4 border border-gray-200 rounded">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                value={"Error In Totailizer"}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label
                htmlFor="bordered-radio-2"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
              >
                Error In Totailizer
              </label>
            </div>
            <div className="flex items-center pl-4 border border-gray-200 rounded">
              <input
                id="bordered-radio-2"
                type="radio"
                value={other}
                onChange={() => setTitle("")}
                name="bordered-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor="bordered-radio-2"
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900"
              >
                Other
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none w-full mt-4"
              >
                Make Query
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddQuery;
