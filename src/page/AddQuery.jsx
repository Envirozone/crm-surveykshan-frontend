import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function AddQuery() {
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
      }
    } catch (error) {
      toast.error("Somthing Went Wrong, Please Try Again!!");
    }
  }

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-4 flex justify-between p-2">
        <h2 className="text-4xl font-extrabold">Add Query</h2>
        <Link to="/queries">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 mr-2 mb-2 focus:outline-none"
          >
            All Query
          </button>
        </Link>
      </div>

      <div className="shadow-lg m-5 p-8">
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

        <div>
          <form onSubmit={formHandle}>
            <label
              htmlFor="message"
              className="block mb-2 text-lg font-bold text-gray-900"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-8"
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
      </div>
    </div>
  );
}

export default AddQuery;
