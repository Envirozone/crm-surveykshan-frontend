import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
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

  // Image Upload By Google Drive
  const [image, setImage] = useState(null);
  const [loading, isLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
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
      setDateTime(res?.data[0]?.createdAt);
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
    isLoading(true);

    const formData = new FormData();

    try {
      formData.append("image", image);
      formData.append("message", message);
    } catch (error) {
      console.error("Error In Creating FormData:", error);
    }

    try {
      const res = await axios.post(
        `${window.apiURL}/admin/addMessageToTicketByTicketId/${id}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        isLoading(false);
        toast.success("Your Message Successfully Send.");
        setMessage("");
        setImage(null); // Not Working placeholder
        getData();
      }
    } catch (error) {
      if (error.response) {
        isLoading(false);
        toast.error(error.response.data.message);
      } else {
        isLoading(false);
        toast.error(error.message);
      }
    }
  };

  // Update Message Seen Status
  const handleSeenMessage = async (messageId) => {
    try {
      const res = await axios.patch(
        `${window.apiURL}/admin/updateTicket/seenStatusByAdmin/${id}/${messageId}`
      );
      if (res.status === 200) {
        toast.success("Message Seen Status Updated");
        getData();
      }
    } catch (error) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleQueryStatus = async (e) => {
    const queryStatus = e.target.value;

    if (queryStatus === status) {
      toast.error(`${queryStatus} Is Already Selected`);
      return;
    }

    Swal.fire({
      title: "Query Status Change Confirmation",
      text: "Are you sure want to Change this query status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Change Query Status",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.patch(
            `${window.apiURL}/admin/updateTicketById/${id}`,
            {
              payload: {
                status: queryStatus,
              },
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
              "Query Status Successfully Changed. 😊😊",
              "success"
            );
            setStatus(queryStatus);
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

  // Updating Message Section After 5 Sec
  const updateMessagePart = async () => {
    try {
      const res = await axios.get(`${window.apiURL}/ticket/${id}`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      });
      setAllMessage(res?.data[0]?.messages);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(updateMessagePart, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
  // Updating Message Section After 5 Sec

  useEffect(() => {
    getData();
    scrollToBottom();
  }, [status]);

  // **********************************************
  // Adding Scrollable Feature in Chat Section
  const scrollableRef = useRef(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  };

  return (
    <div className="p-4">
      {/* Query Data  */}
      <div className="shadow-lg p-4 rounded-lg mb-8 border">
        {/* Head Data  */}
        <div className="flex-col lg:flex-row flex justify-between items-center gap-4">
          {/* Indus Info  */}
          <div>
            <h2 className="text-lg font-bold mb-3 bg-slate-200 p-1 rounded shadow">
              Ticket Id :
              <span className="text-blue-700 font-bold rounded-md text-lg text-center px-2 py-1">
                {ticketId}
              </span>
            </h2>
            <h2 className="text-lg font-bold mb-3 bg-slate-200 p-1 rounded shadow">
              Date & Time :
              <span className="text-blue-700 font-bold rounded-md text-lg text-center px-2 py-1">
                {dateTime
                  ? `${dateTime?.split("T")[0]} | ${
                      dateTime?.split("T")[1].split("+")[0]
                    }`
                  : ""}
              </span>
            </h2>
            <h2 className="text-lg font-bold mb-3 bg-slate-200 p-1 rounded shadow">
              Industry Name :
              <span className="text-blue-700 font-bold rounded-md text-lg text-center px-2 py-1">
                {industryName}
              </span>
            </h2>
          </div>

          {/* Status  */}
          <div>
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
            </div>
            <div className="text-white font-medium rounded-lg text-md text-center px-8 py-2.5 mr-2 mb-2 focus:outline-none">
              <select
                onChange={handleQueryStatus}
                defaultValue=""
                className="bg-gray-50 border border-black text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Change Query Status</option>
                <option value="pending">Pending</option>
                <option value="inProgress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Data  */}
        <div className="mt-5 border border-gray-300 rounded-md p-5 flex gap-4 flex-col">
          <div className="flex gap-3">
            <h2 className="text-black font-bold bg-gray-200 text-center rounded-md text-lg px-2 py-1 mb-2">
              Query Title
            </h2>
            <h1 className="text-lg font-medium">{title}</h1>
          </div>
          <div className="flex gap-3">
            <h2 className="text-black font-bold bg-gray-200 text-center rounded-md text-lg px-2 py-1 mb-2">
              Query Description
            </h2>
            <h1 className="text-lg font-medium">{description}</h1>
          </div>
        </div>
      </div>

      {/* All Message Section  */}
      <div className="text-center font-bold mb-2 text-2xl bg-green-400 p-1 shadow rounded">
        Feel Free To Chat With Us
      </div>
      <div
        ref={scrollableRef}
        className="shadow-lg p-4 rounded-lg mb-8 border border-black"
        style={{
          overflowY: "auto",
          scrollBehavior: "smooth",
          backgroundColor: "#EFEAE2",
          maxHeight: "90vh",
        }}
      >
        {allMessage.length ? (
          allMessage.map((item) => {
            return item.send_by === "surveykshan" ? (
              <div className="flex flex-row-reverse" key={item._id}>
                <div
                  className="p-4 mr-2 w-1/2 block border rounded-md relative mb-4 border-black"
                  style={{
                    width: "70%",
                    backgroundColor: "#D9FDD3",
                  }}
                >
                  <div
                    className="text-lg font-bold mb-14 lg:mb-4"
                    style={{ wordWrap: "break-word" }}
                  >
                    {/* // Showing Text of Message */}
                    <h1 className="mb-5">{item.message}</h1>

                    {/* // Showing Image If Image is Available  */}
                    {item?.image ? (
                      <h2 className="font-extrabold text-blue-500 underline mb-8">
                        <Link to={item.image} target="_blank">
                          {item?.image}
                        </Link>
                      </h2>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="flex absolute bottom-2 right-2 gap-2 items-center p-1">
                    <p className="font-medium bg-white border rounded-md px-1 py-.5">
                      {item.send_by} |{" "}
                      {`${item.message_time.split("T")[0]}, ${
                        item.message_time.split("T")[1].split("+")[0]
                      }`}
                    </p>
                    {/* // Adding Seen Status Part  */}
                    {item?.seen == true ? (
                      <span className="material-symbols-outlined text-blue-600">
                        done_all
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-gray-500">
                        done_all
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex" key={item._id}>
                <div
                  className="p-4 block bg-white border rounded-md relative mb-4 border-black"
                  style={{ width: "70%" }}
                >
                  <div
                    className="text-lg font-bold mb-14 lg:mb-4"
                    style={{
                      wordWrap: "break-word",
                      filter: item?.seen === false ? "blur(5px)" : "blur(0px)",
                    }}
                  >
                    {/* // Showing Text of Message */}
                    <h1 className="mb-5">{item.message}</h1>

                    {/* // Showing Image If Image is Available  */}
                    {item?.image ? (
                      <h2 className="font-extrabold text-blue-500 underline mb-8">
                        <Link to={item.image} target="_blank">
                          {item?.image}
                        </Link>
                      </h2>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="flex absolute bottom-2 right-2 gap-2 items-center p-1">
                    <p
                      className="font-medium border rounded-md px-1 py-.5"
                      style={{ backgroundColor: "#D9FDD3" }}
                    >
                      {item.send_by} |{" "}
                      {`${item.message_time.split("T")[0]}, ${
                        item.message_time.split("T")[1].split("+")[0]
                      }`}
                    </p>
                    {/* // Adding Seen Status Part  */}
                    {item?.seen === true ? (
                      <></>
                    ) : (
                      <button
                        onClick={() => handleSeenMessage(item._id)}
                        className="w-5 h-5 border-black border-2 cursor-pointer"
                      ></button>
                    )}
                  </div>
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
              className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-4"
              placeholder="Write your problem here..."
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* // Applying Image Send Input  */}
            <input
              type="file"
              name="image"
              className="cursor-pointer"
              accept="image/*, video/*, audio/*"
              capture
              onChange={handleImageChange}
            />

            {/* // Adding Loading Icon When Image Is Uploading */}
            {loading == true ? (
              <div role="status" className="flex justify-center items-center">
                <svg
                  aria-hidden="true"
                  className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <></>
            )}

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none w-full mt-4"
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
