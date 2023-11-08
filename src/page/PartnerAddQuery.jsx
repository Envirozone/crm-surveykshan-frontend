import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Select from "react-select";

function PartnerAddQuery() {
  const selectedIndustry = useRef(null);
  const [allIndustries, setAllIndustries] = useState([]);
  const [other, setOther] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [indus, setIndus] = useState("");
  const [industryCounts, setIndustryCounts] = useState();
  const userData = JSON.parse(localStorage.getItem("data"));
  //  Input, state and set state change done just need to add in api
  const [file, setFile] = useState("");

  async function formHandle(e) {
    e.preventDefault();
    console.log(title, description, indus.split(",")[1]);
    try {
      const res = await axios.post(
        `${window.apiURL}/admin/addQueryForIndustry/${indus}`,
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
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  }

  const handleRadioForm = async (e) => {
    e.preventDefault();
    setOther(true);
  };

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

  return (
    <>
      <div>
        <div>
          <div className="relative border border-blue-400 overflow-x-auto shadow-md rounded-lg m-4 flex justify-between p-2">
            <h2 className="text-3xl lg:text-4xl font-extrabold">Add Query</h2>
            <Link to="/all-queries">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 mr-2 focus:outline-none"
              >
                All Query
              </button>
            </Link>
          </div>
        </div>

        <div>
          {/* Select Industry Field  */}

          {/* Other Fields  */}
          {other === true ? (
            <div className="shadow-lg m-5 p-8 lg:relative">
              <div className="mb-5 gap-2 flex flex-col justify-center items-center lg:block">
                <div>
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none lg:absolute lg:right-6"
                    style={{ top: "35px" }}
                    onClick={() => setOther(false)}
                  >
                    Back
                  </button>
                </div>
                <div>
                  <h1 className="mb-2 text-center font-bold bg-gray-200 rounded p-2 shadow text-md lg:text-xl">
                    {indus.split(",")[1]}
                  </h1>
                </div>
              </div>

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

                <label
                  className="block mb-2 text-lg font-bold text-gray-900"
                  htmlFor="file_input"
                >
                  Upload File
                </label>
                <input
                  className="block p-2.5 mb-8 w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                  id="file_input"
                  type="file"
                  value={file}
                  onChange={(e) => setFile(e.target.value)}
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
                <div className="mb-4">
                  {allIndustries ? (
                    <Select
                      ref={selectedIndustry}
                      options={allIndustries.map(({ industry_name, _id }) => {
                        return {
                          value: `${_id},${industry_name}`,
                          label: industry_name,
                        };
                      })}
                      required
                      placeholder="Select Industry"
                      onChange={(e) => {
                        selectedIndustry.current.value = e.value;
                        setIndus(selectedIndustry.current.value);
                        console.log(selectedIndustry.current.value);
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
                    onChange={() => setOther(true)}
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
      </div>
    </>
  );
}

export default PartnerAddQuery;
