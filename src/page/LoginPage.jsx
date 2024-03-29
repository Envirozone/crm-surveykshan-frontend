import React, { useState } from "react";
import cus from "../assets/cus.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/Slices/AuthSlice";
import "./index.css";
import toast from "react-hot-toast";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleForm(e) {
    e.preventDefault();
    try {
      const response = dispatch(login({ username, password }));
      if (response?.payload?.status === 200) {
        navigate("/");
        
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  }

  return (
    <div>
      <div className="flex gap-4">
        <div
          style={{
            height: "90vh",
            overflow: "hidden",
          }}
          className="w-1/2 p-2 rounded-md shadow-md hidden lg:block"
        >
          <img src={cus} />
        </div>
        <div className="w-full lg:w-1/2 p-4 flex flex-col m-auto gap-5 sm:mt-8 md:mt-8 main_container">
          <div className="apply_backdrop mt-20">
            <h1 className="align-middle mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl">
              Sign in to{" "}
              <mark className="px-2 text-white bg-blue-600 rounded align-middle">
                Raise Your Query
              </mark>
            </h1>
            <form onSubmit={handleForm}>
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="johndoe"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-lg font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="•••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
