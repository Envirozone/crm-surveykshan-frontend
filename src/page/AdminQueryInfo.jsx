import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function AdminQueryInfo() {
  const { id } = useParams();
  const [ticketId, setTicketId] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [industryName, setIndustryName] = useState("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);

  const handleCloseQuery = async () => {
    const payload = {
      status: "resolved",
    };

    Swal.fire({
      title: "Query Resolved Confirmation",
      text: "Are you sure want to close this query?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Resolved Query",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.patch(
            `${window.apiURL}/ticket/updateTicket/${id}`,
            {
              payload,
            },
            {
              headers: {
                Authorization: localStorage.getItem("accessToken"),
                "Content-Type": "application/json",
              },
            }
          );

          if (res?.status === 200) {
            Swal.fire(
              "Resolved!",
              "Thank You To Raise Your Problem, Now Your Problem Is Resolved. 😊",
              "success"
            );
            getData();
          }
        }
      })
      .catch((error) => {
        if (error.response.data.message) {
          Swal.fire(error.response.data.message);
        } else {
          Swal.fire(error.message);
        }
      });
  };

  const getData = async () => {
    try {
      const res = await axios.get(`${window.apiURL}/ticket/${id}`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      });
      setTicketId(res?.data[0]?._id);
      setDateTime(new Date(res?.data[0]?.createdAt).toLocaleString());
      setIndustryName(res?.data[0]?.industry_name);
      setStatus(res?.data[0]?.status);
      setTitle(res?.data[0]?.query_title);
      setDescription(res?.data[0]?.query_description);
      setAllMessage(res?.data[0]?.messages);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${window.apiURL}/ticket/addMessage/${id}`,
        {
          payload: {
            message,
          },
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setMessage("");
        getData();
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [status]);

  return (
    <div className="p-4">
      {/* Query Data  */}
      <div className="shadow-lg p-4 rounded-lg mb-8 border">
        {/* Head Data  */}
        <div className="flex justify-between items-center">
          {/* Indus Info  */}
          <div>
            <h2 className="text-xl font-bold mb-3">
              Ticket Id :{" "}
              <span
                className="text-white bg-orange-500 font-medium rounded-md text-xl text-center px-2 py-1"
                style={{ marginLeft: "66px" }}
              >
                {ticketId}
              </span>{" "}
            </h2>
            <h2 className="text-xl font-bold mb-3">
              Date & Time :{" "}
              <span
                className="text-white bg-orange-500 font-medium rounded-md text-xl text-center px-2 py-1 ml-8"
                style={{ marginLeft: "29px" }}
              >
                {dateTime}
              </span>{" "}
            </h2>
            <h2 className="text-xl font-bold mb-3">
              Industry Name :{" "}
              <span className="text-white bg-orange-500 font-medium rounded-md text-xl text-center px-2 py-1 ml-2">
                {industryName}
              </span>{" "}
            </h2>
          </div>

          {/* Status  */}
          <div>
            <div
              style={{
                backgroundColor: `${
                  status === "inProgress"
                    ? "#FACC15"
                    : status === "pending"
                    ? "red"
                    : "green"
                }`,
              }}
              className="text-white font-medium rounded-lg text-md text-center px-8 py-2.5 mr-2 mb-2 focus:outline-none"
            >
              {status === "inProgress"
                ? "In Progress"
                : status === "pending"
                ? "Pending"
                : "Resolved"}
            </div>
            {status === "pending" ? (
              <button
                onClick={handleCloseQuery}
                className="text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md text-center px-8 py-2.5 mr-2 mb-2 focus:outline-none border-black border-2"
              >
                Close Query
              </button>
            ) : status === "inProgress" ? (
              <button
                onClick={handleCloseQuery}
                className="text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md text-center px-8 py-2.5 mr-2 mb-2 focus:outline-none"
              >
                Close Query
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* Bottom Data  */}
        <div className="shadow-lg mt-5 border border-blue-100 rounded-md p-5 flex gap-4 flex-col">
          <div className="flex gap-3">
            <h2 className="text-white bg-blue-500 font-medium text-center rounded-md text-xl px-2 py-1 mb-2">
              Query Title
            </h2>
            <h1 className="text-xl font-medium">{title}</h1>
          </div>
          <div className="flex gap-3">
            <h2 className="text-white bg-blue-500 font-medium text-center rounded-md text-xl px-2 py-1 mb-2">
              Query Description
            </h2>
            <h1 className="text-xl font-medium">{description}</h1>
          </div>
        </div>
      </div>

      {/* All Message Section  */}
      <div className="shadow-lg p-4 rounded-lg mb-8 border">
        {allMessage.length ? (
          allMessage.map((item) => {
            return (
              <div
                key={item._id}
                className="p-4 bg-green-400 w-1/2 block border rounded-md relative mb-4 border-black"
              >
                <div
                  className="text-xl font-bold mb-2"
                  style={{ wordWrap: "break-word" }}
                >
                  <h1 className="mb-6">{item.message}</h1>
                </div>
                <div className="flex absolute bottom-2 left-96">
                  <p className="font-medium bg-white border rounded-md px-1 py-.5">
                    {item.send_by} |{" "}
                    {`${item.message_time.split("T")[0]}, ${
                      item.message_time.split("T")[1].split(".")[0]
                    }`}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <h1 className="text-center font-bold text-2xl text-blue-900">
              Start Conversation Now....
            </h1>
          </>
        )}
      </div>

      {/* Send Message Section  */}
      {status === "resolved" ? (
        <>
          <div className="shadow-lg p-4 rounded-lg mb-8 border">
            <h1 className="text-center font-bold text-2xl text-blue-900">
              Thank You For Raising Your Problem, Now Your Problem Is Resolved
              😊😊
            </h1>
          </div>
        </>
      ) : (
        <div className="shadow-lg p-4 rounded-lg mb-8 border">
          {/* <form onSubmit={formHandle}> */}
          <form onSubmit={handleMessage}>
            <label
              htmlFor="message"
              className="block mb-2 text-lg font-bold text-gray-900"
            >
              Type Your Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-8"
              placeholder="Write your problem here..."
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminQueryInfo;
