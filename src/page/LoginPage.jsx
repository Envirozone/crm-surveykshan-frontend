import React, { useState } from "react";
import Navbar from "../component/Navbar";
import cus from "../assets/cus.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/Slices/AuthSlice";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleForm(e) {
    e.preventDefault();
    const response = await dispatch(login({ username, password }));
    if (response?.payload?.user?.usertype === "client") {
      navigate("/user/dashboard");
    }
    if (response?.payload?.user?.usertype === "admin") {
      navigate("/admin/dashboard");
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
          className="w-1/2 p-2 rounded-md shadow-md"
        >
          <img src={cus} />
        </div>
        <div className="w-1/2 p-4 flex flex-col m-auto gap-5">
          <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
            Sign in to{" "}
            <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500 align-middle">
              Raise Your Problem
            </mark>
          </h1>
          <form onSubmit={handleForm}>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="johndoe"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
